import React, { useState } from "react";
import WidgetMap from "./WidgetMap";
import VanillaJsonEditor from "./VanillaJsonEditor";

const initialJSON = {
  totalCols: 8,
  totalRows: 8,
  widgets: [
    {
      cols: 2,
      rows: 3,
      widget: "profile",
      widgetProps: { name: "John Doe", role: "Engineer" },
    },
    {
      cols: 3,
      rows: 3,
      widget: "pieChart",
      widgetProps: { data: [10, 20, 30, 60] },
    },
    {
      cols: 3,
      rows: 8,
      widget: "timeline",
      widgetProps: { events: ["Task 1", "Task 2"] },
    },
    {
      cols: 5,
      rows: 3,
      widget: "barChart",
      widgetProps: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        values: [50, 80, 60, 70, 40, 59],
      },
    },
    {
      cols: 5,
      rows: 2,
      widget: "heatMap",
      widgetProps: {
        heatData: [
          { date: "2025-01-10", status: "present", value: 6 },
          { date: "2025-01-15", status: "absent" },
          { date: "2025-02-05", status: "present", value: 3 },
          { date: "2025-02-20", status: "absent" },
          { date: "2025-03-08", status: "present", value: 7 },
        ],
      },
    },
  ],
};

const DynamicDashboard: React.FC = () => {
  const [dashboardJSON, setDashboardJSON] = useState(initialJSON);

  const handleJSONChange = (data: any) => {
    if ("json" in data && data.json) {
      setDashboardJSON(data.json);
    } else if ("text" in data && data.text) {
      try {
        const parsedData = JSON.parse(data.text);
        setDashboardJSON(parsedData);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* JSON Editor */}
      <div className="w-1/4 p-4 bg-gray-800 text-white overflow-auto">
        <h2 className="text-lg font-bold mb-1">Edit JSON Schema</h2>
        <VanillaJsonEditor
          content={{ json: dashboardJSON }}
          askToFormat={false}
          navigationBar={false}
          onChange={(data) => {
            handleJSONChange(data);
          }}
        />
      </div>

      {/* Dashboard Layout */}
      <div
        className={`w-3/4 p-4 grid grid-cols-${dashboardJSON?.totalCols} gap-4 grid-rows-${dashboardJSON?.totalRows}`}
      >
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
                <p className="capitalize">{widgetItem.widget} Not Defined</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicDashboard;
