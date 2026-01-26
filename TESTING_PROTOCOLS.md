# Testing Protocols & Asset Standards

## 🎯 Objective
To ensure every visual asset (clothing, hair, accessories) added to Lilly's Typing School is high-quality, consistent, and fully verified in the actual game environment before being marked as done.

## 🎨 Asset Generation Guidelines

### The "No Transparency" Constraints
When using LLMs (like DALL-E) to generate textures or sprites:
1.  **Transparency is unreliable**: LLMs often fail to produce true alpha-channel transparency.
2.  **Skin Tone Matching**: If a generated clothing item (e.g., a short-sleeve shirt) has a background where skin should be, you **MUST** match the background color to the Avatar's skin tone.
    *   **Avatar Skin Hex**: `#ffccaa`
    *   **Action**: Explicitly include this hex code or "warm peach skin tone" in your generation prompts to ensure the non-transparent parts blend seamlessly with the base mesh.
3.  **Style Consistency**: All assets must align with the "doodle/cartoon" aesthetic defined in the Game Design Document.

## 🧪 Rigorous Testing Procedure

Every time you add or modify an asset, you must follow this procedure **exactly**:

### 1. Static Validation
*   [ ] **File Location**: Assets must be placed in `public/assets/`.
*   [ ] **Naming Convention**: Use kebab-case (e.g., `sparkle-top.png`, `blue-hair.png`).
*   [ ] **File Size**: Images should be optimized (< 500KB per texture).

### 2. Implementation Verification
*   [ ] **Code Reference**: Verify the item in `src/data/items.js` correctly references the new asset file path (e.g., `texture: '/assets/sparkle-top.png'`).
*   [ ] **Component Logic**: Ensure the `Avatar` or relevant 3D component is updated to actually *render* this specific category of item. (e.g., if adding a hat, does the Avatar have a mount point for hats?)

### 3. In-Browser Visual Audit (MANDATORY)
*   **Step 1**: Start the dev server (`npm run dev`).
*   **Step 2**: Open the *Browser Tool* and navigate to the app.
*   **Step 3**: Go to the **Mall** or **Dressing Room**.
*   **Step 4**: **Equip the Item**. Do not just assume it works. You must see it on the character.
*   **Step 5**: Check for:
    *   **Clipping**: Does the item cut through the body?
    *   **Seams**: mismatched skin tones at the edges?
    *   **Scale**: Is it too big/small?
    *   **Orientation**: Is it facing the wrong way?
*   [ ] **Pass/Fail**: Only mark the task complete if visually perfect.

## 🚨 Troubleshooting
*   **"White Box" artifacts**: The image lacks transparency. -> Regenerate with skin-tone background or edit to add alpha channel.
*   **Texture Stretching**: The UV mapping on the 3D primitive (Cone/Sphere) conflicts with the image. -> Adjust `repeat` or `offset` in the material, or adjust the image aspect ratio.

---
**Copy this checklist into your task summary when working on assets.**
