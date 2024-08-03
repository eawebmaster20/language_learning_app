import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueSimulationComponent } from './dialogue-simulation.component';

describe('DialogueSimulationComponent', () => {
  let component: DialogueSimulationComponent;
  let fixture: ComponentFixture<DialogueSimulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueSimulationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogueSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
