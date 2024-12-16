export type EFileState = 'READY' | 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface EFileSubmission {
  id: string;
  status: EFileState;
  submittedAt: string;
  acceptedAt?: string;
  rejectedAt?: string;
  errors?: string[];
  estimatedRefund?: number;
}