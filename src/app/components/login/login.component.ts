import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  selectedRole: 'admin' | 'user' = 'user';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    // Simule la connexion en fonction du rôle sélectionné
    this.authService.login(this.selectedRole);

    if (this.authService.isAuthenticated()) {
      // Redirige en fonction du rôle
      if (this.authService.isAdmin()) {
        this.router.navigate(['/createUser']); // Redirige l'admin vers la page admin par exemple
      } else if (this.authService.isUser()) {
        this.router.navigate(['/user']); // Redirige l'utilisateur vers la page utilisateur
      }
    } else {
      alert('Invalid login credentials!');
    }
  }
}
