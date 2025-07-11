
import { create } from 'zustand';
import { ProcessingJob } from '@/types';
import { ModelParameters, DEFAULT_PARAMETERS } from '@/types/modelParameters';

interface ProcessingState {
  jobs: ProcessingJob[];
  activeJob: ProcessingJob | null;
  selectedModel: string | null;
  uploadedFile: File | null;
  projectName: string | null;
  modelParameters: ModelParameters;
  setJobs: (jobs: ProcessingJob[]) => void;
  addJob: (job: ProcessingJob) => void;
  updateJob: (jobId: string, updates: Partial<ProcessingJob>) => void;
  setActiveJob: (job: ProcessingJob | null) => void;
  setSelectedModel: (modelId: string | null) => void;
  setUploadedFile: (file: File | null) => void;
  setProjectName: (name: string | null) => void;
  setModelParameters: (parameters: ModelParameters) => void;
}

export const useProcessingStore = create<ProcessingState>((set) => ({
  jobs: [],
  activeJob: null,
  selectedModel: null,
  uploadedFile: null,
  projectName: null,
  modelParameters: DEFAULT_PARAMETERS,
  setJobs: (jobs) => set({ jobs }),
  addJob: (job) => set((state) => ({ jobs: [job, ...state.jobs] })),
  updateJob: (jobId, updates) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, ...updates } : job
      ),
      activeJob:
        state.activeJob?.id === jobId
          ? { ...state.activeJob, ...updates }
          : state.activeJob,
    })),
  setActiveJob: (job) => set({ activeJob: job }),
  setSelectedModel: (modelId) => set({ selectedModel: modelId }),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setProjectName: (name) => set({ projectName: name }),
  setModelParameters: (parameters) => set({ modelParameters: parameters }),
}));
