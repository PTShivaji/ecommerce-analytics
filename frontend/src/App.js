import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import TotalSalesChart from './components/TotalSalesChart';
import SalesGrowthChart from './components/SalesGrowthChart';
import NewCustomersChart from './components/NewCustomersChart';
import RepeatCustomersChart from './components/RepeatCustomersChart';
import GeographicalDistributionChart from './components/GeographicalDistributionChart';
import LifetimeValueChart from './components/LifetimeValueChart';

// Register necessary components globally
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sales and Customer Data Dashboard</h1>
      </header>
      <main>
        <section>
          <TotalSalesChart />
        </section>
        <section>
          <SalesGrowthChart />
        </section>
        <section>
          <NewCustomersChart />
        </section>
        <section>
          <RepeatCustomersChart />
        </section>
        <section>
          <GeographicalDistributionChart />
        </section>
        <section>
          <LifetimeValueChart />
        </section>
      </main>
    </div>
  );
}

export default App;
