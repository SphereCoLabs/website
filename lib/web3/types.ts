// Enums from Smart Contract
export enum UserRole {
  Organizer = 0,
  KOL = 1,
}

export enum CampaignStatus {
  Draft = 0,
  Published = 1,
  Active = 2,
  Completed = 3,
  Cancelled = 4,
}

export enum CampaignPlatform {
  Instagram = 0,
  TikTok = 1,
  YouTube = 2,
  Twitter = 3,
  Facebook = 4,
}

export enum CampaignContentType {
  Post = 0,
  Story = 1,
  Reel = 2,
  Video = 3,
  Article = 4,
}

export enum ApplicationStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3,
}

export enum DraftWorkStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export enum PaymentStatus {
  Escrowed = 0,
  Released = 1,
  Refunded = 2,
}

// Type Definitions
export interface User {
  name: string;
  summary: string;
  role: UserRole;
}

export interface Campaign {
  title: string;
  description: string;
  brief: string;
  goal: string;
  startDate: bigint;
  endDate: bigint;
  targetPlatform: CampaignPlatform[]; // Smart contract returns array
  contentTypes: CampaignContentType[]; // Smart contract returns array
  targetAudience: string;
  guideline: string;
  reward: bigint;
  status: CampaignStatus;
}

export interface Application {
  campaignId: bigint;
  applicantAddress: `0x${string}`;
  title: string;
  proposal: string;
  status: ApplicationStatus;
}

export interface DraftWork {
  campaignId: bigint;
  kolAddress: `0x${string}`;
  data: string;
  status: DraftWorkStatus;
}

export interface CampaignPayment {
  campaignId: bigint;
  amount: bigint;
  status: PaymentStatus;
  escrowedAt: bigint;
  releasedAt: bigint;
  refundedAt: bigint;
}

// Helper types for function parameters
export interface CreateCampaignParams {
  title: string;
  description: string;
  brief: string;
  goal: string;
  startDate: bigint;
  endDate: bigint;
  targetPlatform: CampaignPlatform; // Smart contract currently accepts single value
  contentTypes: CampaignContentType; // Smart contract currently accepts single value
  targetAudience: string;
  guideline: string;
  value: bigint; // Payment amount in wei
}

export interface SubmitApplicationParams {
  campaignId: bigint;
  title: string;
  proposal: string;
}

export interface RegisterUserParams {
  name: string;
  summary: string;
  role: UserRole;
}
