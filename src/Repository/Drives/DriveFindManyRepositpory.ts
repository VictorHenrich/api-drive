import Drives from "src/Models/Drives";
import User from "src/Models/User";
import FindRepository from "src/Patterns/Repository/FindRepository";


interface DriveFindManyRepositoryProps{
    user: User
}



export default class DriveFindManyRepository extends FindRepository<Drives, DriveFindManyRepositoryProps>{
    async find({
        user
    }: DriveFindManyRepositoryProps): Promise<Drives[]> {
        let drives: Drives[] =  
            await Drives
                .createQueryBuilder('d')
                .andWhere(`d.iduser = :idUser`, { idUser: user.id })
                .getMany();


        return drives;
    }

}