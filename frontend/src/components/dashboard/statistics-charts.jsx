import { ChartBarBig, ChartLine, ChartPie } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const StatisticsCharts = ({
  stats,
  taskTrendsData,
  projectStatusData,
  taskPriorityData,
  workspaceProductivityData,
}) => {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
      {/* Task Trends Line Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Task Trends</CardTitle>
            <CardDescription>Daily task status changes</CardDescription>
          </div>
          <ChartLine className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                completed: { color: "#10b981" },
                inProgress: { color: "#f59e0b" },
                toDo: { color: "#3b82f6" },
              }}
            >
              <LineChart data={taskTrendsData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <ChartTooltip />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="toDo"
                  stroke="#6b7280"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Project Status Pie Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Project Status</CardTitle>
            <CardDescription>Project status breakdown</CardDescription>
          </div>
          <ChartPie className="size-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex justify-center items-center w-full">
            <ChartContainer
              className="h-[300px]"
              config={{
                Completed: { color: "#10b981" },
                "In Progress": { color: "#3b82f6" },
                Planning: { color: "#f59e0b" },
              }}
            >
              <PieChart width={300} height={300}>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  label={({ name, percent }) =>
                    projectStatusData.length > 1
                      ? `${name} (${(percent * 100).toFixed(0)}%)`
                      : `${name}`
                  }
                  labelLine={false}
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Task Priority Pie Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Task Priority</CardTitle>
            <CardDescription>Task priority breakdown</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex justify-center items-center w-full">
            <ChartContainer
              className="h-[300px] flex justify-center items-center"
              config={{
                High: { color: "#ef4444" },
                Medium: { color: "#f59e0b" },
                Low: { color: "#6b7280" },
              }}
            >
              <PieChart width={300} height={300}>
                <Pie
                  data={taskPriorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    taskPriorityData.length > 1
                      ? `${name} ${(percent * 100).toFixed(0)}%`
                      : name
                  }
                  labelLine={false}
                >
                  {taskPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Workspace Productivity Bar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Workspace Productivity</CardTitle>
            <CardDescription>Task completion by project</CardDescription>
          </div>
          <ChartBarBig className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent className="w-full overflow-x-auto md:overflow-x-hidden">
          <div className="min-w-[350px]">
            <ChartContainer
              className="h-[300px]"
              config={{
                completed: { color: "#3b82f6" },
                total: { color: "red" },
              }}
            >
              <BarChart
                data={workspaceProductivityData}
                barGap={0}
                barSize={20}
              >
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="total"
                  fill="#000"
                  radius={[4, 4, 0, 0]}
                  name="Total Tasks"
                />
                <Bar
                  dataKey="completed"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  name="Completed Tasks"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCharts;