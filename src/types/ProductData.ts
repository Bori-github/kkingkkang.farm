import { UserData } from './UserData';

export interface ProductData {
  id: string;
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
  author: UserData;
}
