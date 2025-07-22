import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Users, 
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  UserPlus,
  Settings,
  Award
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'admin' as const,
    department: 'Engineering',
    position: 'Senior Project Manager',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2022-01-15',
    projects: ['E-commerce Platform', 'Mobile App Redesign'],
    skills: ['Project Management', 'Agile', 'Scrum'],
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'manager' as const,
    department: 'Design',
    position: 'Lead UX Designer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    joinDate: '2022-03-20',
    projects: ['Mobile App Redesign', 'Data Analytics Dashboard'],
    skills: ['UI/UX Design', 'Figma', 'User Research'],
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'member' as const,
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '+1 (555) 345-6789',
    location: 'Austin, TX',
    joinDate: '2021-11-10',
    projects: ['E-commerce Platform', 'Security Audit Implementation'],
    skills: ['React', 'Node.js', 'TypeScript'],
    status: 'active' as const
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'member' as const,
    department: 'Engineering',
    position: 'Full Stack Developer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '+1 (555) 456-7890',
    location: 'Seattle, WA',
    joinDate: '2023-02-01',
    projects: ['E-commerce Platform'],
    skills: ['JavaScript', 'Python', 'AWS'],
    status: 'active' as const
  },
  {
    id: '5',
    name: 'Alex Wilson',
    email: 'alex.wilson@company.com',
    role: 'member' as const,
    department: 'Security',
    position: 'Security Analyst',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    phone: '+1 (555) 567-8901',
    location: 'Boston, MA',
    joinDate: '2022-08-15',
    projects: ['Security Audit Implementation'],
    skills: ['Cybersecurity', 'Penetration Testing', 'Risk Assessment'],
    status: 'active' as const
  }
];

const roleColors = {
  'admin': 'destructive',
  'manager': 'warning',
  'member': 'default'
} as const;

const statusColors = {
  'active': 'success',
  'inactive': 'secondary',
  'pending': 'warning'
} as const;

export function Team() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>
                {member.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.position}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Send Message</DropdownMenuItem>
              <DropdownMenuItem>Edit Member</DropdownMenuItem>
              <DropdownMenuItem>View Projects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={roleColors[member.role]}>
                {member.role}
              </Badge>
              <Badge variant={statusColors[member.status]}>
                {member.status}
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              {member.department}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{member.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{member.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{member.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Current Projects</h4>
            <div className="flex flex-wrap gap-1">
              {member.projects.map((project, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {project}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {member.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t text-xs text-muted-foreground">
            Joined {new Date(member.joinDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const adminMembers = teamMembers.filter(m => m.role === 'admin');
  const managerMembers = teamMembers.filter(m => m.role === 'manager');
  const regularMembers = teamMembers.filter(m => m.role === 'member');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team members, roles, and permissions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Active team members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(teamMembers.map(m => m.department)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Different departments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Managers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{managerMembers.length + adminMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              Leadership roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Recent additions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Members ({teamMembers.length})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({adminMembers.length})</TabsTrigger>
          <TabsTrigger value="managers">Managers ({managerMembers.length})</TabsTrigger>
          <TabsTrigger value="members">Members ({regularMembers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {adminMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="managers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {managerMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {regularMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}