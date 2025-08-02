# Mini Booking System - Frontend Client

A modern React-based frontend application for a mini booking system with seat selection, user authentication, and booking management.

## 🚀 Features

- **User Authentication**: Login, signup, and password recovery
- **Slot Management**: Browse and filter available booking slots
- **Seat Selection**: Interactive seat layout with real-time availability
- **Booking System**: Complete booking flow with confirmation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Redux Toolkit with Redux Saga
- **Modern UI**: Ant Design components with custom styling
- **Real-time Updates**: Live seat availability and booking status

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Saga
- **UI Library**: Ant Design (antd)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Build Tool**: Create React App

## 📁 Project Structure

```
booking-system/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── booking-system/     # Booking components
│   │   │   ├── BookingForm.tsx
│   │   │   ├── BookingsList.tsx
│   │   │   ├── BookingSystem.tsx
│   │   │   ├── SeatButton.tsx
│   │   │   ├── SeatLayout.tsx
│   │   │   ├── SlotCard.tsx
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   └── common/             # Shared components
│   │       └── ProtectedRoute.js
│   ├── pages/                  # Page components
│   │   ├── BookingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   └── ForgetPasswordPage.tsx
│   ├── store/                  # Redux store
│   │   ├── auth/               # Authentication state
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgetpassword/
│   │   ├── booking/            # Booking state
│   │   ├── slot/               # Slot management
│   │   ├── index.ts
│   │   ├── reducers.ts
│   │   ├── sagas.ts
│   │   └── store.ts
│   ├── interfaces/             # TypeScript interfaces
│   ├── App.tsx
│   ├── index.tsx
│   ├── constants.ts
│   └── utils.ts
├── .env
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running

### 1. Clone and Install Dependencies

```bash
cd booking-system
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api/

# Optional: Other environment variables
REACT_APP_APP_NAME=Mini Booking System
REACT_APP_VERSION=1.0.0
```

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📱 Application Features

### Authentication System
- **Login Page**: User authentication with JWT tokens
- **Signup Page**: New user registration with validation
- **Forget Password**: Password recovery functionality
- **Protected Routes**: Route protection for authenticated users

### Booking System
- **Slot Browsing**: View available booking slots with filters
- **Advanced Filtering**: Search by date, venue, availability
- **Seat Selection**: Interactive seat map with real-time availability
- **Booking Flow**: Multi-step booking process with confirmation
- **My Bookings**: View and manage user bookings

### UI/UX Features
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with red theme
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Animations**: Smooth transitions and micro-interactions

## 🎨 Design System

### Color Palette
- **Primary**: Red (#ef4444, #dc2626)
- **Secondary**: Blue (#3b82f6)
- **Success**: Green (#10b981)
- **Warning**: Orange (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- **Headings**: Ant Design Typography
- **Body Text**: System fonts with Tailwind CSS
- **Icons**: Heroicons and Ant Design icons

## 🔄 State Management

### Redux Store Structure
```typescript
{
  auth: {
    login: { user, token, loading, error },
    register: { loading, error, success },
    forgetPassword: { loading, error, success }
  },
  booking: {
    bookings: [],
    loading: boolean,
    error: string,
    successMessage: string
  },
  slot: {
    slots: [],
    loading: boolean,
    error: string
  },
  bookedSlot: {
    seats: [],
    loading: boolean,
    error: string
  }
}
```

### Redux Saga Effects
- **Authentication**: Login, register, password recovery
- **Slot Management**: Fetch slots with filters
- **Booking Operations**: Create, read bookings
- **Seat Management**: Real-time seat availability

## 📚 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```

## 🔐 Authentication Flow

1. **Login**: User enters credentials → JWT token stored → Redirect to booking
2. **Signup**: User registration → Email verification → Auto-login
3. **Protected Routes**: Token validation → Access control
4. **Logout**: Clear token → Redirect to login

## 🎯 Booking Flow

1. **Browse Slots**: Filter and search available slots
2. **Select Slot**: Choose preferred time slot
3. **Seat Selection**: Interactive seat map selection
4. **User Details**: Enter booking information
5. **Confirmation**: Review and confirm booking
6. **Success**: Booking confirmation with details

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🔧 Configuration Files

### Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#ef4444',
        secondary: '#3b82f6'
      }
    }
  },
  plugins: []
}
```

### TypeScript (`tsconfig.json`)
- Strict type checking enabled
- Modern ES features support
- Path mapping for clean imports

## 🚀 Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: AWS CloudFront, Azure CDN
- **Server**: Nginx, Apache

### Environment Variables for Production
```env
REACT_APP_API_URL=https://your-api-domain.com/api/
REACT_APP_ENVIRONMENT=production
```

### Common Issues

1. **API Connection Error**
   - Verify backend server is running
   - Check REACT_APP_API_URL in .env file
   - Ensure CORS is configured on backend

2. **Authentication Issues**
   - Clear localStorage and try again
   - Check JWT token expiration
   - Verify API endpoints

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies are installed

4. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify Ant Design theme customization

### Debug Mode
```bash
# Enable debug mode
REACT_APP_DEBUG=true npm start
```

## 📄 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.


