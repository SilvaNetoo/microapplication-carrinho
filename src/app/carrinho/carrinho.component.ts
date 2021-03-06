import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ProdutoList } from './models/produto-list';


@Component({
  selector: 'cart-view',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CarrinhoComponent implements OnInit {

  public productlist: Array<ProdutoList> = new Array<ProdutoList>();
  public totalprice: number;
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
    let product = this.getProduct(message['nome']);
    if (product !== undefined) {
      product.qty = product.qty + 1;
      this.totalprice = this.totalprice + message['preco'];
    } else if (message !== "" && message !== undefined) {
      product = new ProdutoList();
      product.qty = 1;
      product.preco = (message['preco'] !== undefined) ? message['preco'] : 0;
      product.nome = (message['nome'] !== undefined) ? message['nome'] : "";
      product.quantidade = (message['quantidade'] !== undefined) ? message['quantidade'] : 0;
      this.productlist.push(product);
      this.totalprice = this.totalprice + product.preco;
    }

  }

  getProduct(nome): ProdutoList {
    let productObj = undefined;
    for (let product of this.productlist) {
      if (product.nome === nome) {
        productObj = product;
        break;
      }
    }
    return productObj;
  }

  increment(product) {
    if (product.qty >= 0 && product.qty < product.quantidade) {
      product.qty = product.qty + 1;
      product.cartprice = product.cartprice + product.preco;
      this.totalprice = this.totalprice + product.preco;
      this.sendMessageToProductView(product);
    }
  }

  decrement(product) {
    if (product.qty > 0 && product.qty <= product.quantidade) {
      product.qty = product.qty - 1;
      product.cartprice = product.cartprice - product.preco;
      this.totalprice = this.totalprice - product.preco;
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
