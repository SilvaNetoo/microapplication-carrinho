import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { CarrinhoComponent } from './carrinho/carrinho.component';

@NgModule({
  declarations: [
    CarrinhoComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [
    CarrinhoComponent
  ]
})
export class CarrinhoViewModule {

  constructor(private injector: Injector) {
    const productcart = createCustomElement(CarrinhoComponent,  { injector: this.injector });
    customElements.define('cart-view', productcart);
  }

  ngDoBootstrap() {
  }

}
