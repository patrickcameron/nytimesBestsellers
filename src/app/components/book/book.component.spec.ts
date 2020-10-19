import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookComponent } from './book.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { BooktitlePipe } from '../../pipes/booktitle.pipe';

describe('Component: Book', () => {
    let component: BookComponent;
    let fixture: ComponentFixture<BookComponent>;
    let mockFirebaseService: jasmine.SpyObj<FirebaseService>;

    beforeEach(async(() => {
        mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['removeBook', 'saveBook']);

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

    describe('when parameter "context" is set to "home"', () => {
      beforeEach(() => {
        component.context = 'home';
        fixture.detectChanges();
      });

      it('book rank should display', () => {
        expect(fixture.debugElement.query(By.css('.book-rank'))).toBeDefined();
      });

      it('save button should display', () => {
        expect(fixture.debugElement.query(By.css('.button--save'))).toBeDefined();
      });
    });

    describe('when paramater "context" is set to "profile"', () => {
      beforeEach(() => {
        component.context = 'profile';
        fixture.detectChanges();
      });

      it('book rank should not display', () => {
        expect(fixture.debugElement.query(By.css('.book-rank'))).toBeNull();
      });

      it('remove button should display', () => {
        expect(fixture.debugElement.query(By.css('.button--remove'))).toBeDefined();
      });
    })

    describe('toggleSaveBook()', () => {
      describe('when the book is not saved', () => {
        it('should save the book', () => {
          const book: any = { isSaved: false };

          component.toggleSaveBook(book);

          expect(book.isSaved).toBe(true);
          expect(mockFirebaseService.saveBook).toHaveBeenCalledWith(book);
        });
      });

      describe('when the book is saved', () => {
        it('should unsave the book', () => {
          const primary_isbn13 = String(Math.random());
          const book: any = { isSaved: true, primary_isbn13 };

          component.toggleSaveBook(book);

          expect(book.isSaved).toBe(false);
          expect(mockFirebaseService.removeBook).toHaveBeenCalledWith(primary_isbn13);
        });
      });
    });
});
