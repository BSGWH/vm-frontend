import React, { useState } from 'react';
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
  import {EditPage} from "./editPage"


export function EditDocument() {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);

    const handleEditClick = () => {
        setEditDialogOpen(true);
    };

    return (
        <>
    <DropdownMenuItem onClick={handleEditClick}>
        <span>Edit</span> 
    </DropdownMenuItem>
    <EditPage isOpen={isEditDialogOpen} onClose={() => setEditDialogOpen(false)} />
    </>
    );

}
