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

**Prompt:**
Currently the pages except for the header are not responsive (they don't change width and view on mobile), fix it. Leverage tailwindcss media queries.

*Note: After discussion, we decided to use pure CSS media queries instead of Tailwind classes to maintain the existing CSS convention.*

**Result:**
- Added responsive CSS media queries to all page components in `index.css` using pure CSS (no Tailwind)
- Pages now adapt properly on mobile, tablet, and desktop viewports
- Key changes:
  - `.bf-page` and `.bf-feed-page`: Full width on mobile, constrained max-width (1100px) on desktop
  - `.bf-page--narrow`: Responsive width (full on mobile, 600px on tablet, 900px on desktop)
  - `.bf-page__title`: Smaller font size (1.5rem) on mobile, larger (2rem) on desktop
  - `.bf-counter-grid`: Single column on mobile, 2 columns on tablet, 3 columns on desktop
  - `.bf-panel__header`: Stacks vertically on mobile, horizontal on desktop
  - `.bf-auth-shell` and `.bf-auth-card`: Responsive padding and width constraints
  - `.bf-panel`: Reduced padding on mobile for better space utilization
  - `.bf-empty-state`: Reduced padding on mobile
  - `.bf-history-list` and `.bf-authored-list`: Adjusted gap spacing for mobile
- All changes maintain existing CSS class structure and naming conventions
- Breakpoints used: 640px (tablet portrait), 768px (tablet landscape/desktop), 1024px (large desktop)

**Prompt**
Take on the role of an undergraduate student in a programming class. Looking at the attached instructions and at the previously generated files attached for a React front-end for an instagram reels-esque web app that shows summarized articles with an AI assistant, show me how to implement and edit my code to create a searchbar that can be used with key words and a reading history that shows on your profile and adds a mark to the feed.

**Result**
This prompt did an effective job in taking the previously created code from past group members and making additions without causing a major change in the style or spacing of the web app. The searchbar feature was integrated seamlessly and when tested, would filter the desired article. The read history tool was slightly more difficult to put into practice, as the code generated for several of the files did not work properly and the javascript had to be edited manually in order to not error out. I also had placed one of the files into the wrong folder, which took some time to error shoot and finally realize the issue and move it.

**Prompt:**
The animation of the feed after it loads is insane, like everything stretches to the entire screen and then pops back, can we investigate?

**Result:**
- Identified that Framer Motion's `layout` prop on the `motion.section` container in `FeedPage.jsx` was causing layout animations during initial load
- The `layout` prop animates position/size changes, which was triggering when posts loaded and changed the container dimensions
- Fixed by:
  - Removed `layout` prop from `motion.section` in `FeedPage.jsx` (changed to regular `<section>`)
  - Removed unused `motion` import from `FeedPage.jsx`
  - Removed `layout` prop from `FeedCard` component's `motion.article` (kept only the initial fade-in animation)
  - Added explicit width constraints to `.bf-feed-grid` CSS to prevent stretching
- Result: Feed now loads smoothly without the stretching animation issue

**Prompt:**
Can we use react query so that we don't refetch the pages (like i hate the initial load when i press on any category)

**Result:**
- Integrated React Query (TanStack Query) to cache feed data by category
- Refactored `useFeed` hook to use `useInfiniteQuery` for paginated posts and `useQuery` for user interactions
- Each category's posts are cached separately with query keys `['posts', category]`
- When switching categories:
  - Cached data is shown immediately if available (no loading animation)
  - Data only refetches if stale (after 5 minutes) or if explicitly invalidated
- Configured QueryClient with:
  - `staleTime: 5 minutes` - data stays fresh for 5 minutes
  - `gcTime: 10 minutes` - cached data kept for 10 minutes
  - `refetchOnWindowFocus: false` - prevents unnecessary refetches
- Optimistic updates for likes/saves still work, updating both interactions cache and posts cache
- Result: Category switching is now instant when data is cached, eliminating the annoying initial load animation

## Best Practices Discovered
- Being extremely specific with the features and what you want them to do/look was more effective, especially in 
combatting the AI slop that can be generated with vibe coding.
- Attaching a reference to a previously created file in order for the AI to have a better idea of what the other 
features look like/function was helpful in making it a more efficient process.