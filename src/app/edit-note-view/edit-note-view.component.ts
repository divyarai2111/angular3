import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  onSave() {
    this.notesService.editNote(this.note).subscribe((editedNote) => {
      this.matDialogRef.close();
    },
      (err: any) => {
      this.errMessage = err.message;
    });

  }

  constructor(private matDialogRef: MatDialogRef<EditNoteViewComponent>,
    private routeService: RouterService,
    private notesService: NotesService,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
    this.note = this.notesService.getNoteById(this.data.note);
  }

}
