import type { Template, PaginatedResponse } from "@super-one/cosmix-types";
import { getApiClient } from "./client";

export class TemplateApi {
  static async list(): Promise<Template[]> {
    const client = getApiClient();
    const response = await client.get<PaginatedResponse<Template>>("/api/v1/templates");

    if (response.success && response.data) {
      return response.data.items;
    }

    return [];
  }

  static async getById(id: string): Promise<Template | null> {
    const client = getApiClient();
    const response = await client.get<Template>(`/api/v1/templates/${id}`);

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  }

  static async create(
    template: Omit<Template, "id" | "createdAt" | "updatedAt" | "usageCount">
  ): Promise<Template | null> {
    const client = getApiClient();
    const response = await client.post<Template>("/api/v1/templates", template);

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  }

  static async update(id: string, template: Partial<Template>): Promise<Template | null> {
    const client = getApiClient();
    const response = await client.put<Template>(`/api/v1/templates/${id}`, template);

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  }

  static async delete(id: string): Promise<boolean> {
    const client = getApiClient();
    const response = await client.delete(`/api/v1/templates/${id}`);
    return response.success;
  }
}
