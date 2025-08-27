export type SimdStatus = "Upcoming" | "Active" | "Ended";
export type VoteType = "yes" | "no" | "abstain";

export interface VoteCount {
  yes: number;
  no: number;
  abstain: number;
}

export interface SimdSummary {
  id: string;
  title: string;
  description: string;
  status: SimdStatus;
  starting_epoch: number;
  ending_epoch: number;
}

export interface SimdDetails {
  id: string;
  title: string;
  description: string;
  status: SimdStatus;
  votes: VoteCount;
  starting_epoch: number;
  ending_epoch: number;
  total_supply: number;
  unused_tokens: number;
}

export interface ValidatorVote {
  validator: string;
  vote_type: VoteType;
  amount: number;
  signature: string;
}