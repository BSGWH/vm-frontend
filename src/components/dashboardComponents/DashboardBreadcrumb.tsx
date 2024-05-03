import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";

type BreadCrumbType = {
  title: string;
  link: string;
};

type BreadCrumbPropsType = {
  items: BreadCrumbType[];
};

export default function DashboardBreadcrumb({ items }: BreadCrumbPropsType) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href={"/dashboard"}>Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items?.map((item: BreadCrumbType, index: number) => (
          <React.Fragment key={item.title}>
            <BreadcrumbSeparator />
            <BreadcrumbItem key={item.title}>
              {index !== items.length - 1 ? (
                <BreadcrumbLink>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbLink>
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