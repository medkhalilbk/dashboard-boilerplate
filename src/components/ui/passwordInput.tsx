"use client";

import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; // Adjust import paths as needed
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const disabled = props.disabled || !props.value;

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)} // Simplified for clarity
          ref={ref}
          {...props}
        /> 
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
