import { by, device, element, expect } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have an increment button', async () => {
    await expect(element(by.id('increment-button'))).toBeVisible();
  });

  it('should have the expected initial press count', async () => {
    await expect(element(by.id('pressed-count'))).toHaveText(
      'Pressed Count: 0',
    );
  });

  it('should show incremented press count after tap', async () => {
    await element(by.id('increment-button')).tap();
    await expect(element(by.id('pressed-count'))).toHaveText(
      'Pressed Count: 1',
    );
  });
});
