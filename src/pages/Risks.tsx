import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Target,
  MoreHorizontal,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const risks = [
  {
    id: '1',
    title: 'Database Performance Bottleneck',
    description: 'Current database architecture may not handle expected user load',
    category: 'technical' as const,
    probability: 'high' as const,
    impact: 'high' as const,
    status: 'identified' as const,
    owner: 'John Doe',
    project: 'E-commerce Platform',
    mitigation: 'Implement database optimization and consider scaling solutions',
    createdDate: '2024-01-10',
    dueDate: '2024-02-15'
  },
  {
    id: '2',
    title: 'Budget Overrun Risk',
    description: 'Project spending is tracking 15% above planned budget',
    category: 'financial' as const,
    probability: 'medium' as const,
    impact: 'high' as const,
    status: 'assessed' as const,
    owner: 'Sarah Johnson',
    project: 'Mobile App Redesign',
    mitigation: 'Review scope and negotiate with vendors for cost reduction',
    createdDate: '2024-01-12',
    dueDate: '2024-01-30'
  },
  {
    id: '3',
    title: 'Key Developer Departure',
    description: 'Lead developer may leave the company during critical project phase',
    category: 'operational' as const,
    probability: 'low' as const,
    impact: 'high' as const,
    status: 'mitigated' as const,
    owner: 'Mike Chen',
    project: 'Data Analytics Dashboard',
    mitigation: 'Cross-training team members and documenting critical processes',
    createdDate: '2024-01-05',
    dueDate: '2024-01-25'
  },
  {
    id: '4',
    title: 'Security Compliance Gap',
    description: 'Current implementation may not meet new security regulations',
    category: 'strategic' as const,
    probability: 'medium' as const,
    impact: 'medium' as const,
    status: 'identified' as const,
    owner: 'Emily Davis',
    project: 'Security Audit Implementation',
    mitigation: 'Conduct compliance audit and implement necessary changes',
    createdDate: '2024-01-08',
    dueDate: '2024-02-20'
  }
];

const categoryColors = {
  'technical': 'default',
  'financial': 'warning',
  'operational': 'secondary',
  'strategic': 'destructive'
} as const;

const probabilityColors = {
  'low': 'secondary',
  'medium': 'warning',
  'high': 'destructive'
} as const;

const impactColors = {
  'low': 'secondary',
  'medium': 'warning',
  'high': 'destructive'
} as const;

const statusColors = {
  'identified': 'secondary',
  'assessed': 'warning',
  'mitigated': 'success',
  'closed': 'default'
} as const;

export function Risks() {
  const [selectedTab, setSelectedTab] = useState('all');

  const getRiskScore = (probability: string, impact: string) => {
    const probScore = probability === 'high' ? 3 : probability === 'medium' ? 2 : 1;
    const impactScore = impact === 'high' ? 3 : impact === 'medium' ? 2 : 1;
    return probScore * impactScore;
  };

  const RiskCard = ({ risk }: { risk: typeof risks[0] }) => {
    const riskScore = getRiskScore(risk.probability, risk.impact);
    const riskLevel = riskScore >= 6 ? 'Critical' : riskScore >= 4 ? 'High' : riskScore >= 2 ? 'Medium' : 'Low';
    const riskLevelColor = riskScore >= 6 ? 'destructive' : riskScore >= 4 ? 'warning' : 'secondary';

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{risk.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {risk.description}
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
                <DropdownMenuItem>Edit Risk</DropdownMenuItem>
                <DropdownMenuItem>Update Status</DropdownMenuItem>
                <DropdownMenuItem>Add Comment</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant={categoryColors[risk.category]}>
                  {risk.category}
                </Badge>
                <Badge variant={statusColors[risk.status]}>
                  {risk.status}
                </Badge>
                <Badge variant={riskLevelColor as any}>
                  {riskLevel} Risk
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                Score: {riskScore}/9
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Probability: </span>
                <Badge variant={probabilityColors[risk.probability]} className="text-xs">
                  {risk.probability}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Impact: </span>
                <Badge variant={impactColors[risk.impact]} className="text-xs">
                  {risk.impact}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Owner: </span>
                <span>{risk.owner}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Due: </span>
                <span>{new Date(risk.dueDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Mitigation Plan</h4>
              <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
            </div>

            <div className="pt-2 border-t">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Project: {risk.project}</span>
                <span>Created: {new Date(risk.createdDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const activeRisks = risks.filter(r => r.status !== 'closed');
  const criticalRisks = risks.filter(r => getRiskScore(r.probability, r.impact) >= 6);
  const mitigatedRisks = risks.filter(r => r.status === 'mitigated');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Management</h1>
          <p className="text-muted-foreground">
            Identify, assess, and mitigate project risks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Risk
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Risks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Risks</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Risks</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              Being monitored
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mitigated</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mitigatedRisks.length}</div>
            <p className="text-xs text-muted-foreground">
              Successfully handled
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Risks ({risks.length})</TabsTrigger>
          <TabsTrigger value="critical">Critical ({criticalRisks.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeRisks.length})</TabsTrigger>
          <TabsTrigger value="mitigated">Mitigated ({mitigatedRisks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {risks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="critical" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {criticalRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activeRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mitigated" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {mitigatedRisks.map((risk) => (
              <RiskCard key={risk.id} risk={risk} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}