/**
 * @kepenk/site-schema — Component Node Schema
 * Recursive component tree node: the core building block of every page.
 */
import { z } from 'zod';
import { ComponentType } from './component-types';
export declare const SizeValueSchema: z.ZodObject<{
    value: z.ZodNumber;
    unit: z.ZodEnum<["px", "%", "vw", "vh", "rem", "fr", "auto", "min-content", "max-content"]>;
}, "strip", z.ZodTypeAny, {
    value: number;
    unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
}, {
    value: number;
    unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
}>;
export type SizeValue = z.infer<typeof SizeValueSchema>;
export declare const SpacingSchema: z.ZodObject<{
    top: z.ZodString;
    right: z.ZodString;
    bottom: z.ZodString;
    left: z.ZodString;
}, "strip", z.ZodTypeAny, {
    top: string;
    right: string;
    bottom: string;
    left: string;
}, {
    top: string;
    right: string;
    bottom: string;
    left: string;
}>;
export type Spacing = z.infer<typeof SpacingSchema>;
export declare const MediaRefSchema: z.ZodObject<{
    url: z.ZodString;
    alt: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
    format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
    blurhash: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    url: string;
    alt: string;
    width: number;
    height: number;
    format: "webp" | "jpg" | "png" | "svg";
    blurhash?: string | undefined;
}, {
    url: string;
    alt: string;
    width: number;
    height: number;
    format: "webp" | "jpg" | "png" | "svg";
    blurhash?: string | undefined;
}>;
export type MediaRef = z.infer<typeof MediaRefSchema>;
export declare const BorderDefSchema: z.ZodObject<{
    width: z.ZodString;
    style: z.ZodEnum<["solid", "dashed", "dotted", "none"]>;
    color: z.ZodString;
}, "strip", z.ZodTypeAny, {
    width: string;
    style: "solid" | "dashed" | "dotted" | "none";
    color: string;
}, {
    width: string;
    style: "solid" | "dashed" | "dotted" | "none";
    color: string;
}>;
export type BorderDef = z.infer<typeof BorderDefSchema>;
export declare const AnimationDefSchema: z.ZodObject<{
    type: z.ZodEnum<["fade-in", "fade-out", "slide-up", "slide-down", "slide-left", "slide-right", "scale-in", "scale-out", "bounce", "rotate", "none"]>;
    duration: z.ZodOptional<z.ZodNumber>;
    delay: z.ZodOptional<z.ZodNumber>;
    easing: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
    duration?: number | undefined;
    delay?: number | undefined;
    easing?: string | undefined;
}, {
    type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
    duration?: number | undefined;
    delay?: number | undefined;
    easing?: string | undefined;
}>;
export type AnimationDef = z.infer<typeof AnimationDefSchema>;
export declare const InteractionDefSchema: z.ZodObject<{
    type: z.ZodEnum<["navigate", "scroll-to", "open-url", "open-popup", "whatsapp", "phone"]>;
    target: z.ZodString;
    openInNewTab: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
    target: string;
    openInNewTab?: boolean | undefined;
}, {
    type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
    target: string;
    openInNewTab?: boolean | undefined;
}>;
export type InteractionDef = z.infer<typeof InteractionDefSchema>;
export declare const LayoutSchema: z.ZodObject<{
    display: z.ZodOptional<z.ZodEnum<["flex", "grid", "block"]>>;
    flexDirection: z.ZodOptional<z.ZodEnum<["row", "column"]>>;
    justifyContent: z.ZodOptional<z.ZodString>;
    alignItems: z.ZodOptional<z.ZodString>;
    gap: z.ZodOptional<z.ZodString>;
    gridTemplateColumns: z.ZodOptional<z.ZodString>;
    gridTemplateRows: z.ZodOptional<z.ZodString>;
    padding: z.ZodOptional<z.ZodObject<{
        top: z.ZodString;
        right: z.ZodString;
        bottom: z.ZodString;
        left: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        top: string;
        right: string;
        bottom: string;
        left: string;
    }, {
        top: string;
        right: string;
        bottom: string;
        left: string;
    }>>;
    margin: z.ZodOptional<z.ZodObject<{
        top: z.ZodString;
        right: z.ZodString;
        bottom: z.ZodString;
        left: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        top: string;
        right: string;
        bottom: string;
        left: string;
    }, {
        top: string;
        right: string;
        bottom: string;
        left: string;
    }>>;
    width: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["px", "%", "vw", "vh", "rem", "fr", "auto", "min-content", "max-content"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }>>;
    height: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["px", "%", "vw", "vh", "rem", "fr", "auto", "min-content", "max-content"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }>>;
    minHeight: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["px", "%", "vw", "vh", "rem", "fr", "auto", "min-content", "max-content"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }>>;
    maxWidth: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["px", "%", "vw", "vh", "rem", "fr", "auto", "min-content", "max-content"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }, {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    }>>;
    overflow: z.ZodOptional<z.ZodEnum<["hidden", "visible", "auto"]>>;
    position: z.ZodOptional<z.ZodEnum<["relative", "sticky"]>>;
    zIndex: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    width?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    height?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    display?: "grid" | "flex" | "block" | undefined;
    flexDirection?: "row" | "column" | undefined;
    justifyContent?: string | undefined;
    alignItems?: string | undefined;
    gap?: string | undefined;
    gridTemplateColumns?: string | undefined;
    gridTemplateRows?: string | undefined;
    padding?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | undefined;
    margin?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | undefined;
    minHeight?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    maxWidth?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    overflow?: "auto" | "hidden" | "visible" | undefined;
    position?: "relative" | "sticky" | undefined;
    zIndex?: number | undefined;
}, {
    width?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    height?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    display?: "grid" | "flex" | "block" | undefined;
    flexDirection?: "row" | "column" | undefined;
    justifyContent?: string | undefined;
    alignItems?: string | undefined;
    gap?: string | undefined;
    gridTemplateColumns?: string | undefined;
    gridTemplateRows?: string | undefined;
    padding?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | undefined;
    margin?: {
        top: string;
        right: string;
        bottom: string;
        left: string;
    } | undefined;
    minHeight?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    maxWidth?: {
        value: number;
        unit: "px" | "%" | "vw" | "vh" | "rem" | "fr" | "auto" | "min-content" | "max-content";
    } | undefined;
    overflow?: "auto" | "hidden" | "visible" | undefined;
    position?: "relative" | "sticky" | undefined;
    zIndex?: number | undefined;
}>;
export type Layout = z.infer<typeof LayoutSchema>;
export declare const StyleSchema: z.ZodObject<{
    backgroundColor: z.ZodOptional<z.ZodString>;
    backgroundImage: z.ZodOptional<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
        format: z.ZodEnum<["webp", "jpg", "png", "svg"]>;
        blurhash: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }, {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    }>>;
    backgroundSize: z.ZodOptional<z.ZodEnum<["cover", "contain", "auto"]>>;
    backgroundPosition: z.ZodOptional<z.ZodString>;
    borderRadius: z.ZodOptional<z.ZodString>;
    border: z.ZodOptional<z.ZodObject<{
        width: z.ZodString;
        style: z.ZodEnum<["solid", "dashed", "dotted", "none"]>;
        color: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        width: string;
        style: "solid" | "dashed" | "dotted" | "none";
        color: string;
    }, {
        width: string;
        style: "solid" | "dashed" | "dotted" | "none";
        color: string;
    }>>;
    boxShadow: z.ZodOptional<z.ZodString>;
    opacity: z.ZodOptional<z.ZodNumber>;
    color: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    color?: string | undefined;
    backgroundColor?: string | undefined;
    backgroundImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    backgroundSize?: "auto" | "cover" | "contain" | undefined;
    backgroundPosition?: string | undefined;
    borderRadius?: string | undefined;
    border?: {
        width: string;
        style: "solid" | "dashed" | "dotted" | "none";
        color: string;
    } | undefined;
    boxShadow?: string | undefined;
    opacity?: number | undefined;
}, {
    color?: string | undefined;
    backgroundColor?: string | undefined;
    backgroundImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    backgroundSize?: "auto" | "cover" | "contain" | undefined;
    backgroundPosition?: string | undefined;
    borderRadius?: string | undefined;
    border?: {
        width: string;
        style: "solid" | "dashed" | "dotted" | "none";
        color: string;
    } | undefined;
    boxShadow?: string | undefined;
    opacity?: number | undefined;
}>;
export type Style = z.infer<typeof StyleSchema>;
export declare const VisibilitySchema: z.ZodObject<{
    desktop: z.ZodBoolean;
    tablet: z.ZodBoolean;
    mobile: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
}, {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
}>;
export type Visibility = z.infer<typeof VisibilitySchema>;
export declare const AiMetaSchema: z.ZodObject<{
    generatedBy: z.ZodEnum<["haiku", "sonnet", "opus"]>;
    prompt: z.ZodOptional<z.ZodString>;
    confidence: z.ZodNumber;
    lastOptimized: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    generatedBy: "haiku" | "sonnet" | "opus";
    confidence: number;
    prompt?: string | undefined;
    lastOptimized?: string | undefined;
}, {
    generatedBy: "haiku" | "sonnet" | "opus";
    confidence: number;
    prompt?: string | undefined;
    lastOptimized?: string | undefined;
}>;
export type AiMeta = z.infer<typeof AiMetaSchema>;
export declare const InteractionsSchema: z.ZodObject<{
    onClick: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["navigate", "scroll-to", "open-url", "open-popup", "whatsapp", "phone"]>;
        target: z.ZodString;
        openInNewTab: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
        target: string;
        openInNewTab?: boolean | undefined;
    }, {
        type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
        target: string;
        openInNewTab?: boolean | undefined;
    }>>;
    onHover: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["fade-in", "fade-out", "slide-up", "slide-down", "slide-left", "slide-right", "scale-in", "scale-out", "bounce", "rotate", "none"]>;
        duration: z.ZodOptional<z.ZodNumber>;
        delay: z.ZodOptional<z.ZodNumber>;
        easing: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }>>;
    onScroll: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["fade-in", "fade-out", "slide-up", "slide-down", "slide-left", "slide-right", "scale-in", "scale-out", "bounce", "rotate", "none"]>;
        duration: z.ZodOptional<z.ZodNumber>;
        delay: z.ZodOptional<z.ZodNumber>;
        easing: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }>>;
    entrance: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<["fade-in", "fade-out", "slide-up", "slide-down", "slide-left", "slide-right", "scale-in", "scale-out", "bounce", "rotate", "none"]>;
        duration: z.ZodOptional<z.ZodNumber>;
        delay: z.ZodOptional<z.ZodNumber>;
        easing: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }, {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    onClick?: {
        type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
        target: string;
        openInNewTab?: boolean | undefined;
    } | undefined;
    onHover?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
    onScroll?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
    entrance?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
}, {
    onClick?: {
        type: "navigate" | "scroll-to" | "open-url" | "open-popup" | "whatsapp" | "phone";
        target: string;
        openInNewTab?: boolean | undefined;
    } | undefined;
    onHover?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
    onScroll?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
    entrance?: {
        type: "none" | "fade-in" | "fade-out" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "scale-in" | "scale-out" | "bounce" | "rotate";
        duration?: number | undefined;
        delay?: number | undefined;
        easing?: string | undefined;
    } | undefined;
}>;
export type Interactions = z.infer<typeof InteractionsSchema>;
export declare const ComponentNodeSchema: z.ZodType<ComponentNode, z.ZodTypeDef, any>;
export interface ComponentNode {
    id: string;
    type: ComponentType;
    layout?: Layout;
    responsive?: {
        tablet?: Layout;
        mobile?: Layout;
    };
    style?: Style;
    data?: Record<string, any>;
    children: ComponentNode[];
    interactions?: Interactions;
    visibility: Visibility;
    aiMeta?: AiMeta;
}
export declare const DEFAULT_VISIBILITY: Visibility;
export declare const DEFAULT_SPACING: Spacing;
//# sourceMappingURL=component.d.ts.map