import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import React from "react";

type FormWrapperProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  onClose?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export function FormWrapper({ children, trigger, title, description, onClose, size = 'md' }: FormWrapperProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn({
        'sm:max-w-[425px]': size === 'sm',
        'sm:max-w-md': size === 'md',
        'sm:max-w-lg': size === 'lg',
        'sm:max-w-xl': size === 'xl',
      })}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
