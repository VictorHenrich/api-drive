import { BaseEntity } from "typeorm";
import BaseRepository from "./BaseRepository";



export interface IFindOneRepositoryDefault<T = string>{
    column: T,
    value: any,
}

export default abstract class FindRepository<R extends BaseEntity, T = IFindOneRepositoryDefault> extends BaseRepository{
    abstract find(props: T): Promise<R | R[]>;
}