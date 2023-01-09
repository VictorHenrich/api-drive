import Drives from "src/Models/Drives";
import UpdateRepository from "src/Patterns/Repository/UpdateRepository";



interface IDriveUpdateRepository{
    filename: string,
    drive: Drives
}



export default class DriveUpdateRepository extends UpdateRepository<IDriveUpdateRepository>{
    async update({
        drive,
        filename
    }: IDriveUpdateRepository): Promise<void> {
        drive.filename = filename;

        await this.transaction.save(drive);
    }

}