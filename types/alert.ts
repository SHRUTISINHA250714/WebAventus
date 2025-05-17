export type AlertType = "emergency" | "warning" | "info";

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  message: string;
  location: string;
  timestamp: string;
  linkText?: string;
  linkUrl?: string;
}