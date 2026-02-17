import { Controller, Get, Post, Body, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { SitesService } from './sites.service';
import { Site } from '@prisma/client';
import { CreateSiteDto } from './dto/create-site.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageContentDto } from './dto/update-page-content.dto';

@Controller('sites')
export class SitesController {
    constructor(private readonly sitesService: SitesService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createSite(@Body() body: CreateSiteDto): Promise<Site> {
        return this.sitesService.createSite(body);
    }

    @Get(':userId')
    async getSites(@Param('userId') userId: string): Promise<Site[]> {
        return this.sitesService.getSites(userId);
    }

    @Post(':siteId/pages')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createPage(@Param('siteId') siteId: string, @Body() body: CreatePageDto) {
        return this.sitesService.createPage(siteId, body.title, body.content);
    }

    @Get(':siteId/pages')
    async getPages(@Param('siteId') siteId: string) {
        return this.sitesService.getPages(siteId);
    }

    @Put('pages/:pageId')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async savePage(@Param('pageId') pageId: string, @Body() body: UpdatePageContentDto) {
        return this.sitesService.savePageContent(pageId, body.content);
    }
}
