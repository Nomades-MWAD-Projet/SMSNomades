import { Component, OnInit } from '@angular/core'; // Importer OnInit
import { FormsModule } from '@angular/forms'; // Pour ngModel
import { ChatService } from './create-chat.service';
import { CommonModule, DatePipe } from '@angular/common'; // Pour formater les dates

@Component({
  selector: 'app-create-chat',
  standalone: true,
  imports: [FormsModule, DatePipe, CommonModule],
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit { // Implémenter OnInit
  newMessage: string = '';
  roomId: string = 'roomId1'; // Exemple de salle de chat
  messages$ : any;  // Initialisation après l'injection du service

  constructor(public chatService: ChatService) {
    this.messages$ = chatService.messages$;
  }

  // Utiliser ngOnInit pour récupérer les messages
  ngOnInit(): void {
    this.chatService.getMessages(this.roomId);
    this.messages$ = this.chatService.messages$; // Initialisation de messages$ dans ngOnInit
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.roomId, this.newMessage); // Appeler la méthode pour envoyer un message
      this.newMessage = '';  // Vider le champ de message après l'envoi
    }
  }
}
