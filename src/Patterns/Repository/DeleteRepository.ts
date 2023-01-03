import BaseRepository from "./BaseRepository";


export default abstract class DeleteRepository<T> extends BaseRepository{
    abstract delete(param: T): Promise<void>;
}