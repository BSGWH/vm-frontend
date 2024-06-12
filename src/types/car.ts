export interface CarMake {
  id: number;
  name: string;
}

export interface CarModel {
	model_id: number;
	model_name: string
}

export interface CarMakeWithModels {
	make_id: number;
	make_name: string;
	models: CarModel[];
}

export interface Vehicle {
	vehicle_id: number;
	make_id: number;
	make_name: string;
	model_id: number;
	model_name: string;
	color: string; 
	year: string;
	lisence_plate: string;
	vin: string; 
	created_at: string;
}