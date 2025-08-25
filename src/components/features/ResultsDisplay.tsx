'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, DollarSign, Cloud, MapPin, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ResultsDisplay() {
  const router = useRouter();

  const roamingResults = [
    { country: '🇯🇵 Japan', operator: 'Airalo', price: '$9.90', data: '1GB/day', validity: '7 days', route: '/roaming?country=japan' },
    { country: '🇹🇭 Thailand', operator: 'Holafly', price: '$7.90', data: '1GB/day', validity: '7 days', route: '/roaming?country=thailand' },
    { country: '🇫🇷 France', operator: 'Nomad', price: '$12.90', data: '1GB/day', validity: '7 days', route: '/roaming?country=france' }
  ];

  const exchangeResults = [
    { pair: 'USD → JPY', rate: '¥150.25', change: '+0.85%', trend: 'up', route: '/rates?from=USD&to=JPY' },
    { pair: 'USD → EUR', rate: '€0.92', change: '-0.02%', trend: 'down', route: '/rates?from=USD&to=EUR' },
    { pair: 'GBP → JPY', rate: '¥190.19', change: '+1.06%', trend: 'up', route: '/rates?from=GBP&to=JPY' }
  ];

  const weatherResults = [
    { city: '🌤️ Tokyo', temp: '15°C', condition: 'Sunny', humidity: '65%', route: '/weather?city=tokyo' },
    { city: '☀️ Paris', temp: '8°C', condition: 'Rainy', humidity: '80%', route: '/weather?city=paris' },
    { city: '❄️ New York', temp: '2°C', condition: 'Cloudy', humidity: '60%', route: '/weather?city=newyork' }
  ];

  // 处理漫游卡点击
  const handleRoamingClick = (route: string) => {
    router.push(route);
  };

  // 处理汇率点击
  const handleExchangeClick = (route: string) => {
    router.push(route);
  };

  // 处理天气点击
  const handleWeatherClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="space-y-6">
      {/* 漫游卡结果 */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Plane className="w-6 h-6 mr-2 text-blue-600" />
            Featured Roaming Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roamingResults.map((item, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-105"
                onClick={() => handleRoamingClick(item.route)}
              >
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.country}</div>
                <div className="text-sm text-gray-600 mb-1">Operator: {item.operator}</div>
                <div className="text-lg font-bold text-blue-600 mb-1">{item.price}</div>
                <div className="text-xs text-gray-500 mb-2">{item.data} | {item.validity}</div>
                
                {/* 点击提示 */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs text-blue-600 font-medium">Click for details</span>
                  <ArrowRight className="w-3 h-3 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 汇率结果 */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <DollarSign className="w-6 h-6 mr-2 text-green-600" />
            Popular Exchange Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exchangeResults.map((item, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200 hover:border-green-300 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-105"
                onClick={() => handleExchangeClick(item.route)}
              >
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.pair}</div>
                <div className="text-lg font-bold text-green-600 mb-1">{item.rate}</div>
                <div className={`text-sm font-medium mb-2 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
                </div>
                
                {/* 点击提示 */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs text-green-600 font-medium">Click for details</span>
                  <ArrowRight className="w-3 h-3 text-green-600 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 天气结果 */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <Cloud className="w-6 h-6 mr-2 text-purple-600" />
            Popular City Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {weatherResults.map((item, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-200 hover:border-purple-300 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-105"
                onClick={() => handleWeatherClick(item.route)}
              >
                <div className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-purple-500" />
                  {item.city.replace(/[🌤️☀️❄️]/g, '')}
                </div>
                <div className="text-lg font-bold text-purple-600 mb-1">{item.temp}</div>
                <div className="text-sm text-gray-600 mb-1">{item.condition}</div>
                <div className="text-xs text-gray-500 mb-2">Humidity: {item.humidity}</div>
                
                {/* 点击提示 */}
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-xs text-purple-600 font-medium">Click for details</span>
                  <ArrowRight className="w-3 h-3 text-purple-600 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
