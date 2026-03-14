"use client";

import React, { useState } from "react";
import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface KopyalaButonProps {
    text: string;
    label?: string;
    className?: string;
}

export default function KopyalaButon({ text, label = "Kopyala", className = "" }: KopyalaButonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <Button
            onClick={handleCopy}
            variant={copied ? "primary" : "secondary"}
            size="sm"
            className={`transition-all ${copied ? "bg-green-500 hover:bg-green-600 text-white" : "bg-warm hover:bg-warm/80 text-foreground"} ${className}`}
        >
            {copied ? (
                <>
                    <CheckCircle2 className="w-4 h-4 mr-1.5" /> Kopyalandı
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4 mr-1.5" /> {label}
                </>
            )}
        </Button>
    );
}
