import {Injectable} from '@angular/core';

@Injectable()
export class AngularCallTouchCounterConfig {
    /** Whether to start tracking immediately. Default is `false` */
    enabled?: boolean;
    /** Your CallTouch Counter ID */
    counterId!: string;
}
