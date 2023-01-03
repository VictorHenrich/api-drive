import User from "src/Models/User";
import { EntityManager } from "typeorm";


export default class BaseRepository{
    constructor(
        protected readonly transaction: EntityManager
    ){

    }
}