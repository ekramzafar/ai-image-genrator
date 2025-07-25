// image-generator.component.spec.ts ✅ new name
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGeneratorComponent } from './image-generator.component'; // ✅ fixed import

describe('ImageGeneratorComponent', () => {
  let component: ImageGeneratorComponent;
  let fixture: ComponentFixture<ImageGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGeneratorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
