import { BaseEntity } from "typeorm";
import BaseRepository from "./BaseRepository";


type ColumnsDefault = "id" | "id_uuid";


export interface FindRepositoryProps<T>{
    column: T,
    value: any
}


export default abstract class FindRepository<R extends BaseEntity, T extends string = ColumnsDefault> extends BaseRepository{
    abstract find(props: FindRepositoryProps<T> | FindRepositoryProps<T>[]): Promise<R | R[]>;
}