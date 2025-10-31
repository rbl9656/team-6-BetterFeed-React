import { create } from 'zustand'
import { db } from '../lib/db'
import { createStorage } from '../lib/storage'

const storage = createStorage('betterfeed-auth')

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  initialized: false,

  hydrate: async () => {
    if (get().initialized) return
    set({ loading: true })
    const record = storage.read()
    if (record?.userId) {
      const profile = await db.getProfile(record.userId)
      set({ user: profile ?? null })
    }
    set({ initialized: true, loading: false })
  },

  login: async (email) => {
    set({ loading: true })
    const profile = await db.findProfileByEmail(email)
    if (!profile) {
      set({ loading: false })
      throw new Error('No account found for that email')
    }
    storage.write({ userId: profile.id })
    set({ user: profile, loading: false })
  },

  signup: async ({ email, username }) => {
    set({ loading: true })
    const profile = await db.createProfile({
      email,
      username,
      avatar_url: '/avatars/default.svg',
    })
    storage.write({ userId: profile.id })
    set({ user: profile, loading: false })
  },

  logout: () => {
    storage.write(null)
    set({ user: null })
  },

  resetPassword: async (email) => {
    set({ loading: true })
    await db.findProfileByEmail(email)
    await new Promise((resolve) => setTimeout(resolve, 500))
    set({ loading: false })
  },
}))
