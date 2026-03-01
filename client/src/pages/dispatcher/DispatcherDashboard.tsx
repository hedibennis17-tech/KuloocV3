/**
 * DispatcherDashboard.tsx — Kulooc V3 Plateforme Dispatcher
 * Carte temps réel + assignation manuelle + heatmap + zones
 */
import { useState, useCallback, useRef } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { MapView } from "@/components/Map";
import {
  MapPin, Car, Users, Activity, Settings, Clock,
  CheckCircle, AlertCircle, Search, Filter, RefreshCw,
  Zap, TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { label: "Tableau de bord", icon: <Activity size={18} />, path: "/dispatcher" },
  { label: "Courses en direct", icon: <Car size={18} />, path: "/dispatcher/rides", badge: 12 },
  { label: "Chauffeurs", icon: <Users size={18} />, path: "/dispatcher/drivers" },
  { label: "Zones", icon: <MapPin size={18} />, path: "/dispatcher/zones" },
  { label: "Paramètres", icon: <Settings size={18} />, path: "/dispatcher/settings" },
];

const MOCK_RIDES = [
  { id: "R001", passenger: "Hedi B.", driver: "Mohammed A.", pickup: "Laval, QC", dest: "YUL Airport", status: "enroute", eta: "8 min", fare: 24.50 },
  { id: "R002", passenger: "Sarah M.", driver: null, pickup: "Montréal, QC", dest: "Longueuil, QC", status: "pending", eta: "—", fare: 18.00 },
  { id: "R003", passenger: "Jean P.", driver: "Carlos R.", pickup: "Laval, QC", dest: "Montréal, QC", status: "pickup", eta: "3 min", fare: 15.75 },
  { id: "R004", passenger: "Marie L.", driver: "Ahmed K.", pickup: "Brossard, QC", dest: "Montréal, QC", status: "completed", eta: "—", fare: 22.00 },
];

const MOCK_DRIVERS = [
  { id: "D01", name: "Mohammed A.", status: "busy", zone: "Laval Nord", rides: 8, rating: 4.9 },
  { id: "D02", name: "Carlos R.", status: "online", zone: "Montréal Centre", rides: 5, rating: 4.7 },
  { id: "D03", name: "Ahmed K.", status: "online", zone: "Rive-Sud", rides: 11, rating: 4.8 },
  { id: "D04", name: "Pierre T.", status: "offline", zone: "—", rides: 3, rating: 4.6 },
];

