
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProcessingStore } from '@/store/processingStore';
import { Plus } from 'lucide-react';

export const NewProjectDialog = () => {
  const [projectName, setProjectName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const setProjectName = useProcessingStore((state) => state.setProjectName);

  const handleCreateProject = () => {
    if (projectName.trim()) {
      setProjectName(projectName.trim());
      setIsOpen(false);
      setProjectName('');
      navigate('/dashboard/upload');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Enter a name for your new stereo video project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="col-span-3"
              placeholder="My Stereo Video Project"
              onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleCreateProject}
            disabled={!projectName.trim()}
          >
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
