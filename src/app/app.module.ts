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
import { ChapterMetaDataComponent } from './chapter-meta-data/chapter-meta-data.component';
import { LogInComponent } from './user-input/log-in/log-in.component';
import { ChapterNewComponent } from './chapter-new/chapter-new.component';
import { EditChapterComponent } from './edit/edit-chapter/edit-chapter.component';
import { EditContentComponent } from './edit/edit-content/edit-content.component';
import { EditPageComponent } from './edit/edit-page/edit-page.component';
import { MarkdownEditorComponent } from './edit/markdown-editor/markdown-editor.component';
import { AreYouSureComponent } from './user-input/are-you-sure/are-you-sure.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MarkdownCheatSheetComponent } from './markdown-cheat-sheet/markdown-cheat-sheet.component';
import { ExportOptionsComponent } from './user-input/export-options/export-options.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CodeWindowComponent } from './code-window/code-window.component';
import { SharedModule } from './shared/shared.module';
import { MarkdownDirective } from './markdown-content/markdown.directive';
import { SettingsShortComponent } from './settings/settings-short/settings-short.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { SettingsHeaderComponent } from './settings/settings-header/settings-header.component';
import { StorageSettingsComponent } from './settings/settings-pages/storage-settings/storage-settings.component';
import { ServerSettingsComponent } from './settings/settings-pages/server-settings/server-settings.component';
import { ContactSettingsComponent } from './settings/settings-pages/contact-settings/contact-settings.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserSettingsComponent } from './settings/settings-pages/user-settings/user-settings.component';
import { AddUserComponent } from './user-input/add-user/add-user.component';
import { ChangePasswordComponent } from './user-input/change-password/change-password.component';
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
    ChapterMetaDataComponent,
    LogInComponent,
    ChapterNewComponent,
    EditChapterComponent,
    EditContentComponent,
    EditPageComponent,
    MarkdownEditorComponent,
    AreYouSureComponent,
    FilterBarComponent,
    SearchBarComponent,
    MarkdownCheatSheetComponent,
    ExportOptionsComponent,
    HomeComponent,
    CodeWindowComponent,
    MarkdownDirective,
    SettingsShortComponent,
    SettingsAdvancedComponent,
    SettingsHeaderComponent,
    StorageSettingsComponent,
    ServerSettingsComponent,
    ContactSettingsComponent,
    ErrorPageComponent,
    UserSettingsComponent,
    AddUserComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
