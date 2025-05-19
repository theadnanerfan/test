"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Download, ArrowDown } from "lucide-react"

interface ClientPageProps {
  params: {
    id: string
  }
}

export default function ClientPage({ params }: ClientPageProps) {
  const [activeSection, setActiveSection] = useState<string>("welcome")
  const sectionsRef = useRef<Record<string, HTMLDivElement | null>>({})

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const section = sectionsRef.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionsRef.current).forEach(([key, section]) => {
        if (section) {
          const offsetTop = section.offsetTop
          const offsetBottom = offsetTop + section.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(key)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f0e6]">
      {/* Fixed navigation */}
      <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-lg">
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => scrollToSection("welcome")}
              className={`text-sm font-medium ${activeSection === "welcome" ? "text-orange-500" : "text-gray-600"}`}
            >
              Welcome
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("campaign")}
              className={`text-sm font-medium ${activeSection === "campaign" ? "text-orange-500" : "text-gray-600"}`}
            >
              Campaign
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("reels")}
              className={`text-sm font-medium ${activeSection === "reels" ? "text-orange-500" : "text-gray-600"}`}
            >
              Reels
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("stories")}
              className={`text-sm font-medium ${activeSection === "stories" ? "text-orange-500" : "text-gray-600"}`}
            >
              Stories
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("meditations")}
              className={`text-sm font-medium ${activeSection === "meditations" ? "text-orange-500" : "text-gray-600"}`}
            >
              Meditations
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("youtube")}
              className={`text-sm font-medium ${activeSection === "youtube" ? "text-orange-500" : "text-gray-600"}`}
            >
              YouTube
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("thanks")}
              className={`text-sm font-medium ${activeSection === "thanks" ? "text-orange-500" : "text-gray-600"}`}
            >
              Thanks
            </button>
          </li>
        </ul>
      </nav>

      {/* Welcome Section */}
      <section
        ref={(el) => (sectionsRef.current.welcome = el)}
        className="relative h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204053-aVh0v5EUA6TtsY3lAoy8fvoabokZyV.png"
            alt="The Mondrian Ibiza"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => scrollToSection("campaign")}
            className="bg-white rounded-full p-3 shadow-lg animate-bounce"
          >
            <ArrowDown className="h-6 w-6 text-gray-800" />
          </button>
        </div>
      </section>

      {/* Campaign Section */}
      <section ref={(el) => (sectionsRef.current.campaign = el)} className="min-h-screen bg-[#f5f0e6] py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204110-bfcdNhwafuxqIQcy5b06q7qrE1ptrj.png"
              alt="3-month campaign"
              width={600}
              height={600}
              className="object-contain"
            />
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">We like to go above and beyond for our clients.</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              That's why we've created a bespoke 3-month marketing campaign tailored specifically to your brand —
              designed to make waves and leave a lasting impression. From strategy to storytelling, this campaign is all
              about announcing your commitment to wellbeing and your partnership with Audio Hugs in a way that's as
              unique and powerful as the work you do.
            </p>
          </div>
        </div>
      </section>

      {/* Reels Section */}
      <section ref={(el) => (sectionsRef.current.reels = el)} className="min-h-screen bg-[#ff7846] py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <div className="relative w-[300px] h-[600px]">
              <div className="absolute inset-0 bg-black rounded-[40px] overflow-hidden border-[8px] border-black">
                <div className="absolute top-0 left-0 right-0 h-[30px] bg-black z-10 flex items-center justify-center">
                  <div className="w-[100px] h-[20px] bg-black rounded-b-xl"></div>
                </div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204133-uUP2jXfHv7XL35x2vxZy520HOTRfAq.png"
                  alt="Instagram Reel"
                  fill
                  className="object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12 text-white">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Here are 10 reels to use on insta</h2>
            <ul className="space-y-4">
              {[
                "90 Second Audio Hug",
                "60 Second Audio Hug",
                "Morning Meditation Promo",
                "Evening Meditation Promo",
                "Having patience when you arrive",
                "Kind acts of service from the staff",
                "How to treat the staff",
                "Sunrise Audio",
                "Niko Japanese Dining",
                "Sitting on the pier",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Download className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section ref={(el) => (sectionsRef.current.stories = el)} className="min-h-screen bg-[#f5f0e6] py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
            <div className="relative w-[300px] h-[600px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204153-U3Z2poNHPeJg3BR2xfjiIYLDvo4vPZ.png"
                alt="Instagram Stories"
                width={600}
                height={800}
                className="object-contain"
              />
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">Here are 10 stories to use on insta</h2>
            <ul className="space-y-4">
              {[
                "90 Second Audio Hug",
                "60 Second Audio Hug",
                "Morning Meditation Promo",
                "Evening Meditation Promo",
                "Having patience when you arrive",
                "Kind acts of service from the staff",
                "How to treat the staff",
                "Sunrise Audio",
                "Niko Japanese Dining",
                "Sitting on the pier",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Download className="h-4 w-4 text-gray-700" />
                  </div>
                  <span className="text-xl">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Meditations Section */}
      <section ref={(el) => (sectionsRef.current.meditations = el)} className="min-h-screen bg-[#f5f0e6] py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-serif mb-12 text-center">Meditations in every room</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="md:w-1/2 flex justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204205-JqA576wGGhwuTNM6DD7gZvEYTjwQg1.png"
                alt="TV Meditations"
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-3xl font-serif mb-6">Download the files</h3>
              <ul className="space-y-4">
                {["Welcome", "Morning", "Evening", "Couples"].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Download className="h-4 w-4 text-gray-700" />
                    </div>
                    <span className="text-xl">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section ref={(el) => (sectionsRef.current.youtube = el)} className="min-h-screen bg-[#f5f0e6] py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              10 Min
              <br />
              YouTube
              <br />
              Version
            </h2>
            <Link href="#" className="text-[#ff7846] text-xl hover:underline">
              Click here to download
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[500px] h-[300px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204139-XFyjOSh8IL4JHDFaxPCJrmX79JRekN.png"
                alt="YouTube Version"
                width={600}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section ref={(el) => (sectionsRef.current.thanks = el)} className="min-h-screen bg-[#ff7846] py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h3 className="text-2xl text-white mb-4">Firstly, we would like to say</h3>
            <h2 className="text-5xl md:text-6xl font-serif text-black mb-4">THANK YOU</h2>
            <p className="text-2xl text-white mb-8">for your hospitality.</p>
            <p className="text-2xl text-white">We loved working with you and had a great time.</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-[500px] h-[400px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-05-18%20204104-LTnRtAVt3mtlQnvxVEOB9poe0RgZrg.png"
                alt="Team Photo"
                width={600}
                height={500}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f5f0e6] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2025 Audio Hug. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Created for The Mondrian Ibiza</p>
        </div>
      </footer>
    </main>
  )
}
