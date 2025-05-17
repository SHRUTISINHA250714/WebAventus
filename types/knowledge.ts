import { ReactNode } from "react";

export interface ArticleCategory {
  id: string;
  name: string;
  icon: ReactNode;
}

export interface Article {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}