import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {
    Inject,
    Injectable,
    PLATFORM_ID,
    Renderer2,
    RendererFactory2,
} from '@angular/core';
import {AngularCallTouchCounterConfig} from './angular-call-touch-counter.config';

@Injectable({
    providedIn: 'root',
})
export class AngularCallTouchCounterService {
    private renderer: Renderer2;
    private doc: Document;

    constructor(
        @Inject(DOCUMENT) private documentRef: any,
        @Inject(PLATFORM_ID) private platformId: Object,
        private rendererFactory: RendererFactory2,
        private config: AngularCallTouchCounterConfig,
    ) {
        this.doc = this.documentRef as Document;
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    /**
     * Initialize CallTouch Counter tracking script
     * - Adds the script to page's head
     */
    initialize(counterId: string = this.config.counterId): void {
        if (this.isLoaded()) {
            console.warn(
                'Tried to initialize a CallTouch Counter instance while another is already active. Please call `remove()` before initializing a new instance.',
            );

            return;
        }

        this.config.enabled = true;
        this.addCallTouchCounterScript(counterId);
    }

    /** Remove the CallTouch Counter tracking script */
    remove(): void {
        this.removeCallTouchCounterScript();
        this.config.enabled = false;
    }

    /**
     * Adds CallTouch Counter tracking script to the application
     * @param counterId CallTouch Counter ID to use
     */
    private addCallTouchCounterScript(counterId: string): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const counterCode = `(function(w,d,n,c){w.CalltouchDataObject=n;w[n]=function(){w[n]["callbacks"].push(arguments)};if(!w[n]["callbacks"]){w[n]["callbacks"]=[]}w[n]["loaded"]=false;if(typeof c!=="object"){c=[c]}w[n]["counters"]=c;for(var i=0;i<c.length;i+=1){p(c[i])}function p(cId){var a=d.getElementsByTagName("script")[0],s=d.createElement("script"),i=function(){a.parentNode.insertBefore(s,a)},m=typeof Array.prototype.find === 'function',n=m?"init-min.js":"init.js";s.type="text/javascript";s.async=true;s.src="https://mod.calltouch.ru/"+n+"?id="+cId;if(w.opera=="[object Opera]"){d.addEventListener("DOMContentLoaded",i,false)}else{i()}}})(window,document,"ct","${counterId}");`;

        const scriptElement = this.renderer.createElement('script');

        this.renderer.setAttribute(scriptElement, 'id', 'calltouch-counter-script');
        this.renderer.setAttribute(scriptElement, 'type', 'text/javascript');
        this.renderer.setProperty(scriptElement, 'innerHTML', counterCode);
        this.renderer.appendChild(this.doc.head, scriptElement);
    }

    /** Remove CallTouch Counter tracking script from the application */
    private removeCallTouchCounterScript(): void {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }

        const callTouchCounterElement = this.doc.getElementById(
            'calltouch-counter-script',
        );

        if (callTouchCounterElement) {
            callTouchCounterElement.remove();
        }
    }

    /** Checks if the script element is present */
    private isLoaded(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const callTouchCounterElement = this.doc.getElementById(
                'calltouch-counter-script',
            );

            return !!callTouchCounterElement;
        }

        return false;
    }
}
