import { 
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    BaseEntity
} from "typeorm";


@Entity({ name: 'usuarios' })
export default class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    @Generated("uuid")
    public id_uuid: string;
}