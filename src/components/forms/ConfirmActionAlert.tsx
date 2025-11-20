
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ConfirmActionAlertProps {
  children: React.ReactNode;
  onConfirm: () => void;
  title: string;
  description: string;
  actionText: string;
  confirmationPhrase: string;
}

export function ConfirmActionAlert({
  children,
  onConfirm,
  title,
  description,
  actionText,
  confirmationPhrase,
}: ConfirmActionAlertProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const isConfirmationPhraseMatching = inputValue === confirmationPhrase;

  const handleConfirm = () => {
    if (isConfirmationPhraseMatching) {
      onConfirm();
      setInputValue("");
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setInputValue("");
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4 space-y-4">
          
          <div>
            <Label htmlFor="confirmation-input">
              To confirm this action, please type "<strong>{confirmationPhrase}</strong>" below.
            </Label>
            <Input
              id="confirmation-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPaste={handlePaste}
              autoComplete="off"
              className="mt-2"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmationPhraseMatching}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
