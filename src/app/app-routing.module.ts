import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './user-input/log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChapterComponent } from './chapter/chapter.component';
import { EditChapterComponent } from './edit/edit-chapter/edit-chapter.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MarkdownCheatSheetComponent } from './markdown-cheat-sheet/markdown-cheat-sheet.component';
import { AddUserComponent } from './user-input/add-user/add-user.component';
import { ChangePasswordComponent } from './user-input/change-password/change-password.component';
import { DeleteUserComponent } from './user-input/delete-user/delete-user.component';
import { GetHelpComponent } from './get-help/get-help.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: 'user/delete', component: DeleteUserComponent },
  { path: 'user/change/password', component: ChangePasswordComponent },
  { path: 'login', component: LogInComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'chapter/:chapterName', component: ChapterComponent },
  { path: 'chapter/:chapterName/edit', component: EditChapterComponent },
  { path: 'settings', component: SettingsAdvancedComponent },
  { path: 'settings/:settingsName', component: SettingsAdvancedComponent },
  { path: 'markdown', component: MarkdownCheatSheetComponent },
  { path: 'help', component: GetHelpComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
