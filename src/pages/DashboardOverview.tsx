
import { ProjectSummary } from '@/components/dashboard/ProjectSummary';
import { ProjectList } from '@/components/dashboard/ProjectList';
import { NewProjectDialog } from '@/components/dashboard/NewProjectDialog';
import { Navbar } from '@/components/layout/Navbar';

const DashboardOverview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your stereo video projects
              </p>
            </div>
            <NewProjectDialog />
          </div>

          {/* Project Summary */}
          <ProjectSummary />

          {/* Project List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Your Projects</h2>
            <ProjectList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
