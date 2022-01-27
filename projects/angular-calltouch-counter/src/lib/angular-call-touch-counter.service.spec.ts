import {TestBed} from '@angular/core/testing';
import {AngularCallTouchCounterService} from 'angular-calltouch-counter';
import {AngularCallTouchCounterConfig} from './angular-call-touch-counter.config';

describe('AngularMailRuCounterService', () => {
    let service: AngularCallTouchCounterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{provide: AngularCallTouchCounterConfig, useValue: {}}],
        });
        service = TestBed.inject(AngularCallTouchCounterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
