# AI Prompts Used

## Round 1: Initial Structure
**Prompt:** 
I’m building a React frontend for an AI-powered article feed called BetterFeed. There is no backend—use local mock data and localStorage for persistence. Here’s my design:

We’re building BetterFeed, an AI-powered smart feed UI that scrolls through condensed academic/news articles in a TikTok-style interface. Users browse a curated feed, like/save posts, and swipe into an AI-conversation panel that explains or debates the article in a chosen tone.
Main screens:
Feed: Shows ranked article cards (title, summary, thumbnail, source, counts). Allows users to like, save, switch categories (General, Cat1…Cat5), infinite scroll, and open the AI panel via “Swipe for AI conversation →”.
Post Detail + AI Conversation (slide-in/right panel): Shows larger summary + metadata; lets users choose a chat “style” (Professor, Debater) and type messages (mock responses locally).
Profile: Shows avatar, username, joined date; lists user posts and interactions (from mocks). Allows avatar/username edit (local-only).
Library (Saved): Shows saved posts list/grid with ability to open detail and unsave.
Auth (mock): Login/Signup/Reset—UI only with fake success (stores a dummy user in memory/localStorage).
Core components needed:
AppHeader: displays app title & avatar; props: { user, onSignIn, onSignOut }
CategoryTabs: displays category pills; props: { categories, active, onChange }
FeedCard: displays a post card; props: { post, isLiked, isSaved, onLike, onSave, onOpen }
EngagementBar: shows likes/saves/views; props: { likes, saves, views, onLike, onSave, active }
InfiniteScroller: sentinel that calls loadMore; props: { hasMore, isLoading, onLoadMore }
StyleSelector: tiles for “Professor”, “Debater”, etc.; props: { options, selected, onSelect }
AIChatPanel: slide-over with chat UI (mock); props: { open, onClose, post, style }
AuthForms: LoginForm, SignupForm, ResetPasswordForm; props as needed
ProfileCard: profile view/edit; props: { profile, onUpdate }
PostComposer (optional): paste URL + title/summary; props: { onCreate }
Toast/Alert: global feedback
RouteGuard (mock): protects routes based on local “logged-in” flag
Brand/Style:
Colors: Primary #7C3AED (violet), Accent #22C55E, Surface #FFFFFF (light) / #0B1020 (dark, optional), Text #111827 / #F9FAFB, Muted #9CA3AF
Style: modern + minimal; rounded-2xl cards; soft shadows; playful micro-interactions; swipe cues.
Using: React + Vite + JavaScript, CSS, shadcn/ui, lucide-react, Framer Motion (for swipe/slide-over)
Mock data structure:
{
  "profiles": [
    {
      "id": "uuid-1111",
      "email": "testuser@gmail.com",
      "username": "testuser",
      "avatar_url": "/avatars/default.png",
      "created_at": "2025-10-01T10:00:00Z"
    }
  ],
  "posts": [
    {
      "id": 1,
      "user_id": "uuid-1111",
      "article_url": "https://news.example.com/a1",
      "title": "Short, Catchy Title",
      "content": "Two-to-four sentence summary suitable for the card.",
      "thumbnail_url": "/thumbs/a1.jpg",
      "view_count": 1280,
      "created_at": "2025-10-29T10:00:00Z",
      "updated_at": "2025-10-29T10:00:00Z",
      "category": "General",
      "source": "MockNews",
      "like_count": 120,
      "save_count": 45
    }
  ],
  "interactions": [
    { "id": 10, "user_id": "uuid-1111", "post_id": 1, "interaction_type": "like", "created_at": "2025-10-29T11:00:00Z" }
  ],
  "chat_styles": [
    { "id": "professor", "label": "Professor", "description": "Clear, structured explanations." },
    { "id": "debater", "label": "Debater", "description": "Point–counterpoint breakdowns." }
  ],
  "categories": ["General", "Cat 1", "Cat 2", "Cat 3", "Cat 4", "Cat 5"]
}
Please create:
	1.	Component structure implementing
AppHeader, CategoryTabs, FeedCard, EngagementBar, InfiniteScroller, StyleSelector, AIChatPanel, AuthForms (LoginForm/SignupForm/ResetPasswordForm), ProfileCard, PostComposer, RouteGuard.
	2.	Mock data matching the schema in the brief (profiles, posts, interactions, chat_styles, categories). Provide a mocks.ts file and a lightweight db.ts that mimics CRUD in memory with artificial delays (e.g., delay(400)), and syncs to localStorage.
	3.	Props & state management:
	•	optimistic like/save with unique (user_id, post_id, interaction_type) semantics; update like_count/save_count locally.
	•	category filter & infinite scroll (cursor-based over the mock list).
	•	style selection in AIChatPanel.
	4.	Routing with React Router: /, /post/:id, /saved, /profile, /login, /signup. Add a RouteGuard that checks a mock auth store.
	5.	Styling with CSS + shadcn/ui, icons with lucide-react, swipe/slide interactions with Framer Motion. Match the sketch: tabs under the header, large card with title block, left-rail reactions, and a “Swipe for AI conversation →” affordance.

Deliverables: Vite + JavaScript project, minimal tests for hooks (optional), and clear README for running the frontend.
**Result:** 
- The app seemed pretty functional in the first place, allowing for surface level interactions with the AI which was pretty surprising. It also had all of the components we were looking for in the first place.
- It was very button based, and since we are thinking of this to be more of a Reels kind of app, we want it to be more interactive with swipes and scrolls.
- AI is pretty insane.

## Round 2: Feature Implementation
**Prompt:**
Build AIChatPanel as a right-side slide-over using Framer Motion. It receives {open, onClose, post, style} and renders: header with post title, StyleSelector tiles (‘Professor’, ‘Debater’), a message list, and input box. Implement a mock responder that returns a canned reply based on style after 600ms. Support keyboard submit (Enter) and focus management. Make the chat panel scrollable so as new messages fill the chat, the text input stays in a fixed position. The user should be able to scroll through previous messages within the chat with AI.

**Result:**
- Better functionality within the chat section allowing the user to scroll through the chat.
- Not enough personas for the chat bot to take on, only professor and debator.
- We can implement more data to make the chat experience more personalized for users.

**Prompt:**
Can we make the category bar horizontally scrollable, without any buttons, separated by sections that look like | category | category | ... Center the categories within each of their sections and widen the sections so that 5 categories fill the width of the page. Add categories 6, 7, 8, 9, 10 so the user can scroll through the sections. At default, the general category should be selected and centered such that the user can scroll left and right an equal distance.

**Result:**
- The category spacing was pretty good.
- Extra categories weren't added, so we couldn't test the scroll functionality.
- We might need to get something from shadcn or another library to implement this component properly.

**Prompt:**
Apply our brand style:
- Colors: 006613 (Primary), 478978, 1C2541, AB81CD, A2AA9D
- Style: Premium, classy, educational, professional
- Add serif fonts

Add hover effects, transitions, and micro-interactions

Make it responsive for mobile and desktop

**Result:**


## Best Practices Discovered
- [Things that made prompts more effective]
- [Patterns that worked well]