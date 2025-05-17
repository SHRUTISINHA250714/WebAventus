"use client";

import { useState } from "react";
import { FamilyContact } from "@/types/contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Omit<FamilyContact, "id">) => void;
  editingContact?: FamilyContact;
}

export function ContactDialog({
  open,
  onOpenChange,
  onSave,
  editingContact,
}: ContactDialogProps) {
  const [name, setName] = useState(editingContact?.name || "");
  const [relationship, setRelationship] = useState(editingContact?.relationship || "");
  const [phone, setPhone] = useState(editingContact?.phone || "");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim() || !relationship) {
      return;
    }
    
    onSave({
      name: name.trim(),
      relationship,
      phone: phone.trim(),
    });
    
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setName("");
    setRelationship("");
    setPhone("");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingContact ? "Edit Contact" : "Add Emergency Contact"}
          </DialogTitle>
          <DialogDescription>
            Add someone who should be contacted in case of an emergency.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Select
              value={relationship}
              onValueChange={setRelationship}
              required
            >
              <SelectTrigger id="relationship">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spouse">Spouse</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="child">Child</SelectItem>
                <SelectItem value="sibling">Sibling</SelectItem>
                <SelectItem value="relative">Other Relative</SelectItem>
                <SelectItem value="friend">Friend</SelectItem>
                <SelectItem value="neighbor">Neighbor</SelectItem>
                <SelectItem value="caregiver">Caregiver</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingContact ? "Update Contact" : "Add Contact"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}