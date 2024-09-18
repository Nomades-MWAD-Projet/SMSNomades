import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormacaoService } from '../create-zoom/formacao.service';
import { Zoom } from '../../interfaces/zoom';
import { DialogZoomComponent } from '../dialog-zoom/dialog-zoom.component';
import { Formation } from '../../interfaces/formation';

@Component({
  selector: 'app-zoom',
  standalone: true,
  imports: [CommonModule, FormsModule, ],
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {
  zooms: Zoom[] = [];
  formations: Formation[] = [];
  selectedFormacaoToShowAulas: Formation | null = null;
  idSelectedFormation: string = '';
  zoomsToShowByFormation: Zoom[] = [];

  constructor(private formacaoService: FormacaoService, private dialog: MatDialog) {}

  ngOnInit() {
    this.formacaoService.getFormation().subscribe((formacoes: Formation[]) => {
      this.formations = formacoes;
    });
  }

  selectFormacao() {
    const id = this.selectedFormacaoToShowAulas?.id;
    this.formacaoService.getZoomByIdFormation(id).subscribe((zooms: Zoom[]) => {
      this.zoomsToShowByFormation = zooms;
    });
  }

  openDialog(link?: string) {
    this.dialog.open(DialogZoomComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { iframeUrl: link }
    });
  }
}
