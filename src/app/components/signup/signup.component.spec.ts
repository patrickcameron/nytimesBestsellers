import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../../services/firebase.service';
import { SignupComponent } from './signup.component';

describe('Component: Sign Up', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;

    let mockFirebaseService = {
        register: function(email: string, password: string) {
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
    }

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [ SignupComponent ],
            providers: [
                { provide: FirebaseService, useValue: mockFirebaseService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onSubmit()', () => {
        spyOn(mockFirebaseService, 'register').and.callThrough();
        component.onSubmit();
        expect(mockFirebaseService.register).toHaveBeenCalled();
    });
})