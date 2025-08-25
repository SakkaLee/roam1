'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../../components/ui/Logo';
import SearchBar from '../../components/ui/SearchBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Droplets, Eye, ArrowRight, MapPin, Clock, Calendar } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: string;
  condition: string;
  humidity: string;
  wind: string;
  visibility: string;
  pressure: string;
  aqi: string;
  time: string;
  date: string;
}

interface ForecastData {
  day: string;
  date: string;
  condition: string;
  high: string;
  low: string;
  aqi: string;
}

interface HourlyData {
  time: string;
  condition: string;
  temp: string;
}

export default function WeatherPage() {
  const [searchCity, setSearchCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState('New York');

  const popularCities = [
    { name: 'Tokyo', country: 'Japan', temp: '15°C', condition: 'Sunny', humidity: '65%', wind: '12 km/h', aqi: '70', time: '09:30', date: '03/08' },
    { name: 'Paris', country: 'France', temp: '8°C', condition: 'Rainy', humidity: '80%', wind: '18 km/h', aqi: '75', time: '09:30', date: '03/08' },
    { name: 'New York', country: 'USA', temp: '2°C', condition: 'Cloudy', humidity: '60%', wind: '15 km/h', aqi: '70', time: '09:30', date: '03/08' },
    { name: 'London', country: 'UK', temp: '5°C', condition: 'Foggy', humidity: '75%', wind: '10 km/h', aqi: '68', time: '09:30', date: '03/08' },
    { name: 'Sydney', country: 'Australia', temp: '22°C', condition: 'Clear', humidity: '55%', wind: '8 km/h', aqi: '65', time: '09:30', date: '03/08' },
    { name: 'Bangkok', country: 'Thailand', temp: '28°C', condition: 'Partly Cloudy', humidity: '70%', wind: '5 km/h', aqi: '72', time: '09:30', date: '03/08' }
  ];

  const multiDayForecast: ForecastData[] = [
    { day: 'Today (Sun)', date: 'Mar 6', condition: 'Sunny', high: '20°C', low: '15°C', aqi: '67' },
    { day: 'Mon', date: 'Mar 7', condition: 'Cloudy', high: '22°C', low: '16°C', aqi: '71' },
    { day: 'Tue', date: 'Mar 8', condition: 'Lightning', high: '20°C', low: '17°C', aqi: '65' },
    { day: 'Wed', date: 'Mar 9', condition: 'Heavy Rain', high: '21°C', low: '16°C', aqi: '70' }
  ];

  const hourlyForecast: HourlyData[] = [
    { time: 'Now', condition: 'Rain', temp: '18°' },
    { time: '10AM', condition: 'Wind', temp: '19°' },
    { time: '11AM', condition: 'Partly Cloudy', temp: '22°' },
    { time: '12PM', condition: 'Sunny', temp: '23°' },
    { time: '1PM', condition: 'Rain', temp: '24°' },
    { time: '2PM', condition: 'Lightning', temp: '24°' }
  ];

  const weeklyForecast: ForecastData[] = [
    { day: 'Today', date: '', condition: 'Partly Cloudy', high: '24°', low: '13°', aqi: '70' },
    { day: 'Mon', date: '', condition: 'Rain', high: '22°', low: '12°', aqi: '75' },
    { day: 'Tue', date: '', condition: 'Sunny', high: '25°', low: '14°', aqi: '65' },
    { day: 'Wed', date: '', condition: 'Cloudy', high: '23°', low: '13°', aqi: '70' },
    { day: 'Thu', date: '', condition: 'Sunny', high: '26°', low: '15°', aqi: '68' },
    { day: 'Fri', date: '', condition: 'Partly Cloudy', high: '24°', low: '14°', aqi: '72' },
    { day: 'Sat', date: '', condition: 'Rain', high: '21°', low: '12°', aqi: '75' }
  ];

  const getWeatherIcon = (condition: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12'
    };

    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${sizeClasses[size]} text-yellow-500`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={`${sizeClasses[size]} text-blue-500`} />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className={`${sizeClasses[size]} text-blue-300`} />;
      case 'cloudy':
        return <Cloud className={`${sizeClasses[size]} text-gray-500`} />;
      case 'partly cloudy':
        return <div className="relative">
          <Sun className={`${sizeClasses[size]} text-yellow-500 absolute`} />
          <Cloud className={`${sizeClasses[size]} text-gray-500`} />
        </div>;
      case 'lightning':
        return <div className="relative">
          <Cloud className={`${sizeClasses[size]} text-gray-500`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-4 bg-yellow-400 rounded-full transform rotate-45"></div>
          </div>
        </div>;
      case 'heavy rain':
        return <div className="relative">
          <Cloud className={`${sizeClasses[size]} text-gray-500`} />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
              <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>;
      default:
        return <Cloud className={`${sizeClasses[size]} text-gray-500`} />;
    }
  };

  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setCurrentWeather({
        city: searchCity,
        temp: '18°C',
        condition: 'Partly Cloudy',
        humidity: '68%',
        wind: '14 km/h',
        visibility: '10 km',
        pressure: '1013 hPa',
        aqi: '72',
        time: '09:30',
        date: '03/08'
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
    // 这里可以导航到城市详细页面
    console.log(`Navigating to ${cityName} weather details`);
  };

  const handleForecastClick = (forecast: ForecastData) => {
    // 导航到详细预报页面
    console.log(`Navigating to detailed forecast for ${forecast.day}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-slate-300 hover:text-purple-400 transition-colors">Home</a>
              <a href="/roaming" className="text-slate-300 hover:text-purple-400 transition-colors">Roaming</a>
              <a href="/rates" className="text-slate-300 hover:text-purple-400 transition-colors">Rates</a>
              <a href="/weather" className="text-purple-400 font-medium">Weather</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <Cloud className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Creamy Weather Icons
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Beautiful 3D weather widgets with real-time data and interactive features
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <SearchBar />
        </div>

        {/* Main Weather Dashboard */}
        <div className="bg-slate-800/50 rounded-3xl p-8 backdrop-blur-sm border border-slate-700">
          {/* Multi-day Forecast Card */}
          <div className="mb-8">
            <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Multi-day Forecast</h3>
                <div className="flex space-x-2">
                  {['New York', 'Hongkong', 'Tokyo'].map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCityClick(city)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedCity === city 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {multiDayForecast.map((forecast, index) => (
                  <div 
                    key={index}
                    onClick={() => handleForecastClick(forecast)}
                    className="group bg-slate-600/50 rounded-xl p-4 border border-slate-500 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="text-sm text-slate-400 mb-2">{forecast.day}</div>
                      <div className="text-xs text-slate-500 mb-3">{forecast.date}</div>
                      <div className="flex justify-center mb-3">
                        {getWeatherIcon(forecast.condition, 'md')}
                      </div>
                      <div className="text-sm text-white font-medium mb-1">{forecast.high} - {forecast.low}</div>
                      <div className="text-xs text-slate-400">AQI {forecast.aqi}</div>
                    </div>
                    
                    {/* Click hint */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 text-center">
                      <div className="text-xs text-purple-400 flex items-center justify-center">
                        <span>Click for details</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* City Weather Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* New York - Snow */}
            <div 
              onClick={() => handleCityClick('New York')}
              className="group bg-slate-700/50 rounded-2xl p-6 border border-slate-600 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">New York</h3>
                  <p className="text-sm text-slate-400">09:30</p>
                </div>
                <Badge className="px-2 py-1 text-xs bg-slate-600 text-white">AQI 70</Badge>
              </div>
              
              <div className="flex justify-center mb-4">
                {getWeatherIcon('Snow', 'lg')}
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Snow</div>
                <div className="text-lg text-slate-300">-5° - 0°</div>
              </div>
              
              {/* Click hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                <div className="text-xs text-purple-400 flex items-center justify-center">
                  <span>Click for details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>

            {/* Athens - Heavy Rain */}
            <div 
              onClick={() => handleCityClick('Athens')}
              className="group bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Athens</h3>
                  <p className="text-sm text-blue-300">09:30</p>
                </div>
                <Badge className="px-2 py-1 text-xs bg-blue-600 text-white">AQI 75</Badge>
              </div>
              
              <div className="flex justify-center mb-4">
                {getWeatherIcon('Heavy Rain', 'lg')}
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Heavy Rain</div>
                <div className="text-lg text-blue-200">15° - 24°</div>
              </div>
              
              {/* Click hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                <div className="text-xs text-blue-400 flex items-center justify-center">
                  <span>Click for details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>

            {/* Tokyo - Rainbow */}
            <div 
              onClick={() => handleCityClick('Tokyo')}
              className="group bg-slate-700/50 rounded-2xl p-6 border border-slate-600 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Tokyo</h3>
                  <p className="text-sm text-slate-400">09:30</p>
                </div>
                <Badge className="px-2 py-1 text-xs bg-slate-600 text-white">AQI 70</Badge>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Cloud className="w-12 h-12 text-gray-500" />
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 rounded-full opacity-80"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Rainbow</div>
                <div className="text-lg text-slate-300">12° - 19°</div>
              </div>
              
              {/* Click hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                <div className="text-xs text-purple-400 flex items-center justify-center">
                  <span>Click for details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Hongkong Current */}
            <div 
              onClick={() => handleCityClick('Hongkong')}
              className="group md:col-span-2 bg-slate-700/50 rounded-2xl p-6 border border-slate-600 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Hongkong</h3>
                  <p className="text-sm text-slate-400">09:30 | 03/08</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-6">
                <div className="text-6xl font-black text-white">24°</div>
                <div className="flex justify-center">
                  {getWeatherIcon('Rain', 'lg')}
                </div>
              </div>
              
              {/* Click hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                <div className="text-xs text-purple-400 flex items-center justify-center">
                  <span>Click for details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>

            {/* New York Partly Cloudy */}
            <div 
              onClick={() => handleCityClick('New York')}
              className="group bg-slate-700/50 rounded-xl p-4 border border-slate-600 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">24°</div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon('Partly Cloudy', 'md')}
                </div>
                <div className="text-sm text-white">New York</div>
                <div className="text-xs text-slate-400">Partly cloudy</div>
              </div>
            </div>

            {/* Small Night Icons */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
                    <Cloud className="w-6 h-6 text-gray-500 absolute inset-0" />
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-6 h-6 bg-yellow-300 rounded-full opacity-60"></div>
                    <Cloud className="w-6 h-6 text-gray-500 absolute inset-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hourly Forecast */}
            <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
              <h3 className="text-lg font-bold text-white mb-4">Hourly Forecast</h3>
              <div className="grid grid-cols-6 gap-2">
                {hourlyForecast.map((hour, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-slate-400 mb-2">{hour.time}</div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(hour.condition, 'sm')}
                    </div>
                    <div className="text-sm text-white font-medium">{hour.temp}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* New York Full Moon */}
            <div 
              onClick={() => handleCityClick('New York')}
              className="group bg-slate-700/50 rounded-2xl p-6 border border-slate-600 hover:border-purple-400 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">New York</h3>
                  <p className="text-sm text-slate-400">09:30</p>
                </div>
                <Badge className="px-2 py-1 text-xs bg-slate-600 text-white">AQI 70</Badge>
              </div>
              
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-yellow-300 rounded-full opacity-80"></div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Full Moon</div>
                <div className="text-lg text-slate-300">-5° - 0°</div>
              </div>
              
              {/* Click hint */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                <div className="text-xs text-purple-400 flex items-center justify-center">
                  <span>Click for details</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            </div>

            {/* Weekly Forecast */}
            <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
              <h3 className="text-lg font-bold text-white mb-4">Weekly Forecast</h3>
              <div className="space-y-3">
                {weeklyForecast.map((day, index) => (
                  <div 
                    key={index}
                    onClick={() => handleForecastClick(day)}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-600/50 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-white font-medium">{day.day}</div>
                      <div className="flex justify-center">
                        {getWeatherIcon(day.condition, 'sm')}
                      </div>
                    </div>
                    <div className="text-sm text-white">
                      {day.high} {day.low}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities Weather */}
        <Card className="shadow-2xl border-0 bg-slate-800/50 backdrop-blur-sm border border-slate-700 mt-12">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-white">Popular Cities Weather</CardTitle>
            <p className="text-slate-300">Current weather conditions for popular destinations</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCities.map((city, index) => (
                <div 
                  key={index} 
                  onClick={() => handleCityClick(city.name)}
                  className="group bg-slate-700/50 rounded-2xl p-6 border-2 border-slate-600 hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-lg">{city.name}</h3>
                      <p className="text-sm text-slate-400">{city.country}</p>
                    </div>
                    <Badge className="px-3 py-1 text-xs font-bold bg-purple-500 text-white">
                      Live
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    {getWeatherIcon(city.condition)}
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-3xl font-black text-purple-400 mb-2">{city.temp}</div>
                    <div className="text-sm text-slate-300">{city.condition}</div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                      Humidity: {city.humidity}
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-4 h-4 mr-2 text-slate-400" />
                      Wind: {city.wind}
                    </div>
                  </div>
                  
                  {/* Click hint */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-3 text-center">
                    <div className="text-xs text-purple-400 flex items-center justify-center">
                      <span>Click for details</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
