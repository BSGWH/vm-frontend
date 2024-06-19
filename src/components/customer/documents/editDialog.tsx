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

export function EditDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your document!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              className="col-span-3"
            />
          </div>


          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Registration</DropdownMenuItem>
        <DropdownMenuItem>Inspection Report</DropdownMenuItem>
        <DropdownMenuItem>Maintenance Records</DropdownMenuItem>
        <DropdownMenuItem>Proof Of Insurance</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="vehicle" className="text-right">
              Vehicle
            </Label>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="outline">Select</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Vehicle 1</DropdownMenuItem>
        <DropdownMenuItem>Vehicle 2</DropdownMenuItem>
        <DropdownMenuItem>Vehicle 3</DropdownMenuItem>
        <DropdownMenuItem>Vehicle 4</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
