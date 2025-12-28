# 🧰 ToolKit

A modern, fast, and beautiful collection of developer tools built with React, TypeScript, and TanStack Router. All tools work entirely in your browser - no data is sent to any server.

![ToolKit](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=400&fit=crop)

## ✨ Features

- 🎨 **12 Essential Developer Tools** - Everything from JSON formatting to regex testing
- 🔍 **Command Menu** - Quick access to any tool with `Cmd/Ctrl + K`
- 🌓 **Dark/Light Mode** - Beautiful themes with seamless switching
- 💾 **Persistent Favorites** - Like and favorite your most-used tools
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🔒 **Privacy First** - All processing happens locally in your browser
- 🎯 **Category Filters** - Easy navigation with organized tool categories
- ✨ **Smooth Animations** - Delightful fade-in effects and transitions

## 🛠️ Available Tools

### Formatters
- **JSON Formatter** - Format and beautify JSON data with validation
- **Text Case Converter** - Convert between uppercase, lowercase, camelCase, snake_case, kebab-case, and more

### Encoders & Decoders
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **URL Encoder** - Encode URLs for safe transmission or decode back to readable format
- **HTML Entities Encoder** - Encode/decode HTML special characters
- **JWT Decoder** - Decode and inspect JWT tokens (header, payload, expiration)

### Generators
- **UUID Generator** - Generate unique UUIDs (v4)
- **Hash Generator** - Generate SHA-1, SHA-256, and SHA-512 hashes
- **Lorem Ipsum Generator** - Generate customizable placeholder text

### Converters
- **Color Converter** - Convert between HEX, RGB, and HSL color formats
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates

### Testers
- **Regex Tester** - Test regular expressions with highlighting and match details

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) with [TanStack Router](https://tanstack.com/router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Build Tool:** [Vite](https://vite.dev/)
- **Theme:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Code Quality:** [Biome](https://biomejs.dev/)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ImLJS/toolKit.git

# Navigate to the project directory
cd toolKit

# Install dependencies
bun install
# or
npm install
# or
pnpm install
```

## 🏃‍♂️ Development

```bash
# Start the development server
bun dev

# The app will be available at http://localhost:3000
```

## 🔨 Build

```bash
# Build for production
bun run build

# Preview the production build
bun run preview
```

## 📝 Scripts

- `bun dev` - Start development server on port 3000
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint
- `bun run check` - Run Biome checks
- `bun run check:write` - Run Biome checks and apply fixes
- `bun run test` - Run tests with Vitest

## 🎯 Usage

1. **Browse Tools:** Navigate through the homepage to see all available tools
2. **Filter by Category:** Click on category badges to filter tools (Formatters, Encoders, Generators, etc.)
3. **Quick Search:** Press `Cmd/Ctrl + K` to open the command menu and search for tools
4. **Like & Favorite:** Hover over tool cards and click the heart or star icons to save your favorites
5. **Theme Toggle:** Click the theme toggle in the header to switch between dark and light mode

## 📁 Project Structure

```
toolKit/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── common/      # Shared components (command-menu, theme-toggle)
│   │   ├── features/    # Feature-specific components
│   │   │   ├── home/    # Homepage components (filters, hero, toolcard)
│   │   │   └── tools/   # Individual tool components
│   │   ├── layouts/     # Layout components (header, footer)
│   │   └── ui/          # shadcn/ui components
│   ├── constants/       # Constants and configurations
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── routes/          # TanStack Router routes
│   └── styles/          # Global styles
├── biome.json           # Biome configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tool`)
3. Commit your changes (`git commit -m 'Add some amazing tool'`)
4. Push to the branch (`git push origin feature/amazing-tool`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [TanStack](https://tanstack.com/) for the amazing routing solution
- [Unsplash](https://unsplash.com/) for the beautiful images
- All the open-source libraries that made this project possible

---

Made with ❤️ by [LJ](https://github.com/ImLJS)
