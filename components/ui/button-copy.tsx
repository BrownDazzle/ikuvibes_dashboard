"use client"

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const CourseButton = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  const router = useRouter()

  const handleClick = () => {

  }
  return (
    <button
      type={type}
      className={cn(
        `
        w-auto 
        rounded-full 
        bg-red-500
        border
        border-transparent
        px-2 
        py-1.5 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-white
        font-semibold
        hover:opacity-75
        transition
      `,
        disabled && 'opacity-75 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

CourseButton.displayName = "Button";

export default CourseButton;
