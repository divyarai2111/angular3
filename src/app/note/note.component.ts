import { Component, Input } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note:Note;
  // routerService: any;
  ngOnInit() {
  }
  editNoteView()
  {
    let noteId=this.note.id;
    
    this.routerService.routeToEditNoteView(noteId);
  }

  
  constructor(private routerService: RouterService) { }


}
