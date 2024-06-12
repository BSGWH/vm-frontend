"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from "next/link";


interface DataTableRowActionsProps {
  row: string;
}

export function VehicleAction({ row }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <Link href="1/edit"><DropdownMenuItem className="flex items-center">
				<EditOutlinedIcon className="w-4 h-4 mr-2" />
					<span>Edit details</span>
				</DropdownMenuItem></Link>
        
				<DropdownMenuItem className="flex items-center">
				<DeleteOutlineOutlinedIcon className="w-4 h-4 mr-2" />
					<span>Archive vehicle</span>
				</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
