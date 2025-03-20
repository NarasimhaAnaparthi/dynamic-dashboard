import React, { useState } from "react";
import WidgetMap from "./WidgetMap";

const initialJSON = {
  totalCols: 8,
  totalRows: 12,
  widgets: [
    {
      cols: 2,
      rows: 6,
      widget: "profile",
      widgetProps: { name: "John Doe", role: "Engineer" },
    },
    {
      cols: 3,
      rows: 3,
      widget: "statusPieChart",
      widgetProps: { data: [10, 20, 30] },
    },
    {
      cols: 3,
      rows: 9,
      widget: "timeline",
      widgetProps: { events: ["Task 1", "Task 2"] },
    },
    {
      cols: 3,
      rows: 3,
      widget: "barChart",
      widgetProps: { labels: ["Jan", "Feb"], values: [50, 80] },
    },
    {
      cols: 5,
      rows: 3,
      widget: "heatMap",
      widgetProps: {
        heatData: [
          [1, 2],
          [3, 4],
        ],
      },
    },
  ],
};

const DynamicDashboard: React.FC = () => {
  const [dashboardJSON, setDashboardJSON] = useState(initialJSON);

  const handleJSONChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setDashboardJSON(JSON.parse(event.target.value));
    } catch (e) {
      console.error("Invalid JSON", e);
    }
  };

  return (
    <div className="flex h-screen">
      {/* JSON Editor */}
      <div className="w-1/4 p-4 bg-gray-800 text-white overflow-auto">
        <h2 className="text-lg font-bold mb-2">Edit JSON Schema</h2>
        <textarea
          className="w-full h-[90vh] bg-gray-700 p-2 rounded"
          value={JSON.stringify(dashboardJSON, null, 2)}
          onChange={handleJSONChange}
        />
      </div>

      {/* Dashboard Layout */}
      <div className="w-3/4 p-4 grid grid-cols-8 gap-4">
        {dashboardJSON.widgets.map((widgetItem, index) => {
          const Widget = WidgetMap[widgetItem.widget];
          return (
            <div
              key={index}
              className={`col-span-${widgetItem.cols} row-span-${widgetItem.rows} border p-4 bg-white shadow-lg rounded`}
            >
              {Widget ? (
                <Widget {...widgetItem.widgetProps} />
              ) : (
                <p>Unknown Widget</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicDashboard;
