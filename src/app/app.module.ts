import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TasksManagerModule } from './tasks-manager/tasks-manager.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TasksManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
