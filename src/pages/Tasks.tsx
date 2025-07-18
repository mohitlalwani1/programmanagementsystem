import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MoreHorizontal, User, Calendar, Clock, Link } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const tasks = [
  {
    id: '1',
    title: 'Implement user authentication',
    description: 'Set up JWT-based authentication system with refresh tokens',
    status: 'in-progress' as const,
    priority: 'high' as const,
    assignee: { name: 'John Doe', avatar: '' },
    reporter: { name: 'Sarah Johnson', avatar: '' },
    projectName: 'E-commerce Platform',
    startDate: '2024-01-15',
    dueDate: '2024-01-25',
    estimatedHours: 16,
    actualHours: 12,
    dependencies: ['Setup database schema'],
    tags: ['backend', 'security']
  },
  {
    id: '2',
    title: 'Design product catalog UI',
    description: 'Create responsive product catalog with filtering and search',
    status: 'review' as const,
    priority: 'medium' as const,
    assignee: { name: 'Jane Smith', avatar: '' },
    reporter: { name: 'Mike Chen', avatar: '' },
    projectName: 'E-commerce Platform',
    startDate: '2024-01-10',
    dueDate: '2024-01-20',
    estimatedHours: 24,
    actualHours: 26,
    dependencies: [],
    tags: ['frontend', 'ui/ux']
  },
  {
    id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment pipeline',
    status: 'completed' as const,
    priority: 'high' as const,
    assignee: { name: 'Mike Wilson', avatar: '' },
    reporter: { name: 'Emily Davis', avatar: '' },
    projectName: 'Mobile App Redesign',
    startDate: '2024-01-05',
    dueDate: '2024-01-15',
    estimatedHours: 20,
    actualHours: 18,
    dependencies: [],
    tags: ['devops', 'automation']
  },
  {
    id: '4',
    title: 'API documentation update',
    description: 'Update API documentation for new endpoints',
    status: 'todo' as const,
    priority: 'low' as const,
    assignee: { name: 'Lisa Brown', avatar: '' },
    reporter: { name: 'David Kim', avatar: '' },
    projectName: 'Data Analytics Dashboard',
    startDate: '2024-01-20',
    dueDate: '2024-01-30',
    estimatedHours: 8,
    actualHours: 0,
    dependencies: ['Complete API development'],
    tags: ['documentation']
  },
  {
    id: '5',
    title: 'Security vulnerability assessment',
    description: 'Conduct comprehensive security assessment of the application',
    status: 'todo' as const,
    priority: 'critical' as const,
    assignee: { name: 'Alex Johnson', avatar: '' },
    reporter: { name: 'Sarah Johnson', avatar: '' },
    projectName: 'Security Audit Implementation',
    startDate: '2024-02-01',
    dueDate: '2024-02-10',
    estimatedHours: 40,
    actualHours: 0,
    dependencies: [],
    tags: ['security', 'audit']
  }
];

const statusColors = {
  'todo': 'secondary',
  'in-progress': 'default',
  'review': 'warning',
  'completed': 'success'
} as const;

const priorityColors = {
  'low': 'secondary',
  'medium': 'warning',
  'high': 'destructive',
  'critical': 'destructive'
} as const;

export function Tasks() {
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const reviewTasks = tasks.filter(t => t.status === 'review');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const TaskCard = ({ task }: { task: typeof tasks[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {task.description}
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
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Change Status</DropdownMenuItem>
              <DropdownMenuItem>Add Comment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={statusColors[task.status]}>
                {task.status.replace('-', ' ')}
              </Badge>
              <Badge variant={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {task.projectName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <span>{task.assignee.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{task.actualHours}h / {task.estimatedHours}h</span>
            </div>
            {task.dependencies.length > 0 && (
              <div className="flex items-center space-x-2">
                <Link className="w-4 h-4 text-muted-foreground" />
                <span>{task.dependencies.length} dependencies</span>
              </div>
            )}
          </div>

          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Reporter: {task.reporter.name}</span>
              <span>
                Started {new Date(task.startDate).toLocaleDateString()}
              </span>
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
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Track and manage tasks across all projects
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
          <TabsTrigger value="todo">To Do ({todoTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="review">Review ({reviewTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="todo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todoTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviewTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}