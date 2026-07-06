import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Student } from './modelos/student.interface';
import { PersonalService } from './servicios/personal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guia26');
  private readonly xapiService = inject(PersonalService);
  protected listaAlumnos = signal<Student[]>([]);

  ngOnInit():void{
    this.xapiService.getAlumnos().subscribe({
      next: (dat) => {
        this.listaAlumnos.set(dat)
      },
      error:(err) => {
        console.log('Error al conectar con la API',err)
      }
    })
  }
}
