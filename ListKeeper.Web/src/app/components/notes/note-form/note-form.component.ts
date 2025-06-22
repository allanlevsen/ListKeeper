import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {
  title = '';
  content = '';
  @Output() noteAdded = new EventEmitter<void>();

  constructor(private noteService: NoteService) {}

  addNote(): void {
    if (this.title && this.content) {
      this.noteService.addNote(this.title, this.content);
      this.title = '';
      this.content = '';
      this.noteAdded.emit();
    }
  }
}