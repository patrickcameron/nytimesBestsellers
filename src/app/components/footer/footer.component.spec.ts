import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core'; 
import { FooterComponent } from './footer.component';

describe('Component: Footer', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;
    let yearEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FooterComponent ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the current year', () => {
        yearEl = fixture.debugElement.query(By.css('span.year'));
        var expected = new Date().getFullYear().toString();
        var result = yearEl.nativeElement.textContent;
        expect(result).toEqual(expected);
    })
});