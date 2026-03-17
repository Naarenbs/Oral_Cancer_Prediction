import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="about">
      <div class="container">
        <!-- Hero Section -->
        <section class="hero">
          <div class="hero-content">
            <h1>About OralCare AI</h1>
            <p>
              We're on a mission to revolutionize oral cancer detection through 
              cutting-edge artificial intelligence technology, making early diagnosis 
              accessible to healthcare professionals worldwide.
            </p>
          </div>
        </section>

        <!-- Mission Section -->
        <section class="section mission">
          <div class="content-grid">
            <div class="text-content">
              <h2>Our Mission</h2>
              <p>
                Oral cancer affects millions worldwide, with early detection being 
                crucial for successful treatment. Our AI-powered platform provides 
                healthcare professionals with advanced tools to identify potential 
                cases early, ultimately saving lives and improving patient outcomes.
              </p>
              <p>
                By combining machine learning with medical expertise, we're making 
                sophisticated diagnostic capabilities accessible to clinics and 
                hospitals of all sizes, democratizing access to advanced healthcare technology.
              </p>
            </div>
            <div class="image-content">
              <img src="https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg" alt="Medical team">
            </div>
          </div>
        </section>

        <!-- Technology Section -->
        <section class="section technology">
          <h2 class="section-title">Our Technology</h2>
          <div class="tech-grid">
            <div class="tech-card card">
              <mat-icon class="tech-icon">psychology</mat-icon>
              <h3>Deep Learning</h3>
              <p>Advanced neural networks trained on thousands of medical images for accurate pattern recognition.</p>
            </div>
            <div class="tech-card card">
              <mat-icon class="tech-icon">biotech</mat-icon>
              <h3>Medical AI</h3>
              <p>Specialized algorithms designed specifically for medical imaging and diagnostic applications.</p>
            </div>
            <div class="tech-card card">
              <mat-icon class="tech-icon">cloud</mat-icon>
              <h3>Cloud Computing</h3>
              <p>Scalable cloud infrastructure ensuring fast processing and secure data handling.</p>
            </div>
            <div class="tech-card card">
              <mat-icon class="tech-icon">verified</mat-icon>
              <h3>Clinical Validation</h3>
              <p>Rigorously tested and validated by medical professionals in real-world clinical settings.</p>
            </div>
          </div>
        </section>

        <!-- Team Section -->
        <section class="section team">
          <h2 class="section-title">Our Team</h2>
          <p class="section-subtitle">
            A diverse team of AI researchers, medical professionals, and software engineers 
            working together to advance healthcare technology.
          </p>
          
          <div class="team-grid">
            <div class="team-member card">
              <img src="assets/images/kamal.jpg" alt="Kamalesh">
              <h4>Kamalesh</h4>
              <p class="role">Website</p>
            </div>

           
            <div class="team-member card">
              <img src="assets/images/Naaren.jpg" alt="Naaren">
              <h4>Naaren</h4>
              <p class="role">ML Model</p>        
            </div>

             <div class="team-member card">
              <img src="assets/images/Charan.jpg" alt="Charan">
              <h4>Charan</h4>
              <p class="role"></p>        
            </div>

            <div class="team-member card">
              <img src="assets/images/Jeevan.jpg" alt="Jeevan">
              <h4>Jeevan</h4>
              <p class="role"></p>        
            </div>

          </div>
        </section>

        <!-- Impact Section -->
        <section class="section impact">
          <h2 class="section-title">Our Impact</h2>
          <div class="impact-stats">
            <div class="stat-card">
              <div class="stat-number">500+</div>
              <div class="stat-label">Healthcare Partners</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Images Analyzed</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">95%</div>
              <div class="stat-label">Accuracy Rate</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">50+</div>
              <div class="stat-label">Countries Served</div>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section class="section contact">
          <div class="contact-content card">
            <h2>Get In Touch</h2>
            <p>
              Interested in partnering with us or learning more about our technology? 
              We'd love to hear from you.
            </p>
            
            <div class="contact-info">
              <div class="contact-item">
                <mat-icon>email</mat-icon>
                <span>contact&#64;oralcareai.com</span>
              </div>
              <div class="contact-item">
                <mat-icon>phone</mat-icon>
                <span>+91 00000 00000</span>
              </div>
              <div class="contact-item">
                <mat-icon>location_on</mat-icon>
                <span></span>
              </div>
            </div>
            
            <button class="btn btn-primary">Contact Us</button>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .about {
      background: white;
    }

    .hero {
      background: linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%);
      color: white;
      padding: 100px 0;
      text-align: center;
    }

    .hero h1 {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 24px;
    }

    .hero p {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
      opacity: 0.9;
    }

    .mission {
      background: #f8fafc;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }

    .content-grid h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 24px;
      color: #1f2937;
    }

    .content-grid p {
      color: #6b7280;
      line-height: 1.7;
      margin-bottom: 20px;
    }

    .image-content img {
      width: 100%;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }

    .technology {
      background: white;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .tech-card {
      text-align: center;
      border: 1px solid #e5e7eb;
      transition: all 0.3s ease;
    }

    .tech-card:hover {
      border-color: #2563EB;
      transform: translateY(-4px);
    }

    .tech-icon {
      font-size: 48px;
      color: #2563EB;
      margin-bottom: 20px;
    }

    .tech-card h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #1f2937;
    }

    .tech-card p {
      color: #6b7280;
      line-height: 1.6;
    }

    .team {
      background: #f8fafc;
    }

    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }

    .team-member {
      text-align: center;
      border: 1px solid #e5e7eb;
      padding: 20px;
    }

    .team-member img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 20px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .team-member h4 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #1f2937;
    }

    .role {
      color: #2563EB;
      font-weight: 500;
      margin-bottom: 12px;
    }

    .impact {
      background: white;
    }

    .impact-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 30px;
    }

    .stat-card {
      text-align: center;
      padding: 40px 20px;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 800;
      color: #2563EB;
      margin-bottom: 12px;
    }

    .stat-label {
      color: #6b7280;
      font-weight: 500;
    }

    .contact {
      background: #f8fafc;
    }

    .contact-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      border: 1px solid #e5e7eb;
      padding: 40px;
    }

    .contact-content h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 16px;
      color: #1f2937;
    }

    .contact-content p {
      color: #6b7280;
      margin-bottom: 32px;
      line-height: 1.6;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      color: #374151;
    }

    .contact-item mat-icon {
      color: #2563EB;
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 2.5rem;
      }

      .content-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .tech-grid {
        grid-template-columns: 1fr;
      }

      .impact-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      .contact-info {
        text-align: left;
      }
    }
  `]
})
export class AboutComponent {}
