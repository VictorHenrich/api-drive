import { BaseEntity } from "typeorm";
import BaseRepository from "./BaseRepository";


type ColumnsDefault = "id" | "id_uuid";


export default abstract class FindRepository<R extends BaseEntity, T extends string = ColumnsDefault> extends BaseRepository{
    abstract find(column: T, value: any): Promise<R | R[]>;
}