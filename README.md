# NeuroMatch - AI-Powered Mindprint Matching

A privacy-first React application that uses AI to analyze cognitive patterns and connect compatible minds through personality-based matching.

## Overview

NeuroMatch goes beyond surface-level compatibility by analyzing users' cognitive signatures through a comprehensive mindprint quiz. The app creates anonymous profiles and matches users based on thought patterns, decision-making styles, and emotional intelligence.

## Features

- **AI Mindprint Analysis**: Comprehensive personality assessment using cognitive pattern recognition
- **Privacy-First Design**: Anonymous profiles with pseudonyms and avatar-based identity
- **Smart Matching**: AI-powered compatibility scoring based on cognitive complementarity
- **Real-time Chat**: Secure messaging with AI conversation starters
- **Daily Check-ins**: Micro-assessments to refine mindprint accuracy
- **Responsive Design**: Mobile-first UI with smooth animations and transitions

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Charts**: Recharts for radar visualizations
- **Forms**: React Hook Form with validation
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Query for server state

## Quick Start

### Prerequisites

- Node.js 18+ or Bun
- VS Code (recommended) or any modern IDE

### Installation

1. **Install dependencies**
   ```bash
   npm install
   # or for faster builds
   bun install
   ```

2. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

3. **Open your browser**
   ```
   http://localhost:8080
   ```

### VS Code Setup (Recommended)

For the best development experience:

1. **Install recommended extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Hero
   - Auto Rename Tag

2. **Configure TypeScript:**
   - Ensure TypeScript is set to workspace version
   - Use `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server" if issues occur

3. **Troubleshooting common VS Code issues:**
   - If imports aren't resolving: Check that `@` alias is working
   - If Tailwind classes aren't autocompleting: Restart Tailwind CSS IntelliSense
   - If the app won't start: Clear node_modules and reinstall dependencies

## Project Structure

```
src/
├── components/ui/        # Reusable UI components (buttons, cards, forms)
├── pages/               # Route-based page components
│   ├── Index.tsx        # Landing page
│   ├── Signup.tsx       # User onboarding
│   ├── Quiz.tsx         # Mindprint assessment
│   ├── Processing.tsx   # AI analysis loading
│   ├── Profile.tsx      # User profile dashboard
│   ├── Matches.tsx      # Compatible user discovery
│   ├── Chat.tsx         # Messaging interface
│   ├── Daily.tsx        # Daily micro-assessments
│   └── Settings.tsx     # Privacy and account settings
├── mock/                # Mock API data for development
│   ├── quizQuestions.json
│   ├── exampleProfile.json
│   └── matches.json
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint code analysis

## Design System

The app uses a comprehensive design system built on Tailwind CSS:

### Colors
- **Primary Gradient**: Purple to blue (`hsl(267 85% 65%)` to `hsl(254 80% 55%)`) 
- **Calm Pastels**: Soft green, coral, and lavender accents
- **Semantic Tokens**: All colors use HSL CSS variables for consistency

### Components
- **Buttons**: Multiple variants (gradient, soft, outline) with hover effects
- **Cards**: Glass morphism effects with soft shadows
- **Forms**: Accessible inputs with focus states
- **Animations**: Smooth transitions using Framer Motion

## Mock API Integration

Currently uses local JSON files for data simulation:

### Endpoints Simulated
- `POST /api/signup` - User registration
- `POST /api/quiz/submit` - Mindprint analysis
- `GET /api/profile/:id` - User profile data
- `GET /api/matches/:id` - Compatible user discovery
- `POST /api/chat/create` - Chat room creation
- `GET /api/chat/:id/messages` - Message history
- `POST /api/daily/:id` - Daily check-in submission

## Replacing Mock API with Real Backend

To integrate with a real backend:

1. **Update API calls in components**
   ```typescript
   // Replace localStorage calls with fetch/axios
   const response = await fetch('/api/signup', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(userData)
   });
   ```

2. **Implement authentication**
   ```typescript
   // Add JWT token handling
   const token = localStorage.getItem('authToken');
   headers: { 
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json' 
   }
   ```

3. **Add error handling**
   ```typescript
   try {
     const data = await response.json();
     if (!response.ok) throw new Error(data.message);
     return data;
   } catch (error) {
     console.error('API Error:', error);
     // Show user-friendly error message
   }
   ```

## Future Backend Integration Notes

### AI Embeddings & Vector Database
The mindprint matching algorithm will benefit from:

- **Vector Embeddings**: Convert quiz responses to high-dimensional vectors
- **Similarity Search**: Use cosine similarity for compatibility scoring
- **Recommended Stack**: 
  - OpenAI Embeddings API for vector generation
  - Pinecone or Weaviate for vector storage and search
  - PostgreSQL with pgvector extension as alternative

### Example Integration:
```typescript
// Convert quiz responses to embeddings
const embedding = await openai.embeddings.create({
  model: "text-embedding-ada-002",
  input: quizResponseText
});

// Store in vector database
await vectorDB.upsert({
  id: userId,
  values: embedding.data[0].embedding,
  metadata: { traits, preferences }
});

// Find similar users
const matches = await vectorDB.query({
  vector: userEmbedding,
  topK: 10,
  includeMetadata: true
});
```

## Privacy & Security Considerations

- **Data Minimization**: Only collect necessary cognitive pattern data
- **Pseudonymous Design**: No real names or identifying information stored
- **Encryption**: All data transmission should use HTTPS/WSS
- **User Control**: Easy data export and account deletion
- **Compliance**: Design supports GDPR and privacy regulation compliance

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make changes and test thoroughly
4. Commit changes: `git commit -am 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support:
- Create an issue in the GitHub repository
- Review the code documentation in component files
- Check the mock data structure in `/src/mock/` for API integration examples