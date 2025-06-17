
export interface ModelParameters {
  num_steps: number;
  guidance_scale: number;
  window_size: number;
  overlap: number;
  max_res: 512 | 768 | 1024 | 1280 | 1920;
  cpu_offload: boolean;
}

export interface ParameterPreset {
  id: string;
  name: string;
  description: string;
  parameters: ModelParameters;
  isDefault?: boolean;
}

export const DEFAULT_PARAMETERS: ModelParameters = {
  num_steps: 5,
  guidance_scale: 1.0,
  window_size: 110,
  overlap: 25,
  max_res: 1024,
  cpu_offload: false,
};

export const DEFAULT_PRESETS: ParameterPreset[] = [
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Good balance between quality and speed',
    parameters: DEFAULT_PARAMETERS,
    isDefault: true,
  },
  {
    id: 'high-quality',
    name: 'High Quality',
    description: 'Maximum quality for professional use',
    parameters: {
      ...DEFAULT_PARAMETERS,
      num_steps: 15,
      guidance_scale: 2.0,
      max_res: 1920,
    },
  },
  {
    id: 'fast',
    name: 'Fast Processing',
    description: 'Quick processing for previews',
    parameters: {
      ...DEFAULT_PARAMETERS,
      num_steps: 3,
      guidance_scale: 0.5,
      window_size: 64,
      max_res: 768,
    },
  },
];
