import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ArticlePage } from '../pages/ArticlePage';
import { ProfilePage } from '../pages/ProfilePage';

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);

  await login.open();

  await login.login(
    'oksana@test6.com',
    'test12345'
  );
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

  await expect(home.firstArticleTitle).toHaveText(title);

  await home.favoriteFirstArticle();

  await expect(home.firstArticleFavoriteButton).toContainText('1');
});

test('Update Profile', async ({ page, browser }) => {
  const home = new HomePage(page);
  const profile = new ProfilePage(page);

  const email = 'oksana@test6.com';
  const currentPassword = 'test12345';
  const bio = `This account was updated by an automated test ${new Date().toLocaleString()}`;

  await home.open();

  await home.openSettings();

  await profile.updateBio(bio, currentPassword);

  await profile.openSettings();

  await expect(profile.bioInput).toHaveValue(bio);

  const newContext = await browser.newContext();
  const newPage = await newContext.newPage();

  const loginInNewSession = new LoginPage(newPage);
  const homeInNewSession = new HomePage(newPage);

  await loginInNewSession.open();

  await loginInNewSession.login(email, currentPassword);

  await expect(homeInNewSession.newArticleButton).toBeVisible();

  await newContext.close();
});