import { PaymentMethod } from '../enums/payment-method';
import { OrderStatus } from '../enums/order-status';

export class UserOrder {

    public id:number;
    public userId: string;
    public invoiceNumber: string;

    public subtotalPriceMRP: number;
    public subtotalDiscount: number;
    public subtotalEffectivePrice: number;

    public orderStatus: OrderStatus;
    public paymentMethod: PaymentMethod;

    public dateCreated: Date;
    public lastModified: Date;

}