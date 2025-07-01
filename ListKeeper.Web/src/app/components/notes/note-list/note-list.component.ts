import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../models/note-model';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteFormComponent } from '../note-form/note-form.component';

// Declare bootstrap for TypeScript
declare var bootstrap: any;

@Component({
    selector: 'app-note-list',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NoteItemComponent, NoteFormComponent],
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NoteFormComponent) noteFormComponent: NoteFormComponent;
  @ViewChild('editNoteForm') editNoteFormComponent: NoteFormComponent;
  
  notes: Note[];
  modalInstance: any;
  editModalInstance: any;
  deleteModalInstance: any;
  currentEditingNote: Note | null = null;
  currentDeletingNote: Note | null = null;

  private searchSubject = new Subject<string>();
  private searchSubscription: Subscription;
  private currentSearchTerm: string = '';
  
  categoryForm: FormGroup;
  categories: string[] = ['All', 'Upcoming', 'Past Due', 'Completed'];

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder
  ) {
    // Initialize the category filter form
    const categoryControls = this.categories.reduce((acc, category) => {
      // --- THIS IS THE CHANGE ---
      // Set all categories to 'true' by default on initialization.
      acc[category] = [true]; 
      return acc;
    }, {});
    this.categoryForm = this.fb.group(categoryControls);
  }

  ngOnInit(): void {
    this.setupSearchSubscription();
    this.refreshNotes();
  }

  ngAfterViewInit() {
    // Initialize the add note modal
    const addNoteModalElement = document.getElementById('addNoteModal');
    if (addNoteModalElement) {
      this.modalInstance = new bootstrap.Modal(addNoteModalElement);
    }

    // Initialize the edit note modal
    const editNoteModalElement = document.getElementById('editNoteModal');
    if (editNoteModalElement) {
      this.editModalInstance = new bootstrap.Modal(editNoteModalElement);
    }

    // Initialize the delete confirmation modal
    const deleteNoteModalElement = document.getElementById('deleteNoteModal');
    if (deleteNoteModalElement) {
      this.deleteModalInstance = new bootstrap.Modal(deleteNoteModalElement);
    }
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
  
  private setupSearchSubscription(): void {
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(term => term.length >= 3 || term.length === 0),
      tap(searchTerm => this.refreshNotes(searchTerm, this.categoryForm.value))
    ).subscribe();
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.currentSearchTerm = searchTerm;
    this.searchSubject.next(searchTerm);
  }

  onCategoryChange(changedCategory: string): void {
    const allControl = this.categoryForm.get('All');
    const otherCategories = this.categories.filter(c => c !== 'All');

    if (changedCategory === 'All') {
      const isAllSelected = allControl.value;
      const patchValue = otherCategories.reduce((acc, category) => {
        acc[category] = isAllSelected;
        return acc;
      }, {});
      this.categoryForm.patchValue(patchValue, { emitEvent: false });
    } else {
      if (!this.categoryForm.get(changedCategory).value && allControl.value) {
        allControl.setValue(false, { emitEvent: false });
      } else {
        const allOthersSelected = otherCategories.every(cat => !!this.categoryForm.get(cat).value);
        if (allControl.value !== allOthersSelected) {
          allControl.setValue(allOthersSelected, { emitEvent: false });
        }
      }
    }
    
    this.refreshNotes(this.currentSearchTerm, this.categoryForm.value);
  }
  
  onDropdownClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  
  public refreshNotes(searchTerm: string = '', categories?: any): void {
    console.log('Refreshing notes with filters:', { searchTerm, categories });
    this.notes = this.noteService.getNotes();
  }

  public openAddNoteModal(): void {
    this.modalInstance?.show();
  }

  addNote(): void {
    this.noteFormComponent.addNote();
    this.refreshNotes(this.currentSearchTerm, this.categoryForm.value);
    this.modalInstance?.hide();
  }

  deleteNote(id: number): void {
    // Find the note to delete and show custom confirmation modal
    const noteToDelete = this.notes.find(note => note.id === id);
    if (noteToDelete) {
      this.currentDeletingNote = noteToDelete;
      this.deleteModalInstance?.show();
    }
  }

  confirmDelete(): void {
    if (this.currentDeletingNote) {
      this.noteService.deleteNote(this.currentDeletingNote.id);
      this.refreshNotes(this.currentSearchTerm, this.categoryForm.value);
      this.deleteModalInstance?.hide();
      this.currentDeletingNote = null;
    }
  }

  cancelDelete(): void {
    this.deleteModalInstance?.hide();
    this.currentDeletingNote = null;
  }

  editNote(note: Note): void {
    this.currentEditingNote = note;
    this.editModalInstance?.show();
  }

  updateNote(): void {
    if (this.currentEditingNote && this.editNoteFormComponent) {
      this.editNoteFormComponent.saveNote();
      this.refreshNotes(this.currentSearchTerm, this.categoryForm.value);
      this.editModalInstance?.hide();
      this.currentEditingNote = null;
    }
  }

  completeNote(id: number): void {
    console.log('Completing note:', id);
  }
}
