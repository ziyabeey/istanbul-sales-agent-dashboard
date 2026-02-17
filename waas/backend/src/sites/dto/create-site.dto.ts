import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateSiteDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    @Matches(/^[a-z0-9-]+$/, { message: 'Subdomain must contain only lowercase letters, numbers, and hyphens' })
    subdomain: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}
