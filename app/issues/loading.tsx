import IssueStatusBadge from "@/components/IssueStatusBadge";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div>
      <div className="mb-10">
        <Button>
          <Link href="/issues/new ">Create New Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => {
            return (
              <>
                <Table.Row>
                  <Table.Cell className="max-w-[300px]">
                    <Skeleton />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <Skeleton />
                  </Table.Cell>
                </Table.Row>
              </>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Loading;
