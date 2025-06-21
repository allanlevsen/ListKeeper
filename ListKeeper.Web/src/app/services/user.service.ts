import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<User>(`${this.baseApiUrl}/users/authenticate`, { username, password })
      .pipe(tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseApiUrl}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}/users/${id}`);
  }

  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseApiUrl}/users/username/${username}`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseApiUrl}/users`, user);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseApiUrl}/users/${user.id}`, user);
  }

  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseApiUrl}/users/${id}`);
  }
}
