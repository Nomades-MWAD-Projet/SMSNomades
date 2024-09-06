import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
  private formacoesSubject = new BehaviorSubject<any[]>([]);
  formacoes$ = this.formacoesSubject.asObservable();

  loadFromLocalStorage() {
	const savedFormacoes = localStorage.getItem('formacoes');
	if (savedFormacoes) {
	  this.formacoesSubject.next(JSON.parse(savedFormacoes));
	}
  }

  saveToLocalStorage(formacoes: any[]) {
	localStorage.setItem('formacoes', JSON.stringify(formacoes));
	this.formacoesSubject.next(formacoes);
  }
}