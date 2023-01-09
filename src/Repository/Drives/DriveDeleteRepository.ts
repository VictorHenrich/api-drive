import Drives from "src/Models/Drives";
import DeleteRepository from "src/Patterns/Repository/DeleteRepository";


interface IDriveExclusion{
    drive: Drives
}



export default class DriveDeleteRepository extends DeleteRepository<IDriveExclusion>{
    async delete({ drive }: IDriveExclusion): Promise<void> {
        await this.transaction.remove(drive);
    }
}