"use server"
import { prisma } from "@/lib/prisma"
import { format, startOfDay, endOfDay, parse } from "date-fns" // npm install date-fns

// CONFIGURACIÓN DEL ESTUDIO
const OPENING_HOUR = 9 // 09:00 AM
const CLOSING_HOUR = 20 // 08:00 PM (Última cita empieza a las 7 PM)


export async function createAppointment(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const fullDateTime = formData.get("fullDateTime") as string // Recibimos fecha + hora

    // Parseamos correctamente: "2025-04-15T15:00" -> Date object
    // Dividimos en partes
    const [datePart, timePart] = fullDateTime.split("T")
    
    if (!datePart || !timePart) {
      throw new Error("Formato de fecha/hora inválido")
    }

    // Construimos la fecha en formato correcto
    // datePart = "2025-04-15"
    // timePart = "15:00"
    const [year, month, day] = datePart.split("-")
    const [hour, minute] = timePart.split(":")
    
    // Creamos un Date object local (no UTC)
    const appointmentDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1, // Los meses en JS son 0-indexed
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      0
    )

    // Validar que la fecha sea válida
    if (isNaN(appointmentDateTime.getTime())) {
      throw new Error("Fecha u hora inválida")
    }

    console.log("Fecha parseada:", appointmentDateTime)
    console.log("Fecha ISO:", appointmentDateTime.toISOString())

    // VALIDACIÓN MEJORADA: Verificar si ya existe una cita en este horario exacto
    const requestedHour = format(appointmentDateTime, "HH:mm")
    
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfDay(appointmentDateTime),
          lte: endOfDay(appointmentDateTime),
        },
        status: { not: "CANCELLED" }
      }
    })

    // Verificar si ALGUNO de los horarios coincide
    const isHourOccupied = existingAppointments.some(app => {
      const appointmentHour = format(app.appointmentDate, "HH:mm")
      return appointmentHour === requestedHour
    })

    if (isHourOccupied) {
      throw new Error(`El horario ${requestedHour} ya está ocupado. Por favor selecciona otro horario.`)
    }

    const nuevaCita = await prisma.appointment.create({
      data: {
        clientName: name,
        description: description,
        appointmentDate: appointmentDateTime,
        status: "PENDING",
      },
    })

    return { success: true }
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Error al crear la cita")
  }
}



export async function getAvailableSlots(date: Date) {
  try {
    // 1. Buscamos citas existentes para ese día que no estén canceladas
    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
        status: { not: "CANCELLED" }
      }
    })

    // 2. Extraemos solo las horas ocupadas en formato HH:mm (eliminar duplicados)
    const occupiedHours = Array.from(
      new Set(appointments.map(app => format(app.appointmentDate, "HH:mm")))
    )

    // 3. Generamos todos los slots posibles de tu jornada
    const slots = []
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`
      
      // Solo añadimos el slot si no está en la lista de ocupados
      if (!occupiedHours.includes(timeString)) {
        slots.push(timeString)
      }
    }

    return slots
  } catch (error) {
    console.error("Error al obtener slots disponibles:", error)
    return []
  }
}