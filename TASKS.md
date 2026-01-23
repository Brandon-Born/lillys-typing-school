# Project Tasks: Lilly's Typing School

This document serves as the central roadmap for the project. Agents should update this file as tasks are completed.

## Phase 1: Foundation & Setup
- [ ] **Project Initialization**
    - [ ] Initialize Vite + React project.
    - [ ] Install dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `zustand`, `wouter` (or `react-router`), `tailwindcss`.
    - [ ] Configure Tailwind CSS (Fonts, Colors from GDD).
    - [ ] Set up directory structure (`src/components`, `src/hooks`, `src/store`, `src/assets`).
- [ ] **State Management**
    - [ ] Create Zustand store for User Progress (Level, XP/Coins, Unlocks).
    - [ ] Create Zustand store for Settings (Audio volume, Difficulty).
    - [ ] Implement Persistence (LocalStorage sync).

## Phase 2: Core Gameplay (Typing Engine)
- [ ] **Typing Logic Hook**
    - [ ] Implement `useTypingEngine(text)` hook.
    - [ ] Handle input capture (global keydown listener).
    - [ ] Validate character correctness.
    - [ ] Track WPM and Accuracy.
    - [ ] Handle "Streak" counter.
- [ ] **Gameplay UI**
    - [ ] Create `TypingDisplay` component (Text to type, current character highlight).
    - [ ] Create `Feedback` overlays (Sparkles on correct, shake on error).
    - [ ] Create `ResultsScreen` (Score, Coins earned, "Next Level" button).

## Phase 3: The Avatar & 3D Environment
- [ ] **3D Scene Setup**
    - [ ] Create `SceneContainer` (Canvas setup, Lights, Camera).
    - [ ] Implement `RunwayScene` (The environment the model walks in).
    - [ ] Implement `DressingRoomScene` (Static view for customization).
- [ ] **Avatar System**
    - [ ] Import base model (glTF).
    - [ ] Implement customization logic (Mesh swapping for hair/clothes - or texture swapping).
    - [ ] Integrate animations (Idle, Walk, Pose, Trip/Error).
    - [ ] Connect Avatar state to Zustand store (Current outfit).

## Phase 4: Metagame & UI Flow
- [ ] **Main App Structure**
    - [ ] Implement Routing / Screen Manager (Splash -> Menu -> Game -> Results).
- [ ] **The Agency (Hub)**
    - [ ] Create Dashboard UI.
    - [ ] Create Level/Job Selector component.
- [ ] **The Mall (Shop)**
    - [ ] Create Shop UI (Grid of items).
    - [ ] Implement purchasing logic (Deduct coins, Unlock item).
- [ ] **The Dressing Room**
    - [ ] Create Customization UI (Category tabs: Hair, Top, Bottom, Shoes).
    - [ ] Implement "Equip" logic.

## Phase 5: Content & Curriculum
- [ ] **Lesson Data Structure**
    - [ ] Define JSON structure for Lessons (ID, Title, Text/Phases, Rewards).
- [ ] **Content Creation**
    - [ ] Implement Phase 1: Home Row.
    - [ ] Implement Phase 2: Top Row & Shift.
    - [ ] Implement Phase 3: Bottom Row & Symbols.
- [ ] **Audio**
    - [ ] Implement Sound Manager (BGM, SFX).
    - [ ] Add typing sounds and success queues.

## Phase 6: Polish & Deployment
- [ ] **Optimization**
    - [ ] Optimize 3D assets.
    - [ ] Implement suspend/loaders for assets.
- [ ] **PWA / Offline**
    - [ ] Configure Vite PWA plugin (optional but recommended for Chromebooks).
- [ ] **Final Testing**
    - [ ] Playtest on target device (Chromebook/Laptop).
    - [ ] Accessibility check (High contrast).
