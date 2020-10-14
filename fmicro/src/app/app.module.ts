import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { HttpClientModule } from '@angular/common/http';
import { JwtModule} from '@auth0/angular-jwt';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { UserinfoComponent } from './userinfo/userinfo.component';


export function tokenGetter(){
  return localStorage.getItem('access_token')
}

export const AppRoute: Routes = [
  {path:'dashboard', component: DashboardComponent,
    children: [
      {path:'message', component: MessageComponent,},
      {path:'userinfo', component: UserinfoComponent,},
    ]},
]

export class MENU{
  name:string;
  icon:string;
}


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CategoryComponent,
    ListComponent,
    DetailComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    MessageComponent,
    UserinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['api-token-auth'],
      }
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
