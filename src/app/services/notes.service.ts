import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class NotesService {

  notes: Array<Note> = []
  notesSubject: BehaviorSubject<Array<Note>> = new BehaviorSubject([]);


  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {

  }
  fetchNotesFromServer() {
    this.httpClient.get<Array<Note>>('http://localhost:3000/api/v1/notes', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).subscribe(res => {
      this.notes = res;
      this.notesSubject.next(this.notes);
    }, (err: any) => {
      this.notesSubject.error(err);
    });

  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;

  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/api/v1/notes', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(addedNote => {
      this.notes.push(addedNote);
      this.notesSubject.next(this.notes);
    });

  }

  editNote(note: Note): Observable<Note> {

    return this.httpClient.put<Note>(`http://localhost:3000/api/v1/notes/${note.id}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
    }).do(editNote => {
      const foundNote = this.notes.find(notesEdit => notesEdit.id === editNote.id);
      Object.assign(foundNote, editNote);
      this.notesSubject.next(this.notes);
    });
  }

  getNoteById(noteId): Note {

    return this.notes.find(note => note.id === Number(noteId));
  }
}
