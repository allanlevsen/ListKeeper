import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from './services/note.service';

// Ensure you have added "bootstrap" types to your project for TypeScript
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
    if (this.noteForm.valid) {
      const { title, content } = this.noteForm.value;
      this.noteService.addNote(title, content);
      this.notes = this.noteService.getNotes(); // Refresh the notes list
      this.noteForm.reset(); // Reset the form
  
      // Close the modal programmatically
      this.modalInstance?.hide();
      
      // Remove the modal backdrop manually
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id);
    this.notes = this.noteService.getNotes(); // Refresh the notes list
  }

}
