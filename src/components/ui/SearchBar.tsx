'use client';

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Globe, DollarSign, Cloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  // AI搜索建议
  const aiSuggestions = [
    { 
      query: 'Japan roaming plans', 
      category: 'roaming', 
      icon: Globe,
      description: 'Find the best eSIM plans for Japan',
      route: '/roaming?country=japan'
    },
    { 
      query: 'USD to JPY exchange rate', 
      category: 'rates', 
      icon: DollarSign,
      description: 'Get real-time USD to JPY conversion',
      route: '/rates?from=USD&to=JPY'
    },
    { 
      query: 'Tokyo weather forecast', 
      category: 'weather', 
      icon: Cloud,
      description: 'Check Tokyo weather for your trip',
      route: '/weather?city=tokyo'
    },
    { 
      query: 'Thailand eSIM comparison', 
      category: 'roaming', 
      icon: Globe,
      description: 'Compare eSIM providers for Thailand',
      route: '/roaming?country=thailand'
    },
    { 
      query: 'EUR to USD conversion', 
      category: 'rates', 
      icon: DollarSign,
      description: 'Convert EUR to USD with live rates',
      route: '/rates?from=EUR&to=USD'
    }
  ];

  // 智能搜索处理
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    // 模拟AI搜索处理
    setTimeout(() => {
      const results = aiSuggestions.filter(suggestion => 
        suggestion.query.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // 如果没有匹配结果，提供通用建议
      if (results.length === 0) {
        setSearchResults([
          {
            query: searchQuery,
            category: 'general',
            icon: Search,
            description: `Search results for "${searchQuery}"`,
            route: `/search?q=${encodeURIComponent(searchQuery)}`
          }
        ]);
      } else {
        setSearchResults(results);
      }
      
      setIsSearching(false);
    }, 1000);
  };

  // 处理搜索建议点击
  const handleSuggestionClick = (suggestion: any) => {
    setSearchQuery(suggestion.query);
    setShowResults(false);
    setIsFocused(false);
    
    // 导航到相应页面
    if (suggestion.route) {
      router.push(suggestion.route);
    }
  };

  // 处理搜索结果点击
  const handleResultClick = (result: any) => {
    setSearchQuery(result.query);
    setShowResults(false);
    setIsFocused(false);
    
    if (result.route) {
      router.push(result.route);
    }
  };

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto search-container">
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search roaming plans, exchange rates, weather..."
              className="w-full pl-12 pr-24 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-blue-300 rounded-2xl shadow-lg focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300"
            />
          </div>
          
          {/* 搜索按钮 - 修复间隙 */}
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-400 to-teal-400 text-white px-6 py-2 rounded-xl font-semibold hover:from-blue-500 hover:to-teal-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            GO
          </Button>
          
          {/* 装饰性光效 */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-teal-400/20 opacity-0 transition-opacity duration-300 ${isFocused ? 'opacity-100' : ''}`}></div>
        </div>
        
        {/* 搜索建议 */}
        {isFocused && !showResults && (
          <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-3">
            <div className="text-sm text-gray-600 mb-2">AI-powered suggestions:</div>
            <div className="space-y-2">
              {aiSuggestions.slice(0, 3).map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-3"
                  >
                    <IconComponent className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="font-medium text-gray-800">{suggestion.query}</div>
                      <div className="text-xs text-gray-500">{suggestion.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 搜索结果 */}
        {showResults && (
          <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-3 max-h-96 overflow-y-auto">
            <div className="text-sm text-gray-600 mb-2">Search Results:</div>
            {isSearching ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500 mr-2" />
                <span className="text-gray-600">AI is analyzing your search...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {searchResults.map((result, index) => {
                  const IconComponent = result.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex items-center space-x-3 border border-transparent hover:border-blue-200"
                    >
                      <IconComponent className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="font-medium text-gray-800">{result.query}</div>
                        <div className="text-xs text-gray-500">{result.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
