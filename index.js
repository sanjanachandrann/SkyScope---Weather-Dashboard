import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('SkyScope Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center',
            color: 'white',
            maxWidth: '500px',
            width: '100%'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌤️</div>
            <h1 style={{ 
              fontSize: '2rem', 
              marginBottom: '16px', 
              fontWeight: '700',
              margin: '0 0 16px 0'
            }}>
              Oops! Something went wrong
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              marginBottom: '24px', 
              opacity: '0.9',
              lineHeight: '1.5',
              margin: '0 0 24px 0'
            }}>
              SkyScope encountered an unexpected error. Don't worry, we're on it!
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                padding: '12px 24px',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              🔄 Refresh Page
            </button>
            
            {/* Development error details */}
            {process.env.NODE_ENV === 'development' && (
              <details style={{ 
                marginTop: '20px', 
                textAlign: 'left',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ 
                  cursor: 'pointer', 
                  fontWeight: '600',
                  marginBottom: '10px'
                }}>
                  🔧 Developer Details
                </summary>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  fontSize: '0.8rem',
                  opacity: '0.8',
                  overflow: 'auto',
                  maxHeight: '200px'
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring function
function sendToAnalytics(metric) {
  // Example: Send performance metrics to analytics
  if (process.env.NODE_ENV === 'production') {
    console.log('Performance metric:', metric);
    // You can send this to Google Analytics, Mixpanel, etc.
  }
}

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with Error Boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals(sendToAnalytics);

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          console.log('🔄 New Service Worker version available');
          
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              if (window.confirm('🌟 New version of SkyScope available! Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.warn('❌ Service Worker registration failed:', error);
      });
  });
}

// Global error handler for unhandled promises
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  
  // Prevent the default browser behavior
  event.preventDefault();
  
  // Show user-friendly error message
  if (process.env.NODE_ENV === 'production') {
    // You could show a toast notification here
    console.warn('⚠️ Something went wrong. Please try refreshing the page.');
  }
});

// Network status monitoring
window.addEventListener('online', () => {
  console.log('🌐 Back online! You can now fetch weather data.');
  // You could show a toast notification here
});

window.addEventListener('offline', () => {
  console.log('📱 You are offline. Some features may not work.');
  // You could show a toast notification here
});

// Console welcome message
if (process.env.NODE_ENV === 'development') {
  console.log(
    '%c🌤️ Welcome to SkyScope Weather Dashboard!',
    'color: #667eea; font-size: 20px; font-weight: bold;'
  );
  console.log(
    '%cBuilt with React + Tailwind CSS + OpenWeatherMap API',
    'color: #764ba2; font-size: 14px;'
  );
  console.log(
    '%cCheck out the code: https://github.com/yourusername/skyscope-weather-dashboard',
    'color: #48bb78; font-size: 12px;'
  );
}

// Export for testing purposes
export { ErrorBoundary };
