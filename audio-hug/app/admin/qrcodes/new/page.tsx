"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AdminLayout } from "@/components/admin-layout"
import { Download, Trash2, Eye, AlertCircle } from "lucide-react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface UploadedImage {
  id: string
  title: string
  url: string
}

export default function NewQRCodePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientId = searchParams.get("client") || ""

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [qrGenerated, setQrGenerated] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://audiohug.com/demo",
  )
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [currentImageTitle, setCurrentImageTitle] = useState("")
  const [previewIndex, setPreviewIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with demo images
  useEffect(() => {
    const demoImages = [
      {
        id: "demo1",
        title: "Breakfast in Bed",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cottonbro-5379228.jpg-o15uE5z2LrFVtKtiflRRlDnx7KinjZ.jpeg",
      },
      {
        id: "demo2",
        title: "Room with a View",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rpnickson-2417842.jpg-eNniGwSMqd3RIBir4cvncmTO0mEgbU.jpeg",
      },
      {
        id: "demo3",
        title: "Luxury Accommodations",
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-164595.jpg-p1yEWIGHIdIrFoZ6AyUyxIzbhbHIDR.jpeg",
      },
    ]
    setUploadedImages(demoImages)
    setIsLoading(false)
  }, [])

  const handleGenerateQR = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate a QR code URL using an actual QR code generator service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      `https://audiohug.com/client/${clientId || "demo"}?title=${encodeURIComponent(title || "Stories Collection")}`,
    )}`
    setQrCodeUrl(qrUrl)
    setQrGenerated(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, you would handle file uploads here
    // For this demo, we'll just simulate adding placeholder images
    if (e.target.files && e.target.files.length > 0) {
      // Use one of our demo images as a placeholder
      const demoUrls = [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cottonbro-5379228.jpg-o15uE5z2LrFVtKtiflRRlDnx7KinjZ.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rpnickson-2417842.jpg-eNniGwSMqd3RIBir4cvncmTO0mEgbU.jpeg",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-164595.jpg-p1yEWIGHIdIrFoZ6AyUyxIzbhbHIDR.jpeg",
      ]

      const newImages = Array.from(e.target.files).map((_, index) => {
        const demoTitle = currentImageTitle || `Story ${uploadedImages.length + index + 1}`
        return {
          id: `upload-${Date.now()}-${index}`,
          title: demoTitle,
          url: demoUrls[index % demoUrls.length], // Cycle through our demo images
        }
      })

      const updatedImages = [...uploadedImages, ...newImages]
      setUploadedImages(updatedImages)
      setCurrentImageTitle("")

      // Set preview to the first new image
      if (updatedImages.length > uploadedImages.length) {
        setPreviewIndex(uploadedImages.length)
      }
    }
  }

  const addDemoImage = () => {
    const demoTitle = currentImageTitle || `Demo Story ${uploadedImages.length + 1}`
    // Use one of our demo images
    const demoUrls = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cottonbro-5379228.jpg-o15uE5z2LrFVtKtiflRRlDnx7KinjZ.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-rpnickson-2417842.jpg-eNniGwSMqd3RIBir4cvncmTO0mEgbU.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-pixabay-164595.jpg-p1yEWIGHIdIrFoZ6AyUyxIzbhbHIDR.jpeg",
    ]

    const newImage = {
      id: `demo-${Date.now()}`,
      title: demoTitle,
      url: demoUrls[uploadedImages.length % demoUrls.length], // Cycle through our demo images
    }

    const updatedImages = [...uploadedImages, newImage]
    setUploadedImages(updatedImages)
    setCurrentImageTitle("")
    // Set preview to the new image
    setPreviewIndex(updatedImages.length - 1)
  }

  const removeImage = (id: string) => {
    const newImages = uploadedImages.filter((img) => img.id !== id)
    setUploadedImages(newImages)
    if (previewIndex >= newImages.length) {
      setPreviewIndex(Math.max(0, newImages.length - 1))
    }
  }

  const nextPreview = () => {
    if (previewIndex < uploadedImages.length - 1) {
      setPreviewIndex(previewIndex + 1)
    }
  }

  const prevPreview = () => {
    if (previewIndex > 0) {
      setPreviewIndex(previewIndex - 1)
    }
  }

  const previewClient = () => {
    // In a real app, this would navigate to the client preview
    // For this demo, we'll just open the client page in a new tab
    window.open(`/client/${clientId || "demo"}`, "_blank")
  }

  // Get current image for preview
  const currentImage = uploadedImages[previewIndex] || null

  return (
    <AdminLayout>
      <div className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Generate QR Code</h1>
          <p className="text-white/80">Create a personalized Instagram-style stories experience</p>
        </div>

        {/* Demo indicator */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold">Demo Mode</h3>
            <p className="text-white/90 text-sm">
              This is a functional demo. You can upload images, preview the stories interface, and generate a QR code.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white/90 backdrop-blur-sm">
            <form onSubmit={handleGenerateQR}>
              <CardHeader>
                <CardTitle>Stories Collection</CardTitle>
                <CardDescription>Upload images for your Instagram-style stories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-id">Client ID</Label>
                  <Input id="client-id" value={clientId || "demo-client"} readOnly className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Collection Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a title for this collection"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter a description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Uploaded Stories ({uploadedImages.length})</Label>
                  <div className="border rounded-md p-3 max-h-60 overflow-y-auto">
                    {isLoading ? (
                      <div className="py-8 text-center text-gray-500">Loading...</div>
                    ) : uploadedImages.length > 0 ? (
                      uploadedImages.map((image, index) => (
                        <div
                          key={image.id}
                          className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={image.url || "/placeholder.svg"}
                                alt={image.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <span className="font-medium truncate">{image.title}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeImage(image.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <p>No stories uploaded yet</p>
                        <p className="text-sm">Add your first story below</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image-title">Story Title</Label>
                  <Input
                    id="image-title"
                    placeholder="Enter a title for this story"
                    value={currentImageTitle}
                    onChange={(e) => setCurrentImageTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Story Image</Label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <Button type="button" variant="outline" onClick={addDemoImage}>
                      Add Demo
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload images for each story. Recommended aspect ratio is 9:16 (Instagram story format).
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={uploadedImages.length === 0}>
                  Generate QR Code
                </Button>
                <Button type="button" variant="outline" onClick={previewClient} disabled={uploadedImages.length === 0}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>QR Code Preview</CardTitle>
                <CardDescription>
                  {qrGenerated
                    ? "Your QR code has been generated successfully"
                    : "Fill in the form and click Generate to create your QR code"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                {qrGenerated ? (
                  <div className="text-center">
                    <div
                      className="mb-4 bg-white p-4 rounded-lg inline-block border-2 border-gray-300"
                      style={{ minHeight: "200px", minWidth: "200px" }}
                    >
                      {/* Using an actual QR code generator service */}
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="QR Code"
                        width="200"
                        height="200"
                        className="rounded-lg"
                        style={{ display: "block" }}
                      />
                      <div className="mt-2 text-xs text-gray-500">QR Code Preview</div>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">This QR code links to: {title || "Stories Collection"}</p>
                    <p className="text-xs text-gray-400 mb-6">URL: https://audiohug.com/client/{clientId || "demo"}</p>
                    <div className="flex gap-2 justify-center">
                      <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download QR Code
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="h-32 w-32 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">QR Code</span>
                    </div>
                    <p>QR code will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Phone preview */}
            {uploadedImages.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Story Preview</CardTitle>
                  <CardDescription>Preview how your stories will appear on a phone</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative w-[220px] h-[440px] rounded-[24px] bg-black overflow-hidden shadow-xl mb-4">
                    {/* Phone notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-20"></div>

                    {/* Preview content */}
                    <div className="w-full h-full overflow-hidden relative">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-white text-sm">Loading...</p>
                        </div>
                      ) : uploadedImages.length > 0 && currentImage ? (
                        <>
                          {/* Using direct image URLs that are guaranteed to work */}
                          <div className="absolute inset-0 bg-black">
                            <img
                              src={currentImage.url || "/placeholder.svg"}
                              alt={currentImage.title}
                              className="absolute inset-0 w-full h-full object-cover"
                              style={{ display: "block" }}
                              onError={(e) => {
                                console.error("Image failed to load:", currentImage.url)
                                // Fallback to a guaranteed working image
                                e.currentTarget.src =
                                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pexels-cottonbro-5379228.jpg-o15uE5z2LrFVtKtiflRRlDnx7KinjZ.jpeg"
                              }}
                            />
                          </div>

                          {/* Demo indicator */}
                          <div className="absolute top-4 right-4 bg-black/50 rounded-full px-2 py-0.5">
                            <span className="text-white text-xs font-bold">DEMO</span>
                          </div>

                          {/* Story title */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <h2 className="text-white text-base font-bold">{currentImage.title}</h2>
                            <p className="text-white/70 text-xs">
                              {previewIndex + 1} / {uploadedImages.length}
                            </p>
                          </div>

                          {/* Progress bar */}
                          <div className="absolute top-0 left-0 right-0 z-20 flex px-2 pt-2 gap-1">
                            {uploadedImages.map((_, index) => (
                              <div
                                key={index}
                                className={`h-1 rounded-full flex-1 ${
                                  index === previewIndex
                                    ? "bg-white"
                                    : index < previewIndex
                                      ? "bg-white/60"
                                      : "bg-white/30"
                                }`}
                              ></div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-white text-sm">No images uploaded</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevPreview}
                      disabled={previewIndex === 0 || uploadedImages.length === 0}
                      className="px-3"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPreview}
                      disabled={previewIndex === uploadedImages.length - 1 || uploadedImages.length === 0}
                      className="px-3"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
