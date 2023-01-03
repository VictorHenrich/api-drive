import BaseRepository from "./BaseRepository";





export default abstract class AuthRepository<T, R> extends BaseRepository{
    abstract auth(param: T): Promise<R>;
}