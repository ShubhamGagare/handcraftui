import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { getRandomBorderRadius } from "./randomBorderRadius";

// Define button styles with sketch-like appearance using inline styles
const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative group",
  {
    variants: {
      variant: {
        default:
          "bg-white text-primary border-2 border-primary  relative",
        outline:
          "bg-transparent text-primary border-2 border-primary rounded-md",
        ghost:
          "bg-transparent text-primary border-none rounded-md",
        destructive:
          "bg-red-200 text-primary border-2 border-red-500 rounded-md",
        secondary:
          "bg-gray-200 text-primary border-2 border-gray-500 rounded-md",
        link:
          "bg-transparent text-blue-500 border-none rounded-md underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"; // Use <span> if using as a child component, otherwise a <button>

    // Inline styles for sketchy border effect
    const sketchStyles: React.CSSProperties = {
      position: "relative",
      border: variant === 'ghost' || variant === 'link' ? 'none' : '2px solid',
    };

    const borderRadiusStyles = variant === 'ghost' || variant === 'link'
      ? {}  // No border-radius for ghost and link variants
      : getRandomBorderRadius();

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ ...sketchStyles, ...borderRadiusStyles }}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
