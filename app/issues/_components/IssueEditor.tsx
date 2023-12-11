"use client";
// redix ui related imports
import { Button, Callout, Text, TextField } from "@radix-ui/themes";

//react imports
import { useState } from "react";
// simple mardown related imports
import "easymde/dist/easymde.min.css";

//react hook form related imports
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
import { useRouter } from "next/navigation";

// importing the global validation schema we have created, this is a common validation schema for both client and server
import { Spinner, createIssueSchema } from "@/components/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//this will tell the next js not to render the Simple MDE editor on the server at any cost not even a bit
import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

// we are generating this interface from zod, in future we can just manipulate xod object instead of maipulating the interface and zod
type IssueForm = z.infer<typeof createIssueSchema>;

const IssueEditor = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

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
      setisLoading(true);
      await axios.patch(`/api/issues/${issue?.id}`, data);
      router.push("/issues");
      router.refresh()
    } catch (error) {
      setisLoading(false);
      console.log(error);
      setError(true);
    }
    // try {
    //   setisLoading(true)
    //   await axios.post("/api/issues", data);
    //   router.push("/issues");
    // } catch (error) {
    //   setisLoading(false)
    //   console.log(error);
    //   setError(true);
    // }
  });

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
        <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
          <TextField.Root>
            <TextField.Input
              defaultValue={issue?.title}
              placeholder="Title"
              {...register("title")}
            />
          </TextField.Root>
          {errors.title && (
            <Text as="p" color="red">
              {"This field is required"}
            </Text>
          )}
          <Controller
           defaultValue={issue?.description ?? ''}
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

          <Button disabled={isLoading}>
            Save Changes{isLoading && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default IssueEditor;
