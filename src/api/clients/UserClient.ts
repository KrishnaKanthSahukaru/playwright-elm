import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './BaseClient';

export class UserClient extends BaseClient {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async getUsersList(pageNumber: number = 2): Promise<APIResponse> {
    // Simple path parameter suffix
    return await this.getRequest("users?page=" + pageNumber);
  }

  async createUserAccount(userPayload: { name: string; job: string }): Promise<APIResponse> {
    // Clean target matching user creation route
    return await this.postRequest("users", userPayload);
  }
}
