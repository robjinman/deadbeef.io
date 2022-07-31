import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './feed/feed.component';
import { FeaturedComponent } from './landing/featured/featured.component';
import { LandingComponent } from './landing/landing.component';
import { LatestComponent } from './landing/latest/latest.component';
import { NewsItemComponent } from './landing/latest/news-item/news-item.component';
import { MaterialUiModule } from './material-ui/material-ui.module';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { SoftwareComponent } from './software/software.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FeedComponent,
    FeaturedComponent,
    LandingComponent,
    LatestComponent,
    NewsItemComponent,
    TutorialsComponent,
    SoftwareComponent,
    AboutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    MaterialUiModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2000,
        panelClass: ['snackbar']
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
