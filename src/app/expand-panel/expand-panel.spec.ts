import { Component, Type, Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

import { ExpandPanelModule } from './expand-panel.module';
import { PaletteColor } from '../theme-manager';

@Component({
    template: `
        <dsh-expand-panel [expanded]="expanded" [color]="color">
            Hello world
            <dsh-expand-panel-content>
                Content
            </dsh-expand-panel-content>
        </dsh-expand-panel>
    `
})
class SampleExpandPanelComponent {
    expanded = false;
    color: PaletteColor;
}

const TITLE_SELECTOR = By.css('.dsh-expand-panel-header > div');
const CONTENT_SELECTOR = By.css('.dsh-expand-panel-content');
const EXPANDER_SELECTOR = By.css('.arrow');
const ROOT_SELECTOR = By.css('.dsh-expand-panel');

describe('ExpandPanel', () => {
    function createComponent<T>(
        component: Type<T>,
        providers: Provider[] = [],
        declarations: any[] = []
    ): ComponentFixture<T> {
        TestBed.configureTestingModule({
            imports: [ExpandPanelModule, NoopAnimationsModule],
            declarations: [component, ...declarations],
            providers
        }).compileComponents();
        const fixture = TestBed.createComponent<T>(component);
        fixture.detectChanges();
        return fixture;
    }

    it('should render content', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        expect(fixture.debugElement.query(TITLE_SELECTOR).nativeElement.textContent.trim()).toBe('Hello world');
    });

    it('should expanded when settting expanded param', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(CONTENT_SELECTOR).nativeElement.textContent.trim()).toBe('Content');
    });

    it('should expanded when click', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        fixture.debugElement.query(EXPANDER_SELECTOR).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(CONTENT_SELECTOR).nativeElement.textContent.trim()).toBe('Content');
    });

    it('should collapsed when settting click', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        fixture.componentInstance.expanded = true;
        fixture.detectChanges();
        fixture.debugElement.query(EXPANDER_SELECTOR).nativeElement.click();
        fixture.detectChanges();
        expect(fixture.debugElement.query(TITLE_SELECTOR).nativeElement.textContent.trim()).toBe('Hello world');
    });

    it('should change class when settting color', () => {
        const fixture = createComponent(SampleExpandPanelComponent);
        const baseClass = fixture.debugElement.query(ROOT_SELECTOR).nativeElement.className;
        fixture.componentInstance.color = PaletteColor.primary;
        fixture.detectChanges();
        const newClass = fixture.debugElement.query(ROOT_SELECTOR).nativeElement.className;
        expect(baseClass).not.toBe(newClass);
    });
});