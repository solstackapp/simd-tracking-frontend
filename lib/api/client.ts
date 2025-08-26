import { SimdSummary, SimdDetails, ValidatorVote } from "./types";
import { mockSimdList, mockSimdDetails, mockValidatorVotes } from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  if (USE_MOCK_DATA) {
    // Return mock data based on endpoint
    if (endpoint === "/simds") {
      return mockSimdList as T;
    }
    
    // Check validators endpoint FIRST (more specific)
    const validatorMatch = endpoint.match(/^\/simd\/(.+)\/validators$/);
    if (validatorMatch) {
      const title = decodeURIComponent(validatorMatch[1]);
      const validators = mockValidatorVotes[title];
      if (!validators) {
        return [] as T;
      }
      return validators as T;
    }
    
    // Then check SIMD detail endpoint (less specific)
    const simdDetailMatch = endpoint.match(/^\/simd\/([^\/]+)$/);
    if (simdDetailMatch) {
      const title = simdDetailMatch[1];
      const details = mockSimdDetails[title];
      if (!details) {
        throw new Error(`SIMD ${title} not found`);
      }
      return details as T;
    }
    
    throw new Error(`Unknown endpoint: ${endpoint}`);
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Not found');
    }
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

export const api = {
  getSimds: async (): Promise<SimdSummary[]> => {
    return fetchFromAPI<SimdSummary[]>("/simds");
  },
  
  getSimdDetails: async (title: string): Promise<SimdDetails> => {
    return fetchFromAPI<SimdDetails>(`/simd/${title}`);
  },
  
  getValidatorVotes: async (title: string): Promise<ValidatorVote[]> => {
    return fetchFromAPI<ValidatorVote[]>(`/simd/${title}/validators`);
  },
};