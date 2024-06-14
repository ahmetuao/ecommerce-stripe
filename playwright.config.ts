import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Test dosyalarının bulunacağı dizin
  timeout: 30000, // Her test için maksimum süre (ms)
  retries: 2, // Başarısız olan testler için deneme sayısı
  use: {
    headless: true, // Tarayıcıyı başlıksız modda çalıştırma
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure', // Başarısız testlerde video kaydı
  },
});
