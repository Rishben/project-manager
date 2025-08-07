import { workspaceSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import TransferWorkspaceDialog from "../../components/workspace/transfer-workspace";
import {
  useDeleteWorkspace,
  useGetWorkspaceDetailsQuery,
  useGetWorkspaceMembers,
  useTransferWorkspace,
  useUpdateWorkspace,
} from "../../hooks/use-workspace";

export const colorOptions = [
  "#FF5733",
  "#33C1FF",
  "#28A745",
  "#FFC300",
  "#8E44AD",
  "#E67E22",
  "#2ECC71",
  "#34495E",
];

const Settings = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");
  const navigate = useNavigate();

  const { data: workspaceData, isLoading } =
    useGetWorkspaceDetailsQuery(workspaceId, {
      enabled: !!workspaceId,
    });
  const { data: membersData } = useGetWorkspaceMembers(workspaceId,{
    enabled: !!workspaceId
  }) || {};

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      _id: "",
      name: "",
      color: colorOptions[0],
      description: "",
    },
  });

  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutate: updateWorkspace, isPending: isUpdating } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeleting } =
    useDeleteWorkspace();
  const { mutate: transferWorkspace, isPending: isTransferring } =
    useTransferWorkspace();

  useEffect(() => {
    if (workspaceData) {
      form.setValue("name", workspaceData.name);
      form.setValue("color", workspaceData.color);
      form.setValue("description", workspaceData.description);
    }
  }, [workspaceData, form]);

  const onSubmit = (values) => {
    updateWorkspace(
      { ...values, workspaceId },
      {
        onSuccess: () => {
          toast.success("Workspace updated successfully");
          navigate(`/workspaces/${workspaceId}`);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Update failed");
        },
      }
    );
  };

  const handleDeleteWorkspace = () => {
    deleteWorkspace(workspaceId, {
      onSuccess: () => {
        toast.success("Workspace deleted successfully");
        navigate("/workspaces");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Delete failed");
      },
    });
  };

  const handleConfirmTransfer = (newOwnerId) => {
    transferWorkspace(
      { workspaceId, newOwnerId },
      {
        onSuccess: () => {
          toast.success("Ownership transferred successfully");
          navigate("/workspaces");
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Transfer failed");
        },
      }
    );
    setDialogOpen(false);
  };

  if (isLoading) return <div><Loader /></div>;

  if (!workspaceData){
    return (
      <div className="text-center text-muted-foreground mt-10">
        <p>No data available for this workspace.</p>
        <p>Please select a WorkSpace to view Settings</p>
      </div>
    );
  }

  return (
    <div>
      {/* Workspace Form */}
      <section className="max-w-3xl mx-auto mt-10 border border-gray-200 rounded-lg p-6 shadow-md bg-white max-h-[80vh] overflow-y-auto">
        <header className="mb-4">
          <h2 className="text-2xl font-semibold">Workspace Settings</h2>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Workspace Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={3}
                      placeholder="Workspace Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-3 flex-wrap">
                      {colorOptions.map((color) => (
                        <div
                          key={color}
                          onClick={() => field.onChange(color)}
                          className={cn(
                            "w-6 h-6 rounded-full cursor-pointer hover:opacity-80 transition-all duration-300",
                            field.value === color &&
                              "ring-2 ring-offset-2 ring-blue-500"
                          )}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </section>

      {/* Transfer Ownership */}
      <section className="max-w-3xl mx-auto mt-10 border border-gray-200 rounded-lg p-6 shadow-md bg-white max-h-[80vh] overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-900">
          Transfer Workspace
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Transfer ownership of this workspace to another member
        </p>
        <button
          disabled={isTransferring}
          onClick={() => setDialogOpen(true)}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-md cursor-pointer"
        >
          Transfer Workspace
        </button>

        <TransferWorkspaceDialog
          open={isDialogOpen}
          onOpenChange={setDialogOpen}
          members={membersData?.members || []}
          onConfirm={handleConfirmTransfer}
          isTransferring={isTransferring}
        />
      </section>

      {/* Danger Zone */}
      <section className="max-w-3xl mx-auto mt-10 border border-gray-200 rounded-lg p-6 shadow-md bg-white max-h-[80vh] overflow-y-auto">
        <h3 className="text-sm font-medium text-red-700">Danger Zone</h3>
        <p className="text-sm text-gray-500 mt-1">
          Irreversible Action for your Workspace
        </p>
        <button
          disabled={isDeleting}
          onClick={handleDeleteWorkspace}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-300 rounded-md cursor-pointer"
        >
          {isDeleting ? "Deleting..." : "Delete Workspace"}
        </button>
      </section>
    </div>
  );
};

export default Settings;
