'use client';

import React from 'react';
import Logo from '../ui/Logo';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo和描述 */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="md" showVersion={false} />
            <p className="mt-3 text-gray-300 leading-relaxed">
              Airoam.net is your global network service expert, providing roaming plan queries, real-time exchange rate conversion, and global weather forecast services.
            </p>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/roaming" className="text-gray-300 hover:text-white transition-colors duration-200">Roaming Plans</a></li>
              <li><a href="/rates" className="text-gray-300 hover:text-white transition-colors duration-200">Exchange Rates</a></li>
              <li><a href="/weather" className="text-gray-300 hover:text-white transition-colors duration-200">Weather</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">About Us</a></li>
            </ul>
          </div>
          
          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: info@airoam.net</li>
              <li className="text-gray-300">Support: support@airoam.net</li>
            </ul>
          </div>
        </div>
        
        {/* 版权信息 */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400">
            © 2025 Airoam.net. All rights reserved. | 
            <a href="/privacy" className="text-gray-400 hover:text-white ml-2">Privacy Policy</a> | 
            <a href="/terms" className="text-gray-400 hover:text-white ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
