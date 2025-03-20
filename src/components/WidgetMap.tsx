import BarChart from "./widgets/BarChart";
import Piechart from "./widgets/PieChart";
import ProfileComponent from "./widgets/ProfileComponent";

const WidgetMap: Record<string, any> = {
  pieChart: Piechart,
  barChart: BarChart,
  profile: ProfileComponent,
};

export default WidgetMap;

