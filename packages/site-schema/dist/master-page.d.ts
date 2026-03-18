/**
 * @kepenk/site-schema — Master Page Schema
 * Global elements shared across all pages: header, footer, floating components.
 */
import { z } from 'zod';
import type { ComponentNode } from './component';
export declare const GlobalStylesSchema: z.ZodObject<{
    cssVariables: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    customCSS: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    cssVariables: Record<string, string>;
    customCSS?: string | undefined;
}, {
    customCSS?: string | undefined;
    cssVariables?: Record<string, string> | undefined;
}>;
export type GlobalStyles = z.infer<typeof GlobalStylesSchema>;
export declare const MasterPageDocumentSchema: z.ZodObject<{
    contentHash: z.ZodString;
    siteId: z.ZodString;
    header: z.ZodType<ComponentNode, z.ZodTypeDef, any>;
    footer: z.ZodType<ComponentNode, z.ZodTypeDef, any>;
    globalComponents: z.ZodDefault<z.ZodArray<z.ZodType<ComponentNode, z.ZodTypeDef, any>, "many">>;
    globalStyles: z.ZodObject<{
        cssVariables: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        customCSS: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        cssVariables: Record<string, string>;
        customCSS?: string | undefined;
    }, {
        customCSS?: string | undefined;
        cssVariables?: Record<string, string> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    header: ComponentNode;
    footer: ComponentNode;
    contentHash: string;
    siteId: string;
    globalComponents: ComponentNode[];
    globalStyles: {
        cssVariables: Record<string, string>;
        customCSS?: string | undefined;
    };
}, {
    contentHash: string;
    siteId: string;
    globalStyles: {
        customCSS?: string | undefined;
        cssVariables?: Record<string, string> | undefined;
    };
    header?: any;
    footer?: any;
    globalComponents?: any[] | undefined;
}>;
export interface MasterPageDocument {
    contentHash: string;
    siteId: string;
    header: ComponentNode;
    footer: ComponentNode;
    globalComponents: ComponentNode[];
    globalStyles: GlobalStyles;
}
//# sourceMappingURL=master-page.d.ts.map