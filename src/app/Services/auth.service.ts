import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRole: 'admin' | 'user' | null = null;

  constructor() { 
    this.initAuth();
  }

  login(role: 'admin' | 'user'): void {
    this.userRole = role;
    localStorage.setItem('userRole', role); // Stocke le rôle dans le stockage local pour persistance
  }

  logout(): void {
    this.userRole = null;
    localStorage.removeItem('userRole');
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  isUser(): boolean {
    return this.userRole === 'user';
  }

  isAuthenticated(): boolean {
    return this.userRole !== null;
  }

  private initAuth() {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'admin' || storedRole === 'user') {
      this.userRole = storedRole as 'admin' | 'user';
    }
  }
}
