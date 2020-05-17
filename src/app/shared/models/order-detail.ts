export class OrderDetail {
    public id:number;
    public userOrderId: string;
    public productId: string;
    public priceMRP: number;
    public discountOnMRP: number;
    public quantity: number;
    public totalPriceMRP: number;
    public totalDiscount: number; // Or total discount
    public totalEffectivePrice: number;

}