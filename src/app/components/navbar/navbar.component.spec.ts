import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { of } from 'rxjs';

describe('Component: Navbar', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let mockFirebaseService: jasmine.SpyObj<FirebaseService>;

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
});