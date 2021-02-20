

export interface Observation {
  date: string,
  value: number
}

export interface WeatherType {
  id: number,
  description: string
}

export interface Weather {
  temperature: number,
  rain: number,
  wind: number,
  weatherType: WeatherType,
  temperatureObservations : Observation[],
  rainObservations : Observation[],
  windObservations : Observation[]
}
