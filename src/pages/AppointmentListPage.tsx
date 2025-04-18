import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Get all appointments from localStorage
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full max-w-4xl px-2 sm:px-4 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Appointments</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="text-xs sm:text-sm px-2 sm:px-4"
        >
          Back to Dashboard
        </Button>
      </div>

      <Card className="w-full max-w-4xl">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">
            {user.role === 'patient' 
              ? 'Your Appointments' 
              : 'All Patient Appointments'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-4 sm:py-6">
              <p className="text-sm sm:text-base text-muted-foreground">No appointments scheduled.</p>
              {user.role === 'patient' && (
                <Button 
                  className="mt-4 text-xs sm:text-sm" 
                  onClick={() => navigate('/appointments')}
                >
                  Schedule an Appointment
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">Date</TableHead>
                    <TableHead className="text-xs sm:text-sm">Time</TableHead>
                    <TableHead className="text-xs sm:text-sm">{user.role === 'doctor' ? 'Patient' : ''}</TableHead>
                    <TableHead className="text-xs sm:text-sm">Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{appointment.date}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{appointment.time}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4">{user.role === 'doctor' ? appointment.patient : ''}</TableCell>
                      <TableCell className="text-xs sm:text-sm py-2 sm:py-4 max-w-[150px] sm:max-w-none truncate">{appointment.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
