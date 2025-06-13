
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { videoService } from '@/services/videoService';
import { useProcessingStore } from '@/store/processingStore';
import { VideoModel } from '@/types';
import { Loader, Circle } from 'lucide-react';

const mockModels: VideoModel[] = [
  {
    id: 'depth-crafter',
    name: 'DepthCrafter',
    description: 'Advanced depth estimation with high accuracy for complex scenes',
    processingTime: '3-5 minutes',
    qualityScore: 95,
    thumbnailUrl: '/api/placeholder/300/200',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    description: 'Fast processing with good quality for general use cases',
    processingTime: '1-2 minutes',
    qualityScore: 85,
    thumbnailUrl: '/api/placeholder/300/200',
  },
  {
    id: 'rolling-depth',
    name: 'RollingDepth',
    description: 'Optimized for dynamic scenes with moving objects',
    processingTime: '2-4 minutes',
    qualityScore: 88,
    thumbnailUrl: '/api/placeholder/300/200',
  },
  {
    id: 'video-depth-anything',
    name: 'Video-Depth-Anything',
    description: 'Versatile model that works well across different video types',
    processingTime: '2-3 minutes',
    qualityScore: 90,
    thumbnailUrl: '/api/placeholder/300/200',
  },
  {
    id: 'distill-any-depth',
    name: 'Distill-Any-Depth',
    description: 'Lightweight model for quick processing with decent quality',
    processingTime: '1 minute',
    qualityScore: 80,
    thumbnailUrl: '/api/placeholder/300/200',
  },
];

interface ModelSelectionProps {
  onNext: () => void;
  onBack: () => void;
}

export const ModelSelection = ({ onNext, onBack }: ModelSelectionProps) => {
  const { selectedModel, setSelectedModel } = useProcessingStore();

  // In a real app, you'd use this query
  // const { data: models, isLoading } = useQuery({
  //   queryKey: ['models'],
  //   queryFn: videoService.getModels,
  // });

  // Using mock data for now
  const models = mockModels;
  const isLoading = false;

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose a Processing Model</h2>
        <p className="text-muted-foreground">
          Select the depth estimation model that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <Card
            key={model.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedModel === model.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedModel(model.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  <Circle
                    className={`h-3 w-3 ${getQualityColor(model.qualityScore)}`}
                    fill="currentColor"
                  />
                  <span className="text-sm font-medium">{model.qualityScore}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{model.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Time:</span>
                  <span className="font-medium">{model.processingTime}</span>
                </div>
                <Badge variant="secondary" className="w-fit">
                  Quality: {model.qualityScore}%
                </Badge>
              </div>

              {selectedModel === model.id && (
                <Badge variant="default" className="w-full justify-center">
                  Selected
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back to Upload
        </Button>
        <Button onClick={onNext} disabled={!selectedModel} size="lg">
          Start Processing
        </Button>
      </div>
    </div>
  );
};
