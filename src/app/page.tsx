import Logo from '../components/ui/Logo';
import SearchBar from '../components/ui/SearchBar';
import FeatureCard from '../components/features/FeatureCard';
import ResultsDisplay from '../components/features/ResultsDisplay';
import Footer from '../components/layout/Footer';

interface Feature {
  icon: 'globe' | 'wallet' | 'cloud';
  title: string;
  description: string;
  stats: string;
  color: 'blue' | 'green' | 'purple';
  href: string;
}

export default function Home() {
  const features: Feature[] = [ 
    {
      icon: 'globe',
      title: 'Global Roaming Plans',
      description: 'Cover 10 countries with real-time pricing comparison and operator recommendations',
      stats: '10 Countries',
      color: 'blue',
      href: '/roaming'
    },
    {
      icon: 'wallet',
      title: 'Real-time Exchange Rates',
      description: '10 major currency pairs with trend predictions and historical data',
      stats: '10 Currencies',
      color: 'green',
      href: '/rates'
    },
    {
      icon: 'cloud',
      title: 'Global Weather Forecast',
      description: '10 popular cities with 7-day forecasts and real-time updates',
      stats: '10 Cities',
      color: 'purple',
      href: '/weather'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-blue-100">
      {/* Hero Section - 减少空白空间 */}
      <section className="relative py-16 flex items-center justify-center overflow-hidden">
        {/* 动态背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-teal-400/20 to-blue-500/20 animate-pulse"></div>
        
        {/* 装饰性元素 */}
        <div className="absolute top-10 left-20 w-24 h-24 bg-blue-300/30 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-teal-300/30 rounded-full blur-xl animate-bounce" style={{ animationDelay: '1s' }}></div>
        
        {/* 主要内容 */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Logo */}
          <div className="mb-6">
            <Logo size="lg" />
          </div>
          
          {/* 主标题 */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-3 leading-tight">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Airoam</span>
          </h1>
          
          {/* 副标题 */}
          <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            Your global network service expert, one-stop solution for roaming plans, exchange rates, and weather
          </p>
          
          {/* 搜索栏 */}
          <div className="mb-6">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tools + Landing Pages + Results Display for seamless global travel experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Results Display */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time data display for quick insights into global network services
            </p>
          </div>
          
          <ResultsDisplay />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
