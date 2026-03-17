import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _isAuthenticated = new BehaviorSubject<boolean>(false);
  readonly isAuthenticated$ = this._isAuthenticated.asObservable();

  get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  
  login() {
    this._isAuthenticated.next(true);
    console.log('User is now authenticated');
  }

  logout() {
    this._isAuthenticated.next(false);
    localStorage.removeItem('token');
    console.log('User logged out');
  }
}
