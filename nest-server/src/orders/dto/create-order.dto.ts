export class CreateOrderDto {
  fullName: string;
  address: string;
  email: string;
  items: { name: string; quantity: number; category?: string }[];
}
