import { Injectable } from '@angular/core';
import { Note } from '../models/note-model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [
    { id: 1, title: "Cut Grass", content: "The front and back grass needs to be moed", color: '#f8f9fa'},
    { id: 2, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs to be moed", color: '#f8f9fa'},
    { id: 3, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs", color: '#ffcccc'},
    { id: 4, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs to be moed, back grass needs to be moed", color: '#f8f9fa'},
    { id: 5, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs", color: '#f8f9fa'},
    { id: 6, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs", color: '#ffcccc'},
    { id: 7, title: "Cut Grass", content: "The front and back grass needs to be moed, back grass needs to be moed, back grass needs to be moed", color: '#ccffcc'}
  
  ];
  private nextId = 8;

  getNotes(): Note[] {
    return this.notes;
  }

  addNote(title: string, content: string, color: string = '#f8f9fa'): void {
    const newNote: Note = { id: this.notes.length + 1, title, content, color };
    this.notes.push(newNote);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
  }
}
