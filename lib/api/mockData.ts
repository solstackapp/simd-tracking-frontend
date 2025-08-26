import { SimdSummary, SimdDetails, ValidatorVote } from "./types";

// Helper to generate realistic validator addresses
const validators = [
  "DWvDTSh3qfn88UoQTEKRV2JnLt5jtJAVoiCo3ivtMwXP",
  "Awes4Tr6TX8JDzEhCZY2QVNimT6iD1zWHzf1vNyGvpLM",
  "7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2",
  "GdNJoyzbGoVXixDDiVeKuuHJQW1J3PmXrXrBeaJunJQ2",
  "J2BqG6hLbbMbGk8DDv5B8vQRDhbVH5p5GKCnRGh1h5CD",
  "StepnDnzy8ySj1zRvQGGx4EZRZdssYPMqL5XgHHg3YPZ",
  "3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT",
  "2fYDHyRFJkm66Y2qKdxHGRBvKBMfnh5MsVQQWi8mxFMZ",
  "CertusDeBmqN8ZawdkxK5umXroYvQ6sFXVg2fkYr4mfx",
  "DumiCKHVqoCQKD8roLApzR5Fit8qGV5fVQsJV9sTZk4a",
  "BfVYYNqviqV9Z9DnQCrEQQR6cmVFJpwLEdNwJENaYWsv",
  "9QU2QSxhb24FUX3Tu2FpczXjpK3VYrvRudywSZaM29mF",
  "EARNynHRWg6GfR6z6krR24rTNzJJcDjPnR6HfnEZ2L7J",
  "Fm4YMHhjaJe9HnMyBNMq2K7T7cZ7dpGu5P3bMzjcdL9V",
  "HBmfYvhqBGDXJYHsmeq8ZrCMPm3KC2mfTSopivJgVANH",
  "XkCriyrNwS3G4rzAXtG5B1nnvb5Ka1JtCku93VqeKAr",
  "76nwV8zz8tLz97SBRXH6uwHvgHXtqJDLQQxM9bWfv4Kn",
  "Chorus6Kis8tFHA7AowrPMcRJk3LbApHTYpgSNExDF6",
  "DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh",
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
  "4qvFxnUXYjBdcviCwVV7gKcGJMCENEkYWCiYJk8dJZnC",
  "AZBfiwvWtUJocMKDJZrqYVXPWSfKcRQRqtc7N4mByMi5",
  "6WgdYhhGE1WZU9JioKc5j3wWpXEKPBdWZbEXAobtVZan",
  "CogentC52e7kktFfWHwsqSmr8LiS1yAtfqhHcftCPcBJ",
  "GvZEwtCHZ7YtCkQCaLRVEXsyVvQkRDhJhQgB6akPme1e",
];

export const mockSimdList: SimdSummary[] = [
  {
    title: "SIMD-0096",
    description: "Reward full priority fee to validator",
    status: "Ended",
    starting_epoch: 617,
    ending_epoch: 620,
  },
  {
    title: "SIMD-0123",
    description: "Proposal for an In-Protocol Distribution of Block Rewards to Stakers",
    status: "Ended",
    starting_epoch: 753,
    ending_epoch: 755,
  },
  {
    title: "SIMD-0150",
    description: "Implement dynamic fee adjustment mechanism",
    status: "Active",
    starting_epoch: 800,
    ending_epoch: 805,
  },
  {
    title: "SIMD-0200",
    description: "Introduce stake-weighted voting for governance",
    status: "Upcoming",
    starting_epoch: 900,
    ending_epoch: 905,
  },
  {
    title: "SIMD-0089",
    description: "Optimize block propagation for improved network latency",
    status: "Ended",
    starting_epoch: 580,
    ending_epoch: 585,
  },
  {
    title: "SIMD-0145",
    description: "Enable partial delegation for staking accounts",
    status: "Active",
    starting_epoch: 810,
    ending_epoch: 815,
  },
];

