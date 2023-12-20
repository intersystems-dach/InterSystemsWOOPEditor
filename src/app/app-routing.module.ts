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
import { MakeAdminComponent } from './user-input/make-admin/make-admin.component';
import { WhatsNewComponent } from './whats-new/whats-new.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { ConnectViaUrlComponent } from './connect-via-url/connect-via-url.component';
import { DeploySpecComponent } from './user-input/deploy-spec/deploy-spec.component';
import { PlaygroundComponent } from './playground/playground.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'user/add', component: AddUserComponent },
  { path: 'user/delete', component: DeleteUserComponent },
  { path: 'user/make/admin', component: MakeAdminComponent },
  { path: 'user/change/password', component: ChangePasswordComponent },
  { path: 'login', component: LogInComponent },
  { path: 'deploy', component: DeploySpecComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'chapter/:chapterName', component: ChapterComponent },
  { path: 'chapter/:chapterName/edit', component: EditChapterComponent },
  { path: 'settings', component: SettingsAdvancedComponent },
  { path: 'settings/:settingsName', component: SettingsAdvancedComponent },
  { path: 'help/edit', component: MarkdownCheatSheetComponent },
  { path: 'playground', component: PlaygroundComponent },
  { path: 'help', component: GetHelpComponent },
  { path: 'info', component: WhatsNewComponent },
  { path: 'impressum', component: ImpressumComponent },
  { path: 'connect/:host/:port', component: ConnectViaUrlComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
