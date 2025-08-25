'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: 实现搜索逻辑
    console.log('Search:', searchQuery);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : 'scale-100'}`}>
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search roaming plans, exchange rates, weather..."
            className="w-full px-6 py-4 text-lg bg-white/90 backdrop-blur-sm border-2 border-blue-300 rounded-2xl shadow-lg focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 pr-24"
          />
          
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
        
        {/* 搜索建议 - 减少空白空间 */}
        {isFocused && (
          <div className="mt-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-blue-200 p-3">
            <div className="text-sm text-gray-600 mb-2">Popular searches:</div>
            <div className="flex flex-wrap gap-2">
              {['Japan Roaming', 'USD Exchange Rate', 'Tokyo Weather', 'Thailand eSIM', 'EUR Conversion'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchQuery(suggestion)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
