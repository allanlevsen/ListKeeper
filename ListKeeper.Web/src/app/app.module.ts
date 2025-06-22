import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoteListComponent } from './components/notes/note-list/note-list.component';
import { NoteItemComponent } from './components/notes/note-item/note-item.component';
import { NoteFormComponent } from './components/notes/note-form/note-form.component';
import { NoteService } from './services/note.service';
import { UserStatusComponent } from './components/users/user-status/user-status.component';
import { LoginComponent } from './components/users/login/login.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteItemComponent,
    NoteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserStatusComponent,
    LoginComponent
  ],
  providers: [
    NoteService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
