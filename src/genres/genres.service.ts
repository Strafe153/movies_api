import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenreCreateDto } from "./dto/genre.create.dto";
import { GenreUpdateDto } from "./dto/genre.update.dto";
import { Genre } from "./entities/genre.entity";

@Injectable()
export class GenresService {
    private readonly defaultPageSize: number = 5;

    constructor(@InjectRepository(Genre) private readonly genresRepository: Repository<Genre>) {}

    async getAll(pageNumber: number = 1, pageSize: number = 5): Promise<Genre[]> {
        return await this.genresRepository.find({
            skip: pageNumber > - 1 ? pageNumber : 1,
            take: pageSize > -1 ? pageSize : this.defaultPageSize,
            where: { activeStatus: true }
        });
    }

    async getById(id: string): Promise<Genre> {
        return await this.genresRepository.findOneBy({
            id: id,
            activeStatus: true
        });
    }

    async create(createDto: GenreCreateDto): Promise<Genre> {
        const genre: Genre = await this.genresRepository.create(createDto);
        return await this.genresRepository.save(genre);
    }

    async update(id: string, updateDto: GenreUpdateDto): Promise<void> {
        const genre: Genre = await this.getById(id);
        const updatedGenre: Genre = Object.assign(genre, updateDto);

        await this.genresRepository.save(updatedGenre);
    }

    async delete(id: string): Promise<void> {
        const genre: Genre = await this.getById(id);
        genre.activeStatus = false;

        await this.genresRepository.save(genre);
    }
}