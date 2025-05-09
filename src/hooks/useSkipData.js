import { useState, useEffect } from 'react';
import { getSkips } from '../api/skipsService';

// Mock data to use as fallback
const MOCK_SKIP_DATA = [
  {
    "id": 17933,
    "size": 4,
    "hire_period_days": 14,
    "transport_cost": null,
    "per_tonne_cost": null,
    "price_before_vat": 278,
    "vat": 20,
    "postcode": "NR32",
    "area": "",
    "forbidden": false,
    "created_at": "2025-04-03T13:51:46.897146",
    "updated_at": "2025-04-07T13:16:52.813",
    "allowed_on_road": true,
    "allows_heavy_waste": true
  },
  {
    "id": 17934,
    "size": 6,
    "hire_period_days": 14,
    "transport_cost": null,
    "per_tonne_cost": null,
    "price_before_vat": 305,
    "vat": 20,
    "postcode": "NR32",
    "area": "",
    "forbidden": false,
    "created_at": "2025-04-03T13:51:46.897146",
    "updated_at": "2025-04-07T13:16:52.992",
    "allowed_on_road": true,
    "allows_heavy_waste": true
  },
  {
    "id": 17935,
    "size": 8,
    "hire_period_days": 14,
    "transport_cost": null,
    "per_tonne_cost": null,
    "price_before_vat": 375,
    "vat": 20,
    "postcode": "NR32",
    "area": "",
    "forbidden": false,
    "created_at": "2025-04-03T13:51:46.897146",
    "updated_at": "2025-04-07T13:16:53.171",
    "allowed_on_road": true,
    "allows_heavy_waste": true
  },
  {
    "id": 17936,
    "size": 10,
    "hire_period_days": 14,
    "transport_cost": null,
    "per_tonne_cost": null,
    "price_before_vat": 400,
    "vat": 20,
    "postcode": "NR32",
    "area": "",
    "forbidden": false,
    "created_at": "2025-04-03T13:51:46.897146",
    "updated_at": "2025-04-07T13:16:53.339",
    "allowed_on_road": false,
    "allows_heavy_waste": false
  },
  {
    "id": 17937,
    "size": 12,
    "hire_period_days": 14,
    "transport_cost": null,
    "per_tonne_cost": null,
    "price_before_vat": 439,
    "vat": 20,
    "postcode": "NR32",
    "area": "",
    "forbidden": false,
    "created_at": "2025-04-03T13:51:46.897146",
    "updated_at": "2025-04-07T13:16:53.516",
    "allowed_on_road": false,
    "allows_heavy_waste": false
  }
];

const useSkipData = (postcode = 'NR32', area = 'Lowestoft') => {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getSkips();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setSkips(data);
        } else {
          // If API returns empty or invalid data, use mock data
          console.warn('API returned empty or invalid data, using mock data instead');
          setSkips(MOCK_SKIP_DATA);
          setError('No skip data available for your location. Showing sample data instead.');
        }
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to load skip data. Using sample data instead.');
        setSkips(MOCK_SKIP_DATA);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, [postcode, area]);

  return { skips, loading, error };
};

export default useSkipData; 