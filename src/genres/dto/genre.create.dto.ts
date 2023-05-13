import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class GenreCreateDto {
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(50)
    type: string;
}