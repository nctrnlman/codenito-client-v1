import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

const ButtonOutline: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = "button",
  isLoading = false,
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full px-4 py-2 font-bold rounded-md border bg-white border-black text-black hover:text-white hover:bg-black transition-all duration-300 ease-in-out ${className}`}
      disabled={isLoading || disabled}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default ButtonOutline;
