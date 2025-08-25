import React from 'react';
import Logo from '../../components/ui/Logo';
import SearchBar from '../../components/ui/SearchBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Globe, Wifi, Clock, DollarSign } from 'lucide-react';

export default function RoamingPage() {
  const roamingPlans = [
    {
      country: 'Japan',
      flag: '🇯🇵',
      plans: [
        { operator: 'Airalo', type: 'eSIM', price: '$9.90', data: '1GB/day', validity: '7 days', features: ['Unlimited calls', 'Local number'] },
        { operator: 'Holafly', type: 'eSIM', price: '$19.90', data: 'Unlimited', validity: '7 days', features: ['Unlimited data', '24/7 support'] },
        { operator: 'Nomad', type: 'eSIM', price: '$8.50', data: '1GB', validity: '7 days', features: ['Pay as you go', 'Global coverage'] }
      ]
    },
    {
      country: 'Thailand',
      flag: '🇹🇭',
      plans: [
        { operator: 'Airalo', type: 'eSIM', price: '$7.90', data: '1GB/day', validity: '7 days', features: ['Local rates', 'Fast 4G'] }
      ]
    },
    {
      country: 'France',
      flag: '🇫🇷',
      plans: [
        { operator: 'Airalo', type: 'eSIM', price: '$12.90', data: '1GB/day', validity: '7 days', features: ['EU roaming', 'Unlimited calls'] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/roaming" className="text-blue-600 font-medium">Roaming</a>
              <a href="/rates" className="text-gray-600 hover:text-blue-600 transition-colors">Rates</a>
              <a href="/weather" className="text-gray-600 hover:text-blue-600 transition-colors">Weather</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center">
              <Plane className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Global Roaming Plans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the best roaming plans for your international travels
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBar />
        </div>

        {/* Plans Display */}
        <div className="space-y-8">
          {roamingPlans.map((country) => (
            <Card key={country.country} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <span className="text-3xl mr-3">{country.flag}</span>
                  {country.country} Roaming Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {country.plans.map((plan, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="text-sm">
                          {plan.type}
                        </Badge>
                        <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">{plan.operator}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Wifi className="w-4 h-4 mr-2 text-blue-500" />
                          {plan.data}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          {plan.validity}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="text-xs text-gray-500 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-200 font-medium">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
