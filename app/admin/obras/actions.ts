"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateWork(formData: FormData) {
  const id = formData.get("id")?.toString()
  const title = formData.get("title")?.toString()
  const category = formData.get("category")?.toString()

  if (!id || !title || !category) return

  await prisma.tattooWork.update({
    where: { id },
    data: {
      title,
      category,
    },
  })

  revalidatePath("/admin/obras")
}

export async function deleteWork(formData: FormData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.tattooWork.delete({
    where: { id },
  })

  revalidatePath("/admin/obras")
}
