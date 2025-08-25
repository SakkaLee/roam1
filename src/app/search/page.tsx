'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Logo from '../../components/ui/Logo';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, DollarSign, Cloud, ArrowRight, MapPin, Plane } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    // 模拟AI搜索处理
    setTimeout(() => {
      const results = generateSearchResults(searchQuery);
      setSearchResults(results);
      setIsLoading(false);
    }, 1500);
  };

  const generateSearchResults = (searchQuery: string) => {
    const lowerQuery = searchQuery.toLowerCase();
    const results = [];

    // 漫游相关结果
    if (lowerQuery.includes('roaming') || lowerQuery.includes('esim') || lowerQuery.includes('japan') || lowerQuery.includes('thailand')) {
      results.push({
        type: 'roaming',
        title: 'Japan Roaming Plans',
        description: 'Find the best eSIM plans for Japan with coverage comparison',
        icon: Plane,
        route: '/roaming?country=japan',
        tags: ['eSIM', 'Japan', 'Coverage']
      });
      
      if (lowerQuery.includes('thailand')) {
        results.push({
          type: 'roaming',
          title: 'Thailand eSIM Comparison',
          description: 'Compare eSIM providers and plans for Thailand',
          icon: Plane,
          route: '/roaming?country=thailand',
          tags: ['eSIM', 'Thailand', 'Comparison']
        });
      }
    }

    // 汇率相关结果
    if (lowerQuery.includes('exchange') || lowerQuery.includes('rate') || lowerQuery.includes('usd') || lowerQuery.includes('jpy') || lowerQuery.includes('eur')) {
      results.push({
        type: 'rates',
        title: 'USD to JPY Exchange Rate',
        description: 'Get real-time USD to JPY conversion with historical data',
        icon: DollarSign,
        route: '/rates?from=USD&to=JPY',
        tags: ['USD', 'JPY', 'Real-time']
      });
      
      if (lowerQuery.includes('eur')) {
        results.push({
          type: 'rates',
          title: 'EUR to USD Conversion',
          description: 'Convert EUR to USD with live exchange rates',
          icon: DollarSign,
          route: '/rates?from=EUR&to=USD',
          tags: ['EUR', 'USD', 'Conversion']
        });
      }
    }

    // 天气相关结果
    if (lowerQuery.includes('weather') || lowerQuery.includes('tokyo') || lowerQuery.includes('paris') || lowerQuery.includes('forecast')) {
      results.push({
        type: 'weather',
        title: 'Tokyo Weather Forecast',
        description: 'Check Tokyo weather for your upcoming trip',
        icon: Cloud,
        route: '/weather?city=tokyo',
        tags: ['Tokyo', 'Weather', 'Forecast']
      });
      
      if (lowerQuery.includes('paris')) {
        results.push({
          type: 'weather',
          title: 'Paris Weather Information',
          description: 'Get current weather and forecast for Paris',
          icon: Cloud,
          route: '/weather?city=paris',
          tags: ['Paris', 'Weather', 'Current']
        });
      }
    }

    // 如果没有特定结果，提供通用建议
    if (results.length === 0) {
      results.push(
        {
          type: 'general',
          title: 'Global Roaming Plans',
          description: 'Explore roaming plans for various countries',
          icon: Globe,
          route: '/roaming',
          tags: ['Roaming', 'Global', 'Plans']
        },
        {
          type: 'general',
          title: 'Currency Exchange Rates',
          description: 'Check real-time exchange rates for major currencies',
          icon: DollarSign,
          route: '/rates',
          tags: ['Exchange', 'Rates', 'Real-time']
        },
        {
          type: 'general',
          title: 'Global Weather Forecast',
          description: 'Get weather information for popular cities',
          icon: Cloud,
          route: '/weather',
          tags: ['Weather', 'Forecast', 'Cities']
        }
      );
    }

    return results;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'roaming': return 'from-blue-400 to-teal-400';
      case 'rates': return 'from-green-400 to-emerald-400';
      case 'weather': return 'from-purple-400 to-indigo-400';
      default: return 'from-gray-400 to-slate-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'roaming': return Plane;
      case 'rates': return DollarSign;
      case 'weather': return Cloud;
      default: return Globe;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/roaming" className="text-gray-600 hover:text-blue-600 transition-colors">Roaming</a>
              <a href="/rates" className="text-gray-600 hover:text-blue-600 transition-colors">Rates</a>
              <a href="/weather" className="text-gray-600 hover:text-blue-600 transition-colors">Weather</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Results Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-teal-400 rounded-3xl flex items-center justify-center shadow-2xl">
              <Search className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>
          <p className="text-xl text-gray-600">
            Results for: <span className="font-semibold text-blue-600">"{query}"</span>
          </p>
        </div>

        {/* Search Results */}
        <div className="space-y-6">
          {isLoading ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">AI is analyzing your search query...</p>
              </CardContent>
            </Card>
          ) : (
            searchResults.map((result, index) => {
              const IconComponent = result.icon;
              return (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${getTypeColor(result.type)} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{result.title}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{result.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {result.tags.map((tag: string, tagIndex: number) => (
                              <Badge key={tagIndex} variant="secondary" className="px-3 py-1 text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <Button
                            onClick={() => window.location.href = result.route}
                            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                          >
                            Explore
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* No Results Message */}
        {!isLoading && searchResults.length === 0 && (
          <Card className="shadow-lg">
            <CardContent className="p-12 text-center">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any results for "{query}". Try searching with different keywords.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Back to Home
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search page...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
