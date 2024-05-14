
  import { Column } from "@tanstack/react-table"
  import { cn } from "@/lib/utils"
  import { Button } from "@/components/ui/button"
  
  interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
  }
  
  export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
  }: DataTableColumnHeaderProps<TData, TValue>) {
  
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
            </Button>
      </div>
    )
  }