import {
  useAddCommentMutation,
  useGetCommentsByTaskIdQuery,
} from "@/hooks/use-task";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { toast } from "sonner";
import { Loader } from "../Loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const mentionStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    padding: "8px",
    borderRadius: "0.5rem",
    border: "1px solid #d1d5db",
    minHeight: "80px",
  },
  highlighter: {
    overflow: "hidden",
  },
  input: {
    margin: 0,
    padding: 10,
    whiteSpace: "pre-wrap",
  },
  suggestions: {
    list: {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      fontSize: 14,
      borderRadius: "0.375rem",
      zIndex: 9999,
      position: "absolute",
    },
    item: {
      padding: "6px 12px",
      borderBottom: "1px solid #eee",
      "&focused": {
        backgroundColor: "#f3f4f6",
      },
    },
  },
};

// 🧠 Extract mentions from markup
const extractMentions = (text) => {
  const regex = /@\[(.*?)\]\((.*?)\)/g;
  const mentions = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, display, id] = match;
    mentions.push({
      user: id,
      offset: match.index,
      length: fullMatch.length,
    });
  }

  return mentions;
};


const renderCommentText = (text) =>
  text.replace(/@\[(.*?)\]\((.*?)\)/g, (_, display) => `${display}`);

export const CommentSection = ({ taskId, members }) => {
  const [newComment, setNewComment] = useState("");

  const { mutate: addComment, isPending } = useAddCommentMutation();
  const { data: comments = [], isLoading } = useGetCommentsByTaskIdQuery(taskId);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const mentions = extractMentions(newComment);

    addComment(
      {
        taskId,
        text: newComment,
        mentions,
      },
      {
        onSuccess: () => {
          setNewComment("");
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to add comment"
          );
          console.error(error);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-4">Comments</h3>

      <ScrollArea className="h-[300px] mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 py-2">
              <Avatar className="size-8">
                <AvatarImage src={comment.author?.profilePicture} />
                <AvatarFallback>
                  {comment.author?.name?.charAt(0) || "?"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {comment.author?.name || "Unknown"}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                {/* 👇 Renders clean @Name instead of raw markup */}
                <p className="text-sm text-muted-foreground">
                  {renderCommentText(comment.text)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-sm text-muted-foreground">No comment yet</p>
          </div>
        )}
      </ScrollArea>

      <Separator className="my-4" />

      <div className="mt-4 space-y-2">
        <MentionsInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={mentionStyle}
          placeholder={"Add a comment"}
          allowSuggestionsAboveCursor={true}
        >
          <Mention
            trigger="@"
            markup="@[@__display__](__id__)"
            data={members
              ?.filter((m) => m.user && m.user.name)
              .map((m) => ({
                id: m.user._id,
                display: m.user.name,
              }))}
            displayTransform={(id, display) => `@${display}`}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>

        <div className="text-xs text-muted-foreground">
          Use <span className="font-semibold">@</span> to mention someone
        </div>

        <div className="flex justify-end">
          <Button
            disabled={!newComment.trim() || isPending}
            onClick={handleAddComment}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
