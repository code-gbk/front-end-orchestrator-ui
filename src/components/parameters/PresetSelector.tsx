
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DEFAULT_PRESETS, ParameterPreset, ModelParameters } from '@/types/modelParameters';
import { Bookmark, Settings } from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset: string;
  onPresetSelect: (presetId: string) => void;
  onParametersChange: (parameters: ModelParameters) => void;
}

export const PresetSelector = ({
  selectedPreset,
  onPresetSelect,
  onParametersChange,
}: PresetSelectorProps) => {
  const [presets] = useState<ParameterPreset[]>(DEFAULT_PRESETS);

  const handlePresetChange = (presetId: string) => {
    onPresetSelect(presetId);
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      onParametersChange(preset.parameters);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Parameter Presets
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedPreset} onValueChange={handlePresetChange}>
          <div className="space-y-4">
            {presets.map((preset) => (
              <div key={preset.id} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={preset.id} id={preset.id} />
                  <Label
                    htmlFor={preset.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{preset.name}</span>
                      {preset.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  {preset.description}
                </p>
                
                {selectedPreset === preset.id && (
                  <div className="ml-6 p-3 bg-muted/50 rounded-lg text-xs space-y-1">
                    <div className="grid grid-cols-2 gap-2">
                      <span>Steps: {preset.parameters.num_steps}</span>
                      <span>Guidance: {preset.parameters.guidance_scale}</span>
                      <span>Window: {preset.parameters.window_size}</span>
                      <span>Overlap: {preset.parameters.overlap}%</span>
                      <span>Max Res: {preset.parameters.max_res}px</span>
                      <span>CPU: {preset.parameters.cpu_offload ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Settings className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Custom Configuration</p>
              <p className="text-blue-700">
                Modify parameters on the right to create your own configuration.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
