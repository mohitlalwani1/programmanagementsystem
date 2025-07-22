import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MoreHorizontal, Users, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import { CreateProjectModal } from '@/components/modals/CreateProjectModal';
import { projectsAPI } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusColors = {
  'not-started': 'secondary',
  'in-progress': 'default',
  'on-hold': 'warning',
  'completed': 'success',
  'cancelled': 'destructive'
} as const;

const priorityColors = {
  'low': 'secondary',
  'medium': 'warning',
  'high': 'destructive',
  'critical': 'destructive'
} as const;

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const activeProjects = projects.filter(p => p.status === 'in-progress');
  const completedProjects = projects.filter(p => p.status === 'completed');
  const upcomingProjects = projects.filter(p => p.status === 'not-started');

  const ProjectCard = ({ project }: { project: typeof projects[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>View Timeline</DropdownMenuItem>
              <DropdownMenuItem>Generate Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={statusColors[project.status]}>
                {project.status.replace('-', ' ')}
              </Badge>
              <Badge variant={priorityColors[project.priority]}>
                {project.priority}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {project.progress}% complete
            </span>
          </div>

          <Progress value={project.progress} className="h-2" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span>{project.team?.length || 0} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
            </div>
            {project.risks?.length > 0 && (
              <div className="flex items-center space-x-2 text-yellow-600">
                <AlertTriangle className="w-4 h-4" />
                <span>{project.risks.length} risks</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Manager: {project.manager?.name || 'Not assigned'}</span>
              <span>Tasks: {project.tasks?.length || 0}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects in one place
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingProjects.length})</TabsTrigger>
          <TabsTrigger value="all">All Projects ({projects.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activeProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {completedProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CreateProjectModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={fetchProjects}
      />
    </div>
  );
}