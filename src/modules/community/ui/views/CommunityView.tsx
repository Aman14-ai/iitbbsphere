"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { branchCodeMap, codeBranchMap } from "../../../../../constants";
import LoadingState from "@/components/LoadingState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TRPCError } from "@trpc/server";
import { useTRPC } from "@/trpc/client";
import { PencilIcon, TrashIcon, Users } from "lucide-react";
import { generatedAvatarUrl } from "@/lib/avatar";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditMessageDialog from "../components/EditMessageDialog";

function getBranchCode(email: string) {
  if (!email) return "";
  const roll = email.split("@")[0];
  return roll.slice(2, 4); // "ce"
}

const CommunityView = () => {
  const trpc = useTRPC();
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  const branch = pathname.split("/")[2] as keyof typeof branchCodeMap;
  const branchCode = branchCodeMap[branch];
  const session = authClient.useSession();
  const userEmail = session.data?.user.email;
  const currentUserBranchCode = getBranchCode(
    userEmail || ""
  ) as keyof typeof codeBranchMap;

  const [openEditMessageDialog, setOpenEditMessageDialog] = useState(false);
  const [rowId , setRowId] = useState("");
  const queryClient = useQueryClient();

  const createMessage = useMutation(
    trpc.community.addMessage.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.community.getCommunityMessage.queryOptions({
            branchCode: branchCode,
          })
        );
        toast.success("Message sent successfully.");
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
        } else toast.error("something went wrong");
        console.log("Error while sending message in the community", error);
      },
    })
  );

  const deleteMessage = useMutation(
    trpc.community.removeMessage.mutationOptions({
      onSuccess: async () => {
        toast.success("Message deleted successfully.");
        await queryClient.invalidateQueries(
          trpc.community.getCommunityMessage.queryOptions({
            branchCode: branchCode,
          })
        );
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
          return;
        }
        toast.error("something went wrong.");
      },
    })
  );

  const { data: allCommunityMessage } = useQuery(
    trpc.community.getCommunityMessage.queryOptions({ branchCode: branchCode })
  );

  // Ref for chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [allCommunityMessage]);

  if (!userEmail)
    return (
      <LoadingState
        title="Loading"
        description="Please wait. It may take a few seconds"
      />
    );

  if (currentUserBranchCode !== branchCode) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="max-w-md mx-auto rounded-lg shadow-md bg-card p-8 text-center">
          <span className="text-destructive font-bold">
            You are not allowed to view this community.
            <br />
          </span>
          <span className="text-foreground">
            This community is for {branch.replace("-", " ")} engineering.
            <br />
            Go to{" "}
            <Link
              href={`/dashboard/${codeBranchMap[currentUserBranchCode]}/community`}
              className="underline text-primary hover:text-primary/70"
            >
              Your community
            </Link>
          </span>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    createMessage.mutate({
      branchCode: branchCode,
      message: message,
    });
    setMessage("");
  };

  // console.log("All Community Message", allCommunityMessage);

  const handleDeleteMessage = async ({
    rowId,
    msgUserId,
  }: {
    rowId: string;
    msgUserId: string;
  }) => {
    if (!msgUserId) return;
    if (msgUserId != session.data?.user.id) {
      toast.error("You are not allowed to delete other's message");
      return;
    }
    console.log("deleting");
    deleteMessage.mutateAsync({ rowId: rowId });
  };

  const handleEditMessage = ({ msgUserId , rowId }: { msgUserId: string , rowId:string }) => {
    if (!msgUserId) return;
    if (msgUserId != session.data?.user.id) {
      toast.error("You are not allowed to edit other's message");
      return;
    }
    console.log("Editing")
    setRowId(rowId);
    setOpenEditMessageDialog(prev => !prev);
  };

  return (
    <>
    <EditMessageDialog open={openEditMessageDialog} onOpenChange={setOpenEditMessageDialog} branchCode={branchCode} rowId={rowId} />
    <div className="flex items-center mt-25 justify-center min-h-screen bg-background/10">
      <div className="w-full max-w-2xl mx-auto bg-card shadow-lg rounded-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-primary">
            {branch.replace("-", " ").toUpperCase()} Community
          </h2>
          <span className="bg-accent px-4 py-1 rounded-full font-mono text-xs text-accent-foreground">
            {branchCode}
          </span>
        </div>

        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar   max-h-[75vh] px-5 py-6 space-y-6 rounded-b-xl bg-gray-50 dark:bg-gray-900 transition-colors duration-300 scrollbar-thin scrollbar-thumb-primary/40 scrollbar-track-background/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
        >
          {allCommunityMessage && allCommunityMessage.length > 0 ? (
            <div className="space-y-6">
              {allCommunityMessage.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  {/* Profile Picture */}

                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center overflow-hidden shadow-sm">
                      <img
                        src={
                          msg.user.image ??
                          generatedAvatarUrl({
                            seed: msg.user.name,
                            variant: "initials",
                          })
                        }
                        alt={msg.user.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    {/* User Info and Time */}
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">
                          {msg.user?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.createdAt || "").toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.createdAt || "").toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger className="flex items-center gap-1">
                                <BreadcrumbEllipsis className="size-4" />
                                <span className="sr-only">Toggle menu</span>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEditMessage({ msgUserId: msg.userId , rowId:msg.id })
                                  }
                                >
                                  {" "}
                                  <PencilIcon className="size-3" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeleteMessage({
                                      rowId: msg.id,
                                      msgUserId: msg.userId,
                                    })
                                  }
                                >
                                  {" "}
                                  <TrashIcon className="size-3" /> Delete
                                  Message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>

                    {/* Message Text */}
                    <div className="bg-white dark:bg-input border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none px-4 py-1.5 shadow-sm">
                      <p className="text-foreground break-words whitespace-pre-wrap text-sm leading-relaxed">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p>Be the first to start a conversation in this community!</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-border bg-card">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-foreground hover:text-primary font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default CommunityView;
