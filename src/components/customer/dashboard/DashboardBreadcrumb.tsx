import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import React from "react";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
  basePath?: string;
};

export default function DashboardBreadcrumb({
  items,
  basePath = "/dashboard",
}: BreadCrumbPropsType) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href={basePath}>Dashboard</Link>
        </BreadcrumbItem>
        {items?.map((item: BreadCrumbType, index: number) => (
          <React.Fragment key={item.title}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={item.title}>
              {index !== items.length - 1 ? (
                <Link href={item.link}>{item.title}</Link>
              ) : (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
