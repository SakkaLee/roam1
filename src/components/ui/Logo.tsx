'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showVersion?: boolean;
  className?: string;
}

export default function Logo({ 
  size = 'md', 
  showVersion = false, 
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-[80px] h-[30px] text-sm',
    md: 'w-[120px] h-[40px] text-lg',
    lg: 'w-[160px] h-[50px] text-xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* 科技感Logo图标 */}
      <div className={`${sizeClasses[size]} relative bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 transform hover:scale-105 overflow-hidden`}>
        {/* 科技感装饰元素 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20"></div>
        <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-indigo-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* 中心科技元素 */}
        <div className="relative z-10 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white rounded-lg transform rotate-45"></div>
          <div className="absolute w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      
      {/* Logo文字 */}
      <div className="flex flex-col">
        <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent tracking-wider">
          AIROAM
        </span>
        <span className="text-xs text-gray-500 font-medium tracking-widest">
          NETWORK
        </span>
      </div>
    </div>
  );
}
