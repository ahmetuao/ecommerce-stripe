import { test, expect } from '@playwright/test';

test.describe('CartCounts Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3003'); // Uygulamanın çalıştığı URL
    await page.click('a[href="/cart"]'); // Sepet sayfasına gitmek için
  });

  test('Ürün ekleme butonu görünür mü?', async ({ page }) => {
    const addButton = await page.waitForSelector('button:has-text("Add")');
    expect(addButton).toBeTruthy(); // 'Add' butonunun görünürlüğünü kontrol et
  });

  test('Ürün ekleme butonuna tıklanıyor mu?', async ({ page }) => {
    await page.click('button:has-text("Add")');
    const incrementButton = await page.waitForSelector('div:has-text("+")');
    expect(incrementButton).toBeTruthy(); // '+' butonunun görünürlüğünü kontrol et
  });

  test('Ürün miktarı artırma butonuna tıklanıyor mu?', async ({ page }) => {
    await page.click('button:has-text("Add")'); // Önce ürünü ekliyoruz
    await page.click('div:has-text("+")'); // '+' butonuna tıklıyoruz
    const itemCount = await page.textContent('div:nth-of-type(3)'); // Ürün miktarını kontrol ediyoruz
    expect(itemCount).toBe('2'); // Ürün miktarının 2 olduğunu kontrol et
  });

  test('Ürün miktarı azaltma butonuna tıklanıyor mu?', async ({ page }) => {
    await page.click('button:has-text("Add")'); // Önce ürünü ekliyoruz
    await page.click('div:has-text("+")'); // Miktarı artırıyoruz
    await page.click('div:has-text("-")'); // '-' butonuna tıklıyoruz
    const itemCount = await page.textContent('div:nth-of-type(3)'); // Ürün miktarını kontrol ediyoruz
    expect(itemCount).toBe('1'); // Ürün miktarının 1 olduğunu kontrol et
  });

  test('Ürün kaldırma butonuna tıklanıyor mu?', async ({ page }) => {
    await page.click('button:has-text("Add")'); // Önce ürünü ekliyoruz
    await page.click('div:has-text("-")'); // Ürün miktarı 1 ise kaldırma butonu devreye girecek
    const deleteIcon = await page.waitForSelector('svg[data-testid="DeleteIcon"]');
    expect(deleteIcon).toBeTruthy(); // Kaldırma ikonunun görünürlüğünü kontrol et
    await deleteIcon.click(); // Ürünü kaldırıyoruz
    const addButton = await page.waitForSelector('button:has-text("Add")');
    expect(addButton).toBeTruthy(); // Ürünü kaldırdıktan sonra 'Add' butonu tekrar görünür olmalı
  });
});
