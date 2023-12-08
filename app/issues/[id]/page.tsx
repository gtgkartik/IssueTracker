import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading } from "@radix-ui/themes";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Text } from "@radix-ui/themes";

const Issue = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3"my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
      <p>{issue.description}</p>
      </Card>
    </div>
  );
};

export default Issue;
