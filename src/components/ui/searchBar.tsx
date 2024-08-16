import { Input } from "@/components/ui/input"
import React from "react"

// Define the props for the component
interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for the icon component
}

// Reusable SearchInput component
export default function SearchInput({
  placeholder = "Chercher ...",
  value,
  onChange,
  className = "",
  icon: Icon = SearchIcon, // Default to SearchIcon, but can be customized
  ...props
}: SearchInputProps) {
  return (
    <div
      className={`flex items-center w-full max-w-sm space-x-2 rounded-lg border border-green-300 bg-gray-50 dark:bg-gray-900 px-3.5 py-2 ${className}`}
      {...props}
    >
      <Icon className="h-4 w-4" />
      <Input
        type="search"
        
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border-0 h-8 font-semibold"
      />
    </div>
  )
}

// Default SearchIcon component
function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
