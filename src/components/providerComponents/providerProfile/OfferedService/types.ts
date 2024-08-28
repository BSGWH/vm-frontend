export interface ProviderService {
  id: number;
  provider_id: number;
  default_service_id: number;
  provider_service_name: string;
  product_id: string;
  is_mobile: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceQuestion {
  question: string;
  type: "checkbox" | "text";
}

export interface Tier {
  name: string;
  price: string;
  hours: string;
  minutes: string;
  description: string;
}
