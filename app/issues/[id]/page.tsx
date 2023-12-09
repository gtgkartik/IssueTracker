import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from 'react-markdown';
import NextLink from "next/link";
import { Link } from "@radix-ui/themes";

const Issue = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    notFound();
  }

  return (
    <Grid columns={{initial:'1', md: '2'}} gap="5">
      <Box>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3"my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
    <Markdown>{issue.description}</Markdown>
      </Card>
      </Box>
      <Box>
        <Button className="items-center flex">
          <Pencil2Icon width="17" height="17" />
          <NextLink href={`${issue.id}/edit`}>
         Edit Issue
          </NextLink>
          </Button>
      </Box>

    </Grid>
  );
};

export default Issue;
