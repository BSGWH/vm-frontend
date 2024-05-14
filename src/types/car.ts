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