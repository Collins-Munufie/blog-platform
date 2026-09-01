import { Category, Tag } from "../types";
import { MOCK_CATEGORIES, MOCK_TAGS } from "../mock-data";

export async function getCategories(): Promise<Category[]> {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return [...MOCK_CATEGORIES];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return MOCK_CATEGORIES.find((c) => c.slug === slug) || null;
}

export async function getTags(): Promise<Tag[]> {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return [...MOCK_TAGS];
}

export async function getTagBySlug(slug: string): Promise<Tag | null> {
  await new Promise((resolve) => setTimeout(resolve, 10));
  return MOCK_TAGS.find((t) => t.slug === slug) || null;
}
