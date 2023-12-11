import React from 'react'
import IssueEditor from '../../_components/IssueEditor'
import prisma from "@/prisma/client";
import { notFound } from 'next/navigation';


const Edit = async ({params}: {params: {id: string}}) => {
  const data = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });
  if(!data){
    notFound()
  }
  console.log(data)

  return (
      <>
        <IssueEditor issue={data}/>
      </>
  )
}

export default Edit