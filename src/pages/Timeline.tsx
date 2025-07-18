import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, BarChart3, List, Filter } from 'lucide-react';

const timelineData = [
  {
    id: '1',
    name: 'E-commerce Platform',
    type: 'project' as const,
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    progress: 75,
    status: 'in-progress' as const,
    milestones: [
      { name: 'Requirements Complete', date: '2024-01-30', completed: true },
      { name: 'Design Phase', date: '2024-02-15', completed: true },
      { name: 'Development Phase', date: '2024-02-28', completed: false },
      { name: 'Testing Phase', date: '2024-03-10', completed: false },
      { name: 'Launch', date: '2024-03-15', completed: false }
    ]
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    type: 'project' as const,
    startDate: '2024-01-20',
    endDate: '2024-02-28',
    progress: 45,
    status: 'in-progress' as const,
    milestones: [
      { name: 'User Research', date: '2024-01-25', completed: true },
      { name: 'Wireframes', date: '2024-02-05', completed: true },
      { name: 'UI Design', date: '2024-02-15', completed: false },
      { name: 'Development', date: '2024-02-25', completed: false },
      { name: 'Testing & Launch', date: '2024-02-28', completed: false }
    ]
  },
  {
    id: '3',
    name: 'Security Audit Implementation',
    type: 'project' as const,
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    progress: 0,
    status: 'not-started' as const,
    milestones: [
      { name: 'Audit Planning', date: '2024-02-10', completed: false },
      { name: 'Vulnerability Assessment', date: '2024-02-28', completed: false },
      { name: 'Implementation', date: '2024-03-31', completed: false },
      { name: 'Testing & Validation', date: '2024-04-20', completed: false },
      { name: 'Final Review', date: '2024-04-30', completed: false }
    ]
  }
];

const statusColors = {
  'not-started': 'secondary',
  'in-progress': 'default',
  'on-hold': 'warning',
  'completed': 'success'
} as const;

function getDaysFromNow(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getDateRange(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return totalDays;
}

export function Timeline() {
  const GanttView = () => (
    <div className="space-y-6">
      {timelineData.map((item) => {
        const totalDays = getDateRange(item.startDate, item.endDate);
        const startDaysFromNow = getDaysFromNow(item.startDate);
        const endDaysFromNow = getDaysFromNow(item.endDate);
        
        return (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                    ({totalDays} days)
                  </p>
                </div>
                <Badge variant={statusColors[item.status]}>
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-3" />
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Milestones</h4>
                  <div className="grid gap-2">
                    {item.milestones.map((milestone, index) => {
                      const daysFromNow = getDaysFromNow(milestone.date);
                      const isOverdue = daysFromNow < 0 && !milestone.completed;
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-2 rounded border">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              milestone.completed ? 'bg-green-500' : 
                              isOverdue ? 'bg-red-500' : 'bg-gray-300'
                            }`} />
                            <span className={`text-sm ${
                              milestone.completed ? 'line-through text-muted-foreground' : ''
                            }`}>
                              {milestone.name}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString()}
                            {isOverdue && (
                              <span className="text-red-500 ml-1">(Overdue)</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const CalendarView = () => (
    <Card>
      <CardHeader>
        <CardTitle>Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mx-auto mb-4" />
          <p>Calendar view will be implemented here</p>
          <p className="text-sm">This will show projects and milestones in a calendar format</p>
        </div>
      </CardContent>
    </Card>
  );

  const ListView = () => (
    <div className="space-y-4">
      {timelineData.map((item) => (
        <Card key={item.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{item.progress}%</p>
                  <Progress value={item.progress} className="w-20 h-2" />
                </div>
                <Badge variant={statusColors[item.status]}>
                  {item.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground">
            Visualize project timelines and track progress
          </p>
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="gantt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="gantt">
            <BarChart3 className="w-4 h-4 mr-2" />
            Gantt Chart
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="w-4 h-4 mr-2" />
            List View
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gantt">
          <GanttView />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>

        <TabsContent value="list">
          <ListView />
        </TabsContent>
      </Tabs>
    </div>
  );
}