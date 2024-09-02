import * as React from "react"

import { cn } from "@/lib/utils"
import { getRandomBorderRadius } from "./randomBorderRadius";

export interface InputProps
extends React.InputHTMLAttributes<HTMLInputElement> { }
const borderRadiusStyles = getRandomBorderRadius();

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border flex h-10 w-full rounded-md custom-border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={borderRadiusStyles}

        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }