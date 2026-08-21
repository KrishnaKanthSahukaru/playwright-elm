import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './BaseClient';

export interface UserPayload {
  name: string;
  job: string;
}

export interface UserRecord {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserRecord[];
}

export interface CreatedUserResponse extends UserPayload {
  id: string;
  createdAt: string;
}

export class UserClient extends BaseClient {
  constructor(requestContext: APIRequestContext) {
    super(requestContext);
  }

  async getUsersList(pageNumber = 2): Promise<UserListResponse> {
    const response = await this.getRequest(`/users?page=${pageNumber}`);
    return response.json() as Promise<UserListResponse>;
  }

  async createUserAccount(userPayload: UserPayload): Promise<CreatedUserResponse> {
    const response = await this.postRequest('/users', userPayload);
    return response.json() as Promise<CreatedUserResponse>;
  }
}
