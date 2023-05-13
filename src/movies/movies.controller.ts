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
    ValidationPipe
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dto/create.movie.dto';
import { Movie } from 'src/movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { UpdateMovieDto } from './dto/update.movie.dto';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async getAll(@Query('pageNumber') pageNumber?: number, @Query('pageSize') pageSize?: number
    ): Promise<Movie[]> {
        return await this.moviesService.getAll(pageNumber, pageSize);
    }

    @Get(':id')
    async getById(@Param('id', ParseUUIDPipe) id: string): Promise<Movie> {
        return await this.moviesService.getById(id);
    }

    @Post()
    async create(@Body(ValidationPipe) createDto: CreateMovieDto): Promise<Movie> {
        return await this.moviesService.create(createDto);
    }

    @Put(':id')
    @HttpCode(204)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body(ValidationPipe) updateDto: UpdateMovieDto): Promise<void> {
        return await this.moviesService.update(id, updateDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        return await this.moviesService.delete(id);
    }
}
