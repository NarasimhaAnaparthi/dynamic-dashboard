import moment from "moment";

interface HeatDataItem {
  date: string;
  status?: string;
  value?: number;
}

interface HeatMapProps {
  heatData: HeatDataItem[];
}

const HeatMap = ({ heatData: data }: HeatMapProps) => {
  // Get the last 3 months dynamically
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  console.log(data);
  // Helper function to get all months in range
  const getMonthsInRange = (start: string | number | Date, end: number | Date) => {
    const months = [];
    const current = new Date(start);
    current.setDate(1);
    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  // Generate calendar grid for a specific month
  const generateCalendarGrid = (monthStart: string | number | Date) => {
    const monthEnd = new Date(monthStart);
    monthEnd.setMonth((monthStart as Date).getMonth() + 1);
    monthEnd.setDate(0);

    let currentDate = new Date(monthStart);
    const startDayOffset = currentDate.getDay();
    const firstWeek = Array(startDayOffset).fill(null);
    while (currentDate <= monthEnd) {
      firstWeek.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    const weeks = [];
    while (firstWeek.length > 0) {
      weeks.push(firstWeek.splice(0, 7));
    }
    return weeks;
  };

  // Get color intensity based on the value
  const getIntensity = (day: { status: string; value: number | undefined; }) => {
    if (!day || !day.status) return "bg-[#E2EAF1]"; // Default color if no data
    if (day.status === "absent") return "bg-[#DA9C9D]";
    if (day.status === "present") return "bg-[#8bdb84]";
    if (day.value !== undefined && day.value < 4) return "bg-[#DBCE84]";
    return "bg-[#E2EAF1]";
  };

  const months = getMonthsInRange(start, end);

  return (
    <div className="flex mt-2 gap-x-3 items-center min-w-[40rem]">
      {months.map((monthStart) => {
        const monthName = monthStart.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });
        const calendarGrid = generateCalendarGrid(monthStart);

        return (
          <div key={monthName} className="inline-block rounded-lg">
            <div className="grid grid-cols-7 gap-x-1 gap-y-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div
                  key={`${day}-${index}`}
                  className="w-[12px] h-[12px] text-xs font-bold text-center"
                >
                  {day}
                </div>
              ))}
              {calendarGrid.flat().map((day, index) => {
                if (day === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="w-[12px] h-[12px] rounded bg-transparent "
                    ></div>
                  );
                }
                const dateString = moment(day).format("YYYY-MM-DD"); // Ensure consistent date format
                const value:any = data.find((item: { date: string; }) => item.date === dateString);
                console.log(dateString,data[0].date);
                return (
                  <div
                    key={`day-${dateString}-${index}`}
                    title={`Date: ${dateString}\n${
                      value?.value ? "Hrs: " + value.value + "\n" : ""
                    }Status: ${value?.status || "NA"}`}
                    className={`w-[12px] h-[12px] cursor-pointer border rounded ${getIntensity(
                      value
                    )}`}
                  ></div>
                );
              })}
            </div>
            <h2 className="text-[12px] font-semibold mt-1 text-center">
              {monthName.slice(0, 3).toUpperCase()}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default HeatMap;

// Mock Data Example
export const mockData = [
  { date: "2024-01-10", status: "present", value: 6 },
  { date: "2024-01-15", status: "absent" },
  { date: "2024-02-05", status: "present", value: 3 },
  { date: "2024-02-20", status: "absent" },
  { date: "2024-03-08", status: "present", value: 7 },
];
