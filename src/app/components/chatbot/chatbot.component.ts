import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
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
    <div class="chatbot-container" [class.open]="isOpen">
      <!-- Chat Toggle Button -->
      <button class="chat-toggle" (click)="toggleChat()" [class.open]="isOpen">
        <mat-icon>{{ isOpen ? 'close' : 'chat' }}</mat-icon>
      </button>
      
      <!-- Chat Window -->
      <div class="chat-window" *ngIf="isOpen">
        <div class="chat-header">
          <div class="bot-info">
            <div class="bot-avatar">
              <mat-icon>support_agent</mat-icon>
            </div>
            <div class="bot-details">
              <h4>OralCare Assistant</h4>
              <span class="status">Online</span>
            </div>
          </div>
          <button class="minimize-btn" (click)="toggleChat()">
            <mat-icon>remove</mat-icon>
          </button>
        </div>
        
        <div class="chat-messages" #messagesContainer>
          <div class="message" *ngFor="let message of messages" 
               [class.user-message]="message.isUser"
               [class.bot-message]="!message.isUser">
            <div class="message-content">
              <p>{{ message.text }}</p>
              <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
            </div>
          </div>
          
          <div class="typing-indicator" *ngIf="isTyping">
            <div class="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span class="typing-text">Assistant is typing...</span>
          </div>
        </div>
        
        <div class="chat-input">
          <mat-form-field appearance="outline" class="input-field">
            <input matInput 
                   placeholder="Type your message..." 
                   [(ngModel)]="currentMessage"
                   (keydown.enter)="sendMessage()"
                   [disabled]="isTyping">
          </mat-form-field>
          <button class="send-btn btn btn-primary" 
                  (click)="sendMessage()" 
                  [disabled]="!currentMessage.trim() || isTyping">
            <mat-icon>send</mat-icon>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .chatbot-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
    
    .chat-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #2563EB;
      color: white;
      border: none;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .chat-toggle:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }
    
    .chat-toggle.open {
      background: #ef4444;
    }
    
    .chat-toggle.open:hover {
      background: #dc2626;
    }
    
    .chat-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 450px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .chat-header {
      background: #2563EB;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .bot-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .bot-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .bot-details h4 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }
    
    .status {
      font-size: 12px;
      opacity: 0.8;
    }
    
    .minimize-btn {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }
    
    .minimize-btn:hover {
      background: rgba(255,255,255,0.1);
    }
    
    .chat-messages {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .message {
      display: flex;
    }
    
    .user-message {
      justify-content: flex-end;
    }
    
    .bot-message {
      justify-content: flex-start;
    }
    
    .message-content {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 18px;
      position: relative;
    }
    
    .user-message .message-content {
      background: #2563EB;
      color: white;
    }
    
    .bot-message .message-content {
      background: #f3f4f6;
      color: #374151;
    }
    
    .message-content p {
      margin: 0;
      font-size: 14px;
      line-height: 1.4;
    }
    
    .timestamp {
      font-size: 11px;
      opacity: 0.7;
      margin-top: 4px;
      display: block;
    }
    
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 0;
      color: #6b7280;
      font-size: 12px;
    }
    
    .typing-dots {
      display: flex;
      gap: 3px;
    }
    
    .typing-dots span {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #9ca3af;
      animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    .typing-dots span:nth-child(2) {
      animation-delay: -0.16s;
    }
    
    @keyframes typing {
      0%, 80%, 100% {
        transform: scale(0.8);
        opacity: 0.5;
      }
      40% {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .chat-input {
      padding: 16px;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    
    .input-field {
      flex: 1;
      margin: 0;
    }
    
    .send-btn {
      min-width: 44px;
      height: 44px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .send-btn:disabled {
      background: #9ca3af;
      cursor: not-allowed;
    }
    
    @media (max-width: 768px) {
      .chatbot-container {
        bottom: 16px;
        right: 16px;
      }
      
      .chat-window {
        width: calc(100vw - 32px);
        height: 400px;
        bottom: 70px;
        right: -10px;
      }
    }
  `]
})
export class ChatbotComponent {
  isOpen = false;
  isTyping = false;
  currentMessage = '';
  
  messages: Message[] = [
    {
      text: "Hello! I'm your OralCare AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ];

  predefinedResponses: { [key: string]: string[] } = {
    'hello': ['Hello! How can I assist you with oral cancer detection today?'],
    'Oral Cancer':['Oral cancer is a malignant growth that develops in the mouth or throat tissues, including the lips, tongue, cheeks, and gums.'],
    'help': ['I can help you with questions about oral cancer, our AI detection system, and how to use our platform.'],
    'accuracy': ['Our AI model has a 95% accuracy rate, validated through extensive clinical testing.'],
    'symptoms': ['Common oral cancer symptoms include persistent sores, lumps, or white/red patches in the mouth.'],
    'results': ['Results are typically available within seconds of image upload. Remember, always consult a healthcare professional.'],
    'precautions': ['To reduce oral cancer risk, avoid tobacco, limit alcohol, maintain good oral hygiene, and have regular dental check-ups.'],
    'treatment': ['Treatment options for oral cancer include surgery, radiation therapy, and chemotherapy. Consult with a specialist for personalized advice.'],
    'diet': ['A balanced diet rich in fruits and vegetables can help support oral health. Avoid processed foods and sugary drinks.'],
    'screening': ['Regular screenings are crucial for early detection of oral cancer. Schedule an appointment with your dentist or healthcare provider.'],
    'detection': ['Our AI detection system uses advanced algorithms to analyze images and identify potential signs of oral cancer.']
  };

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.currentMessage.trim()) return;

    
    this.messages.push({
      text: this.currentMessage,
      isUser: true,
      timestamp: new Date()
    });

    const userMessage = this.currentMessage.toLowerCase();
    this.currentMessage = '';

    this.isTyping = true;
    
    setTimeout(() => {
      this.isTyping = false;
      
     
      let response = "I understand you're asking about that. For specific medical questions, I recommend consulting with a healthcare professional. Is there anything else I can help you with regarding our AI detection system?";
      
      for (const [key, responses] of Object.entries(this.predefinedResponses)) {
        if (userMessage.includes(key)) {
          response = responses[Math.floor(Math.random() * responses.length)];
          break;
        }
      }

      this.messages.push({
        text: response,
        isUser: false,
        timestamp: new Date()
      });

      
      setTimeout(() => {
        const container = document.querySelector('.chat-messages');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }, 1500);
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}