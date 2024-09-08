import { Injectable } from '@angular/core';
import { Database, ref, set, push, onValue } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  constructor(private db: Database) {}

  // Fonction pour envoyer un message dans une salle spécifique
  sendMessage(roomId: string, message: string): void {
    const messagesRef = ref(this.db, `rooms/${roomId}/messages`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      text: message,
      timestamp: Date.now()
    });
  }

  // Fonction pour récupérer les messages d'une salle en temps réel
  getMessages(roomId: string): void {
    const messagesRef = ref(this.db, `rooms/${roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      const messageList = messages ? Object.values(messages) : [];
      this.messagesSubject.next(messageList);
    });
  }
}


