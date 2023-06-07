import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './user-input/log-in/log-in.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChapterComponent } from './chapter/chapter.component';
import { EditChapterComponent } from './edit/edit-chapter/edit-chapter.component';
import { SettingsAdvancedComponent } from './settings/settings-advanced/settings-advanced.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: 'chapter/:chapterName', component: ChapterComponent },
  { path: 'chapter/:chapterName/edit', component: EditChapterComponent },
  { path: 'settings', component: SettingsAdvancedComponent },
  { path: 'settings/:settingsName', component: SettingsAdvancedComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
