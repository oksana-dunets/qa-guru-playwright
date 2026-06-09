export class HomePage {
  constructor(page) {
    this.page = page;

    this.newArticleButton =
      page.locator('a[href="#/editor"]');

    this.userMenuButton =
      page.locator('.nav-link.dropdown-toggle', {
        hasText: 'Oksana'
      });

    this.settingsButton =
      page.locator('a[href="#/settings"]');

    this.globalFeedButton =
      page.locator('.feed-toggle .nav-link', {
        hasText: 'Global Feed'
      });

    this.firstArticlePreview =
      page.locator('.article-preview')
        .filter({
          has: page.locator('h1')
        })
        .first();

    this.firstArticleTitle =
      this.firstArticlePreview.locator('h1');

    this.firstArticleFavoriteButton =
      this.firstArticlePreview.locator('button').first();
  }

  async open() {
    await this.page.goto('https://realworld.qa.guru/#/');
  }

  async clickNewArticle() {
    await this.newArticleButton.click();
  }

  async openSettings() {
    await this.userMenuButton.click();

    await this.settingsButton.click();
  }

  async openGlobalFeed() {
    await this.globalFeedButton.click();

    await this.firstArticleTitle.waitFor({
      state: 'visible',
      timeout: 15000
    });
  }

  async favoriteFirstArticle() {
    await this.firstArticleFavoriteButton.click();
  }
}