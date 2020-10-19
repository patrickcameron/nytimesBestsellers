import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('Component: Navbar', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockFirebaseService: jasmine.SpyObj<FirebaseService>;
    let loggedInButtonsEl: DebugElement;
    let loggedOutButtonsEl: DebugElement;

    beforeEach(async(() => {
        mockFirebaseService = jasmine.createSpyObj(
            'FirebaseService', 
            {
                getAuth: of(null), 
                getSavedBooks: of({length: 10}),
                logout: () => null
            }
        );

        TestBed.configureTestingModule({
            declarations: [ NavbarComponent ],
            providers: [
                { provide: FirebaseService, useValue: mockFirebaseService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getSavedBooksCount()', () => {
        component.getSavedBooksCount();
        expect(component.savedBooksCount).toBe(10);
        expect(mockFirebaseService.getSavedBooks).toHaveBeenCalled();
    });

    it('logout()', () => {
        component.logout();
        expect(mockFirebaseService.logout).toHaveBeenCalled();
    });

    describe('when user is logged in', () => {
        it('should display My Books and Logout buttons', () => {
            component.isLoggedIn = true;
            fixture.detectChanges();
            loggedInButtonsEl = fixture.debugElement.query(By.css('.buttons.is-logged-in'));
            loggedOutButtonsEl = fixture.debugElement.query(By.css('.buttons.is-logged-out'));
            expect(loggedInButtonsEl).toBeDefined();
            expect(loggedOutButtonsEl).toBeNull();
        })
    });

    describe('when user is logged out', () => {
        it('should display Sign Up and Log In buttons', () => {
            component.isLoggedIn = false;
            fixture.detectChanges();
            loggedOutButtonsEl = fixture.debugElement.query(By.css('.buttons.is-logged-out'));
            loggedInButtonsEl = fixture.debugElement.query(By.css('.buttons.is-logged-in'));
            expect(loggedOutButtonsEl).toBeDefined();
            expect(loggedInButtonsEl).toBeNull();
        })
    })
});