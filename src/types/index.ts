
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface VideoModel {
  id: string;
  name: string;
  description: string;
  processingTime: string;
  qualityScore: number;
  thumbnailUrl: string;
  parameters?: Record<string, any>;
}

export interface ProcessingJob {
  id: string;
  userId: string;
  modelId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  inputVideoUrl: string;
  outputVideoUrl?: string;
  createdAt: string;
  estimatedTimeRemaining?: number;
  errorMessage?: string;
}

export interface VideoUploadResponse {
  jobId: string;
  uploadUrl: string;
}

export interface ApiError {
  message: string;
  status: number;
}
