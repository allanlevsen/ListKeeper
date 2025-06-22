import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Note } from '../../../models/note-model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  // Add DatePipe to the imports array to make the 'date' pipe available in the template
  imports: [CommonModule, DatePipe],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input() note: Note;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();

  onDelete(): void {
    // Prevent default anchor behavior and emit the event
    event.preventDefault();
    this.delete.emit(this.note.id);
  }

  onEdit(): void {
    event.preventDefault();
    this.edit.emit();
  }

  onComplete(): void {
    event.preventDefault();
    this.complete.emit();
  }
}
