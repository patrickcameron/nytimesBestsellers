import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { BooksComponent } from './books.component';
import { NytimesService } from 'src/app/services/nytimes.service';
import { FirebaseService } from 'src/app/services/firebase.service';

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

describe('Component: Books', () => {
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    let mockFirebaseService: jasmine.SpyObj<FirebaseService>;
    let mockNytimesService: jasmine.SpyObj<NytimesService>;

    beforeEach(async(() => {
        mockFirebaseService = jasmine.createSpyObj('FirebaseService', ['getAuth', 'getSavedBooks']);
        mockNytimesService = jasmine.createSpyObj('NytimesService', ['getBestsellerList']);

        TestBed.configureTestingModule({
            declarations: [BooksComponent],
            providers: [
                { provide: FirebaseService, useClass: mockFirebaseService },
                { provide: NytimesService, useValue: mockNytimesService }
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;
        component.books = mockBestsellerList;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })
})