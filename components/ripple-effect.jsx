"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const RippleButton = ({ children, className, ...props }) => {
  const handleRippleEffect = (e) => {
    const button = e.currentTarget;

    // Get button's bounding box and calculate click position
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
    ripple.className = "ripple-effect";

    // Append ripple element and remove it after animation
    button.appendChild(ripple);
    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <Button
      className={clsx("ripple-container", className)}
      onClick={(e) => {
        handleRippleEffect(e);
        props.onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default RippleButton;
