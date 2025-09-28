"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  branchCode: "ce" | "ee" | "me" | "cs" | "ec" | "mm";
  rowId: string;
}

const EditMessageDialog = ({
  open,
  onOpenChange,
  branchCode,
  rowId,
}: Props) => {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const editMessage = useMutation(
    trpc.community.editMessage.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.community.getCommunityMessage.queryOptions({
            branchCode: branchCode,
          })
        );
        toast.success("Message updated successfully.");
        onOpenChange(false);
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
          return;
        }
        toast.error("something went wrong");
      },
    })
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message){
      toast.error("Please enter a message");
      return;
    }
    console.log("Updating");
    setPending(true);
    try {
      await editMessage.mutateAsync({
        message: message,
        rowId: rowId,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
      setMessage("");
    }
  };

  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={onOpenChange}
        title="Edit Message"
        description="Please follow message guidelines else you will be banned."
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Label htmlFor="message">Message</Label>
          <Input
            placeholder="update message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            type="text"
          />
          <div className="flex justify-end">
            <Button disabled={pending} type="submit">
              {pending ? (
                <div className="flex items-center gap-3">
                  <span>updating</span>
                  <span>
                    <Loader2 className="animate-spin" />
                  </span>
                </div>
              ) : (
                "update"
              )}
            </Button>
          </div>
        </form>
      </ResponsiveDialog>
    </div>
  );
};

export default EditMessageDialog;
