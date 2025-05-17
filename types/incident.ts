export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
  timestamp: string;
  reportedBy: string;
}