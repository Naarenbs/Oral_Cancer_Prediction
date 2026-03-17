import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="reviews">
      <div class="container">
        <div class="section">
          <h1 class="section-title">What Healthcare Professionals Say</h1>
          <p class="section-subtitle">
            Trusted by medical professionals worldwide for accurate oral cancer detection
          </p>
          
          <!-- Overall Rating -->
          <div class="overall-rating card">
            <div class="rating-summary">
              <div class="rating-number">4.8</div>
              <div class="stars">
                <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                          [class.filled]="star <= 4.8">star</mat-icon>
              </div>
              <div class="rating-text">Based on {{ reviews.length }} reviews</div>
            </div>
            
            <div class="rating-breakdown">
              <div class="rating-row" *ngFor="let item of ratingBreakdown">
                <span class="stars-count">{{ item.stars }} stars</span>
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="item.percentage"></div>
                </div>
                <span class="percentage">{{ item.percentage }}%</span>
              </div>
            </div>
          </div>
          
          <!-- Reviews List -->
          <div class="reviews-grid">
            <div class="review-card card" *ngFor="let review of reviews">
              <div class="review-header">
                <div class="reviewer-info">
                  
                  <div class="reviewer-details">
                    <h4>{{ review.name }}</h4>
                    <p class="role">{{ review.role }}</p>
                  </div>
                </div>
                <div class="review-meta">
                  <div class="stars">
                    <mat-icon *ngFor="let star of [1,2,3,4,5]" 
                              [class.filled]="star <= review.rating">star</mat-icon>
                  </div>
                  <span class="date">{{ review.date }}</span>
                </div>
              </div>
              
              <div class="review-content">
                <p>{{ review.comment }}</p>
              </div>
            </div>
          </div>
          
          <!-- Add Review Form -->
          <div class="add-review card">
            <h3>Share Your Experience</h3>
            <form (ngSubmit)="submitReview()" #reviewForm="ngForm">
              <div class="form-row">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Your Name</mat-label>
                  <input matInput [(ngModel)]="newReview.name" name="name" required>
                </mat-form-field>
                
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Professional Role</mat-label>
                  <input matInput [(ngModel)]="newReview.role" name="role" required>
                </mat-form-field>
              </div>
              
              <div class="rating-input">
                <label>Rating:</label>
                <div class="stars clickable">
                  <mat-icon *ngFor="let star of [1,2,3,4,5]; let i = index"
                            [class.filled]="star <= newReview.rating"
                            (click)="setRating(star)">star</mat-icon>
                </div>
              </div>
              
              <mat-form-field appearance="outline" class="form-field full-width">
                <mat-label>Your Review</mat-label>
                <textarea matInput rows="4" [(ngModel)]="newReview.comment" name="comment" required></textarea>
              </mat-form-field>
              
              <button type="submit" class="btn btn-primary" [disabled]="!reviewForm.form.valid">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reviews {
      min-height: 100vh;
      background: #f8fafc;
      padding-top: 40px;
    }
    
    .overall-rating {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 40px;
      margin-bottom: 40px;
      align-items: center;
    }
    
    .rating-summary {
      text-align: center;
    }
    
    .rating-number {
      font-size: 4rem;
      font-weight: 800;
      color: #2563EB;
      margin-bottom: 16px;
    }
    
    .stars {
      display: flex;
      justify-content: center;
      gap: 4px;
      margin-bottom: 12px;
    }
    
    .stars mat-icon {
      color: #d1d5db;
      font-size: 24px;
    }
    
    .stars mat-icon.filled {
      color: #fbbf24;
    }
    
    .rating-text {
      color: #6b7280;
      font-size: 14px;
    }
    
    .rating-breakdown {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .rating-row {
      display: grid;
      grid-template-columns: 80px 1fr 60px;
      align-items: center;
      gap: 16px;
      font-size: 14px;
    }
    
    .progress-bar {
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: #fbbf24;
      transition: width 0.3s ease;
    }
    
    .reviews-grid {
      display: grid;
      gap: 24px;
      margin-bottom: 40px;
    }
    
    .review-card {
      border: 1px solid #e5e7eb;
    }
    
    .review-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    
    .reviewer-info {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .reviewer-details h4 {
      margin: 0;
      font-weight: 600;
      color: #1f2937;
    }
    
    .role {
      margin: 4px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }
    
    .review-meta {
      text-align: right;
    }
    
    .date {
      color: #9ca3af;
      font-size: 14px;
      margin-top: 8px;
      display: block;
    }
    
    .review-content p {
      color: #374151;
      line-height: 1.6;
      margin: 0;
    }
    
    .add-review h3 {
      margin-bottom: 24px;
      color: #1f2937;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .form-field {
      width: 100%;
    }
    
    .full-width {
      grid-column: 1 / -1;
    }
    
    .rating-input {
      margin-bottom: 16px;
    }
    
    .rating-input label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #374151;
    }
    
    .stars.clickable mat-icon {
      cursor: pointer;
      transition: color 0.2s ease;
    }
    
    .stars.clickable mat-icon:hover {
      color: #fbbf24;
    }
    
    @media (max-width: 768px) {
      .overall-rating {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .review-header {
        flex-direction: column;
        gap: 16px;
      }
      
      .review-meta {
        text-align: left;
      }
    }
  `]
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Oral Surgeon",
      rating: 5,
      comment: "This AI tool has revolutionized our screening process. The accuracy is remarkable and it helps us catch cases early. Highly recommend for any dental practice.",
      date: "2 weeks ago",
      avatar: "https://images.pexels.com/photos/559827/pexels-photo-559827.jpeg?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Oncologist",
      rating: 5,
      comment: "The confidence levels and detailed analysis help me make better treatment decisions. The interface is intuitive and the results are presented clearly.",
      date: "1 month ago",
      avatar: "https://images.pexels.com/photos/612807/pexels-photo-612807.jpeg?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Dental Specialist",
      rating: 4,
      comment: "Great tool for initial screening. Has helped us identify several cases that might have been missed. The speed of analysis is impressive.",
      date: "1 month ago",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Dr. Robert Kim",
      role: "Pathologist",
      rating: 5,
      comment: "The machine learning model shows excellent diagnostic capability. It's become an essential part of our diagnostic workflow.",
      date: "2 months ago",
      avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?w=100&h=100&fit=crop&crop=face"
    }
  ];

  ratingBreakdown = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 3 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 }
  ];

  newReview = {
    name: '',
    role: '',
    rating: 0,
    comment: ''
  };

  ngOnInit() {}

  setRating(rating: number) {
    this.newReview.rating = rating;
  }

  submitReview() {
    if (this.newReview.name && this.newReview.role && this.newReview.rating && this.newReview.comment) {
      const review: Review = {
        id: this.reviews.length + 1,
        name: this.newReview.name,
        role: this.newReview.role,
        rating: this.newReview.rating,
        comment: this.newReview.comment,
        date: 'Just now',
        avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop&crop=face`
      };

      this.reviews.unshift(review);
      
     
      this.newReview = {
        name: '',
        role: '',
        rating: 0,
        comment: ''
      };
    }
  }
}