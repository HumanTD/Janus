"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@radix-ui/react-select";
import { Progress } from "./ui/progress";

export function RecentSales({
  jobList,
  setJobList,
  fetchJobs,
}: {
  jobList: any;
  setJobList: any;
  fetchJobs: any;
}) {
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="space-y-8 ">
      {jobList?.map((job: any, index: any) => (
        <Link href={job.link} key={index}>
          <div className="flex flex-row shawdow-lg drop-shadow-lg hover:shadow-lg cursor-pointer p-2 rounded-xl my-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>{job.title.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.name}</p>
            </div>
          </div>
        </Link>
      ))}
      {jobList.length === 0 && <p>Loading...</p>}
    </div>
  );
}
