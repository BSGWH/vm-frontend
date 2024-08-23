import axios from "axios";

interface Service {
  id: number;
  service_name: string;
  description: string;
}

interface ProviderService {
  id: number;
  provider_id: number;
  default_service_id: number;
  provider_service_name: string;
  product_id: string;
  is_mobile: boolean;
  created_at: string;
  updated_at: string;
}

export async function fetchServiceOptions(): Promise<Service[]> {
  const railsUrl = process.env.NEXT_PUBLIC_RAILS_URL;

  try {
    const response = await axios.get(`${railsUrl}/api/v1/default_services`);
    const services = response.data.map((service: any) => ({
      id: service.id,
      service_name: service.service_name,
      description: service.description,
    }));
    const providerServices = await fetchProviderServices();
    return services.filter((service: any) => {
      return !providerServices.some(
        (providerService) => providerService.default_service_id === service.id
      );
    });
  } catch (error) {
    console.error("Error fetching service options:", error);
    return []; // Return an empty array in case of error
  }
}

export function getServiceNames(services: Service[]): string[] {
  return services.map((service) => service.service_name);
}

export async function fetchProviderServices(): Promise<ProviderService[]> {
  try {
    const response = await axios.get("/api/provider/profile/offered-service");
    return response.data;
  } catch (error) {
    console.error("Error fetching provider services:", error);
    return [];
  }
}
