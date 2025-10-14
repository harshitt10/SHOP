# Setting Up This E-commerce Project in a New Git Repository

## Prerequisites

-   Node.js 18+ installed
-   pnpm package manager
-   Git installed

## Steps to Set Up in New Repository

### 1. Remove Existing Git History

```bash
# Remove the existing .git folder
rm -rf .git

# Initialize a new git repository
git init
```

### 2. Install Dependencies

```bash
# Install all required packages
pnpm install
```

### 3. Environment Setup

```bash
# Create a .env.local file (optional, for future environment variables)
touch .env.local
```

### 4. Development Server

```bash
# Start the development server
pnpm dev
```

### 5. Build for Production

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

### 6. Git Setup

```bash
# Add all files to git
git add .

# Create initial commit
git commit -m "Initial commit: Next.js e-commerce store"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to remote
git push -u origin main
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart page
│   ├── category/[category]/ # Category pages
│   ├── products/[slug]/   # Product detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── AddToCartButton.tsx
│   ├── CartIcon.tsx
│   ├── CartProvider.tsx
│   ├── CategoryNav.tsx
│   ├── Header.tsx
│   └── ProductCard.tsx
├── data/                  # JSON database
│   └── products.json      # Product catalog
└── lib/                   # Utility functions
    └── products.ts        # Product helper functions
```

## Features Included

-   ✅ Product catalog with JSON database
-   ✅ Multi-category navigation (clothing, electronics, home, sports)
-   ✅ Shopping cart with localStorage persistence
-   ✅ Responsive Vercel-style design
-   ✅ Product detail pages with dynamic routing
-   ✅ Cart management (add, remove, update quantities)
-   ✅ Image optimization with Next.js Image component
-   ✅ Fallback images for broken image URLs

## Deployment Options

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify

1. Build command: `pnpm build`
2. Publish directory: `.next`

### Manual Deployment

1. Run `pnpm build`
2. Upload `.next` folder to your hosting provider

## Customization

### Adding New Products

Edit `src/data/products.json` to add new products:

```json
{
	"id": 13,
	"name": "New Product",
	"price": 99.99,
	"category": "electronics",
	"image": "https://images.unsplash.com/photo-...",
	"description": "Product description",
	"slug": "new-product"
}
```

### Styling

-   Uses Tailwind CSS for styling
-   Custom styles in `src/app/globals.css`
-   Vercel-inspired design system

### Adding New Categories

1. Add products with new category in `products.json`
2. Categories are automatically detected and added to navigation

## Troubleshooting

### Build Issues

-   Ensure all dependencies are installed: `pnpm install`
-   Check for TypeScript errors: `pnpm build`
-   Verify all imports are correct

### Image Issues

-   Images are loaded from Unsplash
-   Fallback images are provided for broken URLs
-   Configure `next.config.ts` for custom image domains

### Cart Issues

-   Cart data is stored in localStorage
-   Clear browser data to reset cart
-   Cart persists across browser sessions
