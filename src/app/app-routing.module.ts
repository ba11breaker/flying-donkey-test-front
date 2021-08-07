import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './components/files/files.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {path: '', redirectTo: 'upload', pathMatch: "full"},
  {path: 'upload', component: UploadComponent},
  {path: 'files', component: FilesComponent },
  {path: '**', redirectTo: 'upload', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
