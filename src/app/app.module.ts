import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatSelectModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { HeaderComponent } from './header/header.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { NoteComponent } from './note/note.component';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';


const appRoutes: Routes = [
  {
    path:'',component: LoginComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard], children: [
    {
      path: 'view/noteview', component: NoteViewComponent
    },
    {
      path: 'view/listview', component: ListViewComponent
    },
    {
      path: 'note/:noteId/edit', component: EditNoteOpenerComponent,
      outlet : 'noteEditOutlet'
    },
    {
      path: '', redirectTo: 'view/noteview', pathMatch: 'full'
    }
  ] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];


@NgModule({
  declarations: [  
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    EditNoteOpenerComponent,
    ListViewComponent,
    NoteViewComponent,
    NoteTakerComponent,
    NoteComponent,
    EditNoteViewComponent ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule,
   ],
  providers: [ 
    RouterService,
    CanActivateRouteGuard,
    NotesService,
    AuthenticationService,
  ],
  bootstrap: [ AppComponent],
  entryComponents: [ EditNoteViewComponent ]
})

export class AppModule { }
