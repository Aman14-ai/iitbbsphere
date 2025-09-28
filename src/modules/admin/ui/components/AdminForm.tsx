"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { addContentSchemaForAdmin } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { toast } from "sonner";
import { TRPCError } from "@trpc/server";

const AdminForm = () => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof addContentSchemaForAdmin>>({
    resolver: zodResolver(addContentSchemaForAdmin),
    defaultValues: {
      proffesorName: "",
      semester: "",
      subjectCode: "",
      subjectName: "",
      folderId: "",
      year: "",
      branch: "",
    },
  });

  const onCancel = () => {
    console.log("cancel");
    form.reset();
    redirect("/");
  };

  const contentTypes = [
    { value: "content", label: "Study Material" },
    { value: "assignment", label: "Assignment" },
    { value: "tutorial", label: "Tutorials" },
    { value: "pyq", label: "Question Paper" },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const Branches = [
    "civil",
    "mechanical",
    "electrical",
    "metallurgical",
    "computer-science",
    "electronics-communication",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear - i).toString()
  );

  const trpc = useTRPC();
  const createContent = useMutation(
    trpc.admin.createContent.mutationOptions({
      onSuccess: () => {
        toast.success("Content added successfully");
        redirect("/");
      },
      onError: (error) => {
        if (error instanceof TRPCError) {
          toast.error(error.message);
          return;
        }
        toast.error("Something went wrong.");
      },
    })
  );

  const onSubmit = async (values: z.infer<typeof addContentSchemaForAdmin>) => {
    alert("Please Make sure folder Id should be correct , It is not reversible")
    setIsPending(true);
    console.log(values);
    try {
      await createContent.mutateAsync(values);
      form.reset();
    } catch (error) {
      console.log("Error while submitting content from admin form", error);
    }
    setIsPending(false);
  };

  return (
    <div className="transform scale-90 sm:scale-95 md:scale-100 origin-top w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-border">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-foreground">
            Add Educational Content
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill out the form below to add new study materials for students
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Professor Name */}
                <FormField
                  name="proffesorName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Professor Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Dr. John Smith"
                          className="bg-input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Year */}
                <FormField
                  name="year"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Academic Year
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Semester */}
                <FormField
                  name="semester"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Semester
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select semester" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {semesters.map((sem) => (
                            <SelectItem key={sem} value={sem}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/*  select branch */}
                <FormField
                  name="branch"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Branch</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-input">
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Branches.map((branch) => (
                            <SelectItem key={branch} value={branch}>
                              {branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Subject Code */}
                <FormField
                  name="subjectCode"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Subject Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., CS101"
                          className="bg-input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* Subject Name */}
                <FormField
                  name="subjectName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Subject Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., write short form (IBS)"
                          className="bg-input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                {/* uploaded by */}
                <FormField
                  name="uploadedBy"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Uploaded By
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="bg-input"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              {/* URL */}
              <FormField
                name="folderId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <div>
                      <FormLabel className="text-foreground">
                        Folder Id
                      </FormLabel>
                      <span className="text-sm text-muted-foreground">
                        Note : First you have to upload the folder in you drive
                        make it public and then on share button add{" "}
                        <b>drive-reader@iitbbsphere.iam.gserviceaccount.com</b>{" "}
                        and paster the folder id{" "}
                      </span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="folder id"
                        className="bg-input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  disabled={isPending}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="min-w-[100px] bg-primary hover:bg-primary/90"
                >
                  {isPending ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    "Add Content"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminForm;
