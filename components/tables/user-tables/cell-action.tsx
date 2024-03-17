"use client";
import { AlertModal } from "@/components/modal/alert-modal";
import { EmailModal } from "@/components/modal/email-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/constants/data";
import { Edit, Linkedin, Mail, MoreHorizontal, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Row } from "@tanstack/react-table";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailModalLoading, setEmailModalLoading] = useState(false);
  const { toast } = useToast();
  const [finalEmail, setFinalEmail] = useState("");

  const onConfirm = async () => {};

  const onSendEmail = async () => {
    try {
      const res = await fetch("/api/emails/recruiter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          content: finalEmail,
        }),
      });

      const jsonData = await res.json();

      if (jsonData.success) {
        toast({
          title: "Email sent successfully",
          description: "The email has been sent successfully",
        });
        setEmailModalOpen(false);
      } else {
        toast({
          title: "Something went wrong!",
          description: jsonData.message,
        });
      }
      setFinalEmail("");
    } catch (e: any) {
      // console.log(e);
      toast({
        title: "Something went wrong!",
        description: e.message,
      });
      setFinalEmail("");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onConfirm={onSendEmail}
        loading={emailModalLoading}
        email={data.email}
        finalEmail={finalEmail}
        setFinalEmail={setFinalEmail}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEmailModalOpen(true)}>
            <Mail className="mr-2 h-4 w-4" /> Send Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Linkedin className="mr-2 h-4 w-4" /> Send LinkedIn Message
          </DropdownMenuItem>
          {/* <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
