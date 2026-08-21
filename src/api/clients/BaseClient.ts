import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class BaseClient {
  protected requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  protected async getRequest(endpoint: string): Promise<APIResponse> {
    const response = await this.requestContext.get(endpoint);
    await expect(response, `GET ${endpoint}`).toBeOK();
    return response;
  }

  protected async postRequest<TPayload>(endpoint: string, payload: TPayload): Promise<APIResponse> {
    const response = await this.requestContext.post(endpoint, { data: payload });
    await expect(response, `POST ${endpoint}`).toBeOK();
    return response;
  }
}
