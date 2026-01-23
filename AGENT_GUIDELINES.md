# Agent Guidelines: Lilly's Typing School

**ATTENTION ALL AGENTS:**
Before beginning any work, you MUST review the following core documents to understand the vision, architecture, and current status of the project.

## 📚 Core Documentation
1.  **[Game Design Document](./game_design_document.md)**: Contains the Vision, Style Guide, Architecture, and Mechanics. ALways align your implementation with the "Style Guide" and "Target Audience" sections here.
2.  **[Project Tasks](./TASKS.md)**: The central roadmap. Check this file to see what to pick up next and mark items as complete only when they meet the criteria below.

---

## ✅ Definition of Done
A task is **NOT** considered complete until **ALL** of the following criteria are met. Do not mark a checkbox in `TASKS.md` or close a user request until you have verified:

### 1. Build Verification
- Run `npm run build` to ensure the project compiles without errors.
- Fix all build breakages immediately.

### 2. Code Quality & Linting
- Run `npm run lint` (or equivalent) to check for static analysis errors.
- Ensure no console warnings/errors appear during execution.
- Code should be clean, commented where complex, and follow the functional React patterns defined in the GDD.

### 3. Browser Verification
- **You must verify your changes in the browser.**
- Use the **Browser Tool** to navigate to the local server (e.g., `http://localhost:5173`).
- Visually confirm that the features you built appear and function as expected.
- *Do not assume code works just because it was written. See it running.*

---

## 🛠 Workflow Best Practices
- **Update Documentation**: If you change the architecture or add a major feature, update `game_design_document.md`.
- **Update Tasks**: Keep `TASKS.md` current.
- **Fail Fast**: If a library isn't working or the 3D assets are too heavy, pivot quickly and inform the user.
