"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function updateWork(formData: FormData) {
  const id = formData.get("id")?.toString()
  const title = formData.get("title")?.toString()
  const category = formData.get("category")?.toString()
  const imageFile = formData.get("image") as File | null

  if (!id || !title || !category) return

  let imageUrl = undefined

  // Si se proporcionó una nueva imagen, subirla
  if (imageFile && imageFile.size > 0) {
    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('tattoos')
        .upload(fileName, imageFile)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('tattoos')
        .getPublicUrl(fileName)

      imageUrl = publicUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      throw new Error('Error al subir la nueva imagen')
    }
  }

  // Actualizar la obra con los nuevos datos
  const updateData: any = {
    title,
    category,
  }

  if (imageUrl) {
    updateData.imageUrl = imageUrl
  }

  await prisma.tattooWork.update({
    where: { id },
    data: updateData,
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
