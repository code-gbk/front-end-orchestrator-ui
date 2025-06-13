
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { videoService } from '@/services/videoService';
import { useProcessingStore } from '@/store/processingStore';
import { ProcessingJob } from '@/types';
import { Loader, CheckCircle, XCircle, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ProcessingStatusProps {
  onReset: () => void;
}

export const ProcessingStatus = ({ onReset }: ProcessingStatusProps) => {
  const { uploadedFile, selectedModel, activeJob, setActiveJob, addJob } = useProcessingStore();
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const startProcessingMutation = useMutation({
    mutationFn: () => videoService.uploadVideo(uploadedFile!, selectedModel!),
    onSuccess: (data) => {
      setCurrentJobId(data.jobId);
      const newJob: ProcessingJob = {
        id: data.jobId,
        userId: 'current-user',
        modelId: selectedModel!,
        status: 'pending',
        progress: 0,
        inputVideoUrl: URL.createObjectURL(uploadedFile!),
        createdAt: new Date().toISOString(),
      };
      addJob(newJob);
      setActiveJob(newJob);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to start processing');
    },
  });

  const { data: jobStatus } = useQuery({
    queryKey: ['job-status', currentJobId],
    queryFn: () => videoService.getJobStatus(currentJobId!),
    enabled: !!currentJobId && activeJob?.status !== 'completed' && activeJob?.status !== 'failed',
    refetchInterval: 2000, // Poll every 2 seconds
  });

  useEffect(() => {
    if (jobStatus) {
      setActiveJob(jobStatus);
    }
  }, [jobStatus, setActiveJob]);

  useEffect(() => {
    if (!activeJob && uploadedFile && selectedModel) {
      startProcessingMutation.mutate();
    }
  }, []);

  const getStatusIcon = () => {
    switch (activeJob?.status) {
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'failed':
        return <XCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Loader className="h-8 w-8 text-primary animate-spin" />;
    }
  };

  const getStatusText = () => {
    switch (activeJob?.status) {
      case 'pending':
        return 'Initializing processing...';
      case 'processing':
        return 'Processing your video...';
      case 'completed':
        return 'Processing completed successfully!';
      case 'failed':
        return 'Processing failed';
      default:
        return 'Starting...';
    }
  };

  const getStatusColor = () => {
    switch (activeJob?.status) {
      case 'completed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'processing':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Processing Video</h2>
        <p className="text-muted-foreground">
          Your video is being processed. This may take a few minutes.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeJob && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant="secondary" className={getStatusColor()}>
                  {activeJob.status.charAt(0).toUpperCase() + activeJob.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span>{activeJob.progress}%</span>
                </div>
                <Progress value={activeJob.progress} className="h-2" />
              </div>

              {activeJob.estimatedTimeRemaining && (
                <div className="flex justify-between text-sm">
                  <span>Estimated time remaining:</span>
                  <span>{Math.ceil(activeJob.estimatedTimeRemaining / 60)} minutes</span>
                </div>
              )}

              {activeJob.status === 'failed' && activeJob.errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-700">{activeJob.errorMessage}</p>
                </div>
              )}

              {activeJob.status === 'completed' && activeJob.outputVideoUrl && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Processing Complete!</h3>
                  <div className="flex space-x-3">
                    <Button size="sm" className="flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span>Preview Result</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Process Another Video
        </Button>
        {activeJob?.status === 'completed' && (
          <Button size="lg">
            View Results
          </Button>
        )}
      </div>
    </div>
  );
};
