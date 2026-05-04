"use server"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Añadimos 'categoryId' como parámetro
export async function saveWork(title: string, imageUrl: string, categoryId: string) {
  await prisma.tattooWork.create({
    data: {
      title,
      imageUrl,
      categoryId: categoryId || null,
    },
  })
  
  revalidatePath("/")
}