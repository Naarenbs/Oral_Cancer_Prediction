import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <h2>OralCare AI</h2>
          </div>
          
          <!-- Desktop Navigation -->
          <nav class="desktop-nav">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/ml-model" routerLinkActive="active">Detection</a>
            <a routerLink="/reviews" routerLinkActive="active">Reviews</a>
            <a routerLink="/about" routerLinkActive="active">About</a>
          </nav>
          
          <!-- Sign In Button (Conditional) -->
          <button *ngIf="isHomePage" class="btn btn-primary signin-btn" routerLink="/auth">
            Sign In
          </button>
          
          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" [matMenuTriggerFor]="mobileMenu">
            <mat-icon>menu</mat-icon>
          </button>
          
          <mat-menu #mobileMenu="matMenu" class="mobile-menu">
            <button mat-menu-item routerLink="/">
              <mat-icon>home</mat-icon>
              <span>Home</span>
            </button>
            <button mat-menu-item routerLink="/ml-model">
              <mat-icon>psychology</mat-icon>
              <span>Detection</span>
            </button>
            <button mat-menu-item routerLink="/reviews">
              <mat-icon>star</mat-icon>
              <span>Reviews</span>
            </button>
            <button mat-menu-item routerLink="/about">
              <mat-icon>info</mat-icon>
              <span>About</span>
            </button>
            <button *ngIf="isHomePage" mat-menu-item routerLink="/auth">
              <mat-icon>login</mat-icon>
              <span>Sign In</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </header>
  `,
  styles: [`
    /* Your existing styles go here */
    .header {
      background: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    
    .logo h2 {
      color: #2563EB;
      font-weight: 700;
    }
    
    .desktop-nav {
      display: flex;
      gap: 32px;
      align-items: center;
    }
    
    .desktop-nav a {
      text-decoration: none;
      color: #6b7280;
      font-weight: 500;
      transition: color 0.3s ease;
      position: relative;
    }
    
    .desktop-nav a:hover,
    .desktop-nav a.active {
      color: #2563EB;
    }
    
    .desktop-nav a.active::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 100%;
      height: 2px;
      background: #2563EB;
    }
    
    .signin-btn {
      font-size: 14px;
      padding: 8px 20px;
    }
    
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .desktop-nav,
      .signin-btn {
        display: none;
      }
      
      .mobile-menu-btn {
        display: flex;
        align-items: center;
      }
    }
  `]
})
export class HeaderComponent implements OnInit {
  isHomePage: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.isHomePage = (this.router.url === '/');

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHomePage = (event.urlAfterRedirects === '/');
    });
  }
}
