import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';
import { PageComponent } from './page/page.component';
import { PageNavBarComponent } from './page-nav-bar/page-nav-bar.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ChapterSelectionComponent } from './chapter-selection/chapter-selection.component';
import { PasswordQueryComponent } from './password-query/password-query.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { ChapterMetaDataComponent } from './chapter-meta-data/chapter-meta-data.component';
import { LogInComponent } from './log-in/log-in.component';
import { ChapterNewComponent } from './chapter-new/chapter-new.component';
import { EditChapterComponent } from './edit-chapter/edit-chapter.component';
import { EditContentComponent } from './edit-content/edit-content.component';
import { EditPageComponent } from './edit-page/edit-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MarkdownContentComponent,
    PageComponent,
    PageNavBarComponent,
    ChapterComponent,
    ChapterSelectionComponent,
    PasswordQueryComponent,
    SettingsComponent,
    ChapterMetaDataComponent,
    LogInComponent,
    ChapterNewComponent,
    EditChapterComponent,
    EditContentComponent,
    EditPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
