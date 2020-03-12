export interface CardConfig {
  type: string ;
  name?: string ;
  unit: string ;
  headers?: boolean ;
  columns?: string[] ;
  destinations: Destinations[] ;
}

export interface Destinations {
  entity: string ;
  from?: string ;
  to: string ;
}

export interface WazeState {
  attributes : {
    distance: number,
    duration: number,
    route: string,
    icon: string,
    unit_of_measurement: string,
    origin: string,
    destination: string
  },

  destination: {
    lat: number,
    long: number
  },

  name: string,
  from: string,
  to: string,
  state: string,
  to_unit_system : string
}