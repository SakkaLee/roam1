'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeatureCard({ 
  icon = 'globe',
  title, 
  description, 
  stats, 
  color = 'blue',
  href = '#' 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: 'from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500',
    green: 'from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500',
    purple: 'from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500'
  };

  const iconMap = {
    globe: 'https://unpkg.com/lucide-static@latest/icons/globe-2.svg',
    wallet: 'https://unpkg.com/lucide-static@latest/icons/wallet.svg',
    cloud: 'https://unpkg.com/lucide-static@latest/icons/cloud.svg',
    arrowRight: 'https://unpkg.com/lucide-static@latest/icons/arrow-right.svg'
  };

  return (
    <Card className={`group cursor-pointer transition-all duration-500 transform ${isHovered ? 'scale-105 -rotate-1 shadow-2xl' : 'scale-100 rotate-0 shadow-lg'} hover:shadow-2xl`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
      <CardHeader className="pb-3">
        <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
          <img src={iconMap[icon]} alt="icon" className="w-8 h-8 opacity-90" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600 leading-relaxed">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-sm font-medium">
            {stats}
          </Badge>
          <div className={`w-8 h-8 bg-gradient-to-br ${colorClasses[color]} rounded-full flex items-center justify-center transform transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            <img src={iconMap.arrowRight} alt="more" className="w-4 h-4 invert brightness-0" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
