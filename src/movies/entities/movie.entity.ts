import { 
    Column, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { Genre } from "../../genres/entities/genre.entity";

@Entity()
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 100
    })
    title: string;

    @Column({
        type: 'date',
        nullable: true
    })
    yearOfRelease: Date;

    @Column({
        type: 'float',
        nullable: true
    })
    rating: number;

    @Column({
        type: 'boolean'
    })
    activeStatus: boolean = true;

    @ManyToMany(() => Genre, genre => genre.movies)
    @JoinTable()
    genres: Genre[];
}