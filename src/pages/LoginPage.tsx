import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'patient'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, you would validate credentials with a backend
    // For this demo, we'll just simulate a successful login
    const user = {
      name: formData.username,
      role: formData.role as 'patient' | 'doctor'
    };

    // Save user to localStorage
    localStorage.setItem('hms_user', JSON.stringify(user));

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-8">
      {/* Left side - Image and Text */}
      <div className="max-w-md w-full space-y-6 text-center md:text-left">
        <div>
          <div className="flex justify-center md:justify-start mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M8 19h8a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4Z" />
              <path d="M8 19v3" />
              <path d="M16 19v3" />
              <path d="M12 3v7" />
              <path d="M9 6h6" />
              <path d="M8 10v.01" />
              <path d="M16 10v.01" />
              <path d="M12 12v3" />
              <path d="M12 15h2" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-primary">Welcome Back</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Access your healthcare information securely with Yahya Hospital Management System.
          </p>
          
          <div className="mt-8 hidden md:block">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professionals" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-lg"></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
                  <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                  <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                  <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                  <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                  <path d="M8.5 2v3"></path>
                  <path d="M15.5 2v3"></path>
                </svg>
                <p className="text-xs mt-1 text-center font-medium">Appointments</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
                  <path d="M12 11h4"></path>
                  <path d="M12 16h4"></path>
                  <path d="M8 11h.01"></path>
                  <path d="M8 16h.01"></path>
                </svg>
                <p className="text-xs mt-1 text-center font-medium">Records</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mx-auto">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <p className="text-xs mt-1 text-center font-medium">Results</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <Card className="w-full max-w-md border-none shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-primary font-bold">Sign In</CardTitle>
          <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Your Role</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={handleRoleChange}
                className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 mt-2"
              >
                <div className="flex items-center space-x-2 bg-accent/50 px-4 py-3 rounded-md">
                  <RadioGroupItem value="patient" id="patient" className="text-primary" />
                  <Label htmlFor="patient" className="font-medium cursor-pointer">Patient</Label>
                </div>
                <div className="flex items-center space-x-2 bg-accent/50 px-4 py-3 rounded-md">
                  <RadioGroupItem value="doctor" id="doctor" className="text-primary" />
                  <Label htmlFor="doctor" className="font-medium cursor-pointer">Doctor</Label>
                </div>
              </RadioGroup>
            </div>
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium"
            >
              Sign In
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              This is a demo application. Any username and password will work.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
