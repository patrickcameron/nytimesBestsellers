import { BooktitlePipe } from './booktitle.pipe';

describe('BooktitlePipe', () => {
  it('should create', () => {
    const pipe = new BooktitlePipe();
    expect(pipe).toBeTruthy();
  });
  xit('should convert title from uppercase to proper capitalization', () => {
    const pipe = new BooktitlePipe();
    const titles = [
      { 
        title: 'THE EVENING AND THE MORNING',
        expected: 'The Evening and the Morning'
      },
      { 
        title: 'THE COAST-TO-COAST MURDERS',
        expected: 'The Coast-to-Coast Murders'
      }
    ];
    titles.forEach((item) => {
      expect(pipe.transform(item.title)).toEqual(item.expected);
    })
  })

  it('should convert single word titles to title case');

  it('should convert multi word tiles to title case');

  it('should not convert select words to title case')

  it('should treat hyphens as word delimiters')
});
