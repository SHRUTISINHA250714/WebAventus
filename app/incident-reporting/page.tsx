"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Camera, Upload, MapPin, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useIncidents } from "@/hooks/useIncidents";
import { useGeolocation } from "@/hooks/useGeolocation";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function IncidentReporting() {
  const { toast } = useToast();
  const router = useRouter();
  const { addIncident } = useIncidents();
  const { location, loading: locationLoading, error: locationError } = useGeolocation();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please provide a title for the incident report.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would upload the image to a server/storage service
      // and get back a URL. For this demo, we'll use the image preview URL directly.
      const imageUrl = imagePreview;
      
      await addIncident({
        title,
        description,
        imageUrl,
        location: location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : "Unknown location",
        timestamp: new Date().toISOString(),
        reportedBy: "Current User", // Would come from auth in a real app
      });
      
      toast({
        title: "Incident Reported",
        description: "Your incident has been successfully reported.",
      });
      
      // Navigate back to the dashboard
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit incident report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <AlertTriangle className="h-6 w-6 mr-2 text-destructive" />
          <h1 className="text-2xl font-bold">Report an Incident</h1>
        </div>
        
        <div className="bg-card rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Incident Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Flooding on Main Street"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Incident Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what happened, severity, and any other relevant details..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Incident Photo</Label>
              <div className="border-2 border-dashed border-border rounded-md p-4 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Selected preview"
                      className="max-h-48 mx-auto rounded-md object-cover"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                      }}
                    >
                      Remove Photo
                    </Button>
                  </div>
                ) : (
                  <div className="py-4">
                    <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Drag and drop a photo here, or click to select
                    </p>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => document.getElementById("image")?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Photo
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <Label>Location</Label>
              </div>
              <div className="bg-muted p-3 rounded-md text-sm">
                {locationLoading ? (
                  <p>Detecting your location...</p>
                ) : locationError ? (
                  <p className="text-destructive">{locationError}</p>
                ) : location ? (
                  <p>
                    Latitude: {location.latitude.toFixed(4)}, Longitude:{" "}
                    {location.longitude.toFixed(4)}
                  </p>
                ) : (
                  <p>Location not available</p>
                )}
              </div>
            </div>
            
            <div className="pt-4 border-t border-border flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}