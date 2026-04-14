"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function createCollaborator(formData: FormData) {
  const name = formData.get("name")?.toString()
  const specialty = formData.get("specialty")?.toString()
  const bio = formData.get("bio")?.toString()
  const imageFile = formData.get("image") as File | null

  if (!name || !specialty || !bio) return

  let imageUrl = ""

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
      throw new Error('Error al subir la imagen')
    }
  }

  await prisma.artist.create({
    data: {
      name,
      specialty,
      bio,
      imageUrl,
    },
  })

  revalidatePath("/admin/colaboradores")
  revalidatePath("/sobre-nosotros")
}

export async function updateCollaborator(formData: FormData) {
  const id = formData.get("id")?.toString()
  const name = formData.get("name")?.toString()
  const specialty = formData.get("specialty")?.toString()
  const bio = formData.get("bio")?.toString()
  const imageFile = formData.get("image") as File | null

  if (!id || !name || !specialty || !bio) return

  let imageUrl = undefined

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
      throw new Error('Error al subir la imagen')
    }
  }

  const updateData: any = {
    name,
    specialty,
    bio,
  }

  if (imageUrl) {
    updateData.imageUrl = imageUrl
  }

  await prisma.artist.update({
    where: { id },
    data: updateData,
  })

  revalidatePath("/admin/colaboradores")
  revalidatePath("/sobre-nosotros")
}

export async function deleteCollaborator(formData: FormData) {
  const id = formData.get("id")?.toString()
  if (!id) return

  await prisma.artist.delete({
    where: { id },
  })

  revalidatePath("/admin/colaboradores")
  revalidatePath("/sobre-nosotros")
}
