import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyTasksQuery } from "@/hooks/use-task";
import { format } from "date-fns";
import { ArrowUpRight, CheckCircle, Clock, FilterIcon } from "lucide-react";

const MyTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const workspaceId = searchParams.get("workspaceId");
  const initialFilter = searchParams.get("filter") || "all";
  const initialSort = searchParams.get("sort") || "desc";
  const initialSearch = searchParams.get("search") || "";

  const [filter, setFilter] = useState(initialFilter);
  const [sortDirection, setSortDirection] = useState(initialSort === "asc" ? "asc" : "desc");
  const [search, setSearch] = useState(initialSearch);

  // Remove empty search param (like `?search=` in URL)
  useEffect(() => {
    const params = {};
    searchParams.forEach((value, key) => {
      if (value) params[key] = value;
    });

    if (search) params.search = search;
    if (filter) params.filter = filter;
    if (sortDirection) params.sort = sortDirection;

    setSearchParams(params, { replace: true });
  }, [filter, sortDirection, search]);

  useEffect(() => {
    const urlFilter = searchParams.get("filter") || "all";
    const urlSort = searchParams.get("sort") || "desc";
    const urlSearch = searchParams.get("search") || "";

    if (urlFilter !== filter) setFilter(urlFilter);
    if (urlSort !== sortDirection) setSortDirection(urlSort === "asc" ? "asc" : "desc");
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  // ⛔ Don’t fetch if workspaceId is missing
  const { data: myTasks, isLoading } = useGetMyTasksQuery(workspaceId, {
    enabled: !!workspaceId,
  }) || {};

  if (!workspaceId) {
    return (
      <div className="text-center text-muted-foreground mt-10">
        <p>No workspace selected.</p>
        <p>Please select a workspace to view your tasks.</p>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  const filteredTasks = myTasks?.length
    ? myTasks
        .filter((task) => {
          if (filter === "all") return true;
          if (filter === "todo") return task.status === "To Do";
          if (filter === "inprogress") return task.status === "In Progress";
          if (filter === "done") return task.status === "Done";
          if (filter === "achieved") return task.isArchived === true;
          if (filter === "high") return task.priority === "High";
          return true;
        })
        .filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description?.toLowerCase().includes(search.toLowerCase())
        )
    : [];

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return sortDirection === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate);
    }
    return 0;
  });

  const todoTasks = sortedTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = sortedTasks.filter((task) => task.status === "In Progress");
  const doneTasks = sortedTasks.filter((task) => task.status === "Done");

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <div className="flex flex-col items-start md:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
          >
            {sortDirection === "asc" ? "Oldest First" : "Newest First"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                ["all", "All Tasks"],
                ["todo", "To Do"],
                ["inprogress", "In Progress"],
                ["done", "Done"],
                ["achieved", "Achieved"],
                ["high", "High"],
              ].map(([key, label]) => (
                <DropdownMenuItem key={key} onClick={() => setFilter(key)}>
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Input
        placeholder="Search tasks ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="board">Board View</TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>
              <CardDescription>{sortedTasks.length} tasks assigned to you</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {sortedTasks.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    No tasks found
                  </div>
                ) : (
                  sortedTasks.map((task) => (
                    <div key={task._id} className="p-4 hover:bg-muted/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-3">
                        <div className="flex">
                          <div className="flex gap-2 mr-2">
                            {task.status === "Done" ? (
                              <CheckCircle className="size-4 text-green-500" />
                            ) : (
                              <Clock className="size-4 text-yellow-500" />
                            )}
                          </div>

                          <div>
                            <Link
                              to={`/workspaces/${task.project?.workspace}/projects/${task.project?._id}/tasks/${task._id}`}
                              className="font-medium hover:text-primary hover:underline transition-colors flex items-center"
                            >
                              {task.title}
                              <ArrowUpRight className="size-4 ml-1" />
                            </Link>

                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={task.status === "Done" ? "default" : "outline"}>
                                {task.status}
                              </Badge>
                              {task.priority && (
                                <Badge
                                  variant={task.priority === "High" ? "destructive" : "secondary"}
                                >
                                  {task.priority}
                                </Badge>
                              )}
                              {task.isArchived && <Badge variant="outline">Archived</Badge>}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground space-y-1">
                          {task.dueDate && <div>Due: {format(task.dueDate, "PPPP")}</div>}
                          <div>
                            Project:{" "}
                            <span className="font-medium">{task.project?.title}</span>
                          </div>
                          <div>Modified on: {format(task.updatedAt, "PPPP")}</div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[["To Do", todoTasks], ["In Progress", inProgressTasks], ["Done", doneTasks]].map(
              ([column, tasks]) => (
                <Card key={column}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {column}
                      <Badge variant="outline">{tasks.length}</Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-3 space-y-3 max-h-[600px] overflow-y-auto">
                    {tasks.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No tasks found
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <Card key={task._id} className="hover:shadow-md transition-shadow">
                          <Link
                            to={`/workspaces/${task.project?.workspace}/projects/${task.project?._id}/tasks/${task._id}`}
                            className="block"
                          >
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {task.description || "No description"}
                            </p>

                            <div className="flex items-center mt-2 gap-2">
                              <Badge
                                variant={
                                  task.priority === "High" ? "destructive" : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                              {task.dueDate && (
                                <span className="text-sm text-muted-foreground">
                                  {format(task.dueDate, "PPPP")}
                                </span>
                              )}
                            </div>
                          </Link>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasks;
