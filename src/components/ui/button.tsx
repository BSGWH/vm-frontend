import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2FA16D] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        customerDefault: "bg-primaryCustomer text-white hover:bg-primaryCustomer-hover",
        customerOutline:
          "border border-primaryCustomer text-primaryCustomer-foreground hover:bg-primaryCustomer-hover/10",
        providerDefault: "bg-primaryProvider text-white hover:bg-primaryProvider-hover",
        providerOutline:
          "border border-primaryProvider text-primaryProvider-foreground hover:bg-primaryProvider-hover/10",
        destructive:
          "bg-[#dc3545] text-white hover:bg-[#c82333]",
        // outline: "border border-[#2FA16D] text-black hover:bg-[#2FA16D]/10",
        secondary:
          "bg-[#2FA16D]/20 text-black hover:bg-[#2FA16D]/30",
        ghost: "text-black hover:bg-[#2FA16D]/10",
        link: "text-primaryCustomer-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "customerDefault",
      size: "default",
    },
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
