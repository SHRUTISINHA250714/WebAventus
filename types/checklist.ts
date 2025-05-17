import { ReactNode } from "react";

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
}

export interface ChecklistItem {
  id: string;
  categoryId: string;
  name: string;
  description?: string;
  checked: boolean;
  quantity?: string;
}