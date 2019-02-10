import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Power } from './power.model';

@Entity()
export class Hero {
    // tslint:disable-next-line:variable-name
    @ObjectIdColumn() public _id: ObjectID;
    @Column({unique: true}) public id: number;
    @Column() public name: string;
    @Column() public sayings: string;
    @Column() public powers: Power[] = [];
}
