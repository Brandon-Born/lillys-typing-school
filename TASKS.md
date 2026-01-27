# Project Tasks: Lilly's Typing School

This document serves as the central roadmap for the project. Agents should update this file as tasks are completed.

## Phase 1: Foundation & Setup
- [x] **Project Initialization**
    - [x] Initialize Vite + React project.
    - [x] Install dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `zustand`, `wouter` (or `react-router`), `tailwindcss`.
    - [x] Configure Tailwind CSS (Fonts, Colors from GDD).
    - [x] Set up directory structure (`src/components`, `src/hooks`, `src/store`, `src/assets`).
- [x] **State Management**
    - [x] Create Zustand store for User Progress (Level, XP/Coins, Unlocks).
    - [x] Create Zustand store for Settings (Audio volume, Difficulty).
    - [x] Implement Persistence (LocalStorage sync).

## Phase 2: Core Gameplay (Typing Engine)
- [x] **Typing Logic Hook**
    - [x] Implement `useTypingEngine(text)` hook.
    - [x] Handle input capture (global keydown listener).
    - [x] Validate character correctness.
    - [x] Track WPM and Accuracy.
    - [x] Handle "Streak" counter.
- [x] **Gameplay UI**
    - [x] Create `TypingDisplay` component (Text to type, current character highlight).
    - [x] Create `Feedback` overlays (Sparkles on correct, shake on error).
    - [x] Create `ResultsScreen` (Score, Coins earned, "Next Level" button).

## Phase 3: The Avatar & 3D Environment
- [x] **3D Scene Setup**
    - [x] Create `SceneContainer` (Canvas setup, Lights, Camera).
    - [x] Implement `RunwayScene` (The environment the model walks in).
    - [x] Implement `DressingRoomScene` (Static view for customization).
- [x] **Avatar System**
    - [x] Import base model (glTF).
    - [x] Implement customization logic (Mesh swapping for hair/clothes - or texture swapping).
    - [x] Integrate animations (Idle, Walk, Pose, Trip/Error).
    - [x] Connect Avatar state to Zustand store (Current outfit).

## Phase 4: Metagame & UI Flow
- [x] **Main App Structure**
    - [x] Implement Routing / Screen Manager (Splash -> Menu -> Game -> Results).
- [x] **The Agency (Hub)**
    - [x] Create Dashboard UI.
    - [x] Create Level/Job Selector component.
- [x] **The Mall (Shop)**
    - [x] Create Shop UI (Grid of items).
    - [x] Implement purchasing logic (Deduct coins, Unlock item).
- [x] **The Dressing Room**
    - [x] Create Customization UI (Category tabs: Hair, Top, Bottom, Shoes).
    - [x] Implement "Equip" logic.

## Phase 5: Content & Curriculum
- [x] **Lesson Data Structure**
    - [x] Define JSON structure for Lessons (ID, Title, Text/Phases, Rewards).
- [x] **Content Creation**
    - [x] Implement Phase 1: Home Row.
    - [x] Implement Phase 2: Top Row & Shift.
    - [x] Implement Phase 3: Bottom Row & Symbols.
- [x] **Audio**
    - [x] Implement Sound Manager (BGM, SFX).
    - [x] Add typing sounds and success queues.

## Phase 6: Asset Remediation & Completion (CRITICAL)
- [x] **Refactor Avatar System**
    - [x] Update `Avatar.jsx` to support separate meshes/textures for Top, Bottom, Shoes, Hair.
    - [x] Ensure `useGameStore` props are correctly passed to visual components.
    - [x] **Switch to BoxGeometry** to fix texture wrapping and clipping issues.
- [ ] **Missing Store Assets (Must pass Testing Protocols)**
    - [x] **Tops** (Remediated & Verified)
        - [x] `sparkle-top` (Clean front texture w/ skin match)
        - [x] `denim-jacket` (Clean front texture w/ skin match)
        - [x] `basic-tee` (Starting item - Visible & Mapped)
    - [x] **Bottoms** (Remediated & Verified)
        - [x] `neon-skirt` (Seamless neon fabric w/ skin legs)
        - [x] `leather-pants` (Seamless leather fabric)
        - [x] `jeans` (Seamless denim fabric)
    - [ ] **Shoes**
        - [ ] `boots`
        - [ ] `heels`
        - [ ] `sneakers` (Starting item)
    - [ ] **Hair**
        - [ ] `blue-hair`
        - [ ] `default-hair` (Starting item)
- [ ] **Asset Verification**
    - [ ] Audit `face.png` (Ensure it meets quality standards).
    - [ ] Audit `fabric.png` (Is this used? If generic, replace with specific item textures).
- [ ] **PWA / Offline**
    - [ ] Configure Vite PWA plugin (optional but recommended for Chromebooks).
- [ ] **Final Testing**
    - [ ] Playtest on target device (Chromebook/Laptop).
    - [ ] Accessibility check (High contrast).
