// 环境变量类型定义
export interface EnvironmentVariables {
  NEXT_PUBLIC_OPENWEATHER_API_KEY: string;
  NEXT_PUBLIC_EXCHANGERATE_API_KEY: string;
  NEXT_PUBLIC_TOMTOM_API_KEY: string;
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_SITE_NAME: string;
  NEXT_PUBLIC_APP_VERSION: string;
  NEXT_PUBLIC_ENVIRONMENT: string;
}

// 获取环境变量
export function getEnvVar(key: keyof EnvironmentVariables): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

// 验证环境变量
export function validateEnvironmentVariables(): boolean {
  const requiredVars: (keyof EnvironmentVariables)[] = [
    'NEXT_PUBLIC_OPENWEATHER_API_KEY',
    'NEXT_PUBLIC_EXCHANGERATE_API_KEY',
    'NEXT_PUBLIC_TOMTOM_API_KEY'
  ];

  for (const envVar of requiredVars) {
    try {
      getEnvVar(envVar);
    } catch (error) {
      console.error(`Missing required environment variable: ${envVar}`);
      return false;
    }
  }

  return true;
}
