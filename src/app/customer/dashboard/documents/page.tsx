import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";
import { columns } from "../../../../components//customer/documents/columns";
import { DataTable } from "../../../../components/customer/documents/data-table";
import { docSchema } from "../../../../data/doc_data/schema";

export const metadata: Metadata = {
  title: "Docs",
  description: "A document and issue tracker build using Tanstack Table.",
};

// Simulate a database read for docs.
async function getDocs() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/doc_data/docs.json")
  );

  const docs = JSON.parse(data.toString());

  return z.array(docSchema).parse(docs);
}

export default async function DocPage() {
  const docs = await getDocs();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your documents!
            </p>
          </div>
        </div>
        <DataTable data={docs} columns={columns} />
      </div>
    </>
  );
}
