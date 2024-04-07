"use client";

import { Checkbox } from "@radix-ui/react-checkbox";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { Button } from "./ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { createTodoAction } from "@/actions/todo.actions";
import { TodoFormValues, todoFormSchema } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";

interface IProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const defaultValues: Partial<TodoFormValues> = {
  title: "",
  body: "",
  completed: false,
};

const TForm = ({ setIsOpen }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TodoFormValues) => {
    setIsLoading(true);
    await createTodoAction({
      title: data.title,
      body: data.body,
      completed: data.completed,
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // form.reset();
    setIsLoading(false);
    setIsOpen(false);
  };
  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Todo name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about your todo"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md ">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Completed</FormLabel>
                  </div>
                </div>
                <FormDescription>
                  Your todo will be Uncompleted by default unless you checked
                  it.
                </FormDescription>
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button>
              <Spinner /> <p className="mx-1">Saving</p>
            </Button>
          ) : (
            <Button type="submit">Save changes</Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default TForm;
