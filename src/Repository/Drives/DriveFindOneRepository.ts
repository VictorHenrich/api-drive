import DriveNotFoundError from "src/Exceptions/DriveNotFoundError";
import Drives from "src/Models/Drives";
import User from "src/Models/User";
import FindRepository, { FindRepositoryProps } from "src/Patterns/Repository/FindRepository";



interface DriveFindOneRepositoryProps extends FindRepositoryProps<"id_uuid">{
    user: User
}


export default class DriveFindOneRepository extends FindRepository<Drives>{
    async find({
        column,
        value,
        user
    }: DriveFindOneRepositoryProps): Promise<Drives> {
        let drive: Drives =  
            await Drives
                .createQueryBuilder('d')
                .andWhere(`d.iduser = :idUser`, { idUser: user.id })
                .andWhere(`d.${column} = :columnValue`, { columnValue: value })
                .getOne()

        if(!drive)
            throw new DriveNotFoundError();

        return drive;
    }

}