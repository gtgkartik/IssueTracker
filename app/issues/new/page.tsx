"use client";
import { Button, TextField } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes"
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller, } from "react-hook-form"
import axios from 'axios';
import { useRouter } from 'next/navigation'

type IssueForm = {
    title: string
    description: string
  }

const NewIssue = () => {
  const router = useRouter();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IssueForm>()
  return (
    <>
      <form 
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
       await axios.post('/api/issues' , data);
       router.push('/issues')
      })}
      
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title", { required: true })} />
        </TextField.Root>
        {errors.title && <span className="text-red-600">This field is required</span>}

        <Controller
        name="description"
        control={control}
        render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        
        {errors.description && <span>This field is required</span>}
        <Button >Submit New Issue</Button>
        </form>
    </>
  );
};

export default NewIssue;
