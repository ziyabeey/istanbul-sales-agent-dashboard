import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdatePageContentDto {
    @IsNotEmpty()
    @IsObject()
    content: Record<string, any>;
}
