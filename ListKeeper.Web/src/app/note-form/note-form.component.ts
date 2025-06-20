import { Component } from '@angular/core';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  title = '';
  content = '';

  constructor(private noteService: NoteService) {}

  addNote(): void {
    if (this.title && this.content) {
      this.noteService.addNote(this.title, this.content);
      this.title = '';
      this.content = '';
    }
  }
}