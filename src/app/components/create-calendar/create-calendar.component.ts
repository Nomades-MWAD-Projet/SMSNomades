import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormacaoService } from '../create-zoom/formacao.service';

@Component({
  selector: 'app-create-calendar',
  standalone: true,
  imports: [FullCalendarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-calendar.component.html',
  styleUrl: './create-calendar.component.css'
})
export class CreateCalendarComponent implements OnInit {
  aulaForm: FormGroup;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    validRange: {
      start: '2024-09-13',
      end: '2024-09-20'
    },
    plugins: [dayGridPlugin, interactionPlugin],
    themeSystem: 'bootstrap',
  };

  formacoes: any[] = [];

  constructor(private fb: FormBuilder, private formacaoService: FormacaoService) {
    this.aulaForm = this.fb.group({
      titulo: [''],
      descricao: [''],
      dataInicio: [''],
      dataFim: [''],
      horaInicio: [''],
      horaFim: [''],
      professor: [''],
      formacao: ['']
    });
  }

  ngOnInit() {
    this.formacaoService.loadFromLocalStorage(); // Carregar as formações do armazenamento local
    this.formacaoService.formacoes$.subscribe(formacoes => this.formacoes = formacoes); // Atualizar a lista de formações

    const formacaoSelecionada = localStorage.getItem('formacaoSelecionada');
    if (formacaoSelecionada) {
      this.aulaForm.patchValue({ formacao: formacaoSelecionada });
    }
  }

  adicionarAula() {
    const novaAula = this.aulaForm.value;
    const event = {
      title: novaAula.titulo,
      start: `${novaAula.dataInicio}T${novaAula.horaInicio}`,
      end: `${novaAula.dataFim}T${novaAula.horaFim}`,
      description: novaAula.descricao,
      extendedProps: {
        professor: novaAula.professor,
        formacao: novaAula.formacao
      }
    };

    this.calendarOptions.validRange = {
      start: novaAula.dataInicio,
      end: novaAula.dataFim,
    };

    // adicionar as aulas ao calendário com os horarios definidos na função adicionarAula

    localStorage.setItem('formacaoSelecionada', novaAula.formacao);
  }

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr);
  }
}

