import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CheckCircle2, Circle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export const UpcomingTasks = ({ data }) => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
        <CardDescription>Here are the tasks that are due soon</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No upcoming tasks yet
          </p>
        ) : (
          data.map((task) => (
            <Link
              to={`/workspaces${workspaceId}/projects/${task.project}/tasks/${task._id}`}
              key={task._id}
              className="flex items-start space-x-3 border-b pb-3 last:border-0"
            >
              <div
                className={cn(
                  "mt-0.5 rounded-full p-1",
                  task.priority === "High" && "bg-red-100 text-red-700",
                  task.priority === "Medium" && "bg-yellow-100 text-yellow-700",
                  task.priority === "Low" && "bg-gray-100 text-gray-700"
                )}
              >
                {task.status === "Done" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>

              <div className="space-y-1">
                <p className="font-medium text-sm md:text-base">{task.title}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{task.status}</span>
                  {task.dueDate && (
                    <>
                      <span className="mx-1"> - </span>
                      <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  );
};