const statusConfig = {
  pending: { label: "En attente", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  enroute: { label: "En route", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/30" },
  pickup: { label: "Récupération", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/30" },
  completed: { label: "Terminée", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
};

const driverStatusConfig = {
  online: { label: "En ligne", color: "bg-green-500" },
  offline: { label: "Hors ligne", color: "bg-gray-500" },
  busy: { label: "Occupé", color: "bg-yellow-500" },
};

export default function DispatcherDashboard() {
  const [activeTab, setActiveTab] = useState<"rides" | "drivers">("rides");
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setMapReady(true);
    map.setCenter({ lat: 45.5631, lng: -73.7222 });
    map.setZoom(11);
  }, []);

  const handleAssign = (rideId: string) => {
    toast.success(`Course ${rideId} assignée automatiquement`);
  };

  const liveStats = [
    { label: "Courses actives", value: 12, icon: Car, color: "text-[#E31837]" },
    { label: "Chauffeurs en ligne", value: 18, icon: Users, color: "text-green-400" },
    { label: "En attente", value: 3, icon: Clock, color: "text-yellow-400" },
    { label: "Complétées (auj.)", value: 147, icon: CheckCircle, color: "text-blue-400" },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      platformName="Dispatcher"
      userInfo={{ name: "Joe Dispatch", role: "Dispatcher" }}
      onlineStatus="online"
    >
      <div className="flex h-full flex-col lg:flex-row">

        {/* ===== LEFT PANEL ===== */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 bg-[#111111] border-r border-white/8 flex flex-col overflow-hidden">

          {/* Live Stats */}
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm">Temps réel</h2>
              <button className="text-white/40 hover:text-white p-1 rounded transition-colors">
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {liveStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-[#1A1A1A] rounded-lg p-3 flex items-center gap-2">
                    <Icon size={16} className={s.color} />
                    <div>
                      <div className={`font-bold text-lg leading-none ${s.color}`}>{s.value}</div>
                      <div className="text-[10px] text-white/40 mt-0.5">{s.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/8">
            {[
              { key: "rides", label: "Courses", count: 12 },
              { key: "drivers", label: "Chauffeurs", count: 18 },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2
                  ${activeTab === tab.key
                    ? "text-[#E31837] border-b-2 border-[#E31837]"
                    : "text-white/40 hover:text-white"
                  }`}
              >
                {tab.label}
                <span className={`text-xs rounded-full px-1.5 py-0.5 ${
                  activeTab === tab.key ? "bg-[#E31837]/20 text-[#E31837]" : "bg-white/8 text-white/40"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="p-3 border-b border-white/8">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder={activeTab === "rides" ? "Rechercher une course..." : "Rechercher un chauffeur..."}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E31837]/40"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === "rides" ? (
              <div className="divide-y divide-white/5">
                {MOCK_RIDES.map((ride) => {
                  const sc = statusConfig[ride.status as keyof typeof statusConfig];
                  return (
                    <div key={ride.id} className="p-4 hover:bg-white/3 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="text-xs font-mono text-white/30 mr-2">{ride.id}</span>
                          <span className="font-semibold text-sm">{ride.passenger}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </span>
                      </div>
                      <div className="text-xs text-white/40 mb-1">
                        <span className="text-white/60">{ride.pickup}</span> → {ride.dest}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-white/40">
                          {ride.driver ? (
                            <span className="text-green-400">✓ {ride.driver}</span>
                          ) : (
                            <span className="text-yellow-400">⚠ Non assigné</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/50">${ride.fare.toFixed(2)}</span>
                          {!ride.driver && (
                            <button
                              onClick={() => handleAssign(ride.id)}
                              className="text-[10px] bg-[#E31837]/15 text-[#E31837] border border-[#E31837]/30 rounded px-2 py-0.5 hover:bg-[#E31837]/25 transition-colors"
                            >
                              Assigner
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {MOCK_DRIVERS.map((driver) => {
                  const dc = driverStatusConfig[driver.status as keyof typeof driverStatusConfig];
                  return (
                    <div key={driver.id} className="p-4 hover:bg-white/3 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${dc.color}`} />
                          <span className="font-semibold text-sm">{driver.name}</span>
                        </div>
                        <span className="text-xs text-white/40">{dc.label}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span><MapPin size={10} className="inline mr-0.5" />{driver.zone}</span>
                        <span>{driver.rides} courses</span>
                        <span>★ {driver.rating}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Auto-Dispatch Button */}
          <div className="p-4 border-t border-white/8">
            <button
              onClick={() => toast.success("Dispatch automatique activé — 3 courses assignées")}
              className="kulooc-btn-primary w-full text-sm py-3 flex items-center justify-center gap-2"
            >
              <Zap size={16} /> Dispatch Automatique
            </button>
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-0">
          <MapView
            className="w-full h-full"
            onMapReady={handleMapReady}
          />
          {/* Map Controls Overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button
              onClick={() => toast.info("Heatmap activée")}
              className="bg-[#111111]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:text-white hover:border-[#E31837]/40 transition-all"
            >
              🔥 Heatmap
            </button>
            <button
              onClick={() => toast.info("Zones affichées")}
              className="bg-[#111111]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 text-xs font-medium text-white/70 hover:text-white hover:border-[#E31837]/40 transition-all"
            >
              📍 Zones
            </button>
          </div>
          {/* Live indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#111111]/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2">
            <span className="w-2 h-2 rounded-full bg-[#E31837] animate-pulse" />
            <span className="text-xs font-medium text-white/70">LIVE</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
