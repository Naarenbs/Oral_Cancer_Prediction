import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Early Detection of<br>
              <span class="highlight">Oral Cancer</span><br>
              with AI Technology
            </h1>
            <p class="hero-subtitle">
              Our advanced machine learning model helps healthcare professionals 
              detect oral cancer in its early stages, improving treatment outcomes 
              and saving lives.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary" routerLink="/ml-model">
                Try Detection Now
              </button>
              <button class="btn btn-secondary" routerLink="/about">
                Learn More
              </button>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg" alt="Medical AI" />
          </div>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="section features">
        <div class="container">
          <h2 class="section-title">Why Choose OralCare AI?</h2>
          <p class="section-subtitle">
            Advanced technology meets medical expertise to provide accurate and reliable oral cancer detection
          </p>
          
          <div class="features-grid">
            <div class="feature-card card">
              <mat-icon class="feature-icon">psychology</mat-icon>
              <h3>AI-Powered Detection</h3>
              <p>State-of-the-art machine learning algorithms trained on thousands of medical images</p>
            </div>
            
            <div class="feature-card card">
              <mat-icon class="feature-icon">speed</mat-icon>
              <h3>Quick Results</h3>
              <p>Get detection results in seconds, enabling faster diagnosis and treatment decisions</p>
            </div>
            
            <div class="feature-card card">
              <mat-icon class="feature-icon">verified</mat-icon>
              <h3>High Accuracy</h3>
              <p>95%+ accuracy rate validated by medical professionals and clinical studies</p>
            </div>
            
            <div class="feature-card card">
              <mat-icon class="feature-icon">security</mat-icon>
              <h3>Secure & Private</h3>
              <p>Your medical data is encrypted and protected with industry-standard security measures</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Statistics Section -->
      <section class="section stats">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">Accuracy Rate</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">10K+</div>
              <div class="stat-label">Images Analyzed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Healthcare Partners</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Availability</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 100px 0;
      min-height: 80vh;
      display: flex;
      align-items: center;
    }
    
    .hero .container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 24px;
      color: #1f2937;
    }
    
    .highlight {
      color: #2563EB;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: #6b7280;
      margin-bottom: 40px;
      line-height: 1.6;
    }
    
    .hero-actions {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .hero-image img {
      width: 100%;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    .features {
      background: white;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    
    .feature-card {
      text-align: center;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      border-color: #2563EB;
    }
    
    .feature-icon {
      font-size: 48px;
      color: #2563EB;
      margin-bottom: 20px;
    }
    
    .feature-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1f2937;
    }
    
    .feature-card p {
      color: #6b7280;
      line-height: 1.6;
    }
    
    .stats {
      background: #2563EB;
      color: white;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      text-align: center;
    }
    
    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    
    .stat-label {
      font-size: 1.1rem;
      opacity: 0.9;
    }
    
    @media (max-width: 768px) {
      .hero .container {
        grid-template-columns: 1fr;
        gap: 40px;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-actions {
        justify-content: center;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
      }
    }
  `]
})
export class HomeComponent {}