import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';

@NgModule({
  declarations: [
    AppComponent,
    CarrinhoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [
    CarrinhoComponent
  ],
  bootstrap: [AppComponent]
})
export class CarrinhoViewModule {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const productcart = createCustomElement(CarrinhoComponent,  { injector: this.injector });
    customElements.define('cart-view', productcart);
  }

}
