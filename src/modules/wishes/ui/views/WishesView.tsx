"use client";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Heart, Sparkles, MessageCircle, Cake } from "lucide-react";
import { toast } from "sonner";
import { generatedAvatarUrl } from "@/lib/avatar";
import LoadingState from "@/components/LoadingState";

interface Props {
  userId: string;
}

const WishesView = ({ userId }: Props) => {
  const trpc = useTRPC();
  const [message, setMessage] = useState("");

  // Get birthday user data
  const { data: birthdayUser, isLoading: userLoading } = useQuery(
    trpc.user.getUserFromId.queryOptions({ id: userId })
  );

  // Get current session
  const session = authClient.useSession();
  const currentUser = session.data?.user;

  // Get wishes for the birthday user
  const { data: wishes, refetch: refetchWishes } = useQuery(
    trpc.wishes.getWishesForUser.queryOptions({ toUserId: userId })
  );

  // Mutation to add a wish
  const addWishMutation = useMutation(
    trpc.wishes.addWish.mutationOptions({
      onSuccess: () => {
        toast.success("🎉 Wish sent successfully!");
        setMessage("");
        refetchWishes();
      },
      onError: () => {
        toast.error("Failed to send wish");
      },
    })
  );

  const handleSendWish = () => {
    if (!message.trim()) return toast.error("Please enter a wish message");
    if (!currentUser) return toast.error("Please log in to send wishes");

    addWishMutation.mutate({
      toUserId: userId,
      message: message.trim(),
    });
  };

  if (userLoading) {
    return (
      <LoadingState
        title="Loading wishes"
        description="Please wait it may take a few seconds"
      />
    );
  }

  if (!birthdayUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <Card className="text-center p-6 max-w-sm w-full">
          <CardContent>
            <Cake className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-foreground mb-1">
              User Not Found
            </h2>
            <p className="text-muted-foreground text-sm">
              The birthday user could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCurrentUserBirthdayBoy = currentUser?.id === userId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-6 px-3">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/10">
          <CardContent className="p-4 md:p-6 text-center">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 md:w-20 md:h-20 border-2 border-primary/15">
                  <AvatarImage
                    src={
                      birthdayUser.image ||
                      generatedAvatarUrl({
                        seed: birthdayUser.name,
                        variant: "initials",
                      })
                    }
                  />
                  <AvatarFallback className="text-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                    {birthdayUser.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center">
                  <Cake className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Today&apos;s Birthday Star
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1 truncate">
                  Happy Birthday, {birthdayUser.name}! 🎉
                </h1>
                <p className="text-muted-foreground text-sm">
                  Wishing you a fantastic day filled with joy and success!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishes + Send Wish */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Wishes list */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">
                Birthday Wishes{" "}
                <span className="text-sm text-muted-foreground">
                  ({wishes?.length || 0})
                </span>
              </h2>
            </div>

            {!wishes || wishes.length === 0 ? (
              <Card className="text-center p-4">
                <CardContent>
                  <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="text-base font-medium text-foreground mb-1">
                    No Wishes Yet
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Be the first to wish {birthdayUser.name} a happy birthday!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {wishes.map((wish) => (
                  <Card
                    key={wish.id}
                    className="border-border hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="px-3 py-2">
                      <div className="flex gap-3">
                        <Avatar className="w-9 h-9 flex-shrink-0">
                          <AvatarImage
                            src={
                              wish.fromUser?.image ||
                              generatedAvatarUrl({
                                seed: wish.fromUser?.name ?? "Anon",
                                variant: "initials",
                              })
                            }
                          />
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {wish.fromUser?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm text-foreground truncate">
                              {wish.fromUser?.name || "Anonymous"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap break-words leading-tight">
                            {wish.message}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Send wish */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-6 border-border">
              <CardContent className="p-3 space-y-2">
                {!currentUser ? (
                  <div className="text-center space-y-2">
                    <Heart className="h-6 w-6 text-muted-foreground mx-auto" />
                    <h3 className="text-sm font-medium text-foreground">
                      Join Celebration
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Sign in to send wishes
                    </p>
                    <Button size="sm" className="w-full text-xs h-7">
                      Sign In
                    </Button>
                  </div>
                ) : isCurrentUserBirthdayBoy ? (
                  <div className="text-center space-y-2">
                    <Sparkles className="h-6 w-6 text-primary mx-auto" />
                    <h3 className="text-sm font-medium text-foreground">
                      It&apos;s Your Day!
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Enjoy your wishes!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5 text-primary" />
                      Send Wish
                    </h3>

                    <Textarea
                      placeholder={`Message for ${birthdayUser.name}...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[70px] text-sm resize-none"
                      maxLength={500}
                    />

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {message.length}/500
                      </span>
                      <Button
                        onClick={handleSendWish}
                        disabled={
                          addWishMutation.isPending || !message.trim()
                        }
                        size="sm"
                        className="h-6 text-xs px-2 gap-1 bg-gradient-to-r from-primary to-primary/80"
                      >
                        {addWishMutation.isPending ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-2 border-background border-t-transparent" />
                        ) : (
                          <Send className="h-3 w-3" />
                        )}
                        Send
                      </Button>
                    </div>

                    <p className="text-[10px] text-muted-foreground leading-tight">
                      Visible to everyone on the platform
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishesView;
