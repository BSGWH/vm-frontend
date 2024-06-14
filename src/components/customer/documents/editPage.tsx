
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {EditDocument} from "./editDocument"

interface EditPageProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EditPage({ isOpen, onClose }: EditPageProps): JSX.Element | null  {
    const [documentTitle, setDocumentTitle] = useState("");
    const [documentType, setDocumentType] = useState("");

  const documentTypes = [
    "Registration",
    "Inspection Report",
    "Maintenance Records",
    "Proof Of Insurance",
  ];
  if (!isOpen) return null;
  return (
    <Dialog>
    <DialogTrigger asChild>Edit</DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your document here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
              Title
          </Label>
          <Input
            id="title"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
         
              <Label htmlFor="title" className="text-right">
                  Type
              </Label>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
          <Button variant="outline">{documentType || "Please select"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
          {documentTypes.map((type) => (
                    <DropdownMenuItem key={type} onClick={() => setDocumentType(type)}>
                      {type}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
              </DropdownMenu>  
      
        </div>
      </div>
      
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
    
  </Dialog>
    
  )
}

