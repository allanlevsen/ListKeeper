import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from './services/note.service';
import { NoteFormComponent } from './notes/note-form/note-form.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { UserStatusComponent } from './users/user-status/user-status.component';

// Ensure you have added "bootstrap" types to your project for TypeScript
declare var bootstrap: any;

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NoteFormComponent,
        NoteListComponent,
        UserStatusComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NoteFormComponent) noteFormComponent: NoteFormComponent;
  title = 'MacEwan-Keep';
  notes = [];
  noteForm: FormGroup;
  modalInstance: any | undefined;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.notes = this.noteService.getNotes();
  }

  ngAfterViewInit() {
    const modalElement = document.getElementById('addNoteModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  addNote() {
    this.noteFormComponent.addNote();
    this.notes = this.noteService.getNotes(); // Refresh the notes list
    this.modalInstance?.hide();
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes(); // Refresh the notes list
  }

}
