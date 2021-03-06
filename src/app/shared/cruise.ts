export class Cruise{
    _id?: String;
    shipName:String;
    price:Number;
    discount?:Number;
    sailingDate?:Date;
    departureMonth?:String;
    activities?:Array<string>;
    entertainment?:Array<string>;
    dining?:Array<string>;
    images?:Array<string>;
    days?:Number;
    whereTo?:String;
    travelers?:Array<object>;
    shipInfo?:Array<object>;
    departsFrom?:String;
    reviews?:Array<object>;
    rating?:Array<object>;
    booking?:Array<object>;

}