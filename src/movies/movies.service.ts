import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/movies/dto/create.movie.dto';
import { Movie } from 'src/movies/entities/movie.entity';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from './dto/update.movie.dto';

@Injectable()
export class MoviesService {
    private readonly defaultPageSize: number = 5;

    constructor(@InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>) {}

    async getAll(pageNumber: number = 1, pageSize: number = 5): Promise<Movie[]> {
        return await this.moviesRepository.find({
            skip: pageNumber > -1 ? pageNumber - 1 : 0,
            take: pageSize > -1 ? pageSize : this.defaultPageSize,
            where: { activeStatus: true }
        });
    }

    async getById(id: string): Promise<Movie> {
        const movie: Movie = await this.moviesRepository.findOneBy({
            id: id,
            activeStatus: true
        });

        if (movie === null) {
            throw new NotFoundException(`Movie with id ${id} does not exist.`);
        }

        return movie;
    }

    async create(createDto: CreateMovieDto): Promise<Movie> {
        const movie: Movie = this.moviesRepository.create(createDto);
        return await this.moviesRepository.save(movie);
    }

    async update(id: string, updateDto: UpdateMovieDto): Promise<void> {
        const movie: Movie = await this.getById(id);
        const updatedMovie: Movie = Object.assign(movie, updateDto);

        await this.moviesRepository.save(updatedMovie);
    }

    async delete(id: string): Promise<void> {
        const movie: Movie = await this.getById(id);
        movie.activeStatus = false;

        await this.moviesRepository.save(movie);
    }
}
