"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils"; // We'll create this utility

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 
     * Determines the visual style of the button.
     * @default "primary"
     */
    variant?: "primary" | "secondary" | "ghost" | "outline";

    /**
     * Determines the size (padding and font text) of the button.
     * @default "md"
     */
    size?: "sm" | "md" | "lg";

    /** The content inside the button. */
    children: React.ReactNode;

    /** Additional CSS classes to apply. */
    className?: string;
}

/**
 * A highly reusable, Framer Motion enhanced Button component.
 * Follows DRY principles by extending native HTML button attributes and supporting variants.
 * 
 * @param props - The component props including variant, size, and standard HTML button attributes.
 * @param ref - React forwardRef applied to the underlying motion.button element.
 * @returns A fully styled Button element with micro-animations on hover and tap.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", size = "md", children, className, ...props }, ref) => {

        // Base styles
        const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-colors duration-300 transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

        // Variant styles
        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-indigo-light shadow-md hover:shadow-lg focus-visible:ring-primary",
            secondary: "bg-secondary text-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg focus-visible:ring-foreground",
            outline: "bg-transparent border-2 border-foreground text-foreground hover:bg-secondary focus-visible:ring-foreground",
            ghost: "bg-transparent text-foreground hover:bg-muted focus-visible:ring-muted focus-visible:bg-muted",
        };

        // Size styles
        const sizes = {
            sm: "px-4 py-2 text-sm",
            md: "px-6 py-3 text-base",
            lg: "px-8 py-4 text-lg",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props as any}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";
