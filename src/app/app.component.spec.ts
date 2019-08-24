import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {MockXxxAlertService} from '@app/xxx-common/xxx-alert/mock-xxx-alert.service';
import {MockXxxCommentsModule} from '@app/modules/xxx-comments/mock-xxx-comments.module';
import {MockXxxErrorHandler} from '@app/xxx-common/xxx-error-handler/mock-xxx-error-handler';
import {MockXxxHeaderModule} from '@app/modules/xxx-header/mock-xxx-header.module';
import {MockXxxLogService} from '@app/xxx-common/xxx-log/mock-xxx-log.service';
import {XxxAlertService} from '@app/xxx-common/xxx-alert/xxx-alert.service';
import {AppComponent} from './app.component';
import {XxxErrorHandler} from '@app/xxx-common/xxx-error-handler/xxx-error-handler.service';
import {XxxLogService} from '@app/xxx-common/xxx-log/xxx-log.service';
import {XxxMessage} from '@app/xxx-common/xxx-message/xxx-message';
import {XxxMessageService} from '@app/xxx-common/xxx-message/xxx-message.service';

class XxxLogEntry {
  constructor(message: string, level: any) {
  }
}

describe('XxxAppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hostDebugElement: DebugElement;
  let spyAlertService: jasmine.Spy;
  let spyErrorHandler: jasmine.Spy;
  let spyLogService: jasmine.Spy;
  let xxxAlertService: XxxAlertService;
  let xxxErrorHandler: XxxErrorHandler;
  let xxxLogService: XxxLogService;
  let xxxMessageService: XxxMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MockXxxCommentsModule,
        MockXxxHeaderModule
      ],
      providers: [
        {provide: XxxAlertService, useClass: MockXxxAlertService},
        {provide: XxxErrorHandler, useClass: MockXxxErrorHandler},
        {provide: XxxLogService, useClass: MockXxxLogService},
        XxxMessageService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    xxxAlertService = TestBed.get(XxxAlertService);
    spyAlertService = spyOn(xxxAlertService, 'openAlert');
    xxxErrorHandler = TestBed.get(XxxErrorHandler);
    spyErrorHandler = spyOn(xxxErrorHandler, 'handleError');
    xxxLogService = TestBed.get(XxxLogService);
    spyLogService = spyOn(xxxLogService, 'log');
    xxxMessageService = TestBed.get(XxxMessageService);
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    hostDebugElement = fixture.debugElement;
  });

  it('should create the app component', () => {
    expect(component).toBeDefined();
  });

  it('should run log service on create app component', () => {
    expect(spyLogService).toHaveBeenCalled();
  });

  it('should run alert service when message broadcasts data error', fakeAsync(() => {
    let alertType: string;
    let alertMessage: string;
    const mockMessage = new XxxMessage('data.responseError');
    mockMessage.payload = {
      alertType: 'error',
      alertMessage: 'error msg'
    };
    spyAlertService.and.callFake((type: any, msg: any) => {
      alertMessage = msg;
      alertType = type;
    });
    xxxMessageService.broadcast(mockMessage);
    tick();
    expect(spyAlertService).toHaveBeenCalled();
    expect(alertType).toBe(mockMessage.payload.alertType);
    expect(alertMessage).toBe(mockMessage.payload.alertMessage);
  }));
});
