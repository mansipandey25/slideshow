# ANGLE X - Design Guidelines

## Design Approach: Modern SaaS Dashboard

**Selected Approach:** Reference-Based, drawing inspiration from Linear, Notion, and Whoop
**Justification:** B2B fitness analytics platform requiring professional data visualization with modern, clean aesthetics
**Key Principles:** Clarity over decoration, data-first hierarchy, professional trust-building

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Base: 222 15% 8%
- Surface Elevated: 222 15% 12%
- Surface Interactive: 222 15% 16%
- Border Subtle: 222 10% 20%
- Border Strong: 222 10% 30%

**Brand Colors:**
- Primary (Electric Blue): 210 100% 60%
- Primary Muted: 210 80% 50%
- Success (Performance): 142 71% 45%
- Warning (Form Alert): 38 92% 50%
- Error (Injury Risk): 0 84% 60%

**Text:**
- Primary: 0 0% 98%
- Secondary: 0 0% 70%
- Tertiary: 0 0% 50%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 222 15% 12%
- Borders: 222 10% 85%

### B. Typography

**Font Families:**
- Primary: 'Inter' (body, UI elements, data)
- Display: 'Space Grotesk' (headings, dashboard titles)

**Scale:**
- Hero/Dashboard Title: text-4xl font-bold (Space Grotesk)
- Section Headers: text-2xl font-semibold (Space Grotesk)
- Card Titles: text-lg font-semibold (Inter)
- Body Text: text-base font-normal (Inter)
- Metrics/Data: text-3xl font-bold tabular-nums (Inter)
- Captions/Labels: text-sm font-medium (Inter)
- Small Data: text-xs font-normal (Inter)

### C. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing (component internals): p-2, gap-2
- Standard spacing (between elements): p-4, gap-4, m-4
- Section spacing (cards, containers): p-6, p-8
- Major spacing (page sections): py-12, py-16

**Grid System:**
- Dashboard: 12-column grid with gap-6
- Cards: Flexible grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Data Tables: Full-width with horizontal scroll on mobile
- Sidebar: Fixed 64px collapsed, 256px expanded

### D. Component Library

**Navigation:**
- Top Bar: Fixed, h-16, with logo, gym selector, notifications, user profile
- Sidebar: Collapsible, icons + labels, active state with left border accent
- Breadcrumbs: For deep navigation in reports

**Dashboard Cards:**
- Elevated surface with rounded-lg, p-6
- Header with icon, title, and optional action button
- Content area with appropriate data visualization
- Subtle border on hover for interactive cards

**Data Visualization:**
- Real-time Pose Skeleton: Canvas-based with joint highlighting
- Progress Charts: Line charts for calorie burn, area charts for weekly trends
- Performance Metrics: Large numbers with trend indicators (↑↓)
- Heatmaps: Grid-based for attendance patterns
- Accuracy Gauges: Circular progress for posture scores

**Forms:**
- Input fields: h-10, rounded-md, dark backgrounds with lighter borders
- Labels: Above inputs, text-sm font-medium
- Validation: Inline with colored borders and helper text
- Buttons: Primary (bg-primary), Secondary (variant outline), Destructive

**Tables:**
- Striped rows for readability
- Sortable headers with arrow indicators
- Row actions on hover
- Sticky header for long tables

**Status Indicators:**
- Online/Active: Green dot with pulse animation
- Correct Posture: Success color border
- Warning/Needs Correction: Warning color border
- Injury Risk: Error color with alert icon

**Modals/Overlays:**
- Backdrop: bg-black/50 backdrop-blur-sm
- Content: max-w-2xl, rounded-lg, elevated surface
- Header with close button, scrollable body, sticky footer for actions

### E. Video/Camera Integration

**Live Camera Feed:**
- 16:9 aspect ratio container with rounded corners
- Skeleton overlay for pose detection visualization
- Real-time accuracy percentage badge (top-right)
- Recording status indicator (red dot when active)

**Workout Session View:**
- Split screen: Camera feed (left 60%) + metrics sidebar (right 40%)
- Metrics update in real-time with smooth transitions
- Exercise name and rep counter prominently displayed

## Page-Specific Layouts

**Dashboard Home:**
- KPI cards row: Active members, sessions today, avg accuracy, total calories
- Two-column: Live sessions (left) + Recent activity feed (right)
- Performance trends chart full-width
- Quick actions floating button (bottom-right)

**Gym Owner Dashboard:**
- Header with gym stats and date range selector
- Member engagement grid with attendance heatmap
- Revenue/subscription metrics cards
- Equipment utilization charts
- Member performance leaderboard

**Workout Session Page:**
- Full-screen camera view with overlay UI
- Floating controls: Start/Stop, Exercise selector, Settings
- Side panel: Rep counter, timer, form accuracy, calorie counter
- Post-workout: Summary modal with performance breakdown

## Images

**Hero/Marketing Sections:**
- Landing page hero: Full-width image showing AI pose detection in action (gym setting with skeleton overlay visualization)
- Feature showcase: Gym interior with cameras installed, demonstrating B2B setup
- Dashboard preview: Screenshot showing real metrics and live monitoring

**Dashboard Imagery:**
- Member profile avatars throughout
- Exercise demonstration thumbnails in workout library
- Empty state illustrations for "No active sessions" with encouraging graphics

## Key Interaction Patterns

- Hover states: Subtle elevation with shadow-lg transition
- Active states: Primary color accent border
- Loading states: Skeleton screens for data-heavy components
- Transitions: duration-200 ease-in-out for all interactive elements
- Notifications: Toast messages (top-right) for real-time alerts