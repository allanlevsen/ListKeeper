import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/note-model';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input() note: Note;
  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();

  onDelete(): void {
    this.delete.emit();
  }

  onEdit(): void {
    this.edit.emit();
  }

  onComplete(): void {
    this.complete.emit();
  }

  onIconClick(iconId: number): void {
    console.log('Icon clicked:', iconId);
    // Placeholder for further actions based on the iconId
  }
  
}