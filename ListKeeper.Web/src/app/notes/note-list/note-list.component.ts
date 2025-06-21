import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note-model';
import { NoteItemComponent } from '../note-item/note-item.component';

@Component({
    selector: 'app-note-list',
    standalone: true,
    imports: [CommonModule, NoteItemComponent],
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  @Input() notes: Note[];
  @Output() delete = new EventEmitter<number>();

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
  }

  deleteNote(id: number): void {
    this.delete.emit(id);
  }

  editNote(note: Note): void {
    // Implement edit note logic
  }

  completeNote(id: number): void {
    // Implement complete note logic
  }
}
