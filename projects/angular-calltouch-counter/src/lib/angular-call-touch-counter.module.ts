import {CommonModule, isPlatformBrowser} from '@angular/common';
import {Inject, ModuleWithProviders, NgModule, PLATFORM_ID} from '@angular/core';
import {AngularCallTouchCounterConfig} from './angular-call-touch-counter.config';
import {AngularCallTouchCounterConfiguration} from './angular-call-touch-counter.models';
import {AngularCallTouchCounterService} from './angular-call-touch-counter.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
})
export class AngularCallTouchCounterModule {
    private static config: AngularCallTouchCounterConfiguration | null = null;

    constructor(
        private angularCallTouchCounter: AngularCallTouchCounterService,
        @Inject(PLATFORM_ID) platformId: Object,
    ) {
        if (!AngularCallTouchCounterModule.config) {
            throw Error(
                'angular-calltouch-counter not configured correctly. Pass the `counterId` property to the `forRoot()` function',
            );
        }

        if (
            AngularCallTouchCounterModule.config.enabled &&
            isPlatformBrowser(platformId)
        ) {
            this.angularCallTouchCounter.initialize();
        }
    }

    /**
     * Initialize the Angular CallTouch Counter Module
     *
     * Add your CallTouch Counter ID as parameter
     */
    static forRoot(
        config: AngularCallTouchCounterConfiguration,
    ): ModuleWithProviders<AngularCallTouchCounterModule> {
        this.config = config;

        const counterId = config.counterId;

        this.verifyCounterId(counterId);

        return {
            ngModule: AngularCallTouchCounterModule,
            providers: [
                AngularCallTouchCounterService,
                {provide: AngularCallTouchCounterConfig, useValue: config},
            ],
        };
    }

    /**
     * Verifies the Counter ID that was passed into the configuration.
     * - Checks if Counter was initialized
     * @param counterId Counter ID to verify
     */
    private static verifyCounterId(counterId: string): void {
        if (counterId === null || counterId === undefined || counterId.length === 0) {
            throw Error(
                'Invalid CallTouch Counter ID. Did you pass the ID into the forRoot() function?',
            );
        }
    }
}
