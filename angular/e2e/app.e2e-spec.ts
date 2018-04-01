import { TimelineSliderPage } from './app.po';

describe('timeline-slider App', () => {
  let page: TimelineSliderPage;

  beforeEach(() => {
    page = new TimelineSliderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
