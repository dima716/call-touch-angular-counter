import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularCallTouchCounterModule} from 'angular-calltouch-counter';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routes';
import {StaticModule} from './modules/static/static.module';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule.withServerTransition({
            appId: 'demo',
        }),
        AppRoutingModule,
        StaticModule,
        AngularCallTouchCounterModule.forRoot({
            enabled: true,
            counterId: 'adffad23',
        }),
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: LocationStrategy,
            useClass: PathLocationStrategy,
        },
    ],
})
export class AppBrowserModule {}
