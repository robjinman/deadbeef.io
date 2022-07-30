import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BlightedNixHoundComponent } from './blighted-nix-hound/blighted-nix-hound.component';
import { FeedComponent } from './feed/feed.component';
import { LandingComponent } from './landing/landing.component';
import { SoftwareComponent } from './software/software.component';
import { TutorialsComponent } from './tutorials/tutorials.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'tutorials', component: TutorialsComponent },
  { path: 'software', component: SoftwareComponent },
  { path: 'about', component: AboutComponent },
  { path: 'blightednixhound', component: BlightedNixHoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
