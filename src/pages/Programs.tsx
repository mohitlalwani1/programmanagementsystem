import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus, MoreHorizontal, Users, Calendar, DollarSign, Target } from 'lucide-react';
import { CreateProgramModal } from '@/components/modals/CreateProgramModal';
import { programsAPI } from '@/lib/api';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusColors = {
  'planning': 'secondary',
  'active': 'success',
  'on-hold': 'warning',
  'completed': 'default'
} as const;

export function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await programsAPI.getAll();
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programs</h1>
          <p className="text-muted-foreground">
            Manage strategic programs and their associated projects
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Program
        </Button>
      </div>

      <div className="grid gap-6">
        {programs.map((program) => {
          const budgetUtilization = program.budget > 0 ? (program.spent / program.budget) * 100 : 0;
          
          return (
            <Card key={program._id}>
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
                    <p className="text-sm text-muted-foreground">{program.manager?.name || 'Not assigned'}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <Target className="w-4 h-4" />
                      <span className="font-medium">Projects:</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {program.projects?.length || 0} active projects
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

                {program.risks?.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center space-x-2 text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-medium">{program.risks.length} active risks</span>
                      <span>require attention</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <CreateProgramModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={fetchPrograms}
      />
    </div>
  );
}