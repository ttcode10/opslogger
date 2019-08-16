import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogsComponent } from './components/logs/logs.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogformComponent } from './components/logform/logform.component';





@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    NavbarComponent,
    LogformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
