import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface User {
  name: string;
  role: 'patient' | 'doctor';
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);
  
  // Auto-redirect to dashboard if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-primary/90 to-secondary/90 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Yahya Hospital Management System</h1>
            <p className="text-xl md:text-2xl mb-8">Providing quality healthcare with compassion and care</p>
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-white text-primary hover:bg-white/90 hover:text-primary/90 px-8 py-6 text-lg"
            >
              Login to Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M19 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v.71"></path>
                    <path d="M14 8.71V5a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v3.71"></path>
                    <path d="M9 8.71V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3.71"></path>
                    <path d="M3 8.7V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.7"></path>
                    <path d="M8.5 2v3"></path>
                    <path d="M15.5 2v3"></path>
                    <path d="M12 12v6"></path>
                    <path d="M9 15h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Easy Appointment Scheduling</h3>
                <p className="text-muted-foreground">Schedule appointments with our doctors at your convenience.</p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                    <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
                    <path d="M12 7v8"></path>
                    <path d="M8 11v4"></path>
                    <path d="M16 11v4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Medical Records Access</h3>
                <p className="text-muted-foreground">View your medical history and appointment records securely.</p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Expert Doctors</h3>
                <p className="text-muted-foreground">Connect with our team of specialized healthcare professionals.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Access your appointments and medical information through our secure patient portal.</p>
          <Button 
            onClick={() => navigate('/login')}
            className="px-8"
          >
            Login Now
          </Button>
        </div>
      </div>
    </div>
  );
}
