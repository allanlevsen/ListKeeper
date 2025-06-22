import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-status',
  standalone: true,
  imports: [CommonModule, LoginComponent],
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  user: User | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.loginComponent.open();
    return false;
  }

  logout() {
    this.userService.logout();
    return false;
  }
}
