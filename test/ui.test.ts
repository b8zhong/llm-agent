import { jest } from '@jest/globals';

// Mock the ora module
jest.unstable_mockModule('ora', async () => ({
  default: jest.fn(() => {
    const spinner = {
      text: '', // Initialize the text property
      start: jest.fn(() => spinner),
      stop: jest.fn(),
      succeed: jest.fn(),
      fail: jest.fn(),
      update: jest.fn((newText: string) => {
        spinner.text = newText; // Update the text property
      }),
    };
    return spinner;
  }),
}));

// Import showLoader and ora dynamically after mocking
const { showLoader } = await import('../src/ui');
const { default: ora } = await import('ora');

describe('showLoader', () => {
  // Clears all mocked functions after each test to avoid conflicts
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should call ora with correct text and color', () => {
    showLoader('Loading...');
    expect(ora).toHaveBeenCalledWith({ text: 'Loading...', color: 'magenta' });
  });

  it('Should return an object with correct methods', () => {
    const loader = showLoader('Loading...');
    expect(loader).toEqual(
      expect.objectContaining({
        stop: expect.any(Function),
        succeed: expect.any(Function),
        fail: expect.any(Function),
        update: expect.any(Function),
      })
    );
  });

  it('Should get a different text when different arguments are passed to showLoader', () => {
    showLoader('Test');
    expect(ora).toHaveBeenCalledWith({ text: 'Test', color: 'magenta' }); // Verify the updated text
  });

  it('Spinner should change when update method is called', () => {
    const loader = showLoader('Loading...');
    loader.update('Test 1'); // Call update to change the text
    expect(loader.spinner.text).toBe('Test 1'); // Validate text property update
  });
});