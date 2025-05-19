"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminLayout } from "@/components/admin-layout"
import { ClientCard } from "@/components/client-card"
import { PlusCircle } from "lucide-react"

export default function AdminDashboard() {
  const [clients, setClients] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", mediaCount: 3 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", mediaCount: 5 },
    { id: "3", name: "Alex Johnson", email: "alex@example.com", mediaCount: 2 },
  ])

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/80">Manage your clients and their audio experiences</p>
          </div>
          <Button asChild className="bg-white text-blue-600 hover:bg-white/90">
            <Link href="/admin/clients/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Client
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="bg-white/20 backdrop-blur-sm text-white">
            <TabsTrigger value="clients" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Clients
            </TabsTrigger>
            <TabsTrigger value="qrcodes" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="qrcodes" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Generate QR Code</CardTitle>
                <CardDescription>Create a new QR code that links to client media content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Select Client</Label>
                  <select
                    id="client"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media-title">Media Title</Label>
                  <Input id="media-title" placeholder="Enter a title for this media" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="media-file">Upload Media</Label>
                  <Input id="media-file" type="file" accept="audio/*,image/*" />
                </div>
                <Button className="w-full">Generate QR Code</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View statistics about your clients and QR code scans</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
