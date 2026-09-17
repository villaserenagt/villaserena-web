'use client';

import { useQuery } from '@tanstack/react-query';
import { 
  Building2, 
  BedDouble, 
  CalendarCheck2, 
  Users, 
  Sparkles, 
  Wrench, 
  UtensilsCrossed, 
  ShieldCheck, 
  RefreshCw,
  CheckCircle2,
  Cpu
} from 'lucide-react';

interface HotelStatus {
  hotelName: string;
  systemStatus: string;
  activeModules: { id: string; name: string; icon: string; status: string; path: string }[];
  metrics: {
    ocupacionPorcentaje: number;
    habitacionesDisponibles: number;
    reservasHoy: number;
    checkInsPendientes: number;
  };
  serverTime: string;
}

// Simulador de llamada a API para TanStack Query
async function fetchHotelOverview(): Promise<HotelStatus> {
  // Simular latencia de red
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    hotelName: 'Hotel Villa Serena',
    systemStatus: 'Operativo - v1.0',
    activeModules: [
      { id: 'recepcion', name: 'Recepción', icon: 'CalendarCheck2', status: 'Activo', path: '/recepcion' },
      { id: 'huesped', name: 'Portal Huésped', icon: 'Users', status: 'En preparación', path: '/huesped' },
      { id: 'limpieza', name: 'Ama de Llaves / Limpieza', icon: 'Sparkles', status: 'En preparación', path: '/limpieza' },
      { id: 'mantenimiento', name: 'Mantenimiento', icon: 'Wrench', status: 'En preparación', path: '/mantenimiento' },
      { id: 'roomservice', name: 'Room Service', icon: 'UtensilsCrossed', status: 'En preparación', path: '/roomservice' },
      { id: 'admin', name: 'Administración', icon: 'ShieldCheck', status: 'En preparación', path: '/admin' },
    ],
    metrics: {
      ocupacionPorcentaje: 78,
      habitacionesDisponibles: 12,
      reservasHoy: 9,
      checkInsPendientes: 4,
    },
    serverTime: new Date().toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}

export default function HomePage() {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['hotel-overview'],
    queryFn: fetchHotelOverview,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6 md:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header con Tech Stack */}
        <header className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Villa Serena
                  </h1>
                  <p className="text-sm font-medium text-slate-500">
                    Sistema de Gestión Hotelera Integral
                  </p>
                </div>
              </div>
            </div>

            {/* Badges del Stack Tecnológico */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                Next.js 15
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                React 19
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                Tailwind CSS
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                TanStack Query
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
                TypeScript
              </span>
            </div>
          </div>
        </header>

        {/* Demo TanStack Query Status */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-slate-800">
                Estado del Sistema (TanStack Query Cache)
              </h2>
            </div>
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? 'animate-spin text-indigo-600' : ''}`} />
              {isFetching ? 'Actualizando...' : 'Refrescar Query'}
            </button>
          </div>

          {isLoading ? (
            <div className="py-8 text-center text-sm text-slate-500">
              Cargando estado con TanStack Query...
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* Métricas clave */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Ocupación</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{data?.metrics.ocupacionPorcentaje}%</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Disponibles</p>
                  <p className="mt-2 text-2xl font-bold text-emerald-600">{data?.metrics.habitacionesDisponibles}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Reservas Hoy</p>
                  <p className="mt-2 text-2xl font-bold text-indigo-600">{data?.metrics.reservasHoy}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Check-ins Pendientes</p>
                  <p className="mt-2 text-2xl font-bold text-amber-600">{data?.metrics.checkInsPendientes}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" /> TanStack Query Provider inicializado con éxito
                </span>
                <span>Última sincronización: {data?.serverTime}</span>
              </div>
            </div>
          )}
        </section>

        {/* Módulos de la Solución */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Módulos del Sistema</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.activeModules.map((modulo) => (
              <div
                key={modulo.id}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {modulo.id === 'recepcion' && <CalendarCheck2 className="h-5 w-5" />}
                    {modulo.id === 'huesped' && <Users className="h-5 w-5" />}
                    {modulo.id === 'limpieza' && <Sparkles className="h-5 w-5" />}
                    {modulo.id === 'mantenimiento' && <Wrench className="h-5 w-5" />}
                    {modulo.id === 'roomservice' && <UtensilsCrossed className="h-5 w-5" />}
                    {modulo.id === 'admin' && <ShieldCheck className="h-5 w-5" />}
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      modulo.status === 'Activo'
                        ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {modulo.status}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-800">{modulo.name}</h3>
                <p className="mt-1 text-xs text-slate-500">Módulo configurado en la arquitectura del proyecto.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
