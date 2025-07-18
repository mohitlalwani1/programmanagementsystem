import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MoreHorizontal, Users, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const projects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Complete overhaul of the e-commerce platform with modern technologies',
    status: 'in-progress' as const,
    priority: 'high' as const,
    progress: 75,
    budget: 150000,
    spent: 112500,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    manager: 'Sarah Johnson',
    team: ['John Doe', 'Jane Smith', 'Mike Wilson', 'Lisa Brown'],
    risks: 2,
    tasks: { total: 45, completed: 34 }
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Redesigning mobile application for better user experience',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    progress: 45,
    budget: 80000,
    spent: 36000,
    startDate: '2024-01-20',
    endDate: '2024-02-28',
    manager: 'Mike Chen',
    team: ['Alex Johnson', 'Emma Davis', 'Tom Wilson'],
    risks: 1,
    tasks: { total: 28, completed: 13 }
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Building comprehensive analytics dashboard for business insights',
    status: 'completed' as const,
    priority: 'low' as const,
    progress: 100,
    budget: 60000,
    spent: 58000,
    startDate: '2023-12-01',
    endDate: '2024-01-30',
    manager: 'Emily Davis',
    team: ['Chris Lee', 'Anna Taylor'],
    risks: 0,
    tasks: { total: 32, completed: 32 }
  },
  {
    id: '4',
    name: 'Security Audit Implementation',
    description: 'Implementing security recommendations from recent audit',
    status: 'not-started' as const,
    priority: 'critical' as const,
    progress: 0,
    budget: 120000,
    spent: 0,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    manager: 'David Kim',
    team: ['Security Team'],
    risks: 3,
    tasks: { total: 0, completed: 0 }
  }
];

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
              <span>{project.team.length} members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
            </div>
            {project.risks > 0 && (
              <div className="flex items-center space-x-2 text-yellow-600">
                <AlertTriangle className="w-4 h-4" />
                <span>{project.risks} risks</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Manager: {project.manager}</span>
              <span>Tasks: {project.tasks.completed}/{project.tasks.total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects in one place
          </p>
        </div>
        <Button>
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
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}