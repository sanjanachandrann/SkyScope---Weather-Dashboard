import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Thermometer, 
  Eye, 
  Gauge, 
  MapPin, 
  Search, 
  Loader2,
  CloudDrizzle,
  Zap
} from 'lucide-react';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Your OpenWeatherMap API key - replace with your actual key
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'demo_key';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  useEffect(() => {
    // Load default city on component mount
    handleSearch('London');
  }, []);

  const getWeatherIcon = (weatherMain, weatherId) => {
    const iconMap = {
      'Clear': Sun,
      'Clouds': Cloud,
      'Rain': CloudRain,
      'Drizzle': CloudDrizzle,
      'Thunderstorm': Zap,
      'Snow': CloudSnow,
    };
    return iconMap[weatherMain] || Cloud;
  };

  const fetchWeatherData = async (cityName) => {
    try {
      // For demo purposes, using mock data
      // Replace this with actual API call when you have an API key
      if (API_KEY === 'demo_key') {
        return getMockWeatherData(cityName);
      }

      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('City not found');
      }
      
      const weatherData = await weatherResponse.json();
      
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      
      const forecastData = await forecastResponse.json();
      
      // Process forecast data to get daily forecasts
      const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
      
      return {
        current: weatherData,
        forecast: dailyForecasts
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  };

  const getMockWeatherData = (cityName) => {
    const mockWeatherConditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow'];
    const randomCondition = mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)];
    
    const mockCurrent = {
      name: cityName,
      main: {
        temp: Math.floor(Math.random() * 35) + 5,
        feels_like: Math.floor(Math.random() * 35) + 5,
        humidity: Math.floor(Math.random() * 50) + 30,
        pressure: Math.floor(Math.random() * 100) + 1000
      },
      weather: [{
        main: randomCondition,
        description: `${randomCondition.toLowerCase()} sky`,
        id: 800
      }],
      wind: {
        speed: Math.floor(Math.random() * 10) + 1
      },
      visibility: Math.floor(Math.random() * 5000) + 5000
    };

    const mockForecast = Array.from({ length: 5 }, (_, index) => ({
      dt: Date.now() + (index * 86400000),
      main: {
        temp: Math.floor(Math.random() * 30) + 5
      },
      weather: [{
        main: mockWeatherConditions[Math.floor(Math.random() * mockWeatherConditions.length)],
        id: 800
      }]
    }));

    return {
      current: mockCurrent,
      forecast: mockForecast
    };
  };

  const handleSearch = async (searchCity = city) => {
    if (!searchCity.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await fetchWeatherData(searchCity);
      setWeather(data.current);
      setForecast(data.forecast);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            SkyScope
          </h1>
          <p className="text-white/80 text-lg">Your Personal Weather Dashboard</p>
        </div>

        {/* Search Bar */}
        <div className="glass rounded-2xl p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-white/60" />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter city name... (e.g., London, New York)"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 border border-white/30 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-8 text-white animate-slide-up">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="glass rounded-2xl p-8 mb-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
            <p className="text-white/80">Fetching weather data...</p>
          </div>
        )}

        {/* Current Weather */}
        {weather && !loading && (
          <>
            <div className="glass rounded-2xl p-8 mb-8 animate-slide-up weather-card">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                {/* Main Weather Info */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-white/60" />
                    <h2 className="text-3xl font-bold text-white">{weather.name}</h2>
                  </div>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-6 mb-4">
                    {React.createElement(getWeatherIcon(weather.weather[0].main), {
                      className: "h-20 w-20 text-yellow-300 drop-shadow-lg"
                    })}
                    <div>
                      <span className="text-6xl font-bold text-white">{Math.round(weather.main.temp)}°</span>
                      <span className="text-2xl text-white/60 ml-1">C</span>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-xl capitalize mb-2">{weather.weather[0].description}</p>
                  <p className="text-white/60 text-lg">Feels like {Math.round(weather.main.feels_like)}°C</p>
                </div>

                {/* Weather Stats Grid */}
                <div className="grid grid-cols-2 gap-6 w-full lg:w-auto">
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <Wind className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-white/60 text-sm mb-1">Wind Speed</p>
                    <p className="text-white font-semibold text-lg">{weather.wind.speed} m/s</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <Droplets className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-white/60 text-sm mb-1">Humidity</p>
                    <p className="text-white font-semibold text-lg">{weather.main.humidity}%</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <Gauge className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-white/60 text-sm mb-1">Pressure</p>
                    <p className="text-white font-semibold text-lg">{weather.main.pressure} hPa</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                    <Eye className="h-8 w-8 text-blue-300 mx-auto mb-2" />
                    <p className="text-white/60 text-sm mb-1">Visibility</p>
                    <p className="text-white font-semibold text-lg">{(weather.visibility / 1000).toFixed(1)} km</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="glass rounded-2xl p-8 animate-slide-up weather-card">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Thermometer className="h-6 w-6" />
                5-Day Forecast
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {forecast.map((day, index) => (
                  <div 
                    key={index} 
                    className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:bg-white/10 transition-all duration-200 weather-card"
                  >
                    <p className="text-white/80 text-sm mb-3 font-medium">
                      {index === 0 ? 'Today' : formatDate(day.dt)}
                    </p>
                    
                    <div className="mb-3">
                      {React.createElement(getWeatherIcon(day.weather[0].main), {
                        className: "h-10 w-10 text-yellow-300 mx-auto drop-shadow-lg"
                      })}
                    </div>
                    
                    <p className="text-white/60 text-xs mb-2 capitalize">{day.weather[0].main}</p>
                    <p className="text-white font-bold text-xl">{Math.round(day.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* API Instructions */}
        {!weather && !loading && !error && (
          <div className="glass rounded-2xl p-8 text-center">
            <Cloud className="h-16 w-16 text-white/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Welcome to SkyScope!</h3>
            <p className="text-white/70 mb-4">
              Search for any city to get current weather and 5-day forecast
            </p>
            <p className="text-white/50 text-sm">
              Currently showing demo data. Add your OpenWeatherMap API key to get real-time data.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-white/60">
          <p className="text-sm">
            © 2025 SkyScope Weather Dashboard | Built with React & API Integration
          </p>
          <p className="text-xs mt-1">
            Powered by OpenWeatherMap API
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
