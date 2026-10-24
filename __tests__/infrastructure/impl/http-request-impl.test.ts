import 'reflect-metadata';
import axios from 'axios';
import { HttpRequestImpl } from '../../../src/infrastructure/impl/http-request-impl';
import { ResponseError } from '../../../src/domain/model/request-types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('HttpRequestImpl.post', () => {
  const param = {
    url: 'https://example.test/hook',
    data: { content: '', embeds: [{ title: 't', fields: [] }] },
  };

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('T20 should treat 204 as success', async () => {
    // Given
    mockedAxios.post.mockResolvedValue({ status: 204, data: '', statusText: 'No Content' });
    // When
    const result = await new HttpRequestImpl().post(param);
    // Then
    expect(result).toEqual({ status: 204, data: '' });
  });

  it('T21 should throw ResponseError when status is not 2xx', async () => {
    // Given
    mockedAxios.post.mockResolvedValue({ status: 302, data: 'moved', statusText: 'Found' });
    // When / Then
    await expect(new HttpRequestImpl().post(param)).rejects.toBeInstanceOf(ResponseError);
  });
});
