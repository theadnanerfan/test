import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, FileAudio, User } from "lucide-react"

interface ClientCardProps {
  client: {
    id: string
    name: string
    email: string
    mediaCount: number
  }
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-bold">{client.name}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FileAudio className="h-4 w-4" />
            <span>{client.mediaCount}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{client.email}</p>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-500" />
          <span>Client ID: {client.id}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/clients/${client.id}`}>View Details</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/admin/qrcodes/new?client=${client.id}`}>
            <QrCode className="mr-2 h-4 w-4" />
            Generate QR
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
