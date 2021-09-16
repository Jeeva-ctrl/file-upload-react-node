import FileUpload from "./fileUpload";
import "./App.css";
import ModalComp from "./modal";
import Toaster from "./toaster";
import PieRechartComponent from "./Charts/pieChart/pieChart";
import AreaRechartComponent from "./Charts/areaChart";
import LineRechartComponent from "./Charts/lineCHart";
import CustomActiveShapePieChart from "./Charts/customActiveShapePieChart";

function App() {
  return (
    <div className="App">
      <div className="Card">
        {" "}
        <FileUpload />
      </div>

      <ModalComp />
      <div className="Card">
        <PieRechartComponent />
      </div>
      <div className="Card">
        <AreaRechartComponent />
      </div>
      <div className="Card">
        <LineRechartComponent />
      </div>
      <div className="Card">
        <CustomActiveShapePieChart />
      </div>
    </div>
  );
}

export default App;
