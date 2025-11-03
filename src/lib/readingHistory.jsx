const STORAGE_KEY = 'betterfeed_reading_history'

export const readingHistory = {
  getHistory: () => {
    try {
      const history = localStorage.getItem(STORAGE_KEY)
      return history ? JSON.parse(history) : []
    } catch (error) {
      console.error('Error reading history:', error)
      return []
    }
  },

  markAsRead: (postId) => {
    try {
      const history = readingHistory.getHistory()
      const existingIndex = history.findIndex(item => item.postId === postId)
      
      if (existingIndex !== -1) {
        history[existingIndex].timestamp = new Date().toISOString()
      } else {
        history.push({
          postId,
          timestamp: new Date().toISOString()
        })
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Error saving reading history:', error)
    }
  },

  hasRead: (postId) => {
    const history = readingHistory.getHistory()
    return history.some(item => item.postId === postId)
  },

  getHistoryWithPosts: (posts) => {
    const history = readingHistory.getHistory()
    
    return history
      .map(historyItem => {
        const post = posts.find(p => p.id === historyItem.postId)
        if (!post) return null
        
        return {
          ...post,
          readAt: historyItem.timestamp
        }
      })
      .filter(item => item !== null)
      .sort((a, b) => new Date(b.readAt) - new Date(a.readAt))
  },

  clearHistory: () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing history:', error)
    }
  },

  removeFromHistory: (postId) => {
    try {
      const history = readingHistory.getHistory()
      const filtered = history.filter(item => item.postId !== postId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error('Error removing from history:', error)
    }
  }
}