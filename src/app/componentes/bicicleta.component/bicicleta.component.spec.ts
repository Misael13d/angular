import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BicicletaComponent } from './bicicleta.component';

describe('BicicletaComponent', () => {
  let component: BicicletaComponent;
  let fixture: ComponentFixture<BicicletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BicicletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
