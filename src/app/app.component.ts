import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateChatComponent } from "./components/create-chat/create-chat.component";
import { CreateUserComponent } from "./components/create-user/create-user.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateChatComponent, CreateUserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SMSNomades';
}