export const mockSimdDetails: Record<string, SimdDetails> = {
  "SIMD-0096": {
    title: "SIMD-0096",
    description: "Reward full priority fee to validator",
    status: "Ended",
    votes: {
      yes: 142520577720854810,
      no: 40272078263044428,
      abstain: 7302549409816122,
    },
    starting_epoch: 617,
    ending_epoch: 620,
    total_supply: 368296676892441024,
    unused_tokens: 178201471498725664,
  },
  "SIMD-0123": {
    title: "SIMD-0123",
    description: "Proposal for an In-Protocol Distribution of Block Rewards to Stakers",
    status: "Ended",
    votes: {
      yes: 250000000000000000,
      no: 50000000000000000,
      abstain: 10000000000000000,
    },
    starting_epoch: 753,
    ending_epoch: 755,
    total_supply: 400000000000000000,
    unused_tokens: 90000000000000000,
  },
  "SIMD-0150": {
    title: "SIMD-0150",
    description: "Implement dynamic fee adjustment mechanism",
    status: "Active",
    votes: {
      yes: 180000000000000000,
      no: 80000000000000000,
      abstain: 20000000000000000,
    },
    starting_epoch: 800,
    ending_epoch: 805,
    total_supply: 450000000000000000,
    unused_tokens: 170000000000000000,
  },
  "SIMD-0200": {
    title: "SIMD-0200",
    description: "Introduce stake-weighted voting for governance",
    status: "Upcoming",
    votes: {
      yes: 0,
      no: 0,
      abstain: 0,
    },
    starting_epoch: 900,
    ending_epoch: 905,
    total_supply: 500000000000000000,
    unused_tokens: 500000000000000000,
  },
  "SIMD-0089": {
    title: "SIMD-0089",
    description: "Optimize block propagation for improved network latency",
    status: "Ended",
    votes: {
      yes: 320000000000000000,
      no: 15000000000000000,
      abstain: 25000000000000000,
    },
    starting_epoch: 580,
    ending_epoch: 585,
    total_supply: 380000000000000000,
    unused_tokens: 20000000000000000,
  },
  "SIMD-0145": {
    title: "SIMD-0145",
    description: "Enable partial delegation for staking accounts",
    status: "Active",
    votes: {
      yes: 95000000000000000,
      no: 120000000000000000,
      abstain: 35000000000000000,
    },
    starting_epoch: 810,
    ending_epoch: 815,
    total_supply: 420000000000000000,
    unused_tokens: 170000000000000000,
  },
};

// Deterministic pseudo-random generator using seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Helper to generate validator votes with deterministic amounts
const generateValidatorVotes = (
  validatorAddresses: string[],
  voteDistribution: { yes: number; no: number; abstain: number; none: number },
  seed: number = 1
): ValidatorVote[] => {
  const votes: ValidatorVote[] = [];
  const totalValidators = validatorAddresses.length;
  
  let yesCount = Math.floor((voteDistribution.yes / 100) * totalValidators);
  let noCount = Math.floor((voteDistribution.no / 100) * totalValidators);
  let abstainCount = Math.floor((voteDistribution.abstain / 100) * totalValidators);
  
  let index = 0;
  let seedCounter = seed;
  
  // Generate Yes votes with deterministic amounts
  for (let i = 0; i < yesCount && index < totalValidators; i++, index++) {
    const amount = Math.floor(seededRandom(seedCounter++) * 25000000000000000) + 5000000000000000;
    votes.push({
      validator: validatorAddresses[index],
      yes_amount: amount,
      no_amount: 0,
      abstain_amount: 0,
      total_amount: amount,
      transaction_count: Math.floor(seededRandom(seedCounter++) * 3) + 1,
    });
  }
  
  // Generate No votes with deterministic amounts
  for (let i = 0; i < noCount && index < totalValidators; i++, index++) {
    const amount = Math.floor(seededRandom(seedCounter++) * 20000000000000000) + 3000000000000000;
    votes.push({
      validator: validatorAddresses[index],
      yes_amount: 0,
      no_amount: amount,
      abstain_amount: 0,
      total_amount: amount,
      transaction_count: Math.floor(seededRandom(seedCounter++) * 2) + 1,
    });
  }
  
  // Generate Abstain votes with deterministic amounts
  for (let i = 0; i < abstainCount && index < totalValidators; i++, index++) {
    const amount = Math.floor(seededRandom(seedCounter++) * 10000000000000000) + 2000000000000000;
    votes.push({
      validator: validatorAddresses[index],
      yes_amount: 0,
      no_amount: 0,
      abstain_amount: amount,
      total_amount: amount,
      transaction_count: 1,
    });
  }
  
  return votes;
};

// Use deterministic seeds for each SIMD
export const mockValidatorVotes: Record<string, ValidatorVote[]> = {
  "SIMD-0096": generateValidatorVotes(validators, { yes: 60, no: 25, abstain: 10, none: 5 }, 100),
  "SIMD-0123": generateValidatorVotes(validators.slice(0, 20), { yes: 70, no: 20, abstain: 5, none: 5 }, 200),
  "SIMD-0150": generateValidatorVotes(validators.slice(0, 18), { yes: 45, no: 40, abstain: 10, none: 5 }, 300),
  "SIMD-0200": [], // Upcoming - no votes yet
  "SIMD-0089": generateValidatorVotes(validators.slice(0, 22), { yes: 85, no: 5, abstain: 8, none: 2 }, 400),
  "SIMD-0145": generateValidatorVotes(validators.slice(0, 15), { yes: 35, no: 50, abstain: 10, none: 5 }, 500),
};