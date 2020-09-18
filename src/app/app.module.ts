import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './core/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { AddPostComponent } from './views/add-post/add-post.component';
import { EditPostComponent } from './views/edit-post/edit-post.component';
import { GeneralSettingsComponent } from './views/general-settings/general-settings.component';
import { HomeComponent } from './views/home/home.component';
import { SafePipe } from './pipes/safe.pipe';
import { HttpConfigInterceptor } from './httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    HeaderComponent,
    AddPostComponent,
    EditPostComponent,
    GeneralSettingsComponent,
    SafePipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
