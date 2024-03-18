"use client";
import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default function page() {
  const { data: session } = useSession();
  if (!session) return null;

  const inputRef = useRef<HTMLInputElement>(null);

  console.log(session);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, {session?.user?.name} 👋
        </h2>
        <h1>Upload your resume here!</h1>
       <div className="flex cursor-pointer">
       <Upload className="mx-2" onClick={()=>{inputRef.current?.click()}}></Upload>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          {/* <Label htmlFor="picture">Picture</Label> */}
          <Input id="resume" type="file" className="cursor-pointer" ref={inputRef} />
        </div>
       </div>
        {/* <CreateProfileOne categories={[]} initialData={null} /> */}
      </div>
    </ScrollArea>
  );
}
