"use client";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Heart, Sparkles, MessageCircle, Cake } from "lucide-react";
import { toast } from "sonner";
import { generatedAvatarUrl } from "@/lib/avatar";

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
  console.log("birthday user", birthdayUser);
  console.log("current user , ", currentUser);
  console.log("wishes", wishes);

  // Mutation to add a wish
  const addWishMutation = useMutation(
    trpc.wishes.addWish.mutationOptions({
      onSuccess: () => {
        toast.success("🎉 Wish sent successfully!");
        setMessage("");
        refetchWishes();
      },
      onError: (error) => {
        toast.error("Failed to send wish");
        console.error("Error adding wish:", error);
      },
    })
  );

  const handleSendWish = () => {
    if (!message.trim()) {
      toast.error("Please enter a wish message");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to send wishes");
      return;
    }

    addWishMutation.mutate({
      toUserId: userId,
      message: message.trim(),
    });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!birthdayUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <Cake className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              User Not Found
            </h2>
            <p className="text-muted-foreground">
              The birthday user could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isCurrentUserBirthdayBoy = currentUser?.id === userId;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Birthday User Header */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 mb-8">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-primary/20">
                  <AvatarImage
                    src={
                      birthdayUser.image ||
                      generatedAvatarUrl({
                        seed: birthdayUser.name,
                        variant: "initials",
                      })
                    }
                  />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
                    {birthdayUser.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
                  <Cake className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                  <Sparkles className="w-4 h-4" />
                  Today&apos;s Birthday Star
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Happy Birthday, {birthdayUser.name}! 🎉
                </h1>
                <p className="text-muted-foreground text-lg">
                  Wishing you a fantastic day filled with joy and success!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wishes List - Takes 2/3 on large screens */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Birthday Wishes ({wishes?.length || 0})
              </h2>
            </div>

            {!wishes || wishes.length === 0 ? (
              <Card className="text-center p-8">
                <CardContent>
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No Wishes Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Be the first to wish {birthdayUser.name} a happy birthday!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {wishes.map((wish) => (
                  <Card
                    key={wish.id}
                    className="border-border hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12 flex-shrink-0">
                          <AvatarImage
                            src={
                              wish.fromUser?.image ||
                              generatedAvatarUrl({
                                seed: wish.fromUser.name,
                                variant: "initials",
                              })
                            }
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {wish.fromUser?.name?.charAt(0).toUpperCase() ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-foreground truncate">
                              {wish.fromUser?.name || "Anonymous"}
                            </span>
                          </div>
                          <p className="text-foreground whitespace-pre-wrap break-words">
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

          {/* Send Wish Section - Takes 1/3 on large screens */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-border">
              <CardContent className="p-6">
                {!currentUser ? (
                  <div className="text-center">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Join the Celebration
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Sign in to send your birthday wishes
                    </p>
                    <Button className="w-full">Sign In</Button>
                  </div>
                ) : isCurrentUserBirthdayBoy ? (
                  <div className="text-center">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      It&apos;s Your Day!
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Enjoy reading all the wonderful wishes from your friends!
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      Send Your Wish
                    </h3>
                    <Textarea
                      placeholder={`Write a special message for ${birthdayUser.name}...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-[120px] mb-4 resize-none bg-input border-border"
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs text-muted-foreground">
                        {message.length}/500 characters
                      </span>
                      <Button
                        onClick={handleSendWish}
                        disabled={addWishMutation.isPending || !message.trim()}
                        className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/80"
                      >
                        {addWishMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Wish
                          </>
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your wish will be visible to everyone on the platform.
                    </p>
                  </>
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
