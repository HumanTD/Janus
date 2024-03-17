"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "../ui/input";

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
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
      <div className="pt-6 flex flex-col items-center justify-end w-full">
        <Input
          className="w-full m-5"
          placeholder="Subject"
          value={finalSubject}
          onChange={(e) => {
            setFinalSubject(e.target.value);
          }}
          required={true}
        />
        <Textarea
          className="w-full"
          placeholder="Write your email here..."
          value={finalEmail}
          rows={10}
          onChange={(e) => {
            setFinalEmail(e.target.value);
          }}
          required={true}
        />
        <Button
          className="m-5"
          // disabled={loading}
          variant="secondary"
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
