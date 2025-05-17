"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Search, Filter, ArrowRight, 
  Flame, Waves, Globe, Heart, Sparkles,
  AlertTriangle, Radio, HelpCircle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { LanguageSelector } from "@/components/features/language/LanguageSelector";
import { useLanguage } from "@/hooks/useLanguage";

export default function KnowledgeBasePage() {
  const { articles, categories } = useKnowledgeBase();
  const { currentLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter articles based on search query and active category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = 
      activeCategory === "all" || article.categoryId === activeCategory;
      
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.icon || <HelpCircle className="h-5 w-5" />;
  };
  
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center">
          <BookOpen className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <LanguageSelector />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" />
            <span>All</span>
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-1"
            >
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-0">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  {article.imageUrl && (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        {getCategoryIcon(article.categoryId)}
                        <span className="text-xs font-medium text-muted-foreground">
                          {categories.find(c => c.id === article.categoryId)?.name}
                        </span>
                      </div>
                      <div className="text-xs bg-secondary px-2 py-0.5 rounded">
                        {currentLanguage}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                    <CardDescription>{article.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <Link 
                      href={`/knowledge-base/${article.slug}`}
                      className="flex items-center text-sm text-primary font-medium hover:underline"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-lg">
              <HelpCircle className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                No articles match your current search and filter criteria.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:underline text-sm"
                >
                  Clear search
                </button>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="text-primary hover:underline text-sm"
                >
                  View all articles
                </button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}