import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// API服务工具
export class ApiService {
  private static instance: ApiService;
  
  private constructor() {}
  
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // 天气API服务
  async getWeather(city: string): Promise<any> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Weather API Error:', error);
      return null;
    }
  }

  // 汇率API服务
  async getExchangeRate(from: string, to: string): Promise<any> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`
      );
      
      if (!response.ok) {
        throw new Error('Exchange Rate API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Exchange Rate API Error:', error);
      return null;
    }
  }

  // 地图API服务 (TomTom)
  async getLocationInfo(query: string): Promise<any> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_TOMTOM_API_KEY;
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(query)}.json?key=${apiKey}`
      );
      
      if (!response.ok) {
        throw new Error('TomTom API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('TomTom API Error:', error);
      return null;
    }
  }

  // 获取多个城市的天气
  async getMultipleWeather(cities: string[]): Promise<any[]> {
    const weatherPromises = cities.map(city => this.getWeather(city));
    return Promise.all(weatherPromises);
  }

  // 获取多个货币对的汇率
  async getMultipleExchangeRates(pairs: Array<{from: string, to: string}>): Promise<any[]> {
    const ratePromises = pairs.map(pair => this.getExchangeRate(pair.from, pair.to));
    return Promise.all(ratePromises);
  }
}

// 导出单例实例
export const apiService = ApiService.getInstance();
