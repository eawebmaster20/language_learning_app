import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainQuizComponent } from './main-quiz.component';

describe('VocabularyComponent', () => {
  let component: MainQuizComponent;
  let fixture: ComponentFixture<MainQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainQuizComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
