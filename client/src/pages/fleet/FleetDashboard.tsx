/**
 * FleetDashboard.tsx — Kulooc V3 Plateforme Fleet Manager
 */
import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Car, Users, TrendingUp, Settings, FileText, Plus, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const navItems = [
  { label: "Tableau de bord", icon: <TrendingUp size={18} />, path: "/fleet" },
  { label: "Véhicules", icon: <Car size={18} />, path: "/fleet/vehicles" },
  { label: "Chauffeurs", icon: <Users size={18} />, path: "/fleet/drivers" },
  { label: "Revenus", icon: <FileText size={18} />, path: "/fleet/earnings" },
  { label: "Paramètres", icon: <Settings size={18} />, path: "/fleet/settings" },
];

const VEHICLES = [
  { id: "V01", plate: "ABC-1234", model: "Toyota Camry 2023", driver: "Mohammed A.", status: "active", km: 45200, revenue: 3240 },
  { id: "V02", plate: "DEF-5678", model: "Honda Accord 2022", driver: "Carlos R.", status: "active", km: 38100, revenue: 2890 },
  { id: "V03", plate: "GHI-9012", model: "Hyundai Sonata 2023", driver: "Ahmed K.", status: "maintenance", km: 62000, revenue: 4100 },
  { id: "V04", plate: "JKL-3456", model: "Kia Optima 2021", driver: "—", status: "inactive", km: 28500, revenue: 1200 },
];

const statusVehicle = {
  active: { label: "Actif", color: "text-green-400", bg: "bg-green-400/10 border-green-400/30" },
  maintenance: { label: "Maintenance", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/30" },
  inactive: { label: "Inactif", color: "text-gray-400", bg: "bg-gray-400/10 border-gray-400/30" },
};

export default function FleetDashboard() {
  const [activeView, setActiveView] = useState<"vehicles" | "earnings">("vehicles");

  const fleetStats = [
    { label: "Véhicules actifs", value: "3/4", icon: Car, color: "text-[#E31837]" },
    { label: "Chauffeurs actifs", value: "3", icon: Users, color: "text-green-400" },
    { label: "Revenus (mois)", value: "$11,430", icon: TrendingUp, color: "text-blue-400" },
    { label: "Km parcourus", value: "173K", icon: Clock, color: "text-yellow-400" },
  ];

  return (
    <DashboardLayout
      navItems={navItems}
      platformName="Gestionnaire de Flotte"
      userInfo={{ name: "Fleet Manager", role: "Fleet Manager" }}
    >
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {fleetStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="kulooc-card p-5">
                <Icon size={20} className={`${s.color} mb-3`} />
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-white/40 mt-1">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-white/8">
          {[
            { key: "vehicles", label: "Véhicules" },
            { key: "earnings", label: "Revenus" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveView(tab.key as any)}
              className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeView === tab.key
                  ? "text-[#E31837] border-[#E31837]"
                  : "text-white/40 border-transparent hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vehicles Table */}
        {activeView === "vehicles" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Flotte de véhicules</h3>
              <button
                onClick={() => toast.info("Fonctionnalité à venir")}
                className="kulooc-btn-primary text-xs py-2 px-4 flex items-center gap-1.5"
              >
                <Plus size={14} /> Ajouter un véhicule
              </button>
            </div>
            <div className="kulooc-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8">
                      {["Plaque", "Modèle", "Chauffeur", "Statut", "Km", "Revenus", "Actions"].map((h) => (
                        <th key={h} className="text-left text-xs text-white/40 font-medium px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {VEHICLES.map((v) => {
                      const sc = statusVehicle[v.status as keyof typeof statusVehicle];
                      return (
                        <tr key={v.id} className="hover:bg-white/3 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-white/70">{v.plate}</td>
                          <td className="px-4 py-3 font-medium">{v.model}</td>
                          <td className="px-4 py-3 text-white/60">{v.driver}</td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.bg} ${sc.color}`}>
                              {sc.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-white/50">{(v.km / 1000).toFixed(1)}K</td>
                          <td className="px-4 py-3 text-green-400 font-semibold">${v.revenue.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toast.info(`Détails ${v.plate}`)}
                              className="text-xs text-[#E31837] hover:underline"
                            >
                              Voir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Earnings View */}
        {activeView === "earnings" && (
          <div className="kulooc-card p-6 text-center">
            <TrendingUp size={40} className="text-[#E31837] mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Rapport de revenus</h3>
            <p className="text-white/40 text-sm">Les graphiques de revenus détaillés seront disponibles ici.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
