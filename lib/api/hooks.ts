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

export const useSimdDetails = (title: string) => {
  return useQuery({
    queryKey: ["simd", title],
    queryFn: () => api.getSimdDetails(title),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
    enabled: !!title,
  });
};

export const useValidatorVotes = (title: string) => {
  return useQuery({
    queryKey: ["validators", title],
    queryFn: () => api.getValidatorVotes(title),
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: true,
    enabled: !!title,
  });
};