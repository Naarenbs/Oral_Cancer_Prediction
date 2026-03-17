import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface DetectionResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
}

@Component({
  selector: 'app-ml-model',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="ml-model">
      <div class="container">
        <div class="section">
          <h1 class="section-title">AI-Powered Oral Cancer Detection</h1>
          <p class="section-subtitle">
            Upload an image for instant analysis using our advanced machine learning model
          </p>
          
          <div class="detection-container">
            <div class="upload-section card">
              <div class="upload-area" 
                   (click)="fileInput.click()"
                   (dragover)="onDragOver($event)"
                   (dragleave)="onDragLeave($event)"
                   (drop)="onDrop($event)"
                   [class.drag-over]="isDragOver">
                
                <input #fileInput 
                       type="file" 
                       accept="image/*" 
                       (change)="onFileSelected($event)"
                       style="display: none;">
                
                <div class="upload-content" *ngIf="!selectedImage">
                  <mat-icon class="upload-icon">cloud_upload</mat-icon>
                  <h3>Upload Medical Image</h3>
                  <p>Click to select or drag and drop an image</p>
                  <small>Supported formats: JPG, PNG, JPEG</small>
                </div>
                
                <div class="image-preview" *ngIf="selectedImage">
                  <img [src]="selectedImage" alt="Selected image">
                  <button class="remove-btn" (click)="removeImage($event)">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>
              </div>
              
              <div class="upload-actions" *ngIf="selectedImage">
                <button class="btn btn-primary" 
                        (click)="analyzeImage()" 
                        [disabled]="isAnalyzing">
                  <mat-spinner diameter="20" *ngIf="isAnalyzing"></mat-spinner>
                  <span *ngIf="!isAnalyzing">Analyze Image</span>
                  <span *ngIf="isAnalyzing">Analyzing...</span>
                </button>
              </div>
            </div>
            
           <div class="results-section card" *ngIf="result">
              <h3>Analysis Results</h3>

              <div class="result-item">
                <h4>Prediction:</h4>
                <div class="prediction" [class.high-risk]="result.diagnosis === 'High Risk (OSCC Detected)'">
                  {{ result.diagnosis }}
                </div>
              </div>

              <div class="result-item">
                <h4>Confidence Level:</h4>
                <div class="confidence-bar">
                  <div class="confidence-fill" [style.width.%]="result.confidence"></div>
                  <span class="confidence-text">{{ result.confidence.toFixed(1) }}%</span>
                </div>
              </div>

              <div class="result-item" *ngIf="result.recommendations?.length">
                <h4>Recommendations:</h4>
                <ul class="recommendations">
                  <li *ngFor="let rec of result.recommendations">{{ rec }}</li>
                </ul>
              </div>

              <div class="disclaimer">
                <mat-icon>warning</mat-icon>
                <p>
                  <strong>Medical Disclaimer:</strong> This AI tool is for screening purposes only.
                  Always consult with a qualified healthcare professional for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .ml-model {
      min-height: 100vh;
      background: #f8fafc;
      padding-top: 40px;
    }
    
    .detection-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .upload-area {
      border: 3px dashed #cbd5e1;
      border-radius: 12px;
      padding: 60px 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: #f8fafc;
      position: relative;
    }
    
    .upload-area:hover,
    .upload-area.drag-over {
      border-color: #2563EB;
      background: #f0f9ff;
    }
    
    .upload-icon {
      font-size: 64px;
      color: #94a3b8;
      margin-bottom: 20px;
    }
    
    .upload-content h3 {
      font-size: 1.5rem;
      margin-bottom: 12px;
      color: #1f2937;
    }
    
    .upload-content p {
      color: #6b7280;
      margin-bottom: 8px;
    }
    
    .upload-content small {
      color: #9ca3af;
    }
    
    .image-preview {
      position: relative;
      display: inline-block;
    }
    
    .image-preview img {
      max-width: 400px;
      max-height: 300px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .remove-btn {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .upload-actions {
      margin-top: 24px;
      text-align: center;
    }
    
    .results-section {
      margin-top: 32px;
    }
    
    .results-section h3 {
      color: #1f2937;
      margin-bottom: 24px;
      font-size: 1.5rem;
    }
    
    .result-item {
      margin-bottom: 24px;
    }
    
    .result-item h4 {
      color: #374151;
      margin-bottom: 8px;
      font-weight: 600;
    }
    
    .prediction {
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1.2rem;
      background: #10b981;
      color: white;
      display: inline-block;
    }
    
    .prediction.high-risk {
      background: #ef4444;
    }
    
    .confidence-bar {
      position: relative;
      height: 20px;
      background: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .confidence-fill {
      height: 100%;
      background: linear-gradient(90deg, #10b981, #059669);
      transition: width 0.5s ease;
    }
    
    .confidence-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
    
    .recommendations {
      list-style: none;
      padding: 0;
    }
    
    .recommendations li {
      padding: 8px 0;
      padding-left: 24px;
      position: relative;
      color: #374151;
    }
    
    .recommendations li::before {
      content: '•';
      color: #2563EB;
      position: absolute;
      left: 0;
      font-weight: bold;
    }
    
    .disclaimer {
      background: #fef3c7;
      padding: 16px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-top: 24px;
    }
    
    .disclaimer mat-icon {
      color: #f59e0b;
      margin-top: 2px;
    }
    
    .disclaimer p {
      margin: 0;
      font-size: 14px;
      color: #92400e;
      line-height: 1.5;
    }
    
    @media (max-width: 768px) {
      .upload-area {
        padding: 40px 20px;
      }
      
      .image-preview img {
        max-width: 100%;
        max-height: 250px;
      }
    }
  `]
})


export class MlModelComponent {
  selectedImage: string | null = null;
  selectedFile: File | null = null;
  isDragOver = false;
  isAnalyzing = false;
  result: DetectionResult | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.processFile(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFile(files[0]);
    }
  }

  processFile(file: File) {
    if (!file.type.startsWith('image/')) {
      this.snackBar.open('Please select a valid image file', 'Close', { duration: 3000 });
      return;
    }

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.selectedImage = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    this.result = null;
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.selectedImage = null;
    this.selectedFile = null;
    this.result = null;
  }

analyzeImage() {
  if (!this.selectedFile) return;

  this.isAnalyzing = true;

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post<DetectionResult>('http://localhost:5000/predict', formData)
    .subscribe({
      next: (res) => {
        this.result = res;
        this.isAnalyzing = false;
        this.snackBar.open('Analysis completed successfully', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.isAnalyzing = false;
        this.snackBar.open('Error analyzing image', 'Close', { duration: 3000 });
        console.error(err);
      }
    });
}
}