import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const TransferWorkspaceDialog = ({
  open,
  onOpenChange,
  members = [],
  onConfirm,
  isTransferring,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleTransfer = () => {
    if (selectedUserId) {
      onConfirm(selectedUserId);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Transfer Workspace Ownership
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Select a member to transfer ownership of this workspace. This action
            cannot be undone.
          </p>

          <div className="space-y-3 max-h-60 overflow-y-auto">
            {members.length === 0 && (
              <p className="text-sm text-gray-400 text-center">
                No members found
              </p>
            )}
            {members.map((member) => (
              <div
                key={member._id}
                onClick={() => setSelectedUserId(member._id)}
                className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer ${
                  selectedUserId === member._id
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm uppercase">
                  {member.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <p className="font-medium">
                    {member.name}
                    <span className="ml-2 text-xs text-gray-500 font-normal">
                      ({member.role})
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                {selectedUserId === member._id && (
                  <span className="ml-auto w-3 h-3 rounded-full bg-black" />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Dialog.Close asChild>
              <Button variant="ghost">Cancel</Button>
            </Dialog.Close>
            <Button
              variant="destructive"
              onClick={handleTransfer}
              disabled={!selectedUserId || isTransferring}
            >
              {isTransferring ? "Transferring..." : "Transfer"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TransferWorkspaceDialog;
