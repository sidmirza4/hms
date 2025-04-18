import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  name: string;
  role: 'patient' | 'doctor';
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('hms_user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center py-6 px-4">
      {/* Welcome Banner */}
      <div className="w-full max-w-5xl mb-8">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg overflow-hidden">
          <div className="relative p-6 md:p-8 text-white">
            <div className="absolute right-0 top-0 w-32 h-32 md:w-64 md:h-64 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 19h8a4 4 0 0 0 4-4v-8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4Z" />
                <path d="M8 19v3" />
                <path d="M16 19v3" />
                <path d="M12 3v7" />
                <path d="M9 6h6" />
              </svg>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 bg-white border-2 border-white shadow-md">
                  <AvatarFallback className="text-primary font-bold text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user.name}</h1>
                  <p className="text-white/80">{currentDate}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white hidden md:flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Logout
              </Button>
            </div>
            <p className="mt-2 text-white/80 max-w-2xl">
              {user.role === 'patient' 
                ? 'Access your health records, schedule appointments, and manage your healthcare journey.' 
                : 'View your patient appointments, manage schedules, and access patient records.'}
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="md:col-span-2">
          <Card className="shadow-md border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                  <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                  <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                  <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                  <path d="M8.5 2v3"></path>
                  <path d="M15.5 2v3"></path>
                </svg>
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your appointments and profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.role === 'patient' && (
                  <Button 
                    onClick={() => navigate('/appointments')}
                    className="h-20 sm:h-24 text-base justify-start px-4 bg-primary hover:bg-primary/90"
                  >
                    <div className="mr-3 bg-white/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                        <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                        <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                        <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                        <path d="M12 12v6"></path>
                        <path d="M9 15h6"></path>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Schedule Appointment</div>
                      <div className="text-xs text-white/70">Book a new appointment</div>
                    </div>
                  </Button>
                )}
                <Button 
                  onClick={() => navigate('/appointment-list')}
                  variant="secondary"
                  className="h-20 sm:h-24 text-base justify-start px-4 bg-secondary hover:bg-secondary/90"
                >
                  <div className="mr-3 bg-white/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18"></path>
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M3 15h18"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">View Appointments</div>
                    <div className="text-xs text-white/70">Check your schedule</div>
                  </div>
                </Button>
                <Button 
                  onClick={() => navigate('/profile')}
                  variant="outline"
                  className="h-20 sm:h-24 text-base justify-start px-4 border-primary text-primary hover:bg-primary/10"
                >
                  <div className="mr-3 bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">My Profile</div>
                    <div className="text-xs text-muted-foreground">View your information</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Card */}
        <div>
          <Card className="shadow-md border-none h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Information
              </CardTitle>
              <CardDescription>Important details about your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-accent/30 p-4 rounded-lg">
                  <h3 className="font-medium text-primary mb-2">Account Type</h3>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-2 rounded-full">
                      {user.role === 'patient' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                          <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
                          <path d="M9 3v6"></path>
                          <path d="M15 3v6"></path>
                          <path d="M9 14h6"></path>
                          <path d="M12 17v-3"></path>
                        </svg>
                      )}
                    </div>
                    <span className="capitalize">{user.role}</span>
                  </div>
                </div>

                <div className="bg-accent/30 p-4 rounded-lg">
                  <h3 className="font-medium text-primary mb-2">System Information</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a demo application. All data is stored locally in your browser and will be lost when you clear your browser data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
