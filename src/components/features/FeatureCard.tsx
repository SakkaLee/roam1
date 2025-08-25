'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Wallet, Cloud, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FeatureCardProps {
  icon?: 'globe' | 'wallet' | 'cloud';
  title: string;
  description: string;
  stats: string;
  color?: 'blue' | 'green' | 'purple';
  href?: string;
}

export default function FeatureCard({ 
  icon = 'globe',
  title, 
  description, 
  stats, 
  color = 'blue',
  href = '#' 
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const colorClasses = {
    blue: 'from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500',
    green: 'from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500',
    purple: 'from-purple-400 to-indigo-400 hover:from-purple-500 hover:to-indigo-500'
  };

  const iconMap = {
    globe: Globe,
    wallet: Wallet,
    cloud: Cloud
  };

  const IconComponent = iconMap[icon];

  // 处理卡片点击
  const handleCardClick = () => {
    if (href && href !== '#') {
      router.push(href);
    }
  };

  // 根据图标类型确定默认路由
  const getDefaultRoute = () => {
    switch (icon) {
      case 'globe':
        return '/roaming';
      case 'wallet':
        return '/rates';
      case 'cloud':
        return '/weather';
      default:
        return '/';
    }
  };

  const finalHref = href !== '#' ? href : getDefaultRoute();

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-500 transform ${isHovered ? 'scale-105 -rotate-1 shadow-2xl' : 'scale-100 rotate-0 shadow-lg'} hover:shadow-2xl`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center mb-3 shadow-lg`}>
          <IconComponent className="w-8 h-8 text-white" />
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
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </div>
        
        {/* 点击提示 */}
        <div className="mt-3 text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to explore {title.toLowerCase()}
        </div>
      </CardContent>
    </Card>
  );
}
