import { ITable } from './ITable';
import { IFood } from './IFood';

export interface IOrder {
    id?: string;
    foods?: {
        food?: IFood,
        quantity?: number,
        price?: number,
        uid?: string,
        status?: string,
        kitchen?: string,
        staff?: string
    }[];
    table?: ITable;
    date?: Date;
    status?: String;
}

export interface IOrderPost {
    foods:
    {
        food: string;
        quantity: number;
    }[];
    table: string;
}
