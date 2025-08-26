export type SimdStatus = "Upcoming" | "Active" | "Ended";

export interface VoteCount {
  yes: number;
  no: number;
  abstain: number;
}

export interface SimdSummary {
  title: string;
  description: string;
  status: SimdStatus;
  starting_epoch: number;
  ending_epoch: number;
}

export interface SimdDetails {
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
  yes_amount: number;
  no_amount: number;
  abstain_amount: number;
  total_amount: number;
  transaction_count: number;
}