"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { userSchema } from "@/ValidationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
    user?: User;
}


const UserForm = ({user}: Props) => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      setSubmitting(true);
      setError("");
      
      if(user){
        await axios.patch("/api/users/" + user.id, values);
      }else{
        await axios.post("/api/users", values);
      }

      setSubmitting(false);
      router.push("/tickets");
      router.refresh();

    } catch (error) {

      setError("Unknown error occued");
      setSubmitting(false);

    }
  }

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name..." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          />

           <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Username..." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          />

         <FormField
            control={form.control}
            name="password"
            defaultValue={""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passsword</FormLabel>
                <FormControl>
                  <Input type={"password"} required={user? false : true} placeholder="Enter Password..." {...field}></Input>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role..." defaultValue={user?.role}></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
           
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
      <p className="text-destructive">{error}</p>
    </div>
  );
};

export default UserForm;
