# BetterFeed

## Team & Contributions
- **Veyd:** Created basic skeleton of display and design features. Less focused on functionality.
- **Kyle** Updated background color selection and fixed issue where background fading was resetting after every post.
- **Robbie** Added search bar based on key words and reading history to the profile and feed.
- **Temirlan**: 

## What It Does
BetterFeed is an AI-powered smart feed application that presents condensed academic articles in an engaging, swipeable interface. Users can browse curated content, interact with posts through likes and saves, filter by categories, and most uniquely, engage with an AI assistant that explains or debates each article in different conversational styles. The app tracks your reading history and creates a personalized library of saved content for easy reference.

## Setup
```bash
npm install
npm run dev
```

## Mock Data
Our app uses mock data for user profiles, posts/articles, user interactions (likes/saves), chat conversation styles, and content categories. The reading history feature uses localStorage to persist data across sessions. Next week we'll connect it to our backend APIs and integrate with a real database for persistent storage.