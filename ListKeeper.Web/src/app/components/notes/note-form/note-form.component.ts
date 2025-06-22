import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  // We will create and add the CSS file next
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;

  // Define the beautiful, soft color palette for the user to choose from.
  availableColors: string[] = [
    '#FFF3CD', // Light Yellow
    '#D1E7DD', // Light Green
    '#CFF4FC', // Light Blue
    '#F8D7DA', // Light Red
    '#E2D9F3', // Light Purple
  ];

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      dueDate: [this.getFutureDateString(7), Validators.required],
      isCompleted: [false],
      // The first color in our palette is the default.
      color: [this.availableColors[0], Validators.required] 
    });
  }

  /**
   * Sets the value of the 'color' form control when a user clicks a swatch.
   * @param color The hex code of the selected color.
   */
  selectColor(color: string): void {
    this.noteForm.patchValue({ color: color });
  }

  private getFutureDateString(daysToAdd: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  }

  public addNote(): void {
    if (this.noteForm.valid) {
      this.noteService.addNote(this.noteForm.value);
      this.noteForm.reset({
        title: '',
        content: '',
        dueDate: this.getFutureDateString(7),
        isCompleted: false,
        // Reset to the default color
        color: this.availableColors[0]
      });
    } else {
      this.noteForm.markAllAsTouched();
    }
  }
}
