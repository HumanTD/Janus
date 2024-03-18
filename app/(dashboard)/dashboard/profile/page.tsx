"use client";
import BreadCrumb from "@/components/breadcrumb";
import { CreateProfileOne } from "@/components/forms/user-profile-stepper/create-profile";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "@/components/input/EdgeStoreInput";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CryptoJS from "crypto-js";
import { toast, useToast } from "@/components/ui/use-toast";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }];
export default function page() {
  const { data: session } = useSession();
  if (!session) return null;

  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fieldsPresent, setFieldsPresent] = useState(false);
  useEffect(() => {
    const storedEmail = localStorage.getItem("linkedin-email");
    const storedPassword = localStorage.getItem("linkedin-password");
    const storedUsername = localStorage.getItem("linkedin-username");

    if (!storedEmail || !storedPassword || !storedUsername) {
      setFieldsPresent(false);
      return;
    } else {
      setFieldsPresent(true);
      return;
    }
  }, []);

  console.log(session);

  const storeResumeUrl = async (resumeUrl:string) => {
    if (!resumeUrl) {
      toast({
        title: "Something went wrong!",
        description: "Please upload a file.",
      });
      return;
    }

    const res = await fetch("/api/profile/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resumeUrl: resumeUrl, userEmail: session?.user?.email }),
    });

    if(!res.ok) {
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
      return;
    }

    const data = await res.json();

    if (data.success) {
      toast({
        title: "Resume stored successfully!",
        description: "You can now view it in your profile.",
      });
    } else {
      toast({
        title: "Something went wrong!",
        description: "Please try again.",
      });
    }
  };

  const storeCredentials = async () => {
    if (!username || !password || !email) {
      toast({
        title: "Something went wrong!",
        description: "Please fill all the fields.",
      });
      return;
    }

    const passwordHash = CryptoJS.AES.encrypt(
      password,
      "3bdifjidohyUuCiBD1BQXRRewvV9mP7IkwwVU328947cdiuhiu"
    ).toString();

    const emailHash = CryptoJS.AES.encrypt(
      email,
      "3bdifjidohyUuCiBD1BQXRRewvV9mP7IkwwVU328947cdiuhiu"
    ).toString();

    const usernameHash = CryptoJS.AES.encrypt(
      username,
      "3bdifjidohyUuCiBD1BQXRRewvV9mP7IkwwVU328947cdiuhiu"
    ).toString();

    // store this in the local storage
    localStorage.setItem("linkedin-username", usernameHash);
    localStorage.setItem("linkedin-email", emailHash);
    localStorage.setItem("linkedin-password", passwordHash);

    setFieldsPresent(true);
    toast({
      title: "Data saved successfully!",
      description: "This is not stored in our databases.",
    });
  };

  const resetCredentials = () => {
    localStorage.removeItem("linkedin-username");
    localStorage.removeItem("linkedin-email");
    localStorage.removeItem("linkedin-password");
    setFieldsPresent(false);
    toast({
      title: "Data removed successfully!",
      description: "This was not stored in our databases.",
    });
  };

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
          disabled={processing}
          onClick={async (e) => {
            if (file) {
              setProcessing(true);
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setProgress(progress);
                },
              });
              setUrl(res.url);
              await storeResumeUrl(res.url);
              setProcessing(false);
            }
          }}
        >
          Upload
        </Button>
        {processing && <Progress value={progress} className="w-[20%]" />}
        {/* {url && <a>{url}</a>} */}

        <h1 className="font-bold">Add your linkedIn credentials here!</h1>
        <p>
          <i>We do not store your credentials in our database!</i>
        </p>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">LinkedIn Email</Label>
          <Input
            type="username"
            id="username"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">LinkedIn Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">LinkedIn Username</Label>
          <Input
            type="username"
            id="username"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>

        {fieldsPresent && (
          <p>
            <i>Data saved!</i>
          </p>
        )}
        <div className="flex">
          <Button className="mx-5" onClick={storeCredentials}>
            Save!
          </Button>
          <Button className="mx-5" onClick={resetCredentials}>
            Reset
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
