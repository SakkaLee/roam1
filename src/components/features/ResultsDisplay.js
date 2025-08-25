'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ResultsDisplay() {
  const roamingResults = [
    { country: '🇯🇵 Japan', operator: 'Airalo', price: '$9.90', data: '1GB/day', validity: '7 days' },
    { country: '🇹🇭 Thailand', operator: 'Holafly', price: '$7.90', data: '1GB/day', validity: '7 days' },
    { country: '🇫🇷 France', operator: 'Nomad', price: '$12.90', data: '1GB/day', validity: '7 days' }
  ];

  const exchangeResults = [
    { pair: 'USD → JPY', rate: '¥150.25', change: '+0.85%', trend: 'up' },
    { pair: 'USD → EUR', rate: '€0.92', change: '-0.02%', trend: 'down' },
    { pair: 'GBP → JPY', rate: '¥190.19', change: '+1.06%', trend: 'up' }
  ];

  const weatherResults = [
    { city: '🌤️ Tokyo', temp: '15°C', condition: 'Sunny', humidity: '65%' },
    { city: '☀️ Paris', temp: '8°C', condition: 'Rainy', humidity: '80%' },
    { city: '❄️ New York', temp: '2°C', condition: 'Cloudy', humidity: '60%' }
  ];

  return (
    <div className="space-y-6">
      {/* 漫游卡结果 */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <span className="text-2xl mr-2">🛫</span>
            Featured Roaming Plans
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {roamingResults.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-3 border border-blue-200 hover:border-blue-300 transition-colors duration-200">
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.country}</div>
                <div className="text-sm text-gray-600 mb-1">Operator: {item.operator}</div>
                <div className="text-lg font-bold text-blue-600 mb-1">{item.price}</div>
                <div className="text-xs text-gray-500">{item.data} | {item.validity}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 汇率结果 */}
      <Card className="shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
            <span className="text-2xl mr-2">💱</span>
            Popular Exchange Rates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {exchangeResults.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200 hover:border-green-300 transition-colors duration-200">
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.pair}</div>
                <div className="text-lg font-bold text-green-600 mb-1">{item.rate}</div>
                <div className={`text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.change}
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
            <span className="text-2xl mr-2">🌤️</span>
            Popular City Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {weatherResults.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-3 border border-purple-200 hover:border-purple-300 transition-colors duration-200">
                <div className="text-lg font-semibold text-gray-800 mb-1">{item.city}</div>
                <div className="text-lg font-bold text-purple-600 mb-1">{item.temp}</div>
                <div className="text-sm text-gray-600 mb-1">{item.condition}</div>
                <div className="text-xs text-gray-500">Humidity: {item.humidity}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
