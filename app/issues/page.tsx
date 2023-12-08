import React from "react";
import { Button, IconButton, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import Image from "next/image";
import { DotFilledIcon } from "@radix-ui/react-icons";
import IssueStatusBadge from "@/components/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
    <div>
        <div className="mb-10">
        <Button >
        <Link href="/issues/new ">Create New Issue</Link>
      </Button>
        </div>


      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell >Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <>
                <Table.Row>
                  <Table.Cell className="max-w-[300px]">
                    {issue.title}
                  </Table.Cell>
                  <Table.Cell >
                    <IssueStatusBadge status={issue.status}/>
                    </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              </>  
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>

    </>
  );
};

export default IssuesPage;
