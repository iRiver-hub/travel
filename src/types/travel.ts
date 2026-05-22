export interface TravelPreferences {
  peopleCount: number;
  genderComposition: string;
  hasChildren: boolean;
  hasElderly: boolean;
  startDate: string;
  endDate: string;
  departureCity: string;
  budgetLevel: 'economy' | 'comfort' | 'luxury';
  themes: string[];
  pace: 'intensive' | 'balanced' | 'relaxed';
  accommodationType: string;
  transportPreference: string;
  specialNeeds: string;
  acceptRedEye: boolean;
  acceptTransfer: boolean;
}

export interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'sight' | 'transport' | 'food' | 'rest';
  cost: number;
}

export interface DailyPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

export interface HotelOption {
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  location: string;
  distanceToAttraction: string;
  features: string[];
  platform: string;
}

export interface AccommodationSuggestion {
  area: string;
  type: string;
  pricePerNight: number;
  tips: string;
  hotels: HotelOption[];
}

export interface FoodRecommendation {
  category: string;
  dishes: string[];
  budget: string;
}

export interface TransportOption {
  type: 'flight' | 'train' | 'bus';
  flightNo?: string;
  trainNo?: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  airline?: string;
  trainType?: string;
  seatType?: string;
}

export interface TransportSummary {
  toDestination: string;
  localTransport: string;
  estimatedCost: number;
  outboundOptions: TransportOption[];
  returnOptions: TransportOption[];
}

export interface SeasonInfo {
  season: 'peak' | 'shoulder' | 'off';
  label: string;
  transportMultiplier: number;
  hotelMultiplier: number;
  description: string;
}

export interface TravelPlan {
  destination: string;
  destinationImage: string;
  totalDays: number;
  totalBudget: number;
  currency: string;
  summary: string;
  dailyPlans: DailyPlan[];
  accommodation: AccommodationSuggestion;
  foodRecommendations: FoodRecommendation[];
  transport: TransportSummary;
  seasonInfo: SeasonInfo;
}
