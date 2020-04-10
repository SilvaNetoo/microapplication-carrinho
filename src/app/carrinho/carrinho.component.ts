import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';


export class Product {
  public productname: string;
  public code: string;
  public cartprice: number;
  public price: number;
  public available: number;
  public qty: number;
  constructor() {

  }
}

@Component({
  selector: 'cart-view',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CarrinhoComponent implements OnInit {

  public productlist: Product[];
  public totalprice = 0;
  _message: string;

  public ngOnInit(): void {
    this.productlist = [];
  }

  constructor() { }

  @Input()
  set message(message: string) {
    this.processMessage(message);
  }

  get message(): string { return this._message; }

  processMessage(message) {
    let product = this.getProduct(message['productname']);
    if (product !== undefined) {
      product.qty = product.qty + 1;
      product.cartprice = product.cartprice + message['price'];
      this.totalprice = this.totalprice + message['price'];
    } else if (message !== "" && message !== undefined) {
      product = new Product();
      product.qty = 1;
      product.price = (message['price'] !== undefined) ? message['price'] : 0;
      product.productname = (message['productname'] !== undefined) ? message['productname'] : "";
      product.available = (message['available'] !== undefined) ? message['available'] : 0;
      product.code = (message['code'] !== undefined) ? message['code'] : "";
      product.cartprice = (message['price'] !== undefined) ? message['price'] : 0;
      this.productlist.push(product);
      this.totalprice = this.totalprice + product.price;
    }

  }

  getProduct(productname): Product {
    let productObj = undefined;
    for (let product of this.productlist) {
      if (product.productname === productname) {
        productObj = product;
        break;
      }
    }
    return productObj;
  }

  increment(product) {
    if (product.qty >= 0 && product.qty < product.available) {
      product.qty = product.qty + 1;
      product.cartprice = product.cartprice + product.price;
      this.totalprice = this.totalprice + product.price;
      this.sendMessageToProductView(product);
    }
  }

  decrement(product) {
    if (product.qty > 0 && product.qty <= product.available) {
      product.qty = product.qty - 1;
      product.cartprice = product.cartprice - product.price;
      this.totalprice = this.totalprice - product.price;
      this.sendMessageToProductView(product);
    }
  }

  sendMessageToProductView(product) {
    const productviewele = document.querySelector('product-view');
    if (productviewele != null) {
      productviewele['message'] = product;
    }
  }

}
