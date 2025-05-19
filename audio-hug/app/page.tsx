import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Headphones } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
            <Headphones className="h-16 w-16" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">Audio Hug</h1>
        <p className="mb-8 text-xl md:text-2xl">Personalized audio experiences through QR codes</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
