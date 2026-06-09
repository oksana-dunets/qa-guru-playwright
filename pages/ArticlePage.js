export class ArticlePage {
  constructor(page) {
    this.page = page;

    this.titleInput =
      page.getByPlaceholder('Article Title');

    this.descriptionInput =
      page.getByPlaceholder("What's this article about?");

    this.bodyInput =
      page.getByPlaceholder('Write your article (in markdown)');

    this.publishButton =
      page.getByRole('button', {
        name: 'Publish Article'
      });

    this.updateArticleButton =
      page.getByRole('button', {
        name: 'Update Article'
      });

    this.articleTitle =
      page.locator('h1');

    this.editArticleButton =
      page.getByRole('link', {
        name: /Edit Article/
      }).first();

    this.deleteArticleButton =
      page.getByRole('button', {
        name: /Delete Article/
      }).first();

    this.favoriteButton =
      page.getByRole('button', {
        name: /Favorite Article/
      }).first();

    this.favoriteCounter =
      page.locator('.counter').first();
  }

  async createArticle(title, description, body) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);

    await this.publishButton.click();
  }

  async openEditArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await this.deleteArticleButton.click();
  }

  async updateArticleTitle(newTitle) {
    await this.titleInput.fill(newTitle);

    await this.updateArticleButton.click();
  }

  async addToFavorites() {
    await this.favoriteButton.click();
  }
}