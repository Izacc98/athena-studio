"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateAppointmentStatus(id: string, status: string) {
  await prisma.appointment.update({
    where: { id },
    data: { status }
  })
  revalidatePath("/admin/citas")
}

export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({
    where: { id }
  })
  revalidatePath("/admin/citas")
}