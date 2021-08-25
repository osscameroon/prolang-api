import { initializeServerAndApiClient, TestInstance } from '../../utils/testUtils';

describe('Test YearGroup controller', () => {
  let testInstance: TestInstance;

  beforeAll(async () => {
    testInstance = await initializeServerAndApiClient();
  });

  afterAll(() => {
    testInstance.httpServer.close();
  });

  test('Retrieve all years group', async () => {
    const response = await testInstance.apiClient.get('/years-groups');

    console.log(response);
  });
});
