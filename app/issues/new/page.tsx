"use client";
// redix ui related imports
import { Button, Text, TextField } from "@radix-ui/themes";
import { TextArea, Callout } from "@radix-ui/themes";

//react imports
import React, { useState } from "react";
// simple mardown related imports
import "easymde/dist/easymde.min.css";

//react hook form related imports
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import { useRouter } from "next/navigation";

// importing the global validation schema we have created, this is a common validation schema for both client and server
import { createIssueSchema } from "@/app/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod"; // this resolver will be passed to the web hook form
import { z } from "zod";
import Spinner from "@/components/Spinner";



//this will tell the next js not to render the Simple MDE editor on the server at any cost not even a bit
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'), 
  {ssr:false})

// we are generating this interface from zod, in future we can just manipulate xod object instead of maipulating the interface and zod
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false)

  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => { 
    try {
      setisLoading(true)
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setisLoading(false)
      console.log(error);
      setError(true);
    }
  })
  

  return (
    
    <>
      <div className="max-w-xl">
        {/* This is for handling server side error  */}
        {error && (
          <>
            <Callout.Root color="red" className="mb-5">
              <Callout.Text>Some thing went wrong</Callout.Text>
            </Callout.Root>
          </>
        )}
        <form
          className="max-w-xl space-y-3"
          onSubmit={onSubmit}
        >
          <TextField.Root>
            <TextField.Input placeholder="Title" {...register("title")} />
          </TextField.Root>
          {errors.title && (
            <Text as="p" color="red">
              {"This field is required"}
            </Text>
          )}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />

          {errors.description && (
            <Text as="p" color="red">
              {"This field is required"}
            </Text>
          )}

          <Button disabled={isLoading}>Submit New Issue {isLoading && <Spinner/>}</Button>
        </form>
      </div>
    </>
  );
};

export default NewIssue;
