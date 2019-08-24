import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {XxxAlertModule, XxxErrorHandlerModule, XxxLogModule, XxxMessageModule} from '@app/xxx-common';
import {XxxHeaderModule} from '@app/modules/xxx-header/xxx-header.module';
import {XxxCommentsModule} from '@app/modules/xxx-comments/xxx-comments.module';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    XxxAlertModule,
    XxxCommentsModule,
    XxxErrorHandlerModule,
    XxxHeaderModule,
    XxxLogModule,
    XxxMessageModule
  ]
})

export class AppModule {
}
