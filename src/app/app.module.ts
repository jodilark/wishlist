import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './list/card/card.component';
import { ItemCreatorComponent } from './list/item-creator/item-creator.component';
import { FormsModule } from '@angular/forms';
import { FormatterDirective } from './shared/formatter.directive';
import { InputFormatterDirective } from './shared/input-formatter.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CardComponent,
    ItemCreatorComponent,
    FormatterDirective,
    InputFormatterDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
