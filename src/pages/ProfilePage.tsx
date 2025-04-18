import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  name: string;
  role: 'patient' | 'doctor';
}

interface Appointment {
  id: number;
  patient: string;
  date: string;
  time: string;
  reason: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Get appointments from localStorage
      const allAppointments: Appointment[] = JSON.parse(
        localStorage.getItem('hms_appointments') || '[]'
      );
      
      // If user is a patient, only show their appointments
      if (parsedUser.role === 'patient') {
        setAppointments(
          allAppointments.filter(
            (appointment) => appointment.patient === parsedUser.name
          )
        );
      } else {
        // Doctors can see all appointments
        setAppointments(allAppointments);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 px-2 sm:py-6 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-primary">Profile</h1>
      
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-2">
          <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
            <AvatarFallback className="text-xl sm:text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-xl sm:text-2xl">{user.name}</CardTitle>
            <p className="text-muted-foreground capitalize">{user.role}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="appointments" className="text-xs sm:text-sm">My Appointments</TabsTrigger>
              <TabsTrigger value="info" className="text-xs sm:text-sm">Account Information</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments" className="space-y-4 pt-4">
              {appointments.length === 0 ? (
                <div className="text-center py-4 sm:py-6">
                  <p className="text-sm sm:text-base text-muted-foreground">No appointments scheduled.</p>
                  {user.role === 'patient' && (
                    <div className="mt-4">
                      <a 
                        href="/appointments" 
                        className="text-primary hover:underline text-sm sm:text-base"
                      >
                        Schedule an appointment
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Time</TableHead>
                        {user.role === 'doctor' && <TableHead className="text-xs sm:text-sm">Patient</TableHead>}
                        <TableHead className="text-xs sm:text-sm">Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{appointment.date}</TableCell>
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{appointment.time}</TableCell>
                          {user.role === 'doctor' && (
                            <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{appointment.patient}</TableCell>
                          )}
                          <TableCell className="text-xs sm:text-sm py-2 sm:py-4 max-w-[150px] sm:max-w-none truncate">{appointment.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            <TabsContent value="info" className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Name</p>
                    <p className="text-sm sm:text-base">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground">Role</p>
                    <p className="text-sm sm:text-base capitalize">{user.role}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground">Account Status</p>
                  <p className="text-sm sm:text-base">Active</p>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    This is a demo application. All data is stored locally in your browser.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
