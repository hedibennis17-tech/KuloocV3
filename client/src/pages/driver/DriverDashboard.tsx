/**
 * DriverDashboard.tsx — Kulooc V3 Plateforme Chauffeur
 * GPS plein écran + acceptation de courses + navigation style Uber
 * Flèche de direction ROUGE | Barre GPS NOIRE
 */
import { useState, useCallback, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MapView } from "@/components/Map";
import {
  Car, Wallet, History, User, Settings, Navigation,
  Phone, MessageCircle, CheckCircle, X, MapPin,
  TrendingUp, Clock, Star, ChevronRight, ToggleLeft, ToggleRight
} from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { toast } from "sonner";

const navItems = [
  { label: "Tableau de bord", icon: <Car size={18} />, path: "/driver" },
  { label: "Mes courses", icon: <History size={18} />, path: "/driver/rides" },
  { label: "Revenus", icon: <TrendingUp size={18} />, path: "/driver/earnings" },
  { label: "Portefeuille", icon: <Wallet size={18} />, path: "/driver/wallet" },
  { label: "Profil", icon: <User size={18} />, path: "/driver/profile" },
  { label: "Paramètres", icon: <Settings size={18} />, path: "/driver/settings" },
];

type DriverStatus = "offline" | "online" | "busy";
type RidePhase = "idle" | "offer" | "accepted" | "pickup" | "navigation" | "completed";

interface RideOffer {
  id: string;
  passengerName: string;
  pickup: string;
  destination: string;
  distance: string;
  duration: string;
  fare: number;
  eta: string;
  timer: number;
}

const MOCK_OFFER: RideOffer = {
  id: "ride-001",
  passengerName: "Dylan",
  pickup: "324 West St, Laval, QC",
  destination: "Aéroport YUL, Dorval, QC",
  distance: "3.1 mi",
  duration: "8 min",
  fare: 11.11,
  eta: "1 min",
  timer: 15,
};

