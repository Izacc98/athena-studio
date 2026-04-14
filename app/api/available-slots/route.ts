import { prisma } from "@/lib/prisma"
import { format, startOfDay, endOfDay } from "date-fns"
import { NextRequest, NextResponse } from "next/server"

// CONFIGURACIÓN DEL ESTUDIO
const OPENING_HOUR = 9 // 09:00 AM
const CLOSING_HOUR = 20 // 08:00 PM

export async function GET(request: NextRequest) {
  try {
    const dateString = request.nextUrl.searchParams.get("date")

    if (!dateString) {
      return NextResponse.json(
        { error: "Fecha no proporcionada" },
        { status: 400 }
      )
    }

    // Parsear la fecha correctamente: "2025-04-15"
    const [year, month, day] = dateString.split("-")
    const selectedDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      0,
      0,
      0
    )

    if (isNaN(selectedDate.getTime())) {
      return NextResponse.json(
        { error: "Fecha inválida" },
        { status: 400 }
      )
    }

    console.log("Fecha solicitada:", dateString, "->", selectedDate)

    // Buscar citas existentes para ese día
    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: {
          gte: startOfDay(selectedDate),
          lte: endOfDay(selectedDate),
        },
        status: { not: "CANCELLED" }
      }
    })

    console.log("Citas encontradas:", appointments.length)
    appointments.forEach(app => {
      console.log("  -", format(app.appointmentDate, "HH:mm"))
    })

    // Extraer horas ocupadas
    const occupiedHours = Array.from(
      new Set(appointments.map(app => format(app.appointmentDate, "HH:mm")))
    )

    console.log("Horas ocupadas:", occupiedHours)

    // Generar slots disponibles
    const slots = []
    for (let hour = OPENING_HOUR; hour < CLOSING_HOUR; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`
      
      if (!occupiedHours.includes(timeString)) {
        slots.push(timeString)
      }
    }

    console.log("Slots disponibles:", slots)

    return NextResponse.json({ slots })
  } catch (error) {
    console.error("Error en available-slots:", error)
    return NextResponse.json(
      { error: "Error al obtener horarios disponibles" },
      { status: 500 }
    )
  }
}