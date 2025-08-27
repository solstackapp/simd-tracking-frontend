import { useQuery } from "@tanstack/react-query";
import { api } from "./client";

export const useSimds = () => {
  return useQuery({
    queryKey: ["simds"],
    queryFn: api.getSimds,
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
  });
};

export const useSimdDetails = (id: string) => {
  return useQuery({
    queryKey: ["simd", id],
    queryFn: () => api.getSimdDetails(id),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
    enabled: !!id,
  });
};

export const useValidatorVotes = (id: string) => {
  return useQuery({
    queryKey: ["validators", id],
    queryFn: () => api.getValidatorVotes(id),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
    enabled: !!id,
  });
};