import BarChart from "./widgets/BarChart";
import HeatMapComponent from "./widgets/HeatMap";
import Piechart from "./widgets/PieChart";
import ProfileComponent from "./widgets/ProfileComponent";

const WidgetMap: Record<string, any> = {
  pieChart: Piechart,
  barChart: BarChart,
  profile: ProfileComponent,
  heatMap: HeatMapComponent
};

export default WidgetMap;

