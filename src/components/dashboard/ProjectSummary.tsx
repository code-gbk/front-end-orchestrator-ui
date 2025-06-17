
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { videoService } from '@/services/videoService';
import { Video, CheckCircle, Clock, FolderOpen } from 'lucide-react';

export const ProjectSummary = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['user-history'],
    queryFn: videoService.getUserHistory,
  });

  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const processingProjects = projects.filter(p => p.status === 'processing' || p.status === 'pending').length;

  const summaryCards = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: FolderOpen,
      color: 'text-blue-600',
    },
    {
      title: 'Completed',
      value: completedProjects,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Processing',
      value: processingProjects,
      icon: Clock,
      color: 'text-orange-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <IconComponent className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
