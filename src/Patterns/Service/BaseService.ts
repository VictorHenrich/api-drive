import { DataSource } from "typeorm";


export default abstract class BaseService<T, R>{

    constructor(
        protected readonly dataSource: DataSource
    ){

    }

    public abstract execute(param: T): Promise<R> | R;
}