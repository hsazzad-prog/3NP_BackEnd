
import { AdminEntity } from '../admin/admin.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Manager")
export class ManagerEntity{
@PrimaryGeneratedColumn()
id:number;
@Column({name:'fname',type: "varchar",length: 150})
fname:string;
@Column({name:'lname',type: "varchar",length: 150})
lname:string;
@Column({type: "varchar",length: 150})
email:string;
@Column()
phone:number;

@ManyToOne(() => AdminEntity, admin => admin.managers)
admin: AdminEntity;

}
