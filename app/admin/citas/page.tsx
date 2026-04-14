import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { StatusButtons } from "./StatusButtons"

export default async function AdminCitasPage() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { appointmentDate: 'asc' }, // Orden cronológico
    include: { artist: true }
  })

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER DEL DASHBOARD */}
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Agenda de Citas_</h1>
            <p className="text-zinc-500 text-xs tracking-widest mt-2 uppercase">Gestión de sesiones Athena Studio</p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-light tracking-tighter">{appointments.length}</span>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Total Solicitudes</p>
          </div>
        </header>

        {/* LISTADO DE CITAS */}
        <div className="grid grid-cols-1 gap-4">
          {appointments.map((cita) => (
            <div 
              key={cita.id} 
              className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center group hover:border-zinc-700 transition-all gap-6"
            >
              {/* 1. SECCIÓN FECHA Y NOMBRE */}
              <div className="flex gap-6 items-center flex-1">
                {/* Calendario visual */}
                <div className="text-center bg-zinc-900 px-4 py-3 rounded-xl border border-zinc-800 min-w-[80px]">
                  <p className="text-[10px] uppercase text-zinc-500 font-bold">
                    {format(cita.appointmentDate, "MMM", { locale: es })}
                  </p>
                  <p className="text-2xl font-black italic leading-none">
                    {format(cita.appointmentDate, "dd")}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight italic">{cita.clientName}</h3>
                  <p className="text-zinc-500 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                    {format(cita.appointmentDate, "HH:mm 'hrs'", { locale: es })}
                  </p>
                </div>
              </div>

              {/* 2. SECCIÓN DESCRIPCIÓN */}
              <div className="flex-1 max-w-md">
                <p className="text-xs text-zinc-400 italic line-clamp-2 leading-relaxed">
                  "{cita.description}"
                </p>
              </div>

              {/* 3. SECCIÓN ESTATUS Y ACCIONES */}
              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-zinc-900 pt-4 md:pt-0">
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    cita.status === 'PENDING' 
                    ? 'border-amber-900/50 bg-amber-950/20 text-amber-500' 
                    : cita.status === 'CONFIRMED'
                    ? 'border-emerald-900/50 bg-emerald-950/20 text-emerald-500'
                    : 'border-blue-900/50 bg-blue-950/20 text-blue-500'
                  }`}>
                    {cita.status}
                  </span>
                </div>

                {/* Componente de botones de acción */}
                <StatusButtons id={cita.id} currentStatus={cita.status} />
              </div>

            </div>
          ))}

          {/* EMPTY STATE */}
          {appointments.length === 0 && (
            <div className="py-24 text-center border border-dashed border-zinc-900 rounded-[2rem] bg-zinc-950/30">
              <p className="text-zinc-700 italic tracking-widest uppercase text-xs">No hay citas registradas en la agenda</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER DE ADMIN */}
      <footer className="mt-20 text-center text-[10px] text-zinc-800 tracking-[0.5em] uppercase">
        Sistema de Gestión Interna — Athena Studio 2026
      </footer>
    </main>
  )
}