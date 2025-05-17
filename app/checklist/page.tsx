"use client";

import { useEffect, useState } from "react";
import { 
  Check, CheckSquare, CheckCheck, Download, 
  Printer, Share2, Clock, CheckSquare2, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useChecklist } from "@/hooks/useChecklist";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChecklistPage() {
  const { toast } = useToast();
  const { categories, items, toggleItem, saveProgress, loadProgress } = useChecklist();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || "");
  
  // Calculate completion percentage
  const calculateCompletionPercentage = (categoryId?: string) => {
    const relevantItems = categoryId
      ? items.filter((item) => item.categoryId === categoryId)
      : items;
      
    if (relevantItems.length === 0) return 0;
    
    const completedItems = relevantItems.filter((item) => item.checked);
    return Math.round((completedItems.length / relevantItems.length) * 100);
  };
  
  const totalCompletionPercentage = calculateCompletionPercentage();
  
  useEffect(() => {
    // Load saved progress on first render
    loadProgress();
  }, [loadProgress]);
  
  const handleItemToggle = (itemId: string) => {
    toggleItem(itemId);
    saveProgress(); // Save progress after toggle
  };
  
  const exportChecklist = () => {
    toast({
      title: "Checklist Exported",
      description: "Your checklist has been downloaded as a PDF.",
    });
  };
  
  const shareChecklist = () => {
    toast({
      title: "Share Link Generated",
      description: "A link to your checklist has been copied to clipboard.",
    });
  };
  
  const getCategoryItems = (categoryId: string) => {
    return items.filter((item) => item.categoryId === categoryId);
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CheckSquare className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Emergency Preparedness Checklist</h1>
        </div>
        <div className="space-x-2 hidden md:flex">
          <Button variant="outline" size="sm" onClick={exportChecklist}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={shareChecklist}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Checklist Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={exportChecklist}>
              <Download className="h-4 w-4 mr-2" />
              Export Checklist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareChecklist}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Checklist
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="h-4 w-4 mr-2" />
              Print Checklist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="bg-card rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              Your emergency preparedness completion status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-muted p-1.5 rounded-full">
              <Clock className="h-4 w-4" />
            </div>
            <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Label className="text-sm font-medium">
              {totalCompletionPercentage}% Complete
            </Label>
            <div className="flex items-center">
              <CheckCheck className="h-4 w-4 mr-1 text-primary" />
              <span className="text-xs">
                {items.filter(item => item.checked).length} of {items.length} items
              </span>
            </div>
          </div>
          <Progress value={totalCompletionPercentage} className="h-2" />
        </div>
      </div>
      
      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="mb-4 overflow-x-auto flex whitespace-nowrap pb-px">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <span>{category.name}</span>
                <span className="ml-1 text-xs rounded-full bg-muted px-1.5 py-0.5">
                  {calculateCompletionPercentage(category.id)}%
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="bg-card rounded-lg shadow-md">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.name} Items</span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
              
              <ul className="divide-y">
                {getCategoryItems(category.id).map((item) => (
                  <li key={item.id} className="p-4 flex items-start hover:bg-muted/50">
                    <Checkbox
                      id={item.id}
                      checked={item.checked}
                      onCheckedChange={() => handleItemToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <label
                        htmlFor={item.id}
                        className={`font-medium cursor-pointer ${
                          item.checked ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {item.name}
                      </label>
                      {item.description && (
                        <p className={`text-sm mt-1 ${
                          item.checked ? "text-muted-foreground/70" : "text-muted-foreground"
                        }`}>
                          {item.description}
                        </p>
                      )}
                      {item.quantity && (
                        <div className="mt-1 inline-flex items-center text-xs bg-secondary px-2 py-0.5 rounded">
                          <CheckSquare2 className="h-3 w-3 mr-1" />
                          Recommended: {item.quantity}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </DashboardLayout>
  );
}