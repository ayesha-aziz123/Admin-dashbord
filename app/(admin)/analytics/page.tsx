import PieChart from "./charts/pieChart";
import Areachart from "./charts/areaChart";
import Tool from "./charts/Tool";

const Analytics = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-12  md:gap-4">
        <div className="col-span-5 rounded-lg shadow-lg md:px-4 py-4 bg-white">
          <PieChart />
        </div>
        <div className="col-span-7  rounded-lg shadow-lg md:px-4 py-4 bg-white">
          <Areachart />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-12 rounded-lg shadow-lg md:px-4 py-4 bg-white">
          <Tool />
        </div>
        {/* <div className="col-span-7  rounded-lg shadow-lg px-4 py-4 bg-white">
          <Areachart />
        </div> */}
      </div>
    </>
  );
};

export default Analytics;
