
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Settings } from 'lucide-react';
import { useProcessingStore } from '@/store/processingStore';
import { ModelParameters as IModelParameters, DEFAULT_PARAMETERS } from '@/types/modelParameters';
import { ParameterForm } from '@/components/parameters/ParameterForm';
import { PresetSelector } from '@/components/parameters/PresetSelector';
import { toast } from 'sonner';

const ModelParameters = () => {
  const navigate = useNavigate();
  const { selectedModel, modelParameters, setModelParameters } = useProcessingStore();
  const [selectedPreset, setSelectedPreset] = useState<string>('balanced');

  const form = useForm<IModelParameters>({
    defaultValues: modelParameters || DEFAULT_PARAMETERS,
  });

  // Redirect if no model is selected
  if (!selectedModel) {
    navigate('/dashboard/upload');
    return null;
  }

  const onSubmit = (data: IModelParameters) => {
    setModelParameters(data);
    toast.success('Parameters configured successfully!');
    navigate('/dashboard/upload');
  };

  const handlePresetChange = (parameters: IModelParameters) => {
    form.reset(parameters);
    setModelParameters(parameters);
  };

  const handleBack = () => {
    navigate('/dashboard/upload');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Model Selection
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Configure Model Parameters</h1>
              <p className="text-muted-foreground">
                Fine-tune the processing parameters for optimal results
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                ✓
              </div>
              <span className="text-sm font-medium text-green-600">Model Selection</span>
            </div>
            <div className="w-8 h-0.5 bg-primary"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium text-primary">Parameters</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-gray-600">Upload & Process</span>
            </div>
          </div>

          {/* Selected Model Info */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Selected Model</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedModel?.replace('-', ' ')}
                  </p>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Presets Sidebar */}
          <div className="lg:col-span-1">
            <PresetSelector
              selectedPreset={selectedPreset}
              onPresetSelect={setSelectedPreset}
              onParametersChange={handlePresetChange}
            />
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Model Parameters</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <ParameterForm form={form} />
                    
                    <div className="flex justify-end gap-3 pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button type="submit" size="lg">
                        Continue to Upload
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelParameters;
