
import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormacaoService } from '../create-zoom/formacao.service';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogZoomComponent } from '../dialog-zoom/dialog-zoom.component';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  formacoes: any[] = [];
  selectedFormacaoToShowAulas: any = null;
  selectedFormacaoNome: string = '';

  constructor(private formacaoService: FormacaoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.formacaoService.loadFromLocalStorage();
    this.formacaoService.formacoes$.subscribe((formacoes: any[]) => {
      this.formacoes = formacoes;
      this.loadSelectedFormacaoFromLocalStorage();
    });
  }

  selectFormacao(formacaoNome: string) {
    this.selectedFormacaoToShowAulas = this.formacoes.find(formacao => formacao.nome === formacaoNome);
    console.log('Formação selecionada:', this.selectedFormacaoToShowAulas);
    this.saveSelectedFormacaoToLocalStorage();
  }

  private saveSelectedFormacaoToLocalStorage() {
    if (this.selectedFormacaoToShowAulas) {
      localStorage.setItem('selectedFormacao', JSON.stringify(this.selectedFormacaoToShowAulas));
    }
  }

  private loadSelectedFormacaoFromLocalStorage() {
    const savedFormacao = localStorage.getItem('selectedFormacao');
    if (savedFormacao) {
      this.selectedFormacaoToShowAulas = JSON.parse(savedFormacao);
      this.selectedFormacaoNome = this.selectedFormacaoToShowAulas.nome;
    }
  }

  openDialog(link: string) {
    const dialogRef = this.dialog.open( DialogZoomComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { iframeUrl: link }
    }
  );
  }
}
