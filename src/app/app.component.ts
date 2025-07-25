import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageGeneratorComponent } from './image-generator/image-generator.component';
import { CommonModule } from '@angular/common'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageGeneratorComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // optional
})
export class AppComponent {}
