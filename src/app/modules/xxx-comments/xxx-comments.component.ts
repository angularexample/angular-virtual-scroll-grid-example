import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';

import {environment} from '@env/environment';
import {XxxAlertService, XxxAlertType, XxxDataService} from '@app/xxx-common';
import {Subscription} from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-comments',
  templateUrl: './xxx-comments.component.html',
  styleUrls: ['./xxx-comments.component.scss']
})
export class XxxCommentsComponent implements OnDestroy, OnInit {
  isLoading = false;
  isError = false;
  isResult = false;
  comments = [];
  commentsSubscription: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private xxxAlertService: XxxAlertService,
              private xxxDataService: XxxDataService) {
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }

  private loadData() {
    this.isLoading = true;
    this.isResult = false;
    this.isError = false;
    this.changeDetectorRef.detectChanges();
    const url = environment.url.api + environment.url.comments;
    this.commentsSubscription = this.xxxDataService.getData(url)
        .subscribe(result => this.onSuccessGetComments(result),
            () => this.onErrorGetComments());
  }

  private onSuccessGetComments(result) {
    this.isLoading = false;
    if (typeof result === 'object'
        && (result.length > 0)) {
      this.comments = result;
      this.isResult = true;
    } else {
      const warningMsg = 'No Results Found';
      this.xxxAlertService.openAlert(XxxAlertType.WARN, warningMsg);
    }
    this.changeDetectorRef.detectChanges();
  }

  // Errors are handled by global interceptor.
  private onErrorGetComments() {
    this.isLoading = false;
    this.isError = true;
    this.changeDetectorRef.detectChanges();
  }

}
