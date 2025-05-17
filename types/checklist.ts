import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ChecklistItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  checked: boolean;
  quantity?: string;
}
