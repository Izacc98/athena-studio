"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Añadimos 'category' como parámetro
export async function saveWork(title: string, imageUrl: string, category: string) {
  await prisma.tattooWork.create({
    data: {
      title,
      imageUrl,
      category, // <--- Ahora se guarda dinámicamente
    },
  })
  
  revalidatePath("/")
}