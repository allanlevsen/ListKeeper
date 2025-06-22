import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// NoteFormComponent is no longer needed here
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { UserStatusComponent } from './components/users/user-status/user-status.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        // NoteFormComponent is no longer in this component's template
        NoteListComponent,
        UserStatusComponent
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ListKeeper';

  // All modal and note management logic has been removed.
  constructor() {}
}