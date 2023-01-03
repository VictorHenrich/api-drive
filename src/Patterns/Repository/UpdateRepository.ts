import BaseRepository from "./BaseRepository";


export default abstract class UpdateRepository<T> extends BaseRepository{
    abstract update(param: T): Promise<void>;
}