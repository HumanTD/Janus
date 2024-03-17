"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@radix-ui/react-select";

export function RecentSales() {
  const jobList = [
    {
      "name": "Nokia",
      "email": "nokia.apply@nokia.com",
      "href": "google.com",
      "jobTitle": "Embedded Engineering"
    }
  ];

  return (
    <Link href={jobList[0].href}>
      <div className="space-y-8 hover:shadow-lg cursor-pointer">
        {jobList.map(job => {
          const [open, setOpen] = useState(false);

          return (
            <div className="flex flex-row" key={job.email}>
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>{job.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{job.jobTitle}</p>
                <p className="text-sm text-muted-foreground">{job.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Link>
  );
}
