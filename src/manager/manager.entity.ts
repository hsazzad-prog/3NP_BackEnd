import { AdminEntity } from 'src/admin/admin.entity';
import{PrimaryGeneratedColumn,Entity,PrimaryColumn,Column, ManyToOne} from 'typeorm';


@Entity("Manager")
export class ManagerEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @ManyToOne(() => AdminEntity, admin => admin.managers)
 admin: AdminEntity;

}