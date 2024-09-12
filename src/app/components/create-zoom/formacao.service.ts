
import { Injectable } from '@angular/core';
import { Formacao } from '../../interfaces/formacoes';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormacaoService {
  private formacoesSubject = new BehaviorSubject<any[]>([
	{ id: 1, nome: "Web Designer (WD)", enregistrements: [] },
	{ id: 2, nome: "Web Programmer (WPr)", enregistrements: [] },
	{ id: 3, nome: "Mobile Web Application Developer (MWAD)", enregistrements: [] },
	{ id: 4, nome: "Python Software Engineer(PSE)", enregistrements: [] },
	{ id: 5, nome: "Data Analysis (PDA)", enregistrements: [] },
	{ id: 6, nome: "Data Science pour la Finance (DAF)", enregistrements: [] },
	{ id: 7, nome: "Digital Marketing (DMM)", enregistrements: [] },
  ]);

  formacoes$ = this.formacoesSubject.asObservable();

  getFormacoes() {
	return this.formacoesSubject.value;
  }

  updateFormacoes(formacoes: any[]) {
	this.formacoesSubject.next(formacoes);
	localStorage.setItem('formacoes', JSON.stringify(formacoes));
  }

  loadFromLocalStorage() {
	const data = localStorage.getItem('formacoes');
	if (data) {
	  this.formacoesSubject.next(JSON.parse(data));
	}
  }
}
