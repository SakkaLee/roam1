'use client';

import React, { useState, useEffect } from 'react';
import Logo from '../../components/ui/Logo';
import SearchBar from '../../components/ui/SearchBar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, RefreshCw, Calculator, ArrowRight } from 'lucide-react';

export default function RatesPage() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('JPY');
  const [isLoading, setIsLoading] = useState(false);

  // 处理URL参数
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const fromParam = urlParams.get('from');
      const toParam = urlParams.get('to');
      
      if (fromParam && currencies.some(c => c.code === fromParam)) {
        setFromCurrency(fromParam);
      }
      if (toParam && currencies.some(c => c.code === toParam)) {
        setToCurrency(toParam);
      }
    }
  }, []);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'KRW', name: 'Korean Won', symbol: '₩' },
    { code: 'THB', name: 'Thai Baht', symbol: '฿' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }
  ];

  const popularRates = [
    { from: 'USD', to: 'JPY', rate: '150.25', change: '+0.85%' },
    { from: 'USD', to: 'EUR', rate: '0.92', change: '-0.02%' },
    { from: 'GBP', to: 'JPY', rate: '190.19', change: '+1.06%' },
    { from: 'EUR', to: 'JPY', rate: '163.32', change: '+0.87%' },
    { from: 'USD', to: 'CNY', rate: '7.23', change: '+0.15%' },
    { from: 'USD', to: 'THB', rate: '35.67', change: '+0.23%' }
  ];

  const handleConvert = async () => {
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">Home</a>
              <a href="/roaming" className="text-gray-600 hover:text-green-600 transition-colors">Roaming</a>
              <a href="/rates" className="text-green-600 font-medium">Rates</a>
              <a href="/weather" className="text-gray-600 hover:text-green-600 transition-colors">Weather</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-400 rounded-3xl flex items-center justify-center shadow-2xl">
              <DollarSign className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Real-Time Exchange Rates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get live currency conversion rates and track global market trends
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-16">
          <SearchBar />
        </div>

        {/* Converter Tool */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm mb-16">
          <CardHeader className="text-center pb-8">
            <CardTitle className="flex items-center justify-center text-3xl font-bold">
              <Calculator className="w-8 h-8 mr-3 text-green-600" />
              AI-Powered Currency Converter
            </CardTitle>
            <p className="text-gray-600 mt-2">Convert between 150+ global currencies instantly</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">Amount</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
                />
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">From Currency</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-lg"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">To Currency</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 text-lg"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                onClick={handleConvert}
                disabled={isLoading}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                {isLoading ? (
                  <RefreshCw className="w-6 h-6 mr-3 animate-spin" />
                ) : (
                  <Calculator className="w-6 h-6 mr-3" />
                )}
                Convert Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Rates */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <CardTitle className="text-3xl font-bold">Popular Exchange Rates</CardTitle>
              <Button
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="border-2 border-green-200 hover:border-green-400 hover:bg-green-50 transition-all duration-200"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Rates
              </Button>
            </div>
            <p className="text-gray-600">Real-time rates for popular currency pairs</p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRates.map((rate, index) => (
                <div 
                  key={index} 
                  className="group bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
                  onClick={() => {
                    // 导航到汇率转换器，并预填充货币对
                    const url = `/rates?from=${rate.from}&to=${rate.to}`;
                    window.location.href = url;
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-gray-800 text-lg">{rate.from} → {rate.to}</span>
                    <Badge variant="secondary" className="px-3 py-1 text-xs font-bold bg-green-500 text-white animate-pulse">
                      Live
                    </Badge>
                  </div>
                  <div className="text-3xl font-black text-green-600 mb-3">
                    {rate.rate}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Change: {rate.change}
                  </div>
                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-200">
                    <span className="text-sm">View Details</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
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
