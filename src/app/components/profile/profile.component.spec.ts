import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { FirebaseService } from 'src/app/services/firebase.service';
import { of } from 'rxjs';

const mockBestsellerList = [
    {
        author: "Nicholas Sparks",
        book_image: "https://s1.nyt.com/du/books/images/9781538728574.jpg",
        book_image_height: 500,
        book_image_width: 329,
        contributor: "by Nicholas Sparks",
        contributor_note: "",
        dagger: 0,
        description: "A doctor serving in the Navy in Afghanistan goes back to North Carolina where two women change his life.",
        first_chapter_link: "",
        isSaved: true,
        price: 0,
        primary_isbn10: "1538728575",
        primary_isbn13: "9781538728574",
        publisher: "Grand Central",
        rank: 1,
        rank_last_week: 1,
        sunday_review_link: "",
        title: "THE RETURN",
        weeks_on_list: 2
    },
    {
        age_group: "",
        amazon_product_url: "https://www.amazon.com/dp/0062667637?tag=NYTBSREV-20&tag=NYTBS-20",
        article_chapter_link: "",
        asterisk: 0,
        author: "Rumaan Alam",
        book_image: "https://s1.nyt.com/du/books/images/9780062667632.jpg",
        book_image_height: 500,
        book_image_width: 329,
        book_review_link: "",
        book_uri: "nyt://book/c18d626f-6662-5ace-ad9d-331f474cf614",
        contributor: "by Rumaan Alam",
        contributor_note: "",
        dagger: 0,
        description: "A family vacation in an isolated part of Long Island is thrown into confusion when the home’s owners return claiming New York City is having a blackout.",
        first_chapter_link: "",
        isSaved: false,
        price: 0,
        primary_isbn10: "0062667637",
        primary_isbn13: "9780062667632",
        publisher: "Ecco",
        rank: 3,
        rank_last_week: 0,
        sunday_review_link: "",
        title: "LEAVE THE WORLD BEHIND",
        weeks_on_list: 1
    }
]

describe('Component: Profile', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let mockFirebaseService: jasmine.SpyObj<FirebaseService>;

    beforeEach(async(() => {
        mockFirebaseService = jasmine.createSpyObj(
            'FirebaseService',
            {
                getSavedBooks: of(mockBestsellerList),
                removeBook: () => null
            }
        );

        TestBed.configureTestingModule({
            declarations: [ ProfileComponent ],
            providers: [
                { provide: FirebaseService, useValue: mockFirebaseService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get books from firebaseService.getSavedBooks() on init', () => {
        component.ngOnInit();
        expect(mockFirebaseService.getSavedBooks).toHaveBeenCalled();
    });

    it('removeBook()', () => {
        component.removeBook('1234');
        expect(mockFirebaseService.removeBook).toHaveBeenCalledWith('1234');
    });
});