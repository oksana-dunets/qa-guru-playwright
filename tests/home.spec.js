import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ArticlePage } from '../pages/ArticlePage';
import { ProfilePage } from '../pages/ProfilePage';

test.beforeEach(async ({ page }) => {
  await page.goto('https://realworld.qa.guru/#/login');

  await page.getByPlaceholder('Email').fill('oksana@test6.com');
  await page.getByPlaceholder('Password').fill('test12345');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.locator('a[href="#/editor"]')
  ).toBeVisible();
});

test('Create Article', async ({ page }) => {
  const home = new HomePage(page);
  const article = new ArticlePage(page);

  const title = `Article ${Date.now()}`;

  await home.clickNewArticle();

  await article.createArticle(
    title,
    'Created by autotest',
    'Test article body'
  );


  await expect(article.articleTitle).toHaveText(title);


});

test('Edit Article', async ({ page }) => {
  const home = new HomePage(page);
  const article = new ArticlePage(page);

  const title = `Article ${Date.now()}`;
  const updatedTitle = `Updated ${Date.now()}`;

  await home.open();

  await home.clickNewArticle();

  await article.createArticle(
    title,
    'Сreated by autotest',
    'Test article body'
  );

  await article.openEditArticle();

  await article.updateArticleTitle(updatedTitle);

  await expect(article.articleTitle).toHaveText(updatedTitle);
});


test('Delete Article', async ({ page }) => {
  const home = new HomePage(page);
  const article = new ArticlePage(page);

  const title = `Article ${Date.now()}`;

  await home.open();

  await home.clickNewArticle();

  await article.createArticle(
    title,
    'Сreated by autotest',
    'Test article body'
  );

  await article.deleteArticle();

  await expect(page).toHaveURL('https://realworld.qa.guru/#/');
});


test('Favorite Article', async ({ page }) => {
  const home = new HomePage(page);
  const article = new ArticlePage(page);

  const title = `Article ${Date.now()}`;

  await home.open();

  await home.clickNewArticle();

  await article.createArticle(
    title,
    'Сreated by autotest',
    'Test article body'
  );

  await expect(article.articleTitle).toHaveText(title);

  await home.open();

  await home.openGlobalFeed();

  await expect(home.firstArticleTitle).toHaveText(title, {
    timeout: 15000
  });

  await home.favoriteFirstArticle();

  await expect(home.firstArticleFavoriteButton).toContainText('1');
});

test('Update Profile', async ({ page }) => {
  const home = new HomePage(page);
  const profile = new ProfilePage(page);

  const bio = `This account was updated by an automated test ${new Date().toLocaleString()}`;
  const password = 'test12345';

  await home.open();

  await home.openSettings();

  await profile.updateBio(bio, password);

  await profile.openSettings();

  await expect(profile.bioInput).toHaveValue(bio);
});


