import { BooktitlePipe } from './booktitle.pipe';

describe('Pipe: booktitle', () => {
  let pipe: BooktitlePipe;

  beforeEach(() => {
    pipe = new BooktitlePipe();
  });

  afterEach(() => {
    pipe = null;
  });

  it('should create', () => {
    const pipe = new BooktitlePipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert single word titles to title case', () => {
    const titles = [
      {
        title: 'CAPITAL',
        expected: 'Capital'
      },
      {
        title: 'JACK',
        expected: 'Jack'
      },
      {
        title: 'THE',
        expected: 'The'
      }
    ]
    titles.forEach(item => {
      expect(pipe.transform(item.title)).toEqual(item.expected);
    })
  });

  it('should convert multi word titles to title case', () => {
    const titles = [
      {
        title: 'THE INVISIBLE LIFE OF ADDIE LARUE',
        expected: 'The Invisible Life of Addie Larue'
      },
      { 
        title: 'THE EVENING AND THE MORNING',
        expected: 'The Evening and the Morning'
      }
    ]
    titles.forEach(item => {
      expect(pipe.transform(item.title)).toBe(item.expected);
    })
  });

  it('should not convert select words to title case unless they are first word in title', () => {
    const titles = [
      {
        title: 'THE EVENING AND THE MORNING',
        expected: 'The Evening and the Morning'
      },
      {
        title: 'THE BOOK OF TWO WAYS',
        expected: 'The Book of Two Ways'
      }
    ]
    titles.forEach(item => {
      expect(pipe.transform(item.title)).toEqual(item.expected);
    })
  })

  it('should treat hyphens as word delimiters', () => {
    const titles = [
      { 
        title: 'THE COAST-TO-COAST MURDERS',
        expected: 'The Coast-to-Coast Murders'
      }
    ]
    titles.forEach(item => {
      expect(pipe.transform(item.title)).toEqual(item.expected);
    })
  })
});
