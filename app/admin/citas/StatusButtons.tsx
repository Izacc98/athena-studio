"use client"
import { updateAppointmentStatus, deleteAppointment } from "./actions"
import { Check, Trash2, X } from "lucide-react"

export function StatusButtons({ id, currentStatus }: { id: string, currentStatus: string }) {
  return (
    <div className="flex gap-2">
      {currentStatus === "PENDING" && (
        <button 
          onClick={() => updateAppointmentStatus(id, "CONFIRMED")}
          className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-black rounded-lg transition-all border border-emerald-500/20"
          title="Confirmar Cita"
        >
          <Check size={16} />
        </button>
      )}
      
      {currentStatus === "CONFIRMED" && (
        <button 
          onClick={() => updateAppointmentStatus(id, "COMPLETED")}
          className="p-2 bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-black rounded-lg transition-all border border-blue-500/20"
          title="Marcar como Completado"
        >
          <Check size={16} strokeWidth={3} />
        </button>
      )}

      <button 
        onClick={async () => {
          if(confirm("¿Seguro que quieres eliminar esta cita?")) {
            await deleteAppointment(id)
          }
        }}
        className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all border border-red-500/20"
        title="Eliminar"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}