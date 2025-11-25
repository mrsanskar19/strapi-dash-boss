import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    fileName: string;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onClose, fileName }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{fileName}</DialogTitle>
                    <DialogDescription>
                        This is a preview of the file content.
                    </DialogDescription>
                </DialogHeader>
                <div className="my-4">
                    <p>File content goes here...</p>
                </div>
                <DialogFooter>
                    <Button onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ViewModal;