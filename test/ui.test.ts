import { jest } from '@jest/globals';

// Mock the ora module
jest.unstable_mockModule('ora', async () => ({
  default: jest.fn(({ text, color }) => {
    const spinner = {
      text: text || '',
      start: jest.fn(() => spinner),
      stop: jest.fn(),
      succeed: jest.fn(),
      fail: jest.fn(),
      update: jest.fn((newText) => {
        spinner.text = newText;
      }),
    };
    return spinner;
  }),
}));

// Import showLoader and ora dynamically after mocking
const { showLoader } = await import('../src/ui');
const { default: ora } = await import('ora');

/* describe('showLoader', () => {
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
}); */



import { logMessage } from '../src/ui';

describe('logMessage', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock after each test
  });

  it('should not log anything for role "tool"', () => {
    logMessage({ role: 'tool', content: 'Some tool message', tool_call_id: '123' });
    expect(consoleLogSpy).not.toHaveBeenCalled(); // Nothing should be logged
  });

  it('should log user message in cyan', () => {
    logMessage({ role: 'user', content: 'Hello, World!' });
    expect(consoleLogSpy).toHaveBeenCalledWith('\n\x1b[36m[USER]\x1b[0m'); // Header
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, World!\n'); // Content
  });

  it('should log assistant message in green', () => {
    logMessage({ role: 'assistant', content: 'Here to help!' });
    expect(consoleLogSpy).toHaveBeenCalledWith('\n\x1b[32m[ASSISTANT]\x1b[0m'); // Header
    expect(consoleLogSpy).toHaveBeenCalledWith('Here to help!\n'); // Content
  });

});