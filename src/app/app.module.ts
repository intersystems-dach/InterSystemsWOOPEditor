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
import { PasswordQueryComponent } from './user-input/password-query/password-query.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { ChapterMetaDataComponent } from './chapter-meta-data/chapter-meta-data.component';
import { LogInComponent } from './user-input/log-in/log-in.component';
import { ChapterNewComponent } from './chapter-new/chapter-new.component';
import { EditChapterComponent } from './edit/edit-chapter/edit-chapter.component';
import { EditContentComponent } from './edit/edit-content/edit-content.component';
import { EditPageComponent } from './edit/edit-page/edit-page.component';
import { MarkdownEditorComponent } from './edit/markdown-editor/markdown-editor.component';
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
    MarkdownEditorComponent,
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
