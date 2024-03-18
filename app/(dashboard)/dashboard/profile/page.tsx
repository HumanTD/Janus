"use client";
import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/input/EdgeStoreInput";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default function page() {
  const { data: session } = useSession();
  if (!session) return null;

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>();

  console.log(session);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <h2 className="text-3xl font-bold tracking-tight">
          Hi, {session?.user?.name} 👋
        </h2>
        <h1>Upload your resume here!</h1>
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
        />
        <Button
          type="submit"
          onClick={async (e) => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });
              setUrl(res.url);
            }
          }}
        >
          Upload
        </Button>
        <Progress value={progress} className="w-[20%]" />
        {url && <a>{url}</a>}
        {/* <CreateProfileOne categories={[]} initialData={null} /> */}
      </div>
    </ScrollArea>
  );
}
