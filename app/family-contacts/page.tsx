"use client";

import { useState } from "react";
import { Users, PhoneCall, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ContactDialog } from "@/components/features/contacts/ContactDialog";
import { useEmergencyContacts } from "@/hooks/useEmergencyContacts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FamilyContactsPage() {
  const { familyContacts, addFamilyContact, removeFamilyContact } = useEmergencyContacts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<string | null>(null);
  
  const handleDeleteContact = () => {
    if (contactToDelete) {
      removeFamilyContact(contactToDelete);
      setContactToDelete(null);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Family Emergency Contacts</h1>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Family & Personal Contacts</CardTitle>
          <CardDescription>
            Manage contacts for your family members and close ones. In an emergency, these will be automatically notified when you use the SOS button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {familyContacts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Relationship</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {familyContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>
                      <div className="capitalize">{contact.relationship}</div>
                    </TableCell>
                    <TableCell>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-primary hover:underline flex items-center"
                      >
                        <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                        {contact.phone}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={contactToDelete === contact.id} onOpenChange={(open) => !open && setContactToDelete(null)}>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => setContactToDelete(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove {contact.name} from your emergency contacts? They will no longer be notified when you use the SOS feature.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDeleteContact}>
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <Users className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">No family contacts added</h3>
              <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                Add family members or personal contacts that should be notified in case of an emergency.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Contact
              </Button>
            </div>
          )}
        </CardContent>
        {familyContacts.length > 0 && (
          <CardFooter className="border-t pt-6">
            <p className="text-sm text-muted-foreground mr-auto">
              These contacts will be automatically called and messaged when you activate the SOS feature.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </CardFooter>
        )}
      </Card>
      
      <ContactDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={addFamilyContact}
      />
    </DashboardLayout>
  );
}