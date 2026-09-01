import { AnalyticsSummary } from "../types";
import { MOCK_ANALYTICS } from "../mock-data";

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  await new Promise((resolve) => setTimeout(resolve, 20));
  return { ...MOCK_ANALYTICS };
}