export default function DriverDashboard() {
  const [status, setStatus] = useState<DriverStatus>("online");
  const [phase, setPhase] = useState<RidePhase>("idle");
  const [offer, setOffer] = useState<RideOffer | null>(null);
  const [offerTimer, setOfferTimer] = useState(15);
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    map.setCenter({ lat: 45.5631, lng: -73.7222 });
    map.setZoom(14);
  }, []);

  const toggleStatus = () => {
    if (status === "offline") {
      setStatus("online");
      toast.success("Vous êtes maintenant en ligne");
    } else if (status === "online") {
      // Simulate incoming ride offer
      setTimeout(() => {
        setOffer(MOCK_OFFER);
        setOfferTimer(15);
        setPhase("offer");
        // Countdown timer
        let t = 15;
        timerRef.current = setInterval(() => {
          t--;
          setOfferTimer(t);
          if (t <= 0) {
            clearInterval(timerRef.current!);
            setPhase("idle");
            setOffer(null);
            toast.info("Offre expirée");
          }
        }, 1000);
      }, 2000);
      setStatus("online");
    }
  };

  const handleAccept = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("accepted");
    toast.success("Course acceptée !");
  };

  const handleDecline = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase("idle");
    setOffer(null);
    toast.info("Course refusée");
  };

  const handlePickedUp = () => {
    setPhase("navigation");
    setStatus("busy");
  };

  const handleCompleteRide = () => {
    setPhase("completed");
    setStatus("online");
    setTimeout(() => {
      setPhase("idle");
      setOffer(null);
    }, 3000);
  };

  const todayStats = {
    earnings: 127.50,
    rides: 8,
    hours: 6.5,
    rating: 4.9,
  };

  return (
    <DashboardLayout
      navItems={navItems}
      platformName="Espace Chauffeur"
      userInfo={{ name: "Mohammed A.", role: "Chauffeur" }}
      onlineStatus={status === "online" ? "online" : status === "busy" ? "busy" : "offline"}
    >
      <div className="flex h-full flex-col lg:flex-row">

        {/* ===== LEFT PANEL ===== */}
        <div className="w-full lg:w-[340px] xl:w-[380px] flex-shrink-0 bg-[#111111] border-r border-white/8 flex flex-col overflow-y-auto">

          {/* Status Toggle */}
          <div className="p-5 border-b border-white/8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-base">Statut</h2>
                <p className="text-xs text-white/40 mt-0.5">
                  {status === "online" ? "Vous recevez des courses" :
                   status === "busy" ? "Course en cours" : "Vous êtes hors ligne"}
                </p>
              </div>
              <button
                onClick={toggleStatus}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  status !== "offline"
                    ? "bg-[#E31837] text-white"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {status !== "offline" ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                {status !== "offline" ? "En ligne" : "Hors ligne"}
              </button>
            </div>

            {/* Today Stats */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Revenus", value: `$${todayStats.earnings.toFixed(2)}`, icon: TrendingUp, color: "text-green-400" },
                { label: "Courses", value: todayStats.rides, icon: Car, color: "text-[#E31837]" },
                { label: "Heures", value: `${todayStats.hours}h`, icon: Clock, color: "text-blue-400" },
                { label: "Note", value: todayStats.rating, icon: Star, color: "text-yellow-400" },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-[#1A1A1A] rounded-xl p-3 flex items-center gap-2.5">
                    <Icon size={16} className={s.color} />
                    <div>
                      <div className={`font-bold text-sm ${s.color}`}>{s.value}</div>
                      <div className="text-[10px] text-white/40">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ride Offer */}
          {phase === "offer" && offer && (
            <div className="p-5 border-b border-[#E31837]/30 bg-[#E31837]/5 animate-pulse-once">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-[#E31837]">Nouvelle course !</h3>
                <div className="w-10 h-10 rounded-full border-2 border-[#E31837] flex items-center justify-center">
                  <span className="text-[#E31837] font-bold text-sm">{offerTimer}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/60 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{offer.pickup}</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E31837] mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-white/70">{offer.destination}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="text-white/50">{offer.duration}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/50">{offer.distance}</span>
                <span className="text-white/30">·</span>
                <span className="text-green-400 font-bold">${offer.fare.toFixed(2)}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDecline}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/8 border border-white/15 rounded-xl py-3 text-sm font-semibold hover:bg-white/12 transition-colors"
                >
                  <X size={16} /> Refuser
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#E31837] rounded-xl py-3 text-sm font-semibold hover:bg-[#B01229] transition-colors"
                >
                  <CheckCircle size={16} /> Accepter
                </button>
              </div>
            </div>
          )}

          {/* Accepted — En route to pickup */}
          {phase === "accepted" && offer && (
            <div className="p-5 border-b border-white/8">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-4 text-center">
                <div className="text-green-400 font-semibold text-sm">✓ Course acceptée</div>
                <div className="text-white/40 text-xs mt-1">En route vers {offer.passengerName}</div>
              </div>

              <div className="kulooc-card p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <ImagePlaceholder name="PASSENGER-AVATAR" className="w-12 h-12 rounded-full" aspectRatio="" />
                  <div>
                    <div className="font-bold">{offer.passengerName}</div>
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" /> 4.8
                    </div>
                  </div>
                </div>
                <div className="text-sm text-white/60 mb-3">
                  <MapPin size={13} className="inline mr-1 text-[#E31837]" />
                  {offer.pickup}
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A1A1A] border border-white/10 rounded-lg py-2 text-xs hover:border-white/20 transition-colors">
                    <Phone size={13} /> Appeler
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#1A1A1A] border border-white/10 rounded-lg py-2 text-xs hover:border-white/20 transition-colors">
                    <MessageCircle size={13} /> Message
                  </button>
                </div>
              </div>

              <button
                onClick={handlePickedUp}
                className="kulooc-btn-primary w-full text-sm py-3"
              >
                Passager à bord — Démarrer la course
              </button>
            </div>
          )}

          {/* Navigation Phase */}
          {phase === "navigation" && offer && (
            <div className="p-5 border-b border-white/8">
              {/* GPS Navigation Bar — Style Uber, flèche rouge */}
              <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  {/* Direction Arrow — ROUGE */}
                  <div className="w-12 h-12 bg-[#E31837] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Navigation size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold">150 ft</div>
                    <div className="text-sm font-semibold">{offer.destination.split(",")[0]}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/50 border-t border-white/8 pt-2">
                  <span>{offer.duration}</span>
                  <span>·</span>
                  <span>{offer.distance}</span>
                  <span>·</span>
                  <span className="text-white/70">Dépose {offer.passengerName}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteRide}
                className="kulooc-btn-primary w-full text-sm py-3"
              >
                Terminer la course
              </button>
            </div>
          )}

          {/* Completed */}
          {phase === "completed" && (
            <div className="p-5 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-400" />
              </div>
              <h3 className="font-bold text-lg mb-1">Course terminée !</h3>
              <p className="text-white/40 text-sm">+${offer?.fare.toFixed(2)} ajouté à vos revenus</p>
            </div>
          )}

          {/* Idle State */}
          {phase === "idle" && status === "online" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E31837]/10 flex items-center justify-center mb-4">
                <Car size={28} className="text-[#E31837]" />
              </div>
              <h3 className="font-bold text-base mb-2">En attente de courses</h3>
              <p className="text-white/40 text-sm">Vous recevrez une notification dès qu'une course est disponible dans votre zone.</p>
            </div>
          )}

          {phase === "idle" && status === "offline" && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <Car size={28} className="text-white/20" />
              </div>
              <h3 className="font-bold text-base mb-2 text-white/50">Hors ligne</h3>
              <p className="text-white/30 text-sm">Activez votre statut pour recevoir des courses.</p>
            </div>
          )}
        </div>

        {/* ===== MAP — GPS Plein Écran ===== */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0">
          <MapView
            className="w-full h-full"
            onMapReady={handleMapReady}
          />

          {/* GPS Navigation Overlay — Style Uber avec flèche rouge */}
          {phase === "navigation" && (
            <div className="absolute top-0 left-0 right-0 z-10">
              {/* Top Navigation Bar — Noir avec flèche rouge */}
              <div className="bg-[#0D0D0D]/95 backdrop-blur-sm mx-4 mt-4 rounded-2xl p-4 border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#E31837] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Navigation size={26} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-3xl font-bold leading-tight">150 ft</div>
                    <div className="text-base font-semibold text-white/80">{offer?.destination.split(",")[0]}</div>
                  </div>
                </div>
                {/* Lane indicators */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                  <div className="flex gap-1">
                    {["↑", "↑", "↗"].map((arrow, i) => (
                      <div key={i} className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold
                        ${i === 0 ? "bg-[#E31837] text-white" : "bg-white/10 text-white/40"}`}>
                        {arrow}
                      </div>
                    ))}
                  </div>
                  <span className="text-white/50 text-xs ml-2">I-57 N</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Status Bar */}
          {(phase === "accepted" || phase === "navigation") && offer && (
            <div className="absolute bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur-sm border-t border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40">{offer.duration}</span>
                    <span className="text-xs text-white/40">{offer.distance}</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <span className="text-xs text-white/60">
                      {phase === "accepted" ? `Récupérer ${offer.passengerName}` : `Dépose ${offer.passengerName}`}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/8 rounded-lg hover:bg-white/12 transition-colors">
                    <Phone size={16} className="text-white/60" />
                  </button>
                  <button className="p-2 bg-white/8 rounded-lg hover:bg-white/12 transition-colors">
                    <MessageCircle size={16} className="text-white/60" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
