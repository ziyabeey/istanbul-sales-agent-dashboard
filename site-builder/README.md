# Wix Competitor - Site Builder Platform

## Overview
A modern, React 18+ based site builder using Tailwind, shadcn/ui, and dnd-kit.

## Tech Stack
- **Frontend**: React 18 (Vite), TypeScript, Tailwind 3.4
- **State**: Zustand
- **DnD**: @dnd-kit/core
- **UI**: shadcn/ui (radix + tailwind)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run Development Server**
   ```bash
   npm run dev
   ```

## Structure
- `src/components/editor`: Core editor components (Canvas, Sidebar, Properties).
- `src/store`: Zustand store for editor state.
- `src/hooks`: Custom hooks.
- `src/types`: TypeScript interfaces.

## Features
- Drag and Drop components from Sidebar to Canvas.
- Recursive rendering of components.
- Property editing (Text, Styles).
