export class Product {
  constructor(
    private code: number,
    private name: string,
    private cost_price: number,
    private sales_price: number
  ) {}

  public getCode = () => {
    return this.code;
  };

  public getName = () => {
    return this.name;
  };

  public getCostPrice = () => {
    return this.cost_price;
  };

  public getSalesPrice = () => {
    return this.sales_price;
  };

  public setCostPrice = (newCostPrice: number) => {
    this.cost_price = newCostPrice;
  };

  public setSalesPrice = (newSalesPrice: number) => {
    this.sales_price = newSalesPrice;
  };
}

export interface IProductDB {
  code: number;
  name: string;
  cost_price: number;
  sales_price: number;
}
export interface IGetProducts {
  products: Product[];
}

export interface IUpdateProductInputDTO {
  products: {
    product_code: number;
    new_price: number;
  }[];
}

export interface IUpdateProductOutputDTO {
  message: string;
  products: {
    code: number;
    name: string;
    current_price: number;
    new_price: number;
  }[];
}
