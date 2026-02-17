import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePageDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsObject()
    content?: Record<string, any>;
}
