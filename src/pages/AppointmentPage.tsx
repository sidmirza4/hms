import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateTimePickerForm } from '@/components/DateTimePicker';

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

const appointmentSchema = z.object({
  datetime: z.date({
    required_error: "Date and time are required",
  }),
  reason: z.string().min(3, { message: 'Reason must be at least 3 characters' })
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

export default function AppointmentPage() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      datetime: new Date(),
      reason: ''
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem('hms_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role !== 'patient') {
        // Only patients can schedule appointments
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const onSubmit = (values: AppointmentFormValues) => {
    if (!user) return;

    // Convert datetime to date and time strings
    const dateObj = values.datetime;
    const dateString = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Format time as HH:MM
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;

    const appointment: Appointment = {
      id: Date.now(),
      patient: user.name,
      date: dateString,
      time: timeString,
      reason: values.reason
    };

    const appointments: Appointment[] = JSON.parse(
      localStorage.getItem('hms_appointments') || '[]'
    );
    
    appointments.push(appointment);
    localStorage.setItem('hms_appointments', JSON.stringify(appointments));
    
    navigate('/appointment-list');
  };

  if (!user) return null;

  return (
    <div className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 px-2 sm:py-6 sm:px-0">
      <h1 className="text-xl sm:text-2xl font-bold text-primary">Schedule Appointment</h1>
      
      <Card className="w-full max-w-md">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="text-center text-lg sm:text-xl">Enter Appointment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Use the custom DateTimePickerForm component with callback */}
              <FormField
                control={form.control}
                name="datetime"
                render={({ field }) => (
                  <FormItem>
                    <DateTimePickerForm 
                      onDateTimeChange={(date) => {
                        field.onChange(date);
                      }} 
                    />
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base">Reason</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Reason for appointment" 
                        {...field} 
                        className="h-9 sm:h-10 text-sm sm:text-base" 
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between pt-4 gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/dashboard')}
                  className="text-xs sm:text-sm px-2 sm:px-4"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="text-xs sm:text-sm px-3 sm:px-4"
                >
                  Schedule
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
