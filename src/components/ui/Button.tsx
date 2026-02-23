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
        const baseStyles = "inline-flex items-center justify-center font-bold rounded-xl transition-colors duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2";

        // Variant styles
        const variants = {
            primary: "bg-secondary-500 text-white hover:bg-secondary-600 shadow-md hover:shadow-lg focus:ring-secondary-500",
            secondary: "bg-primary-900 text-white hover:bg-primary-800 shadow-md hover:shadow-lg focus:ring-primary-900",
            outline: "bg-transparent border-2 border-primary-900 text-primary-900 hover:bg-slate-50 focus:ring-primary-900",
            ghost: "bg-transparent text-primary-900 hover:bg-slate-100 focus:ring-slate-200",
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
