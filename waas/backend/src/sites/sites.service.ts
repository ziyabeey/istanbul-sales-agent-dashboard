import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Site } from '@prisma/client';

@Injectable()
export class SitesService {
    constructor(private prisma: PrismaService) { }

    async createSite(data: any): Promise<Site> {
        const site = await this.prisma.site.create({ data });
        // Create default page
        // Use Prisma to create the initial page
        await this.prisma.page.create({
            data: {
                siteId: site.id,
                title: 'Home',
                slug: '/',
                content: { ROOT: { type: 'div', isCanvas: true, props: {}, displayName: 'Document', custom: {}, hidden: false, nodes: [], linkedNodes: {} } },
            }
        });
        return site;
    }

    async getSites(userId: string): Promise<Site[]> {
        return this.prisma.site.findMany({ where: { userId } });
    }

    async getSite(id: string): Promise<Site | null> {
        return this.prisma.site.findUnique({ where: { id } });
    }

    async createPage(siteId: string, title: string, content: any) {
        return this.prisma.page.create({
            data: {
                siteId,
                title,
                slug: title.toLowerCase().replace(/ /g, '-'),
                content: content || {}
            }
        });
    }

    async getPages(siteId: string) {
        return this.prisma.page.findMany({ where: { siteId } });
    }

    async savePageContent(pageId: string, content: any) {
        return this.prisma.page.update({
            where: { id: pageId },
            data: { content }
        });
    }
}
