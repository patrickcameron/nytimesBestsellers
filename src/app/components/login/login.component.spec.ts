import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from '../../services/firebase.service';
import { LoginComponent } from './login.component';

describe('Component: Login', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    let mockFirebaseService = {
        login: function() { 
            return new Promise((resolve, reject) => {
                resolve();
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LoginComponent ],
            providers: [ 
                { provide: FirebaseService, useValue: mockFirebaseService } 
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onSubmit()', () => {
        spyOn(mockFirebaseService, 'login').and.callThrough();
        component.onSubmit();
        expect(mockFirebaseService.login).toHaveBeenCalled();
    });
});