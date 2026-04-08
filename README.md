# 📅 Wall Calendar

A highly aesthetic, interactive wall calendar designed to mimic the tactile feel of physical prints. Built heavily with **React**, **TypeScript**, and bleeding edge **Tailwind CSS v4**, this application marries physical geometry styling with digital convenience.

**Live Demo:** [https://calendar-tau-ruby.vercel.app/](https://calendar-tau-ruby.vercel.app/)

## ✨ Core Features
* **Physical Wall Calendar Aesthetics:** Clean geometry layering leveraging custom SVG vectors and responsive CSS cuts mimicking high-end neo-brutal physical calendar prints.
* **Authentic 3D Flip Animations:** Custom CSS keyframe mechanics (`rotateX(90deg)`) pivoting on the top origin axis to flawlessly mirror physically flipping a page over a top-mounted binding spiral.
* **Integrated Notes Engine:** A responsive localized note-taking system styled as lined-paper. Users can drop precise text memos directly mapped to specific active dates.
* **Dynamic Mobile Engine:** Intelligent responsive constraints that automatically convert the notes utility into a highly intuitive sliding bottom-sheet when interacting on narrow constraints (e.g. mobile Safari).
* **System/Manual Dual Theming:** Full support for dark elements via an implemented system tracker. Leveraging Tailwind's v4 `@custom-variant dark` utility, typography and UI nodes dynamically shift from pure Neo-white layouts to deep Space-slate dark themes instantly.
* **Optimized Date Matrix:** Utilizes modular `date-fns` integrations to manage days iteratively without timezone overhead constraints.

## 🚀 Quick Start

Ensure you have a standard Node JS runtime environment available:

```bash
# 1. Install local dependencies  
npm install  

# 2. Start the Vite-powered local hot-development server
npm run dev

# 3. Build optimized assets for production environment
npm run build
```

## 🛠 Technology Stack
- **Framework:** React + Vite
- **Language:** TypeScript 
- **Design System Processing:** Tailwind CSS v4 (Powered by `@tailwindcss/postcss`)
- **Icons:** `lucide-react`
- **Date Logic:** `date-fns`
