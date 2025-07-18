import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Programs } from '@/pages/Programs';
import { Projects } from '@/pages/Projects';
import { Tasks } from '@/pages/Tasks';
import { Timeline } from '@/pages/Timeline';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-background">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/budget" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Budget Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/risks" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Risk Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/documents" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Document Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/team" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Team Management</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="text-center py-12"><h1 className="text-2xl font-bold">Settings</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;