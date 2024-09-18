import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { CreateChatComponent } from './components/create-chat/create-chat.component';
// import { CreateCalendarComponent } from './components/create-calendar/create-calendar.component';
import { CreateZoomComponent } from './components/create-zoom/create-zoom.component';
import { UserComponent } from './components/user/user.component';
import { ChatComponent } from './components/chat/chat.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { AdminGuard } from "./Guards/admin.guard";
import { UserGuard } from "./Guards/user.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'createUser',
    component: CreateUserComponent,
    canActivate: [AdminGuard], // Seuls les admins peuvent accéder
  },
  {
    path: 'createChat',
    component: CreateChatComponent,
    canActivate: [AdminGuard], // Seuls les admins peuvent accéder
  },
  // {
  //   path: 'createCalendar',
  //   component: CreateCalendarComponent,
  //   canActivate: [AdminGuard], // Seuls les admins peuvent accéder
  // },
  {
    path: 'createZoom',
    component: CreateZoomComponent,
    canActivate: [AdminGuard], // Seuls les admins peuvent accéder
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserGuard], // Les utilisateurs et admins peuvent accéder
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [UserGuard], // Les utilisateurs et admins peuvent accéder
  },
  {
    path: 'zoom',
    component: ZoomComponent,
    canActivate: [UserGuard], // Les utilisateurs et admins peuvent accéder
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [UserGuard], // Les utilisateurs et admins peuvent accéder
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
