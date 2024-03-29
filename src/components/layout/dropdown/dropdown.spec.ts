import { FullscreenOverlayContainer, OverlayContainer } from '@angular/cdk/overlay';
import { Component, Provider, Type, ViewChild } from '@angular/core';
import {
    ComponentFixture,
    ComponentFixtureAutoDetect,
    fakeAsync,
    inject,
    TestBed,
    tick,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownTriggerDirective } from './dropdown-trigger.directive';
import { DropdownModule } from './dropdown.module';

@Component({
    template: `
        <button id="another">Another button</button>
        <button [dshDropdownTriggerFor]="dropdown" id="toggle">
            <span id="toggle-content">Toggle</span>
        </button>
        <dsh-dropdown #dropdown="dshDropdown" width="400px"
            ><ng-template>Text</ng-template></dsh-dropdown
        >
    `,
})
class SimpleDropdownComponent {
    @ViewChild(DropdownTriggerDirective) trigger: DropdownTriggerDirective;
}

describe('DshDropdown', () => {
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: unknown[] = [],
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [DropdownModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ...providers],
        }).compileComponents();

        inject([OverlayContainer], (oc: FullscreenOverlayContainer) => {
            overlayContainer = oc;
            overlayContainerElement = oc.getContainerElement();
        })();

        return TestBed.createComponent<T>(component);
    }

    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
    }));

    describe('DropdownTriggerDirective API', () => {
        it('should open the dropdown', () => {
            const fixture = createComponent(SimpleDropdownComponent);
            expect(overlayContainerElement.textContent).toBe('');
            fixture.componentInstance.trigger.open();
            expect(overlayContainerElement.textContent).toContain('Text');
        });

        it('should close the dropdown', fakeAsync(() => {
            const fixture = createComponent(SimpleDropdownComponent);
            fixture.componentInstance.trigger.open();
            fixture.componentInstance.trigger.close();
            tick(500);
            expect(overlayContainerElement.textContent).toBe('');
        }));

        it('should toggle the dropdown', fakeAsync(() => {
            const fixture = createComponent(SimpleDropdownComponent);
            fixture.componentInstance.trigger.toggle();
            expect(overlayContainerElement.textContent).toContain('Text');
            fixture.componentInstance.trigger.toggle();
            tick(500);
            expect(overlayContainerElement.textContent).toBe('');
        }));
    });

    describe('dshDropdownTriggerFor', () => {
        it('should toggle the dropdown by triggerFor click', fakeAsync(() => {
            const fixture = createComponent(SimpleDropdownComponent);
            const button = fixture.nativeElement.querySelector('#toggle');
            button.click();
            expect(overlayContainerElement.textContent).toContain('Text');
            button.click();
            tick(500);
            expect(overlayContainerElement.textContent).toBe('');
        }));

        it('should toggle the dropdown by triggerFor inside element click', fakeAsync(() => {
            const fixture = createComponent(SimpleDropdownComponent);
            const button = fixture.nativeElement.querySelector('#toggle-content');
            button.click();
            expect(overlayContainerElement.textContent).toContain('Text');
            button.click();
            tick(500);
            expect(overlayContainerElement.textContent).toBe('');
        }));
    });

    describe('backdrop', () => {
        it('should do nothing the dropdown by backdrop (another element) click', fakeAsync(() => {
            const fixture = createComponent(SimpleDropdownComponent);
            const button = fixture.nativeElement.querySelector('#another');
            fixture.componentInstance.trigger.open();
            expect(overlayContainerElement.textContent).toContain('Text');
            button.click();
            tick(500);
            expect(overlayContainerElement.textContent).toContain('Text');
        }));
    });

    it('should less or equal specified width', fakeAsync(() => {
        const fixture = createComponent(SimpleDropdownComponent);
        fixture.componentInstance.trigger.open();
        tick(500);
        const overlayEl = overlayContainerElement.querySelector('.cdk-overlay-pane');
        expect(overlayEl.getBoundingClientRect().width).toBeLessThanOrEqual(400);
    }));
});
