import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MarkdownContentComponent],
  imports: [BrowserModule, HttpClientModule, MarkdownModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
