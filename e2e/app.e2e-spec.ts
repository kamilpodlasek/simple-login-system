import { SimpleLoginSystemPage } from './app.po';

describe('simple-login-system App', () => {
  let page: SimpleLoginSystemPage;

  beforeEach(() => {
    page = new SimpleLoginSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
