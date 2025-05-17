"use client";

import { useEmergencyContacts } from "@/hooks/useEmergencyContacts";
import { PhoneCall, User, Pencil, Trash2, Plus } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ContactDialog } from "@/components/features/contacts/ContactDialog";
import { useState } from "react";

export default function EmergencyContactsPage() {
  const { officialContacts, familyContacts, addFamilyContact, removeFamilyContact } = useEmergencyContacts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <PhoneCall className="h-6 w-6 mr-2" />
          <h1 className="text-2xl font-bold">Emergency Contacts</h1>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>
      
      <Tabs defaultValue="family" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="family">Family & Personal</TabsTrigger>
          <TabsTrigger value="official">Official Services</TabsTrigger>
        </TabsList>
        
        <TabsContent value="family" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Family & Personal Contacts</CardTitle>
              <CardDescription>
                Manage your family members and personal emergency contacts. These contacts will be automatically notified when you press the SOS button.
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
                        <TableCell>{contact.relationship}</TableCell>
                        <TableCell>
                          <a
                            href={`tel:${contact.phone}`}
                            className="text-primary hover:underline"
                          >
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeFamilyContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <User className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">No contacts added yet</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
                    Add family members or personal contacts that should be notified in case of emergency.
                  </p>
                  <Button onClick={() => setIsDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Contact
                  </Button>
                </div>
              )}
            </CardContent>
            {familyContacts.length > 0 && (
              <CardFooter className="border-t pt-6 flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Total contacts: {familyContacts.length}
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>
        
        <TabsContent value="official" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Official Emergency Services</CardTitle>
              <CardDescription>
                Important emergency service numbers that you may need during a crisis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {officialContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.description}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-primary hover:underline flex items-center"
                        >
                          <PhoneCall className="h-3.5 w-3.5 mr-1.5" />
                          {contact.phone}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <ContactDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={addFamilyContact}
      />
    </DashboardLayout>
  );
}