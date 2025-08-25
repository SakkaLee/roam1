# Country Data Files

This directory contains individual country data files for roaming plans expansion.

## File Naming Convention
- Use ISO 3166-1 alpha-2 country codes (e.g., `us.json`, `jp.json`)
- All lowercase letters
- JSON format

## File Structure
```json
{
  "code": "US",
  "name": "United States",
  "flag": "🇺🇸",
  "plans": [
    {
      "id": "unique_id",
      "operator": "Operator Name",
      "type": "eSIM",
      "price": 9.90,
      "currency": "USD",
      "data": "1GB/day",
      "validity": "7 days",
      "features": ["Feature 1", "Feature 2"],
      "coverage": ["City 1", "City 2"],
      "activation": "Instant",
      "rating": 4.8
    }
  ]
}
```

## Available Countries (Ready for Expansion)
- `us.json` - United States
- `ca.json` - Canada
- `mx.json` - Mexico
- `br.json` - Brazil
- `ar.json` - Argentina
- `cl.json` - Chile
- `co.json` - Colombia
- `pe.json` - Peru
- `ve.json` - Venezuela
- `ec.json` - Ecuador
- `uy.json` - Uruguay
- `py.json` - Paraguay
- `bo.json` - Bolivia
- `gy.json` - Guyana
- `sr.json` - Suriname
- `gf.json` - French Guiana
- `fk.json` - Falkland Islands
- `gs.json` - South Georgia
- `bq.json` - Caribbean Netherlands
- `aw.json` - Aruba

## Adding New Countries
1. Create new JSON file with country code
2. Follow the structure above
3. Add to main roaming.json index
4. Update navigation and search
5. Test data validation

## Data Validation
Use the DataValidator component to ensure data integrity:
- Required fields present
- Valid JSON format
- Consistent data types
- Proper currency codes
