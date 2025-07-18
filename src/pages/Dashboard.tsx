import React from 'react';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { ProjectsOverview } from '@/components/dashboard/ProjectsOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        <ProjectsOverview />
        <RecentActivity />
      </div>
    </div>
  );
}