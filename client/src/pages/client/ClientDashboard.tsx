/**
 * ClientDashboard.tsx — Kulooc V3 Plateforme User
 * Booking + Carte Google Maps + Sélection Kulooc X/XL/Confort
 * Design: Dark Precision | Rouge #E31837
 */
import { useState, useCallback, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MapView } from "@/components/Map";
import {
  Car, Clock, History, Wallet, User, Settings, Home,
  MapPin, Navigation, X, ChevronRight, Star, CreditCard,
  Phone, MessageCircle, Package
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { toast } from "sonner";

const navItems = [
  { label: "Course", icon: <Car size={18} />, path: "/client" },
  { label: "Activité", icon: <History size={18} />, path: "/client/activity" },
  { label: "Portefeuille", icon: <Wallet size={18} />, path: "/client/wallet" },
  { label: "Compte", icon: <User size={18} />, path: "/client/account" },
];

const RIDE_TYPES = [
  {
    id: "kulooc-x",
    name: "KULOOC X",
    capacity: 4,
    eta: "3 min",
    time: "12 h 18",
    price: 13.05,
    desc: "Économique, rapide et fiable",
    icon: "🚗",
  },
  {
    id: "kulooc-xl",
    name: "KULOOC XL",
    capacity: 6,
    eta: "6 min",
    time: "12 h 21",
    price: 20.93,
    desc: "Plus d'espace pour votre groupe",
    icon: "🚙",
  },
  {
    id: "kulooc-confort",
    name: "KULOOC CONFORT",
    capacity: 4,
    eta: "5 min",
    time: "12 h 20",
    price: 24.60,
    desc: "Confort et discrétion garantis",
    icon: "🚘",
  },
];

type BookingStep = "idle" | "selecting" | "confirming" | "searching" | "matched" | "enroute" | "arrived" | "completed";

export default function ClientDashboard() {
  const [step, setStep] = useState<BookingStep>("idle");
  const [pickup, setPickup] = useState("1511 Rue Trépanier, Laval, QC H7W 3G5, Canada");
  const [destination, setDestination] = useState("Aéroport YUL, Dorval, QC");
  const [selectedRide, setSelectedRide] = useState(RIDE_TYPES[0]);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [driversCount] = useState(2);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    // Center on Montreal/Laval area
    map.setCenter({ lat: 45.5631, lng: -73.7222 });
    map.setZoom(13);
  }, []);

  const handleBookRide = () => {
    if (!destination) {
      toast.error("Veuillez entrer une destination");
      return;
    }
    setStep("selecting");
  };

  const handleConfirmRide = () => {
    setStep("searching");
    setTimeout(() => {
      setStep("matched");
    }, 3000);
  };

  const handleCancelRide = () => {
    setStep("idle");
    toast.info("Course annulée");
  };

  return (
    <DashboardLayout
      navItems={navItems}
      platformName="Espace Client"
      userInfo={{ name: "Hedi Bennis", role: "Client" }}
      onlineStatus="online"
    >
      <div className="flex h-full">
        {/* ===== LEFT PANEL ===== */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-[#111111] border-r border-white/8 flex flex-col overflow-y-auto">

          {/* Header */}
          <div className="p-5 border-b border-white/8">
            <h2 className="text-lg font-bold mb-1">Commander une course</h2>
            <p className="text-white/40 text-xs">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {driversCount} chauffeurs disponibles
              </span>
            </p>
          </div>

          {/* Booking Form */}
          {(step === "idle" || step === "selecting") && (
            <div className="p-5 space-y-3">
              {/* Pickup */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full border-2 border-white/60 bg-transparent" />
                </div>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Lieu de départ"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-8 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/50"
                />
              </div>
              {/* Destination */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <div className="w-3 h-3 rounded-full bg-[#E31837]" />
                </div>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Destination"
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-8 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/50"
                />
              </div>

              {/* Options */}
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-xs text-white/50 bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 hover:border-white/20 transition-colors">
                  <Clock size={13} /> Prise en charge immédiate
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/50 bg-[#1A1A1A] border border-white/10 rounded-lg px-3 py-2 hover:border-white/20 transition-colors">
                  <User size={13} /> Pour moi
                </button>
              </div>

              {step === "idle" && (
                <button
                  onClick={handleBookRide}
                  className="kulooc-btn-primary w-full text-sm py-3 mt-2"
                >
                  Choisir une course
                </button>
              )}
            </div>
          )}

          {/* Ride Selection */}
          {step === "selecting" && (
            <div className="flex-1 overflow-y-auto">
              <div className="px-5 pb-2 pt-1">
                <h3 className="text-sm font-semibold text-white/70 mb-3">Choisissez une course</h3>
                <p className="text-xs text-white/40 mb-4">Les courses que vous pourriez apprécier</p>
                <div className="space-y-2">
                  {RIDE_TYPES.map((ride) => (
                    <div
                      key={ride.id}
                      onClick={() => setSelectedRide(ride)}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150
                        ${selectedRide.id === ride.id
                          ? "border-[#E31837] bg-[#E31837]/8"
                          : "border-white/10 bg-[#1A1A1A] hover:border-white/20"
                        }`}
                    >
                      {/* Car Icon Placeholder */}
                      <div className="w-16 h-10 bg-[#242424] rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {ride.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{ride.name}</span>
                          <span className="text-white/40 text-xs flex items-center gap-0.5">
                            <User size={10} /> {ride.capacity}
                          </span>
                        </div>
                        <div className="text-xs text-white/40 mt-0.5">
                          Dans {ride.eta} · {ride.time}
                        </div>
                        <div className="text-xs text-white/30">{ride.desc}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-white">{ride.price.toFixed(2)} $CA</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment + Confirm */}
              <div className="p-5 border-t border-white/8 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <CreditCard size={16} className="text-blue-400" />
                    <span>Visa ••••7673</span>
                  </div>
                  <ChevronRight size={16} className="text-white/30" />
                </div>
                <button
                  onClick={handleConfirmRide}
                  className="kulooc-btn-primary w-full text-sm py-3"
                >
                  Commander {selectedRide.name}
                </button>
              </div>
            </div>
          )}

          {/* Searching */}
          {step === "searching" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#E31837]/30 border-t-[#E31837] animate-spin mb-6" />
              <h3 className="font-bold text-lg mb-2">Recherche d'un chauffeur...</h3>
              <p className="text-white/40 text-sm">Nous trouvons le meilleur chauffeur près de vous</p>
              <button onClick={handleCancelRide} className="mt-6 text-sm text-white/40 hover:text-white underline">
                Annuler
              </button>
            </div>
          )}

          {/* Matched */}
          {step === "matched" && (
            <div className="flex-1 overflow-y-auto p-5">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-4 text-center">
                <div className="text-green-400 font-semibold text-sm mb-1">✓ Chauffeur trouvé !</div>
                <div className="text-white/50 text-xs">Arrivée dans 3 minutes</div>
              </div>

              {/* Driver Card */}
              <div className="kulooc-card p-4 mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <ImagePlaceholder name="DRIVER-AVATAR" className="w-14 h-14 rounded-full" aspectRatio="" />
                  <div>
                    <div className="font-bold">Mohammed A.</div>
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" /> 4.9 · 1,240 courses
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">Toyota Camry · ABC 1234</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-lg py-2.5 text-sm hover:border-white/20 transition-colors">
                    <Phone size={15} /> Appeler
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1A] border border-white/10 rounded-lg py-2.5 text-sm hover:border-white/20 transition-colors">
                    <MessageCircle size={15} /> Message
                  </button>
                </div>
              </div>

              <button onClick={handleCancelRide} className="w-full text-sm text-white/40 hover:text-white border border-white/10 rounded-lg py-2.5 transition-colors">
                Annuler la course
              </button>
            </div>
          )}
        </div>

        {/* ===== MAP ===== */}
        <div className="hidden lg:flex flex-1 relative">
          <MapView
            className="w-full h-full"
            onMapReady={handleMapReady}
          />
          {/* Map Overlay Info */}
          {(step === "matched" || step === "enroute") && (
            <div className="absolute top-4 right-4 bg-[#111111]/95 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-black border-2 border-white/60" />
                <span className="text-white/70 text-xs truncate max-w-[200px]">{pickup}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#E31837]" />
                <span className="text-white/70 text-xs truncate max-w-[200px]">{destination}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
