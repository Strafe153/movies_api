import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    type: string;

    @Column({
        type: 'bit'
    })
    activeStatus: boolean = true;

    @ManyToMany(() => Movie, movie => movie.genres)
    @JoinTable()
    movies: Movie[];
}