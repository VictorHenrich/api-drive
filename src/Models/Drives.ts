import { 
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    BaseEntity
} from "typeorm";


@Entity({ name: 'arquivos_usuario' })
export default class Drives extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ nullable: false })
    public iduser: number;

    @Column({ nullable: false })
    public filename: string;

    @Column({ nullable: false })
    public path: string;

    @Column({ nullable: false })
    @Generated("uuid")
    public id_uuid: string;
}