export class Product {

    public id:number;
    public name: string;
    public detail: string;
    public priceMRP: number;
    public discount: number;
    public imageUrl: string;
    
    public moreDetailUrl: number;
    public minimumStock: string; // Minimum order level quantity

    public createdByUserId: number;
    public dateCreated: Date;
    public lastModified: Date;
}