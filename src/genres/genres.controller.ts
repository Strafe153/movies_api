import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { GenreCreateDto } from "./dto/genre.create.dto";
import { GenreUpdateDto } from "./dto/genre.update.dto";
import { Genre } from "./entities/genre.entity";
import { GenresService } from "./genres.service";

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    async getAll(@Query('pageNumber') pageNumber?: number, @Query('pageSize') pageSize?: number): Promise<Genre[]> {
        return await this.genresService.getAll(pageNumber, pageSize);
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Genre> {
        return await this.genresService.getById(id);
    }

    @Post()
    async create(@Body(ValidationPipe) createDto: GenreCreateDto): Promise<Genre> {
        return await this.genresService.create(createDto);
    }

    @Put(':id')
    @HttpCode(204)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateDto: GenreUpdateDto): Promise<void> {
        return await this.genresService.update(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.genresService.delete(id);
    }
}