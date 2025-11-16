# Community Hub Platform

A modern, Discord-inspired real-time messaging platform built with Next.js 14, TypeScript, and Tailwind CSS. Create servers, join channels, and connect with communities in a beautiful, responsive interface.

![Community Hub Platform](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)

## Features

### Core Functionality
- **Server Management**: Create and manage multiple themed communities
- **Channel Organization**: Organize conversations with text and voice channels
- **Real-time Messaging**: Instant messaging with optimistic UI updates
- **Reactions & Interactions**: Add emoji reactions to messages
- **User Mentions**: Tag other users with @mentions
- **Role System**: Admin, Moderator, and Member roles with visual badges
- **User Profiles**: Customizable profiles with avatars and status indicators
- **Online Status**: Track user presence (Online, Away, Offline)

### User Experience
- **Dark Theme**: Modern dark interface with Discord-inspired aesthetics
- **Responsive Design**: Mobile-first approach with collapsible sidebars
- **Server Discovery**: Browse and join available servers
- **Channel Categories**: Collapsible categories for better organization
- **Message Formatting**: Support for text formatting and mentions
- **Threaded Conversations**: Organized discussions within channels

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **Data Persistence**: localStorage
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd community-hub-platform
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
community-hub-platform/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ServerIcon.tsx
│   │   ├── ServerSidebar.tsx
│   │   ├── ChannelSidebar.tsx
│   │   ├── MessageList.tsx
│   │   └── MessageInput.tsx
│   ├── lib/                 # Utilities and helpers
│   │   ├── context/         # React Context providers
│   │   │   └── AppContext.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   └── useLocalStorage.ts
│   │   ├── types.ts         # TypeScript type definitions
│   │   └── utils.ts         # Helper functions
│   ├── server/              # Server and channel pages
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── channel/
│   │           └── [channelId]/
│   │               └── page.tsx
│   ├── create-server/       # Server creation flow
│   │   └── page.tsx
│   ├── profile/             # User profile page
│   │   └── page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## Key Features Explained

### Server Management
- Create unlimited servers with custom names and icons
- Each server has its own set of channels and members
- Server owners have full administrative control

### Channel Organization
- Organize channels into collapsible categories
- Support for both text and voice channels
- Custom channel descriptions and ordering

### Messaging System
- Real-time message updates using localStorage
- Optimistic UI for instant feedback
- Support for @mentions and emoji reactions
- Message editing indicators

### Role System
Three role levels with distinct permissions and visual indicators:
- **Admin** (Red badge): Full server control
- **Moderator** (Blue badge): Channel moderation
- **Member** (No badge): Standard user

### Data Persistence
All data is stored in browser localStorage:
- Users and profiles
- Servers and memberships
- Channels and categories
- Messages and reactions

Demo data is automatically initialized on first load.

## Responsive Design

The platform is fully responsive with:
- **Desktop**: Full three-column layout (servers, channels, content)
- **Tablet**: Collapsible server sidebar
- **Mobile**: Hamburger menus for both sidebars

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
```typescript
colors: {
  discord: {
    dark: "#1e1f22",
    darker: "#111214",
    gray: "#2b2d31",
    lightgray: "#313338",
    blurple: "#5865f2",
    // Add your custom colors
  },
}
```

### Adding New Features
The modular architecture makes it easy to extend:
1. Add new types in `app/lib/types.ts`
2. Extend the context in `app/lib/context/AppContext.tsx`
3. Create new components in `app/components/`
4. Add new pages in the `app/` directory

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Cloudflare Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

Potential features for future development:
- [ ] Real backend integration (Firebase, Supabase, etc.)
- [ ] File and image uploads
- [ ] Voice channel functionality
- [ ] Direct messages between users
- [ ] Server invites and join codes
- [ ] Search functionality
- [ ] Message threads
- [ ] Rich text editor
- [ ] GIF and sticker support
- [ ] Light theme toggle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by Discord's design and functionality
- Built with modern web technologies
- Icons by Lucide
- Avatars generated by [DiceBear](https://dicebear.com/)

---

**Note**: This is a demo application using localStorage for data persistence. For production use, integrate with a real backend service.
