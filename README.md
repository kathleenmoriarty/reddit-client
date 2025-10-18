# Diet Reddit

A lightweight Reddit client app built with React and Redux, allowing users to browse popular subreddits, search for posts, and view post details including comments.

---

## Wireframes

Below are rough wireframes outlining the main UI components of the app:

### 1. Login Screen
### 2. Main Dashboard
### 3. Post Detail / Comments View (toggle-able)

---

## Technologies Used

- **React** – Frontend UI library for building components
- **Redux & Redux Toolkit** – State management
- **React Redux** – Connecting React components to Redux
- **React Hooks** – Functional component state & effects
- **FontAwesome** – Icons for UI elements (likes, comments, share)
- **CSS Modules** – Scoped styles
- **Reddit OAuth API** – Authentication and data fetching
- **Fetch API** – HTTP requests to Reddit endpoints
- **Vite** – Build tool for faster development

---

## Features

- **OAuth Authentication** with Reddit for secure access to Reddit’s API.
- **Popular Subreddits List** dynamically fetched from Reddit’s API.
- **Search functionality** to find posts from any subreddit by name.
- **Post Cards** showing author, title, timestamp, score, and images when available.
- **Toggle Comments** on each post to view discussion threads.
- **Responsive UI** with intuitive navigation.
- **Share Button** for posts (UI only, no integration yet).
- **Likes and Dislikes Buttons** (UI only, no backend interaction).

---

## Future Work

- **Add Pagination / Infinite Scrolling** for browsing more posts.
- **Post Voting Integration** with Reddit API to allow upvotes/downvotes.
- **Improved Commenting UI** with nested replies and better formatting.
- **Share Functionality** integration to share posts via social media or link copying.
- **User Profile and Subscriptions** management to follow favorite subreddits.
- **Dark Mode** for better accessibility and user preference.
- **Caching & Offline Support** to improve performance.
- **Error Handling & Loading States** enhancements.
- **Unit & Integration Tests** for better code reliability.
- **Better Mobile Responsiveness** and UI polish.

---

## Getting Started

1. Clone this repo:  
   ```bash
   git clone https://github.com/yourusername/diet-reddit.git
   cd diet-reddit
   ```

2. Install dependencies
    ```
    npm install
    ```

3. Setup your .env with Reddit API credentials:
    ```
    VITE_REDDIT_CLIENT_ID=your_client_id
    VITE_REDDIT_REDIRECT_URI=http://localhost:3000
    VITE_REDDIT_SCOPES=read identity
    VITE_REDDIT_STATE=random_string
    ```
4. Run the development server: 
    ```
    npm run dev
    ```

5. Open http://localhost:3000 in your browser.

---

## License

MIT License @ Kathleen Moriarty

Thanks for checking out Diet Reddit! Feel free to contribute or open issues for improvements.



