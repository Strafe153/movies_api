import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    Max,
    MaxDate,
    Min,
    MinDate
} from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    title: string;

    @IsDate()
    @MinDate(new Date(1888, 10, 14))
    @MaxDate(new Date())
    @IsOptional()
    yearOfRelease: Date;

    @IsNumber()
    @Min(0)
    @Max(10)
    @IsOptional()
    rating: number;

    @IsArray()
    @IsOptional()
    genreIds: string[];
}