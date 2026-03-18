/**
 * @kepenk/site-schema — Site Manifest Schema
 * Atomic state pointer: the single source of truth for a site's current state.
 */
import { z } from 'zod';
import type { PageRef } from './page';
export declare const WorkingHoursSchema: z.ZodObject<{
    day: z.ZodEnum<["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]>;
    opens: z.ZodString;
    closes: z.ZodString;
    isClosed: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    opens: string;
    closes: string;
    isClosed: boolean;
}, {
    day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
    opens: string;
    closes: string;
    isClosed?: boolean | undefined;
}>;
export type WorkingHours = z.infer<typeof WorkingHoursSchema>;
export declare const BrandColorsSchema: z.ZodObject<{
    primary: z.ZodString;
    secondary: z.ZodString;
    accent: z.ZodString;
    background: z.ZodString;
    text: z.ZodString;
}, "strip", z.ZodTypeAny, {
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
}, {
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
}>;
export type BrandColors = z.infer<typeof BrandColorsSchema>;
export declare const ContactInfoSchema: z.ZodObject<{
    phone: z.ZodString;
    whatsapp: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    address: z.ZodString;
    coordinates: z.ZodOptional<z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
    }, {
        lat: number;
        lng: number;
    }>>;
    workingHours: z.ZodDefault<z.ZodArray<z.ZodObject<{
        day: z.ZodEnum<["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]>;
        opens: z.ZodString;
        closes: z.ZodString;
        isClosed: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        opens: string;
        closes: string;
        isClosed: boolean;
    }, {
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        opens: string;
        closes: string;
        isClosed?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    phone: string;
    address: string;
    workingHours: {
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        opens: string;
        closes: string;
        isClosed: boolean;
    }[];
    whatsapp?: string | undefined;
    email?: string | undefined;
    coordinates?: {
        lat: number;
        lng: number;
    } | undefined;
}, {
    phone: string;
    address: string;
    whatsapp?: string | undefined;
    email?: string | undefined;
    coordinates?: {
        lat: number;
        lng: number;
    } | undefined;
    workingHours?: {
        day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
        opens: string;
        closes: string;
        isClosed?: boolean | undefined;
    }[] | undefined;
}>;
export type ContactInfo = z.infer<typeof ContactInfoSchema>;
export declare const SiteConfigSchema: z.ZodObject<{
    domain: z.ZodString;
    customDomain: z.ZodOptional<z.ZodString>;
    locale: z.ZodDefault<z.ZodLiteral<"tr-TR">>;
    timezone: z.ZodDefault<z.ZodLiteral<"Europe/Istanbul">>;
    sectorId: z.ZodString;
    businessName: z.ZodString;
    businessSlogan: z.ZodOptional<z.ZodString>;
    brandColors: z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        accent: z.ZodString;
        background: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    }, {
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    }>;
    fonts: z.ZodObject<{
        heading: z.ZodString;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        heading: string;
        body: string;
    }, {
        heading: string;
        body: string;
    }>;
    logo: z.ZodOptional<z.ZodObject<{
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
    favicon: z.ZodOptional<z.ZodObject<{
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
    socialLinks: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    contactInfo: z.ZodObject<{
        phone: z.ZodString;
        whatsapp: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        address: z.ZodString;
        coordinates: z.ZodOptional<z.ZodObject<{
            lat: z.ZodNumber;
            lng: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            lat: number;
            lng: number;
        }, {
            lat: number;
            lng: number;
        }>>;
        workingHours: z.ZodDefault<z.ZodArray<z.ZodObject<{
            day: z.ZodEnum<["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]>;
            opens: z.ZodString;
            closes: z.ZodString;
            isClosed: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed: boolean;
        }, {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed?: boolean | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        address: string;
        workingHours: {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed: boolean;
        }[];
        whatsapp?: string | undefined;
        email?: string | undefined;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
    }, {
        phone: string;
        address: string;
        whatsapp?: string | undefined;
        email?: string | undefined;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        workingHours?: {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed?: boolean | undefined;
        }[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    domain: string;
    locale: "tr-TR";
    timezone: "Europe/Istanbul";
    sectorId: string;
    businessName: string;
    brandColors: {
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    socialLinks: Record<string, string>;
    contactInfo: {
        phone: string;
        address: string;
        workingHours: {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed: boolean;
        }[];
        whatsapp?: string | undefined;
        email?: string | undefined;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
    };
    customDomain?: string | undefined;
    businessSlogan?: string | undefined;
    logo?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    favicon?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
}, {
    domain: string;
    sectorId: string;
    businessName: string;
    brandColors: {
        text: string;
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    fonts: {
        heading: string;
        body: string;
    };
    contactInfo: {
        phone: string;
        address: string;
        whatsapp?: string | undefined;
        email?: string | undefined;
        coordinates?: {
            lat: number;
            lng: number;
        } | undefined;
        workingHours?: {
            day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
            opens: string;
            closes: string;
            isClosed?: boolean | undefined;
        }[] | undefined;
    };
    customDomain?: string | undefined;
    locale?: "tr-TR" | undefined;
    timezone?: "Europe/Istanbul" | undefined;
    businessSlogan?: string | undefined;
    logo?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    favicon?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    socialLinks?: Record<string, string> | undefined;
}>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export declare const SiteSEOSchema: z.ZodObject<{
    titleTemplate: z.ZodDefault<z.ZodString>;
    defaultDescription: z.ZodDefault<z.ZodString>;
    ogImage: z.ZodOptional<z.ZodObject<{
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
    robots: z.ZodDefault<z.ZodString>;
    canonical: z.ZodDefault<z.ZodString>;
    structuredData: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    robots: string;
    canonical: string;
    titleTemplate: string;
    defaultDescription: string;
    structuredData: Record<string, any>;
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
}, {
    ogImage?: {
        url: string;
        alt: string;
        width: number;
        height: number;
        format: "webp" | "jpg" | "png" | "svg";
        blurhash?: string | undefined;
    } | undefined;
    robots?: string | undefined;
    canonical?: string | undefined;
    titleTemplate?: string | undefined;
    defaultDescription?: string | undefined;
    structuredData?: Record<string, any> | undefined;
}>;
export type SiteSEO = z.infer<typeof SiteSEOSchema>;
export declare const RedirectRuleSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<301>, z.ZodLiteral<302>]>;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: 301 | 302;
    from: string;
    to: string;
    createdAt: string;
}, {
    type: 301 | 302;
    from: string;
    to: string;
    createdAt: string;
}>;
export type RedirectRule = z.infer<typeof RedirectRuleSchema>;
export declare const NavItemSchema: z.ZodType<NavItem, z.ZodTypeDef, any>;
export interface NavItem {
    pageId: string;
    label: string;
    children: NavItem[];
    isVisible: boolean;
    openInNewTab: boolean;
    externalUrl?: string;
}
export declare const SiteManifestSchema: z.ZodObject<{
    manifestId: z.ZodString;
    siteId: z.ZodString;
    esnafId: z.ZodString;
    version: z.ZodNumber;
    publishedVersion: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    pages: z.ZodArray<z.ZodObject<{
        pageId: z.ZodString;
        contentHash: z.ZodString;
        slug: z.ZodString;
        title: z.ZodString;
        isHomePage: z.ZodDefault<z.ZodBoolean>;
        isDynamic: z.ZodDefault<z.ZodBoolean>;
        parentPageId: z.ZodOptional<z.ZodString>;
        seoOverrides: z.ZodOptional<z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            ogImage: z.ZodOptional<z.ZodObject<{
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
            robots: z.ZodOptional<z.ZodString>;
            canonical: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        }, {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        title: string;
        slug: string;
        contentHash: string;
        pageId: string;
        isHomePage: boolean;
        isDynamic: boolean;
        parentPageId?: string | undefined;
        seoOverrides?: {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        } | undefined;
    }, {
        title: string;
        slug: string;
        contentHash: string;
        pageId: string;
        isHomePage?: boolean | undefined;
        isDynamic?: boolean | undefined;
        parentPageId?: string | undefined;
        seoOverrides?: {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        } | undefined;
    }>, "many">;
    masterPage: z.ZodString;
    siteConfig: z.ZodObject<{
        domain: z.ZodString;
        customDomain: z.ZodOptional<z.ZodString>;
        locale: z.ZodDefault<z.ZodLiteral<"tr-TR">>;
        timezone: z.ZodDefault<z.ZodLiteral<"Europe/Istanbul">>;
        sectorId: z.ZodString;
        businessName: z.ZodString;
        businessSlogan: z.ZodOptional<z.ZodString>;
        brandColors: z.ZodObject<{
            primary: z.ZodString;
            secondary: z.ZodString;
            accent: z.ZodString;
            background: z.ZodString;
            text: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        }, {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        }>;
        fonts: z.ZodObject<{
            heading: z.ZodString;
            body: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            heading: string;
            body: string;
        }, {
            heading: string;
            body: string;
        }>;
        logo: z.ZodOptional<z.ZodObject<{
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
        favicon: z.ZodOptional<z.ZodObject<{
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
        socialLinks: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        contactInfo: z.ZodObject<{
            phone: z.ZodString;
            whatsapp: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            address: z.ZodString;
            coordinates: z.ZodOptional<z.ZodObject<{
                lat: z.ZodNumber;
                lng: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                lat: number;
                lng: number;
            }, {
                lat: number;
                lng: number;
            }>>;
            workingHours: z.ZodDefault<z.ZodArray<z.ZodObject<{
                day: z.ZodEnum<["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]>;
                opens: z.ZodString;
                closes: z.ZodString;
                isClosed: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed: boolean;
            }, {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            phone: string;
            address: string;
            workingHours: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed: boolean;
            }[];
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        }, {
            phone: string;
            address: string;
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
            workingHours?: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed?: boolean | undefined;
            }[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        domain: string;
        locale: "tr-TR";
        timezone: "Europe/Istanbul";
        sectorId: string;
        businessName: string;
        brandColors: {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        socialLinks: Record<string, string>;
        contactInfo: {
            phone: string;
            address: string;
            workingHours: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed: boolean;
            }[];
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        customDomain?: string | undefined;
        businessSlogan?: string | undefined;
        logo?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        favicon?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
    }, {
        domain: string;
        sectorId: string;
        businessName: string;
        brandColors: {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        contactInfo: {
            phone: string;
            address: string;
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
            workingHours?: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed?: boolean | undefined;
            }[] | undefined;
        };
        customDomain?: string | undefined;
        locale?: "tr-TR" | undefined;
        timezone?: "Europe/Istanbul" | undefined;
        businessSlogan?: string | undefined;
        logo?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        favicon?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        socialLinks?: Record<string, string> | undefined;
    }>;
    seo: z.ZodObject<{
        titleTemplate: z.ZodDefault<z.ZodString>;
        defaultDescription: z.ZodDefault<z.ZodString>;
        ogImage: z.ZodOptional<z.ZodObject<{
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
        robots: z.ZodDefault<z.ZodString>;
        canonical: z.ZodDefault<z.ZodString>;
        structuredData: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        robots: string;
        canonical: string;
        titleTemplate: string;
        defaultDescription: string;
        structuredData: Record<string, any>;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
    }, {
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
        titleTemplate?: string | undefined;
        defaultDescription?: string | undefined;
        structuredData?: Record<string, any> | undefined;
    }>;
    redirects: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        type: z.ZodUnion<[z.ZodLiteral<301>, z.ZodLiteral<302>]>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: 301 | 302;
        from: string;
        to: string;
        createdAt: string;
    }, {
        type: 301 | 302;
        from: string;
        to: string;
        createdAt: string;
    }>, "many">>;
    navigation: z.ZodDefault<z.ZodArray<z.ZodType<NavItem, z.ZodTypeDef, any>, "many">>;
}, "strip", z.ZodTypeAny, {
    siteId: string;
    createdAt: string;
    manifestId: string;
    esnafId: string;
    version: number;
    publishedVersion: number;
    updatedAt: string;
    pages: {
        title: string;
        slug: string;
        contentHash: string;
        pageId: string;
        isHomePage: boolean;
        isDynamic: boolean;
        parentPageId?: string | undefined;
        seoOverrides?: {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        } | undefined;
    }[];
    masterPage: string;
    siteConfig: {
        domain: string;
        locale: "tr-TR";
        timezone: "Europe/Istanbul";
        sectorId: string;
        businessName: string;
        brandColors: {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        socialLinks: Record<string, string>;
        contactInfo: {
            phone: string;
            address: string;
            workingHours: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed: boolean;
            }[];
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
        };
        customDomain?: string | undefined;
        businessSlogan?: string | undefined;
        logo?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        favicon?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
    };
    seo: {
        robots: string;
        canonical: string;
        titleTemplate: string;
        defaultDescription: string;
        structuredData: Record<string, any>;
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
    };
    redirects: {
        type: 301 | 302;
        from: string;
        to: string;
        createdAt: string;
    }[];
    navigation: NavItem[];
}, {
    siteId: string;
    createdAt: string;
    manifestId: string;
    esnafId: string;
    version: number;
    updatedAt: string;
    pages: {
        title: string;
        slug: string;
        contentHash: string;
        pageId: string;
        isHomePage?: boolean | undefined;
        isDynamic?: boolean | undefined;
        parentPageId?: string | undefined;
        seoOverrides?: {
            title?: string | undefined;
            description?: string | undefined;
            ogImage?: {
                url: string;
                alt: string;
                width: number;
                height: number;
                format: "webp" | "jpg" | "png" | "svg";
                blurhash?: string | undefined;
            } | undefined;
            robots?: string | undefined;
            canonical?: string | undefined;
        } | undefined;
    }[];
    masterPage: string;
    siteConfig: {
        domain: string;
        sectorId: string;
        businessName: string;
        brandColors: {
            text: string;
            primary: string;
            secondary: string;
            accent: string;
            background: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        contactInfo: {
            phone: string;
            address: string;
            whatsapp?: string | undefined;
            email?: string | undefined;
            coordinates?: {
                lat: number;
                lng: number;
            } | undefined;
            workingHours?: {
                day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
                opens: string;
                closes: string;
                isClosed?: boolean | undefined;
            }[] | undefined;
        };
        customDomain?: string | undefined;
        locale?: "tr-TR" | undefined;
        timezone?: "Europe/Istanbul" | undefined;
        businessSlogan?: string | undefined;
        logo?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        favicon?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        socialLinks?: Record<string, string> | undefined;
    };
    seo: {
        ogImage?: {
            url: string;
            alt: string;
            width: number;
            height: number;
            format: "webp" | "jpg" | "png" | "svg";
            blurhash?: string | undefined;
        } | undefined;
        robots?: string | undefined;
        canonical?: string | undefined;
        titleTemplate?: string | undefined;
        defaultDescription?: string | undefined;
        structuredData?: Record<string, any> | undefined;
    };
    publishedVersion?: number | undefined;
    redirects?: {
        type: 301 | 302;
        from: string;
        to: string;
        createdAt: string;
    }[] | undefined;
    navigation?: any[] | undefined;
}>;
export interface SiteManifest {
    manifestId: string;
    siteId: string;
    esnafId: string;
    version: number;
    publishedVersion: number;
    createdAt: string;
    updatedAt: string;
    pages: PageRef[];
    masterPage: string;
    siteConfig: SiteConfig;
    seo: SiteSEO;
    redirects: RedirectRule[];
    navigation: NavItem[];
}
//# sourceMappingURL=manifest.d.ts.map