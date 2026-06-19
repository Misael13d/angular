import { Routes } from '@angular/router';
import { DocentesComponent } from './componentes/docentes.component/docentes.component';
import { EstudiantesComponent } from './componentes/estudiantes.component/estudiantes.component';
import { HomeComponent } from './componentes/home.component/home.component';
import { ErrorpageComponent } from './componentes/errorpage.component/errorpage.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'docentes', component: DocentesComponent},
    {path: 'estudiantes', component: EstudiantesComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', component: ErrorpageComponent}
];
