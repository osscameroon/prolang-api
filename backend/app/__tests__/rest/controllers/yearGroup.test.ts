import { initializeServerAndApiClient, resolveAxiosError, TestInstance } from '../../utils/testUtils';
import { HttpResponseData, YearGroupEnhancedResponse, YearGroupResponse } from '../../../shared/types/responses';
import { RECORD_NOT_FOUND_MESSAGE } from '../../../shared/utils/constants';
import { yearGroupsInput } from '../../utils/fixtures';
import yearGroupService from '../../../domain/services/yearGroup.service';

describe('Test YearGroup controller', () => {
  let testInstance: TestInstance;

  beforeAll(async () => {
    testInstance = await initializeServerAndApiClient();
  });

  afterAll(() => {
    testInstance.httpServer.close();
  });

  test('Retrieve all years group', async () => {
    const response: HttpResponseData<YearGroupResponse[]> = await testInstance.apiClient.get('/years-groups');

    expect(response).toHaveProperty('data');
    expect(response.data).toHaveLength(10);
  });

  test('Retrieve all years group with total language', async () => {
    const response: HttpResponseData<YearGroupEnhancedResponse[]> = await testInstance.apiClient.get(
      '/years-groups?countLanguage=true',
    );

    expect(response).toHaveProperty('data');
    expect(response.data).toHaveLength(10);

    const [firstYearGroup] = response.data;

    expect(firstYearGroup).toHaveProperty('languageCount', 0);
  });

  test('Not found a year group', async () => {
    const id = '612103bc20aaf1e4d5e84c38';
    const response = await testInstance.apiClient.get(`/years-groups/${id}`).catch(resolveAxiosError);

    expect(response.status).toEqual(404);
    expect(response.data).toHaveProperty('message', RECORD_NOT_FOUND_MESSAGE('YearGroup', id));
  });

  test('Retrieve a year group', async () => {
    const yearGroup = await yearGroupService.findByName(yearGroupsInput[0].name);

    const response = await testInstance.apiClient.get(`/years-groups/${yearGroup?._id}`).catch(resolveAxiosError);

    expect(response.data).toMatchObject({
      id: yearGroup?._id,
      name: yearGroup?.name,
      position: yearGroup?.position,
    });
  });
});
