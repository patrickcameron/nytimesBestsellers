import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookComponent } from './book.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BooktitlePipe } from '../../pipes/booktitle.pipe';

fdescribe('BookComponent', () => {
    let component: BookComponent;
    let fixture: ComponentFixture<BookComponent>;
    let mockFirebaseService: any;

    beforeEach(async(() => {
        mockFirebaseService = {};

        TestBed.configureTestingModule({
            declarations: [ BookComponent, BooktitlePipe ],
            providers: [
              // NOTE: Here we inject a mocked version of the FirebaseService.
              { provide: FirebaseService, useValue: mockFirebaseService },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BookComponent);
        component = fixture.componentInstance;
        // NOTE: We provide a minimal version of the 'book' input. This is
        // required, as the corresponding template operates on the book data
        // directly.
        component.book = ({
          primary_isbn13: '',
          title: '',
        } as any);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
