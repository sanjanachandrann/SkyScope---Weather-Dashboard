
# 🌤️ SkyScope - Weather Dashboard

A modern, responsive weather dashboard built with React that fetches and displays real-time weather data and 5-day forecasts with beautiful UI animations.

![SkyScope Demo](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=SkyScope+Weather+Dashboard)

## ✨ Features

- 🔍 **Real-time Weather Search** - Search weather by city name
- 🌡️ **Current Weather Display** - Temperature, feels-like, humidity, pressure
- 🌪️ **Wind & Visibility** - Comprehensive weather metrics
- 📅 **5-Day Forecast** - Extended weather predictions
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- ⚡ **Fast Performance** - Optimized React components
- 🌈 **Beautiful Gradients** - Eye-catching color schemes

## 🚀 Live Demo

[View Live Demo](https://your-demo-link.com)

## 🛠️ Technologies Used

- **React 18** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Beautiful icons
- **OpenWeatherMap API** - Weather data source
- **ES6+** - Modern JavaScript features

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skyscope-weather-dashboard.git
cd skyscope-weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Get your API key from [OpenWeatherMap](https://openweathermap.org/api):
   - Sign up for a free account
   - Generate an API key

4. Create a `.env` file in the root directory:
```env
REACT_APP_WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🔧 Configuration

### API Integration

To use real weather data, update the API calls in `src/components/WeatherDashboard.js`:

```javascript
// Replace mock data with real API calls
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
);
```

### Customization

- **Colors**: Modify the gradient colors in the main container classes
- **Icons**: Replace or add weather icons using Lucide React
- **Layout**: Adjust the grid system and spacing using Tailwind classes

## 📁 Project Structure

```
skyscope-weather-dashboard/
├── public/
│   ├── index.html
├── src/
│   ├── components/
│   │   └── WeatherDashboard.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── README.md
└── .env
```

## 🌟 Key Components

### WeatherDashboard
The main component that handles:
- Weather data fetching
- State management
- User interactions
- Responsive layout

### Features Breakdown
- **Search Functionality**: Real-time city search with loading states
- **Current Weather**: Displays temperature, conditions, and feels-like
- **Weather Metrics**: Wind speed, humidity, pressure, visibility
- **Forecast Cards**: 5-day weather predictions with icons
- **Error Handling**: User-friendly error messages

## 🎯 Future Enhancements

- [ ] Geolocation-based weather
- [ ] Weather alerts and notifications
- [ ] Hourly forecast
- [ ] Multiple city tracking
- [ ] Dark/Light theme toggle
- [ ] Weather maps integration
- [ ] Historical weather data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Your Name - Sanjana C K 23202041@rmd.ac.in

Project Link: [[https://github.com/yourusername/skyscope-weather-dashboard](https://github.com/sanjanachandrann/SkyScope---Weather-Dashboard)](https://github.com/yourusername/skyscope-weather-dashboard)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Lucide](https://lucide.dev/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the amazing framework

---

⭐ Star this repository if you found it helpful!
