# Hospital Management System (HMS)

![HMS Logo](public/favicon.svg)

A modern, responsive web application for streamlining hospital operations, appointment scheduling, and patient management.

## 🏥 Features

- **User Authentication**: Secure login for patients and doctors
- **Dashboard**: Personalized dashboards for patients and healthcare providers
- **Appointment Scheduling**: Easy-to-use interface with date and time validation
  - Future dates only (no past or same-day appointments)
  - 15-minute time slot intervals
  - Custom date-time picker component
- **Appointment Management**: View, edit, and cancel appointments
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Persistent Storage**: Local storage implementation for data persistence

## 🚀 Technology Stack

- **Frontend**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Storage**: Browser localStorage (client-side)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hms.git
   cd hms
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/            # Base UI components from Shadcn
│   └── DateTimePicker.tsx  # Custom date-time picker
├── pages/             # Application pages
│   ├── Dashboard.tsx  # User dashboard
│   ├── LoginPage.tsx  # Authentication
│   ├── AppointmentPage.tsx  # Schedule appointments
│   └── AppointmentListPage.tsx  # View appointments
├── lib/              # Utility functions and helpers
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## 🔒 Authentication

The application currently uses a simplified authentication system with localStorage. Users can log in as either patients or doctors, with different permissions and views for each role.

## 📱 Responsive Design

The application is fully responsive and optimized for various screen sizes:
- Desktop: Full-featured interface
- Tablet: Adapted layout with optimized components
- Mobile: Streamlined interface with touch-friendly controls

## 🔄 Data Flow

Data is stored locally using the browser's localStorage API. In a production environment, this would be replaced with a backend API and database.

## 🧪 Future Enhancements

- Backend integration with a real database
- Real-time notifications for appointment reminders
- Medical records management
- Doctor availability calendar
- Prescription management
- Telemedicine integration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work and development
