


export default interface IService<T, R>{
    execute(param: T): Promise<R> | R;
}