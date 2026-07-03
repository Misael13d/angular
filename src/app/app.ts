import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommentsService } from './servicios/comments.service';
import { Comments } from './modelos/comments.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('guia26');
  private readonly xapiService = inject(CommentsService) 
  protected listaComentarios = signal<Comments[]>([])
  
  ngOnInit():void{
    this.xapiService.getComentarios().subscribe({
      next: (dat) => {
        this.listaComentarios.set(dat)
        console.log('Datos recibidos de la API',dat)
      },
      error:(err) => {
        console.log('Error al conectar con la API',err)
      }
    })
  }
}
