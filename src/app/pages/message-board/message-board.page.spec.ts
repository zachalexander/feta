import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponentModule } from '../../components/home/home.module';

import { MessageBoardPage } from './message-board.page';

describe('MessageBoardPage', () => {
  let component: MessageBoardPage;
  let fixture: ComponentFixture<MessageBoardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageBoardPage],
      imports: [IonicModule.forRoot(), HomeComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
