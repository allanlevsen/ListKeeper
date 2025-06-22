import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../models/note-model';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteFormComponent } from '../note-form/note-form.component';

// Declare bootstrap for TypeScript
declare var bootstrap: any;

@Component({
    selector: 'app-note-list',
    standalone: true,
    // Add NoteFormComponent to the imports array
    imports: [CommonModule, NoteItemComponent, NoteFormComponent],
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, AfterViewInit {
  @ViewChild(NoteFormComponent) noteFormComponent: NoteFormComponent;
  notes: Note[];
  modalInstance: any;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.refreshNotes();
  }

  // Set up the modal instance after the view is initialized
  ngAfterViewInit() {
    const modalElement = document.getElementById('addNoteModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  // Public method to be called from the parent to open the modal
  public openAddNoteModal(): void {
    this.modalInstance?.show();
  }

  // The complete addNote logic now lives here
  addNote(): void {
    this.noteFormComponent.addNote();
    this.refreshNotes();
    this.modalInstance?.hide();
  }

  public refreshNotes(): void {
    this.notes = this.noteService.getNotes();
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id);
    this.refreshNotes();
  }

  editNote(note: Note): void {
    // Implement edit note logic
    console.log('Editing note:', note);
  }

  completeNote(id: number): void {
    // Implement complete note logic
    console.log('Completing note:', id);
  }
}