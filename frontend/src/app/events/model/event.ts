export interface Event {
  id: number;
  name: string;
  description: string;
  local: string;
  latitude: number;
  longitude: number;
  date: string;
  time: string;
  attendees?: number[];
}
