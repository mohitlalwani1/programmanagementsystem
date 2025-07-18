import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, MoreHorizontal, Users, Calendar, DollarSign, Target } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const programs = [
  {
    id: '1',
    name: 'Digital Transformation Initiative',
    description: 'Comprehensive digital transformation across all business units',
    status: 'active' as const,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    budget: 2500000,
    spent: 1200000,
    manager: 'Sarah Johnson',
    projectCount: 8,
    riskCount: 3
  },
  {
    id: '2',
    name: 'Customer Experience Enhancement',
    description: 'Improving customer touchpoints and satisfaction metrics',
    status: 'active' as const,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    budget: 800000,
    spent: 320000,
    manager: 'Mike Chen',
    projectCount: 5,
    riskCount: 1
  },
  {
    id: '3',
    name: 'Infrastructure Modernization',
    description: 'Upgrading legacy systems and cloud migration',
    status: 'planning' as const,
    startDate: '2024-03-01',
    endDate: '2024-11-30',
    budget: 1500000,
    spent: 0,
    manager: 'Emily Davis',
    projectCount: 6,
    riskCount: 5
  }
];

const statusColors = {
  'planning': 'secondary',
  'active': 'success',
  'on-hold': 'warning',
  'completed': 'default'
} as const;

export function Programs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">
            Manage strategic programs and their associated projects
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Program
        </Button>
      </div>

      <div className="grid gap-6">
        {programs.map((program) => {
          const budgetUtilization = (program.spent / program.budget) * 100;
          
          return (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl">{program.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {program.description}
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
                      <DropdownMenuItem>Edit Program</DropdownMenuItem>
                      <DropdownMenuItem>View Projects</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant={statusColors[program.status]}>
                        {program.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">Manager:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{program.manager}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">Projects:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {program.projectCount} active projects
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">Budget:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ${program.spent.toLocaleString()} / ${program.budget.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Budget Utilization</span>
                    <span>{budgetUtilization.toFixed(1)}%</span>
                  </div>
                  <Progress value={budgetUtilization} className="h-2" />
                </div>

                {program.riskCount > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-medium">{program.riskCount} active risks</span>
                      <span>require attention</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}