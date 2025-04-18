import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface User {
  name: string;
  role: 'patient' | 'doctor';
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hms_user');
    setUser(null);
    navigate('/');
  };

  if (!user) {
    return null; // Don't show navbar if user is not logged in
  }

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
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
          <span className="text-xl font-bold text-primary">Yahya Hospital</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className={`text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            Dashboard
          </Link>
          {user.role === 'patient' && (
            <Link 
              to="/appointments" 
              className={`text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/appointments' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                <path d="M8.5 2v3"></path>
                <path d="M15.5 2v3"></path>
              </svg>
              Schedule Appointment
            </Link>
          )}
          <Link 
            to="/appointment-list" 
            className={`text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/appointment-list' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18"></path>
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M3 15h18"></path>
            </svg>
            Appointments
          </Link>
          <Link 
            to="/profile" 
            className={`text-sm font-medium flex items-center gap-1.5 ${location.pathname === '/profile' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout} 
            className="hidden md:flex text-primary border-primary hover:bg-primary/10 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </Button>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-primary text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" x2="20" y1="12" y2="12"/>
                    <line x1="4" x2="20" y1="6" y2="6"/>
                    <line x1="4" x2="20" y1="18" y2="18"/>
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white border-l border-primary/10">
                <div className="flex items-center gap-2 mb-8 mt-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/dashboard" 
                    className={`p-3 text-sm font-medium rounded-md flex items-center gap-2 ${location.pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="7" height="9" x="3" y="3" rx="1" />
                      <rect width="7" height="5" x="14" y="3" rx="1" />
                      <rect width="7" height="9" x="14" y="12" rx="1" />
                      <rect width="7" height="5" x="3" y="16" rx="1" />
                    </svg>
                    Dashboard
                  </Link>
                  {user.role === 'patient' && (
                    <Link 
                      to="/appointments" 
                      className={`p-3 text-sm font-medium rounded-md flex items-center gap-2 ${location.pathname === '/appointments' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                        <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                        <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                        <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                        <path d="M8.5 2v3"></path>
                        <path d="M15.5 2v3"></path>
                      </svg>
                      Schedule Appointment
                    </Link>
                  )}
                  <Link 
                    to="/appointment-list" 
                    className={`p-3 text-sm font-medium rounded-md flex items-center gap-2 ${location.pathname === '/appointment-list' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3v18"></path>
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M3 15h18"></path>
                    </svg>
                    Appointments
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`p-3 text-sm font-medium rounded-md flex items-center gap-2 ${location.pathname === '/profile' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-accent'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                    className="mt-4 text-primary border-primary hover:bg-primary/10 hover:text-primary w-full justify-start p-3 h-auto font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
