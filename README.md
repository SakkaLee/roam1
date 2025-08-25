# Airoam.net - Global Network Service Expert

Airoam.net is your comprehensive global network service platform, providing roaming plan queries, real-time exchange rate conversion, and global weather forecast services.

## 🚀 Features

- **Global Roaming Plans**: Search and compare international roaming packages
- **Real-Time Exchange Rates**: Live currency conversion for 150+ currencies
- **Weather Forecasts**: Global weather information for cities worldwide
- **AI-Powered Search**: Intelligent search across all services
- **Responsive Design**: Modern UI built with Next.js and Tailwind CSS

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel
- **APIs**: OpenWeather, ExchangeRate-API, TomTom

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx          # Homepage
│   ├── roaming/          # Roaming plans page
│   ├── rates/            # Exchange rates page
│   └── weather/          # Weather forecast page
├── components/            # Reusable UI components
│   ├── ui/               # Shadcn/ui components
│   ├── features/         # Feature-specific components
│   └── layout/           # Layout components
├── data/                 # Static data files
│   ├── roaming.json      # Roaming plans data
│   ├── rates.json        # Exchange rates data
│   └── weather.json      # Weather data
└── lib/                  # Utility functions and API services
    ├── api.ts            # API service layer
    └── env.ts            # Environment variables
```

## 🔧 Data Management

### Data Files Structure

#### roaming.json
Contains roaming plan information for different countries:
```json
{
  "countries": [
    {
      "code": "JP",
      "name": "Japan",
      "plans": [
        {
          "operator": "Airalo",
          "type": "eSIM",
          "price": 9.90,
          "data": "1GB/day",
          "validity": "7 days"
        }
      ]
    }
  ]
}
```

#### rates.json
Contains currency and exchange rate information:
```json
{
  "currencies": [
    {
      "code": "USD",
      "name": "US Dollar",
      "symbol": "$"
    }
  ],
  "popularPairs": [
    {
      "from": "USD",
      "to": "JPY",
      "currentRate": 150.25,
      "change": 0.85
    }
  ]
}
```

#### weather.json
Contains weather information for popular cities:
```json
{
  "cities": [
    {
      "name": "Tokyo",
      "currentWeather": {
        "temperature": 15,
        "condition": "Sunny",
        "humidity": 65
      }
    }
  ]
}
```

### Data Update Instructions

1. **Manual Updates**: Edit JSON files directly in `src/data/`
2. **API Integration**: Use the API service layer in `src/lib/api.ts`
3. **Validation**: Run the DataValidator component to check data integrity
4. **Backup**: Always backup data before making changes

### Adding New Countries/Currencies/Cities

1. **New Country for Roaming**:
   - Add entry to `roaming.json` countries array
   - Include flag emoji, plans, and operator information

2. **New Currency**:
   - Add entry to `rates.json` currencies array
   - Include symbol, country, and flag emoji

3. **New City for Weather**:
   - Add entry to `weather.json` cities array
   - Include coordinates and current weather data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd airoam

# Install dependencies
npm install

# Set up environment variables
cp enev.local .env.local

# Run development server
npm run dev
```

### Environment Variables
Create a `.env.local` file with:
```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_EXCHANGERATE_API_KEY=your_exchangerate_api_key
NEXT_PUBLIC_TOMTOM_API_KEY=your_tomtom_api_key
NEXT_PUBLIC_SITE_URL=https://airoam.net
NEXT_PUBLIC_SITE_NAME=AIROAM
```

## 📱 Pages

### Homepage (`/`)
- Hero section with search functionality
- Feature showcase
- Featured results display

### Roaming Plans (`/roaming`)
- Country-based roaming package search
- Operator comparison
- Plan details and pricing

### Exchange Rates (`/rates`)
- Currency converter tool
- Popular currency pairs
- Real-time rate updates

### Weather Forecast (`/weather`)
- City weather search
- Current conditions
- Popular cities weather

## 🔍 Search Functionality

The global search bar allows users to search across all services:
- **Roaming**: "Japan roaming", "Thailand eSIM"
- **Rates**: "USD to JPY", "EUR conversion"
- **Weather**: "Tokyo weather", "Paris forecast"

## 🎨 UI Components

Built with Shadcn/ui components:
- **Cards**: Feature cards, result displays
- **Buttons**: Primary actions, secondary actions
- **Inputs**: Search fields, form inputs
- **Badges**: Status indicators, labels

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Custom Domain
1. Add `airoam.net` in Vercel domain settings
2. Configure DNS records as instructed
3. SSL certificate will be automatically provisioned

## 📊 Performance

- **Static Generation**: Pages are pre-built for optimal performance
- **Image Optimization**: Next.js automatic image optimization
- **CDN**: Vercel's global CDN for fast delivery
- **SEO**: Optimized meta tags and structured data

## 🔧 Development

### Adding New Features
1. Create new page in `src/app/`
2. Add navigation links
3. Update search functionality
4. Test across devices

### Component Development
- Keep components under 150 lines
- Use TypeScript for type safety
- Follow Shadcn/ui patterns
- Implement responsive design

### API Integration
- Use the API service layer in `src/lib/api.ts`
- Handle errors gracefully
- Implement loading states
- Cache responses when appropriate

## 📈 SEO & Analytics

- **Meta Tags**: Optimized for search engines
- **Structured Data**: Schema.org markup
- **Performance**: Core Web Vitals optimization
- **Accessibility**: WCAG 2.1 compliance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes following the style guide
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: info@airoam.net
- Support: support@airoam.net

---

**Airoam.net** - Your global network service expert
