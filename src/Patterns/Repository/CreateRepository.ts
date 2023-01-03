import BaseRepository from "./BaseRepository";


export default abstract class CreateRepository<T, R = void> extends BaseRepository{
    abstract create(param: T): Promise<R>;
}