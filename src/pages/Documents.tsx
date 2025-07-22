import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  FileText, 
  Download, 
  Search,
  Filter,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Share
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const documents = [
  {
    id: '1',
    name: 'Project Requirements Document',
    type: 'requirement' as const,
    version: '2.1',
    size: 2.4,
    uploadDate: '2024-01-15',
    uploadedBy: 'Sarah Johnson',
    project: 'E-commerce Platform',
    url: '#',
    status: 'approved' as const,
    description: 'Comprehensive requirements for the e-commerce platform project'
  },
  {
    id: '2',
    name: 'UI/UX Design Specifications',
    type: 'design' as const,
    version: '1.3',
    size: 15.7,
    uploadDate: '2024-01-12',
    uploadedBy: 'Mike Chen',
    project: 'Mobile App Redesign',
    url: '#',
    status: 'draft' as const,
    description: 'Design specifications and wireframes for mobile app redesign'
  },
  {
    id: '3',
    name: 'Test Plan and Cases',
    type: 'test' as const,
    version: '1.0',
    size: 3.2,
    uploadDate: '2024-01-10',
    uploadedBy: 'Emily Davis',
    project: 'Data Analytics Dashboard',
    url: '#',
    status: 'approved' as const,
    description: 'Comprehensive test plan and test cases for quality assurance'
  },
  {
    id: '4',
    name: 'Security Audit Report',
    type: 'report' as const,
    version: '1.0',
    size: 8.9,
    uploadDate: '2024-01-08',
    uploadedBy: 'Alex Wilson',
    project: 'Security Audit Implementation',
    url: '#',
    status: 'review' as const,
    description: 'Detailed security audit findings and recommendations'
  },
  {
    id: '5',
    name: 'API Documentation',
    type: 'other' as const,
    version: '3.2',
    size: 1.8,
    uploadDate: '2024-01-05',
    uploadedBy: 'John Doe',
    project: 'E-commerce Platform',
    url: '#',
    status: 'approved' as const,
    description: 'Complete API documentation with endpoints and examples'
  }
];

const typeColors = {
  'requirement': 'default',
  'design': 'secondary',
  'test': 'warning',
  'report': 'destructive',
  'other': 'outline'
} as const;

const statusColors = {
  'draft': 'secondary',
  'review': 'warning',
  'approved': 'success',
  'archived': 'outline'
} as const;

const typeIcons = {
  'requirement': FileText,
  'design': FileText,
  'test': FileText,
  'report': FileText,
  'other': FileText
};

export function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const DocumentCard = ({ document }: { document: typeof documents[0] }) => {
    const TypeIcon = typeIcons[document.type];
    
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <TypeIcon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">{document.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  v{document.version} • {document.size} MB
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {document.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant={typeColors[document.type]}>
                  {document.type}
                </Badge>
                <Badge variant={statusColors[document.status]}>
                  {document.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium">Project:</span>
                <p>{document.project}</p>
              </div>
              <div>
                <span className="font-medium">Uploaded by:</span>
                <p>{document.uploadedBy}</p>
              </div>
            </div>

            <div className="pt-2 border-t text-xs text-muted-foreground">
              Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const requirementDocs = documents.filter(d => d.type === 'requirement');
  const designDocs = documents.filter(d => d.type === 'design');
  const testDocs = documents.filter(d => d.type === 'test');
  const reportDocs = documents.filter(d => d.type === 'report');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Management</h1>
          <p className="text-muted-foreground">
            Organize and manage project documents and files
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Document
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search documents..."
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
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.filter(d => d.status === 'review').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {documents.reduce((sum, doc) => sum + doc.size, 0).toFixed(1)} MB
            </div>
            <p className="text-xs text-muted-foreground">
              Of 1GB available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="requirements">Requirements ({requirementDocs.length})</TabsTrigger>
          <TabsTrigger value="design">Design ({designDocs.length})</TabsTrigger>
          <TabsTrigger value="test">Test ({testDocs.length})</TabsTrigger>
          <TabsTrigger value="reports">Reports ({reportDocs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredDocuments.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {requirementDocs.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="design" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {designDocs.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {testDocs.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {reportDocs.map((document) => (
              <DocumentCard key={document.id} document={document} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}