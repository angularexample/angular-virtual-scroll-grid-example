import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {XxxAlertService, XxxLogEntry, XxxLogLevelEnum, XxxLogService, XxxMessageService} from '@app/xxx-common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-app',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnDestroy, OnInit {
  appTitle = 'Angular Virtual Scroll Grid Example';
  private subscriptionDataError: Subscription;

  constructor(
      private xxxAlertService: XxxAlertService,
      private xxxLogService: XxxLogService,
      private xxxMessageService: XxxMessageService
  ) {
    this.xxxLogService.log(new XxxLogEntry('AppComponent constructor', XxxLogLevelEnum.INFO));
  }

  ngOnInit(): void {
    this.subscribeToMessages();
  }

  ngOnDestroy() {
    this.subscriptionDataError.unsubscribe();
  }

  private subscribeToMessages(): void {
    this.subscriptionDataError = this.xxxMessageService.subscribe('data.responseError', (payload) => {
      this.xxxAlertService.openAlert(payload.alertType, payload.alertMessage);
    });
  }
}
