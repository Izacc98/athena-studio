"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createCategory(formData: FormData) {
  const name = formData.get("name")?.toString()
  if (!name) return

  await prisma.category.create({
    data: { name },
  })

  revalidatePath("/admin/categorias")
}

export async function updateCategory(formData: FormData) {
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  if (!id || !name) return

  await prisma.category.update({
    where: { id },
    data: { name },
  })

  revalidatePath("/admin/categorias")
}

export async function deleteCategory(formData: FormData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.category.delete({
    where: { id },
  })

  revalidatePath("/admin/categorias")
}