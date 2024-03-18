import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  email: string;
  finalEmail: string;
  setFinalEmail: (value: string) => void;
  finalSubject: string;
  setFinalSubject: (value: string) => void;
  companyName: string;
  role: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  email,
  finalEmail,
  setFinalEmail,
  finalSubject,
  setFinalSubject,
  companyName,
  role,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          // Reset progress to 0 if it reaches 95%, to simulate a continuous loading effect
          return prevProgress >= 95 ? 0 : prevProgress + 5;
        });
      }, 1000); // Adjust the timing and increment as necessary

      return () => clearInterval(timer);
    } else {
      setProgress(100);
    }
  }, [isLoading]);

  const getEmailContent = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/emails/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const jsonData = await res.json();

      if (jsonData.success) {
        const emailContent = jsonData.data.message;
        setFinalEmail(
          emailContent + `\n\nBest Regards,\n${session?.user?.name}`
        );
        setFinalSubject(`Application for ${role} at ${companyName}`);
        setIsLoading(false);
      } else {
        toast({
          title: "Something went wrong!",
          description: jsonData.message,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch email content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmailContent();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Sending email to ${email}`}
      description="This is a preview of the email that will be sent."
      isOpen={isOpen}
      onClose={onClose}
    >
      {!isLoading ? (
        <div className="pt-6 flex flex-col items-center justify-end w-full">
          <Input
            className="w-full m-5"
            placeholder="Subject"
            value={finalSubject}
            onChange={(e) => setFinalSubject(e.target.value)}
            required={true}
          />
          <Textarea
            className="w-full"
            placeholder="Write your email here..."
            value={finalEmail}
            rows={10}
            onChange={(e) => setFinalEmail(e.target.value)}
            required={true}
          />
          <Button
            className="m-5"
            disabled={loading}
            variant="secondary"
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      ) : (
        <Progress value={progress} className="w-full" />
      )}
    </Modal>
  );
};
