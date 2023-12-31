import IssueStatusBadge from "@/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Button, Link, Table } from "@radix-ui/themes";
import LinkNext from "next/link";


const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <>
    <div>
        <div className="mb-10">
        <Button >
        <LinkNext href="/issues/new ">Create New Issue</LinkNext>
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
          {issues.map((issue) => 
              <>
                <Table.Row key={issue.id}>
                  <Table.Cell className="max-w-[300px]">
                    <LinkNext href={`/issues/${issue.id}`}  passHref legacyBehavior>
                      <Link>{issue.title}</Link>
                    </LinkNext>
                  </Table.Cell>
                  <Table.Cell >
                    <IssueStatusBadge status={issue.status}/>
                    </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">{issue.createdAt.toDateString()}</Table.Cell>
                </Table.Row>
              </>  
          )}
        </Table.Body>
      </Table.Root>
    </div>

    </>
  );
};

export const dynamic = 'force-dynamic'


export default IssuesPage;
