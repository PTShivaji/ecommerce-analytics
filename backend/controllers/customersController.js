const ShopifyCustomer = require('../models/shopifyCustomer');

// Helper function to aggregate new customers
const aggregateNewCustomers = async (interval) => {
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
      newCustomers: { $sum: 1 }
    }
  };

  const result = await ShopifyCustomer.aggregate([matchStage, groupStage]);
  return result;
};

// Helper function to calculate repeat customers
const aggregateRepeatCustomers = async (interval) => {
  const matchStage = {
    $match: { orders_count: { $gt: 1 } }
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
      repeatCustomers: { $sum: 1 }
    }
  };

  const result = await ShopifyCustomer.aggregate([matchStage, groupStage]);
  return result;
};

// Helper function to calculate lifetime value
const calculateLifetimeValue = async () => {
  const result = await ShopifyCustomer.aggregate([
    { $match: { total_spent: { $exists: true }, created_at: { $exists: true } } },
    { $group: {
      _id: { $dateToString: { format: "%Y-%m", date: "$created_at" } },
      totalLifetimeValue: { $sum: { $toDouble: "$total_spent" } }
    }},
    { $sort: { _id: 1 } }
  ]);
  return result;
};

// Route handlers
exports.getNewCustomers = async (req, res) => {
  try {
    const dailyCustomers = await aggregateNewCustomers('daily');
    const monthlyCustomers = await aggregateNewCustomers('monthly');
    const quarterlyCustomers = await aggregateNewCustomers('quarterly');
    const yearlyCustomers = await aggregateNewCustomers('yearly');
    res.json({ dailyCustomers, monthlyCustomers, quarterlyCustomers, yearlyCustomers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRepeatCustomers = async (req, res) => {
  try {
    const dailyRepeatCustomers = await aggregateRepeatCustomers('daily');
    const monthlyRepeatCustomers = await aggregateRepeatCustomers('monthly');
    const quarterlyRepeatCustomers = await aggregateRepeatCustomers('quarterly');
    const yearlyRepeatCustomers = await aggregateRepeatCustomers('yearly');
    res.json({ dailyRepeatCustomers, monthlyRepeatCustomers, quarterlyRepeatCustomers, yearlyRepeatCustomers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGeographicalDistribution = async (req, res) => {
  try {
    const customers = await ShopifyCustomer.aggregate([
      { $match: { 'default_address.city': { $exists: true } } },
      { $group: { _id: "$default_address.city", count: { $sum: 1 } } }
    ]);
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLifetimeValue = async (req, res) => {
  try {
    const lifetimeValue = await calculateLifetimeValue();
    res.json(lifetimeValue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
