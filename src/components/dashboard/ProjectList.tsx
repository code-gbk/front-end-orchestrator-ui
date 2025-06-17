
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { videoService } from '@/services/videoService';
import { ProcessingJob } from '@/types';
import { Eye, Download, Video, AlertCircle } from 'lucide-react';
import { NewProjectDialog } from './NewProjectDialog';

const getStatusBadge = (status: ProcessingJob['status']) => {
  const statusConfig = {
    pending: { variant: 'secondary' as const, label: 'Uploaded' },
    processing: { variant: 'default' as const, label: 'Processing' },
    completed: { variant: 'default' as const, label: 'Completed' },
    failed: { variant: 'destructive' as const, label: 'Failed' },
  };

  const config = statusConfig[status];
  return (
    <Badge 
      variant={config.variant} 
      className={status === 'completed' ? 'bg-green-600 hover:bg-green-700' : undefined}
    >
      {config.label}
    </Badge>
  );
};

const getFileType = (url: string) => {
  const extension = url.split('.').pop()?.toUpperCase();
  return extension || 'VIDEO';
};

export const ProjectList = () => {
  const { data: projects = [], isLoading, refetch } = useQuery({
    queryKey: ['user-history'],
    queryFn: videoService.getUserHistory,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first stereo video project to get started
          </p>
          <NewProjectDialog />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  Project {project.id.slice(0, 8)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(project.status)}
                </TableCell>
                <TableCell>
                  {getFileType(project.inputVideoUrl)}
                </TableCell>
                <TableCell>
                  {format(new Date(project.createdAt), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {project.status === 'completed' && project.outputVideoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(project.outputVideoUrl, '_blank')}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        // Navigate to project details or processing status
                        console.log('View project:', project.id);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
