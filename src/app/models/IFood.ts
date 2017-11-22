import { ICategory } from './ICategory';

export interface IFood {
    _id?: string;
    id?: string;
    name?: string;
    lowercaseName?: string;
    description?: string;
    price: number;
    pictures?: string[];
    categories?: ICategory[];
    active?: boolean;
    quantity?: number;
    uid?: string;
}
