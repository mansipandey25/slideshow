# ANGLE X - AI-Powered Fitness Tracking Platform

## Overview

ANGLE X is a B2B fitness analytics platform that combines real-time AI-powered pose detection with comprehensive workout tracking and member management. The application uses TensorFlow.js to analyze exercise form through webcam input, providing instant posture feedback, rep counting, and performance metrics. It features a modern SaaS dashboard interface for trainers and gym owners to monitor member progress, manage exercise libraries, and analyze workout data through detailed analytics.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query v5** for server state management, caching, and data synchronization

**UI Component Library**
- **shadcn/ui** components built on Radix UI primitives for accessible, customizable interface elements
- **Tailwind CSS** with custom design tokens matching Linear/Notion-inspired aesthetics
- **Dark mode first** approach with light mode support via theme provider
- Custom CSS variables for colors, spacing, and elevation effects defined in `index.css`

**Design System**
- Typography: Inter for UI/body text, Space Grotesk for headings
- Color palette: Dark backgrounds (HSL 222 15% 8-16%) with electric blue primary (210 100% 60%)
- Consistent border radius (9px/6px/3px), shadow, and elevation patterns
- Modern SaaS aesthetic prioritizing clarity and data visualization

### Backend Architecture

**Server Framework**
- **Express.js** for the REST API server
- TypeScript throughout for type consistency
- Custom middleware for request logging and JSON response capture
- Error handling middleware with structured error responses

**API Design**
- RESTful endpoints under `/api/*` namespace
- Resource-based routing: `/api/members`, `/api/exercises`, `/api/sessions`
- Standard HTTP methods (GET, POST, PUT) with appropriate status codes
- Request validation using Zod schemas derived from Drizzle schema definitions

**Data Storage Strategy**
- **In-memory storage** (`MemStorage` class) for current implementation with seed data
- Interface-based storage abstraction (`IStorage`) allowing easy swap to persistent database
- Prepared for PostgreSQL migration via Drizzle ORM configuration
- UUID-based primary keys for distributed-friendly ID generation

### Database Schema (Drizzle ORM)

**Members Table**
- Core user entity tracking gym members
- Fields: id, name, email (unique), avatar URL, joinedAt timestamp, isActive flag
- Email uniqueness enforced at application and schema level

**Exercises Table**
- Exercise library with metadata for AI analysis
- Fields: id, name, description, category, difficulty level
- Performance data: caloriesPerMinute for tracking energy expenditure
- Guidance arrays: properFormTips and commonMistakes for user education

**Workout Sessions Table**
- Real-time and historical workout tracking
- Relationships: memberId and exerciseId foreign keys (not enforced in current schema)
- Time tracking: startTime, endTime, duration in seconds
- Performance metrics: reps, caloriesBurned, averagePostureAccuracy
- AI data: postureScores array storing per-frame accuracy measurements
- Status field: 'in_progress' or 'completed' for session lifecycle

**Schema Design Decisions**
- PostgreSQL dialect chosen for production scalability
- Array columns for storing variable-length data (tips, mistakes, scores)
- Real numbers for accuracy percentages and calorie calculations
- Timestamps with timezone support via defaultNow()

### AI/ML Integration

**TensorFlow.js Pose Detection**
- Client-side pose estimation using `@tensorflow-models/pose-detection`
- WebGL backend for GPU-accelerated inference
- Real-time video processing from webcam feed
- Keypoint extraction for body position analysis

**Form Analysis Pipeline**
1. Video frame capture from HTML5 video element
2. Pose detector inference on each frame
3. Keypoint position analysis for exercise-specific form validation
4. Posture accuracy scoring (0-100%) based on ideal form criteria
5. Rep counting via movement pattern detection (tracking vertical position changes)
6. Continuous score accumulation for session averaging

**Performance Optimizations**
- Animation frame loop for smooth 30-60 FPS processing
- Canvas overlay for visual pose skeleton rendering
- Ref-based state management to avoid re-renders during active detection
- Model lazy loading only when workout session starts

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL driver prepared for Neon database integration
- **drizzle-orm** & **drizzle-kit**: Type-safe ORM with schema-first migrations
- **zod**: Runtime type validation for API request/response payloads
- **connect-pg-simple**: Session store for PostgreSQL (configured but not yet used)

### AI/ML Stack
- **@tensorflow/tfjs** (v4.22): Core TensorFlow.js library for browser-based ML
- **@tensorflow/tfjs-backend-webgl**: GPU acceleration for pose detection
- **@tensorflow-models/pose-detection**: Pre-trained pose estimation models (MoveNet/BlazePose)

### UI Framework Components
- **@radix-ui/***: 20+ accessible primitive components (Dialog, Select, Dropdown, etc.)
- **react-hook-form**: Form state management with validation
- **@hookform/resolvers**: Integration between react-hook-form and Zod schemas
- **recharts**: Charting library for analytics visualizations (LineChart, BarChart)
- **date-fns**: Date manipulation and formatting utilities

### Development Tools
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundler for production server build
- **@replit/vite-plugin-***: Replit-specific development tooling (error overlay, dev banner)
- **tailwindcss** & **autoprefixer**: CSS processing and vendor prefixing

### Font Dependencies
- **Inter**: Variable font for UI elements (weights 300-900)
- **Space Grotesk**: Display font for headings (weights 400-700)
- Loaded from Google Fonts CDN

### Configuration Notes
- Database connection via `DATABASE_URL` environment variable
- Vite configured with path aliases (`@/`, `@shared/`, `@assets/`)
- TypeScript strict mode enabled with ESNext module resolution
- Build outputs: client to `dist/public`, server to `dist/index.js`
