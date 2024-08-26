const ShopifyOrder = require('../models/shopifyOrder');

// Helper function to aggregate sales
const aggregateSales = async (interval) => {
  const matchStage = {
    $match: { created_at: { $exists: true } }
  };

  const groupStage = {
    $group: {
      _id: {
        $dateToString: {
          format: interval === 'daily' ? "%Y-%m-%d" :
                  interval === 'monthly' ? "%Y-%m" :
                  interval === 'quarterly' ? "%Y-Q%q" :
                  "%Y", // yearly
          date: "$created_at"
        },
      },
      totalSales: { $sum: { $toDouble: "$total_price" } }
    }
  };

  const result = await ShopifyOrder.aggregate([matchStage, groupStage]);
  return result;
};

exports.getTotalSales = async (req, res) => {
  try {
    const dailySales = await aggregateSales('daily');
    const monthlySales = await aggregateSales('monthly');
    const quarterlySales = await aggregateSales('quarterly');
    const yearlySales = await aggregateSales('yearly');
    res.json({ dailySales, monthlySales, quarterlySales, yearlySales });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSalesGrowthRate = async (req, res) => {
  try {
    const sales = await aggregateSales('monthly'); // Example using monthly
    const growthRate = sales.map((data, index) => {
      if (index === 0) return { ...data, growthRate: 0 };
      const prev = sales[index - 1].totalSales;
      const growthRate = ((data.totalSales - prev) / prev) * 100;
      return { ...data, growthRate };
    });
    res.json(growthRate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
