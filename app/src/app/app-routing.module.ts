import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FeedComponent } from './feed/feed.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SoftwareComponent } from './software/software.component';
import { TutorialsComponent } from './tutorials/tutorials.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blightednixhound',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AdminLoginComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
