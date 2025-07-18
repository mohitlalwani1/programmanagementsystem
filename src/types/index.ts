export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  avatar?: string;
  department?: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  manager: User;
  projects: Project[];
  risks: Risk[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  manager: User;
  team: User[];
  tasks: Task[];
  programId?: string;
  risks: Risk[];
  documents: Document[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: User;
  reporter: User;
  projectId: string;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  dependencies: string[];
  tags: string[];
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'financial' | 'operational' | 'strategic';
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'assessed' | 'mitigated' | 'closed';
  owner: User;
  mitigation: string;
  projectId?: string;
  programId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'requirement' | 'design' | 'test' | 'report' | 'other';
  version: string;
  uploadDate: string;
  uploadedBy: User;
  projectId: string;
  url: string;
  size: number;
}

export interface Notification {
  id: string;
  type: 'task' | 'project' | 'risk' | 'document' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
  actionUrl?: string;
}

export interface Activity {
  id: string;
  type: 'created' | 'updated' | 'completed' | 'assigned' | 'commented';
  entity: 'project' | 'task' | 'risk' | 'document';
  entityId: string;
  entityName: string;
  user: User;
  description: string;
  timestamp: string;
}