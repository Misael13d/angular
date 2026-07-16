import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PersonasService, Student } from './servicio/personas.service';
import { FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proy2');
  private readonly apiService = inject(PersonasService) 

  protected listaPredios = signal<any[]>([])
  protected listaStudent = signal<Student[]>([])
  regForm : FormGroup
  constructor(){
    this.regForm = new FormGroup({
        login : new FormControl(''),
        clave: new FormControl('')
    })

  }

  // ngOnInit():void{
  //     this.apiService.getStudent().subscribe({
  //       next: (dat) => {
  //         this.listaStudent.set(dat)
  //       },
  //       error:(err) => {
  //         console.log('Error al conectar con la API',err)        
  //       }
  //     })
  // }

  enviarDatosFormulario(): void {
    let user:string= this.regForm.get('login')?.value;
    let password:string=this.regForm.get('clave')?.value;

    	this.apiService.getLogin(user, password).subscribe({
        next: (data: any) => {
          console.log('Respuesta del servicio:', data);
          if (data.otherParams) {
            this.apiService.setCurrentSession('currentUser', data);
            this.listaDePredios();
          } else {
            console.log("error")
          }
        },
        error: (error: any) => {
          if (error.error && error.error.errors) {
            console.error('error detail:', error.error.errors);
          }
        },
    });
  }

  listaDePredios():void{
      this.apiService.getPredios().subscribe({
      next: (dat) => {
        this.listaPredios.set(dat)          
      },
      error:(err) => {
        console.log('Error al conectar con la API',err)
      }
    })
  }
}
