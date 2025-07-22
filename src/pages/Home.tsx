import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Globe,
  Play,
  CheckCircle,
  Users2,
  Zap2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  {
    icon: Target,
    title: 'Project Management',
    description: 'Organize and track projects with powerful tools and intuitive interfaces.',
    demo: true
  },
  {
    icon: CheckSquare,
    title: 'Task Tracking',
    description: 'Break down work into manageable tasks and monitor progress in real-time.',
    demo: true
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Bring your team together with seamless communication and collaboration tools.',
    demo: true
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Get insights into your projects with comprehensive analytics and reports.',
    demo: true
  },
  {
    icon: Shield,
    title: 'Risk Management',
    description: 'Identify, assess, and mitigate risks before they impact your projects.',
    demo: true
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Automate repetitive tasks and workflows to boost productivity.',
    demo: false
  }
];

const stats = [
  { label: 'Projects Managed', value: '10,000+' },
  { label: 'Teams Using PMS', value: '500+' },
  { label: 'Tasks Completed', value: '1M+' },
  { label: 'Success Rate', value: '98%' }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Project Manager at TechCorp',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    content: 'PMS has transformed how we manage our projects. The intuitive interface and powerful features have increased our team productivity by 40%.'
  },
  {
    name: 'Mike Chen',
    role: 'Engineering Lead at StartupXYZ',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    content: 'The risk management and timeline features are game-changers. We can now anticipate issues before they become problems.'
  },
  {
    name: 'Emily Davis',
    role: 'Operations Director at GlobalTech',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    content: 'The best project management tool we\'ve used. The team collaboration features have brought our remote team closer together.'
  }
];

export function Home() {
  const { user } = useAuth();

  if (user) {
    // If user is logged in, redirect to dashboard
    window.location.href = '/dashboard';
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">PMS</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <a href="#features">Features</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#testimonials">Reviews</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#pricing">Pricing</a>
              </Button>
              <Button asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 500+ teams worldwide
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Manage Projects Like a
              <span className="text-primary"> Pro</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Streamline your project management with our comprehensive platform. 
              Track progress, manage teams, and deliver results on time, every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link to="/login">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3" onClick={() => {
                document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo-video" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              See PMS in Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch how teams around the world use PMS to deliver projects faster and more efficiently
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-12">
                <Play className="w-20 h-20 mx-auto mb-6 text-white" />
                <h3 className="text-2xl font-bold text-white mb-4">Interactive Product Demo</h3>
                <p className="text-white/80 mb-6">
                  See how easy it is to manage projects, track tasks, and collaborate with your team
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/login">
                    Try Live Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you manage every aspect of your projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    {feature.demo && (
                      <Badge variant="secondary" className="text-xs">
                        <Zap2 className="w-3 h-3 mr-1" />
                        Live Demo
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                  {feature.demo && (
                    <Button variant="ghost" size="sm" className="mt-4 p-0 h-auto" asChild>
                      <Link to="/login">
                        Try it now <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by teams worldwide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              See what our customers have to say about their experience with PMS
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the plan that's right for your team
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <div className="text-4xl font-bold mb-2">$9</div>
                <p className="text-muted-foreground mb-6">per user/month</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Up to 10 projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Basic task management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/login">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Professional</h3>
                <div className="text-4xl font-bold mb-2">$19</div>
                <p className="text-muted-foreground mb-6">per user/month</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Risk management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link to="/login">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <div className="text-4xl font-bold mb-2">$39</div>
                <p className="text-muted-foreground mb-6">per user/month</p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Everything in Professional
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Advanced security
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Dedicated support
                  </li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/login">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to transform your project management?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who trust PMS to deliver their projects on time and within budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link to="/login">
              Start Your Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl">PMS</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate project management solution for modern teams.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li>Security</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>Community</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Program Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}