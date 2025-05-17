"use client";

import Link from "next/link";
import { 
  PhoneCall, 
  Users, 
  Plus, 
  Users2, 
  ShieldAlert
} from "lucide-react";
import { useEmergencyContacts } from "@/hooks/useEmergencyContacts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function EmergencyServices() {
  const { officialContacts, familyContacts } = useEmergencyContacts();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-destructive" />
              Emergency Services
            </h3>
            <Badge variant="outline" className="text-xs">Official</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {officialContacts.map((contact) => (
              <li key={contact.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <PhoneCall className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-xs text-muted-foreground">{contact.description}</div>
                  </div>
                </div>
                <a 
                  href={`tel:${contact.phone}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {contact.phone}
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Family Contacts
            </h3>
            <Link href="/family-contacts">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                <span className="text-xs">Add</span>
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {familyContacts.length > 0 ? (
            <ul className="space-y-3">
              {familyContacts.map((contact) => (
                <li key={contact.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-secondary p-2 rounded-full">
                      <Users2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.relationship}</div>
                    </div>
                  </div>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-4">
              <Users2 className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h4 className="text-sm font-medium mb-1">No family contacts added</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Add family members to contact during emergencies
              </p>
              <Link href="/family-contacts">
                <Button size="sm" variant="outline">Add Contact</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}