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
            primary: "bg-rust text-foreground hover:bg-rust-light shadow-md hover:shadow-lg focus-visible:ring-rust",
            secondary: "bg-background text-foreground hover:bg-background/80 shadow-md hover:shadow-lg focus-visible:ring-ink",
            outline: "bg-transparent border-2 border-ink text-foreground hover:bg-background focus-visible:ring-ink",
            ghost: "bg-transparent text-foreground hover:bg-warm focus-visible:ring-warm focus-visible:bg-warm",
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
