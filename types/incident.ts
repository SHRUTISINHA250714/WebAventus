export interface Incident {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  latitude: number;
  longitude: number;
  timestamp: string;
  reportedBy: string;
  createdAt: string;
  updatedAt: string;
}
