import { Routes } from '@angular/router';
import { BicicletaComponent } from './componentes/bicicleta.component/bicicleta.component';
import { CocheComponent } from './componentes/coche.component/coche.component';
import { DocentesComponent } from './componentes/docentes.component/docentes.component';
import { EstudiantesComponent } from './componentes/estudiantes.component/estudiantes.component';
import { FacultadesComponent } from './componentes/facultades.component/facultades.component';
import { FormsComponent } from './componentes/forms.component/forms.component';
import { HomeComponent } from './componentes/home.component/home.component';
import { MotoComponent } from './componentes/moto.component/moto.component';
import { PersonalComponent } from './componentes/personal.component/personal.component';
import { TemplateComponent } from './componentes/template.component/template.component';
import { ErrorpageComponent } from './componentes/errorpage.component/errorpage.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'personal', component: PersonalComponent},
    {path: 'facultades', component: FacultadesComponent},
    {path: 'moto', component: MotoComponent},
    {path: 'bicicleta', component: BicicletaComponent},
    {path: 'coche', component: CocheComponent},
    {path: 'reactive-forms', component: FormsComponent},
    {path: 'template-forms', component: TemplateComponent},
    {path: 'docentes', component: DocentesComponent},
    {path: 'estudiantes', component: EstudiantesComponent},
    {path: '**', component: ErrorpageComponent}
];
