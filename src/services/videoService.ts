
import { api } from './api';
import { VideoModel, ProcessingJob, VideoUploadResponse } from '@/types';

export const videoService = {
  getModels: async (): Promise<VideoModel[]> => {
    const response = await api.get('/api/v1/models');
    return response.data;
  },

  uploadVideo: async (file: File, modelId: string): Promise<VideoUploadResponse> => {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('model_id', modelId);

    const response = await api.post('/api/v1/process-video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getJobStatus: async (jobId: string): Promise<ProcessingJob> => {
    const response = await api.get(`/api/v1/jobs/${jobId}`);
    return response.data;
  },

  getUserHistory: async (): Promise<ProcessingJob[]> => {
    const response = await api.get('/api/v1/user/history');
    return response.data;
  },
};
