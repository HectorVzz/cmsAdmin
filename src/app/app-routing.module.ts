import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { MainComponent } from './core/main/main.component';
import { AddPostComponent } from './views/add-post/add-post.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';
import { GeneralSettingsComponent } from './views/general-settings/general-settings.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: 'dashboard', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      {path: 'add', component: AddPostComponent},
      {path: 'edit/:id', component: EditPostComponent},
      {path: 'general', component: GeneralSettingsComponent},
      { path: '**', pathMatch: 'full', redirectTo: '' },

    ]
  },
  { path: 'auth', component: AuthComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
