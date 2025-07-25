import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-generator.component.html',
})
export class ImageGeneratorComponent {
  prompt: string = '';
  imageUrl: string = '';
  loading = false;

  

  async generateImage() {
    if (!this.prompt.trim()) return;

    this.loading = true;
    this.imageUrl = '';

    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: this.prompt
      })
    });

    const data = await response.json();

    if (data?.imageUrl) {
      this.imageUrl = data.imageUrl;
    } else {
      alert('Failed to generate image. Try again.');
    }

    this.loading = false;
  }
}
