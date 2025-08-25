'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  issues: string[];
  timestamp: string;
  recordCount: number;
}

export default function DataValidator() {
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);

  const dataFiles = [
    { name: 'roaming.json', path: '/api/validate/roaming', description: 'Roaming plans data' },
    { name: 'rates.json', path: '/api/validate/rates', description: 'Exchange rates data' },
    { name: 'weather.json', path: '/api/validate/weather', description: 'Weather forecast data' }
  ];

  const validateDataFile = async (file: { name: string; path: string; description: string }) => {
    try {
      // 模拟验证过程
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟验证结果
      const isValid = Math.random() > 0.3; // 70% 通过率
      const issues = isValid ? [] : [
        'Missing required fields',
        'Invalid data format',
        'Outdated information'
      ];
      
      return {
        isValid,
        issues,
        timestamp: new Date().toISOString(),
        recordCount: Math.floor(Math.random() * 100) + 10
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        isValid: false,
        issues: ['Validation failed: ' + errorMessage],
        timestamp: new Date().toISOString(),
        recordCount: 0
      };
    }
  };

  const runValidation = async () => {
    setIsValidating(true);
    const results: Record<string, ValidationResult> = {};
    
    for (const file of dataFiles) {
      results[file.name] = await validateDataFile(file);
    }
    
    setValidationResults(results);
    setLastValidated(new Date());
    setIsValidating(false);
  };

  useEffect(() => {
    runValidation();
  }, []);

  const getStatusIcon = (isValid: boolean) => {
    if (isValid) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (isValid: boolean) => {
    if (isValid) {
      return <Badge className="bg-green-100 text-green-800">Valid</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">Invalid</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-xl">
              <AlertTriangle className="w-6 h-6 mr-2 text-orange-500" />
              Data Validation Status
            </CardTitle>
            <button
              onClick={runValidation}
              disabled={isValidating}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
              {isValidating ? 'Validating...' : 'Refresh'}
            </button>
          </div>
          {lastValidated && (
            <p className="text-sm text-gray-500">
              Last validated: {lastValidated.toLocaleString()}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dataFiles.map((file) => {
              const result = validationResults[file.name];
              if (!result) return null;
              
              return (
                <div key={file.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">{file.name}</h3>
                    {getStatusIcon(result.isValid)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{file.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    {getStatusBadge(result.isValid)}
                    <span className="text-sm text-gray-500">
                      {result.recordCount} records
                    </span>
                  </div>
                  
                  {result.issues.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-red-600">Issues found:</p>
                      {result.issues.map((issue, index) => (
                        <p key={index} className="text-xs text-red-500">• {issue}</p>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-400 mt-3">
                    {new Date(result.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
