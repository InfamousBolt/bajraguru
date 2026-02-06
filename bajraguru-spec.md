# BajraGuru E-Commerce Platform - Technical Specification

## Project Overview

**Project Name:** BajraGuru  
**Domain:** Traditional Buddhist products e-commerce  
**Target Market:** Spiritual practitioners, home decor enthusiasts, meditation practitioners  
**Product Categories:** Meditation bowls, incense, decorative statues, home decor, ritual items

---

## Design Philosophy

### Visual Identity
- **Style:** Modern editorial aesthetic inspired by Etherea skincare branding
- **Mood:** Calming, minimalistic, premium, spiritually serene
- **Differentiator:** Unlike competitors (e.g., thebuddhistshop.in) which use traditional dense e-commerce layouts, BajraGuru emphasizes whitespace, flowing curves, and editorial typography

### Color Palette
| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Sage Green | `#9DB4A0` |
| Secondary | Warm Sand/Cream | `#F5F0E8` |
| Accent | Muted Gold/Ochre | `#C9A86C` |
| Text Primary | Charcoal | `#2D2D2D` |
| Text Secondary | Warm Gray | `#6B6B6B` |
| Background | Off-White | `#FDFBF7` |
| Highlight | Soft Terracotta | `#D4A59A` |

### Typography
- **Headings:** Serif font (Playfair Display or Cormorant Garamond) - elegant, editorial feel
- **Body:** Clean sans-serif (Inter or DM Sans) - readable, modern
- **Accent/Quotes:** Light italic serif for spiritual quotes or taglines

### Design Elements
- Soft curved shapes and organic blob backgrounds (SVG)
- Generous whitespace (minimum 80px section padding)
- Subtle animations on scroll (fade-in, gentle parallax)
- Flowing wavy dividers between sections
- Product cards with soft shadows and rounded corners (16px radius)
- Hover states with gentle scale transforms (1.02-1.05)

---

## Site Architecture

### Public Pages

```
/                   → Home Page
/shop               → Shop Page (all products with filters)
/shop/:productId    → Product Detail Page
/about              → About Page
/contact            → Contact Page
/feedback           → Feedback Page
/cart               → Shopping Cart
```

### Admin Pages

```
/admin              → Admin Login Gate
/admin/dashboard    → Admin Dashboard (after auth)
/admin/products     → Product Management (CRUD)
/admin/products/new → Add New Product
/admin/products/:id → Edit Product
```

---

## Page Specifications

### 1. Home Page (`/`)

#### Hero Section
- Full-width hero with soft gradient background (cream to sage)
- Large editorial headline: "Sacred Traditions, Modern Serenity"
- Subheadline describing the shop's mission
- Floating decorative SVG shapes (organic blobs)
- CTA button: "Explore Collection" → links to `/shop`
- Optional: Subtle floating product image with soft shadow

#### Shop Introduction
- Brief poetic description of BajraGuru
- 3 value propositions with icons:
  - "Authentic Craftsmanship"
  - "Mindfully Sourced"
  - "Sacred Purpose"

#### Bestsellers Section
- Section title with decorative underline: "Our Bestsellers"
- 3-4 featured products in horizontal scroll or grid
- Product cards showing: image, name, price, "Add to Cart" button
- "View All" link to shop page

#### Testimonial/Quote Section
- Buddhist quote or customer testimonial
- Soft background with organic shape
- Elegant typography treatment

#### Newsletter Section (Optional)
- Email signup for updates
- Minimal form with single input + button

#### Footer
- Navigation links: Shop, About, Contact, Feedback
- Contact information
- Social media icons (placeholder)
- Copyright notice

---

### 2. Shop Page (`/shop`)

#### Layout
- Left sidebar (desktop) / Top filters (mobile) for filtering
- Main content area with product grid

#### Filtering System
| Filter | Type | Options |
|--------|------|---------|
| Category | Multi-select checkboxes | Decor, Meditation, Incense, Statues, Ritual Items, Edibles |
| Price Range | Range slider or preset buttons | Under $25, $25-$50, $50-$100, $100+ |
| Sort By | Dropdown | Popularity, Price: Low-High, Price: High-Low, Newest |
| Search | Text input | Search by product name |

#### Product Grid
- Responsive grid: 4 columns (desktop), 3 (tablet), 2 (mobile)
- Product card components:
  - Image carousel (if multiple images) with dot indicators
  - Product name
  - Price (with sale price styling if applicable)
  - Category tag
  - Quick "Add to Cart" button
  - Hover: slight elevation, show secondary image if available

#### Pagination or Infinite Scroll
- Load more button or pagination controls
- Show "X of Y products" count

---

### 3. Product Detail Page (`/shop/:productId`)

#### Layout
- Two-column layout (desktop): Images left, details right
- Single column (mobile): Images top, details below

#### Image Gallery
- Main large image
- Thumbnail carousel for additional images
- Click to zoom or lightbox view

#### Product Information
- Product name (large heading)
- Price (prominent)
- Category badge
- Description (rich text)
- Quantity selector
- "Add to Cart" button (prominent, primary color)
- Additional details expandable sections:
  - Product details
  - Shipping information
  - Care instructions

#### Related Products
- "You May Also Like" section
- 4 related products (same category)

---

### 4. About Page (`/about`)

#### Content Sections
- Hero with shop story headline
- Origin story (why BajraGuru was started)
- Mission and values
- Photo gallery or imagery of products/artisans (placeholder)
- Team section (optional)

#### Design
- Editorial long-form layout
- Pull quotes with decorative styling
- Full-width imagery sections

---

### 5. Contact Page (`/contact`)

#### Contact Form
Fields:
- Name (required)
- Email (required)
- Subject (dropdown: General Inquiry, Order Support, Wholesale, Other)
- Message (textarea, required)
- Submit button

#### Contact Information
- Email address
- Phone number (optional)
- Physical address (optional)
- Business hours

#### Map (Optional)
- Embedded map or decorative illustration

---

### 6. Feedback Page (`/feedback`)

#### Feedback Form
Fields:
- Name (optional)
- Email (optional)
- Rating (1-5 stars interactive)
- Experience type (dropdown: Website, Product Quality, Delivery, Customer Service)
- Feedback message (textarea, required)
- Submit button

#### Display
- Show existing feedback/testimonials (curated)
- Success message after submission

---

### 7. Cart Page (`/cart`)

#### Cart Contents
- List of cart items with:
  - Product image thumbnail
  - Product name (link to product)
  - Unit price
  - Quantity selector (with +/- buttons)
  - Line total
  - Remove button
- Empty cart state with CTA to shop

#### Cart Summary
- Subtotal
- Shipping estimate (or "Calculated at checkout")
- Total
- "Proceed to Checkout" button (can be placeholder/disabled for MVP)
- "Continue Shopping" link

---

### 8. Admin Login (`/admin`)

#### Authentication
- Simple password-based gate (not full user auth)
- Single password stored as environment variable
- Session/token stored in localStorage after successful login
- Auto-redirect to dashboard if already authenticated

#### Login Form
- Password input field
- "Enter Admin Panel" button
- Error message for incorrect password

---

### 9. Admin Dashboard (`/admin/dashboard`)

#### Overview Stats (Optional for MVP)
- Total products count
- Products by category breakdown

#### Quick Actions
- "Add New Product" button
- "View All Products" link
- "Logout" button

---

### 10. Admin Product Management (`/admin/products`)

#### Product List
- Table or card view of all products
- Columns: Image (thumbnail), Name, Category, Price, Actions
- Actions: Edit, Delete (with confirmation)
- Search/filter products
- "Add New Product" button

#### Add/Edit Product Form (`/admin/products/new` and `/admin/products/:id`)

Form Fields:
| Field | Type | Validation |
|-------|------|------------|
| Name | Text input | Required, max 100 chars |
| Description | Textarea/Rich text | Required |
| Price | Number input | Required, min 0, 2 decimal places |
| Category | Dropdown select | Required, from predefined list |
| Images | Multiple file upload | At least 1 required, max 5, accept jpg/png/webp |
| Featured | Checkbox | Boolean, for bestseller display |
| In Stock | Checkbox | Boolean, default true |

Image Upload Behavior:
- Preview images before upload
- Drag and drop support
- Reorder images (first = primary)
- Delete individual images

---

## Technical Architecture

### Tech Stack

#### Frontend
- **Framework:** React 18+ with Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS with custom configuration
- **State Management:** React Context + useReducer for cart, React Query for server state
- **Animations:** Framer Motion (optional) or CSS animations
- **Icons:** Lucide React
- **Image Handling:** React image gallery component

#### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** SQLite (for simplicity and portability) or PostgreSQL
- **ORM:** Prisma or Drizzle ORM
- **File Storage:** Local filesystem (MVP) with option to migrate to cloud storage
- **Image Processing:** Sharp (for resizing/optimization)

#### Development
- **Package Manager:** npm or pnpm
- **Linting:** ESLint + Prettier
- **Environment:** dotenv for configuration

---

### Database Schema

```sql
-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  in_stock BOOLEAN DEFAULT TRUE,
  popularity_score INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Product Images Table
CREATE TABLE product_images (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Table
CREATE TABLE feedback (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT,
  email TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  experience_type TEXT,
  message TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Categories (reference)
-- Values: 'decor', 'meditation', 'incense', 'statues', 'ritual', 'edibles'
```

---

### API Endpoints

#### Products
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/products` | List all products (with filters) | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product | Yes |
| PUT | `/api/products/:id` | Update product | Yes |
| DELETE | `/api/products/:id` | Delete product | Yes |
| POST | `/api/products/:id/images` | Upload product images | Yes |
| DELETE | `/api/products/:id/images/:imageId` | Delete product image | Yes |

**GET /api/products Query Parameters:**
- `category` - filter by category (comma-separated for multiple)
- `minPrice` - minimum price filter
- `maxPrice` - maximum price filter
- `search` - search term for name
- `sort` - sort field (`price_asc`, `price_desc`, `popularity`, `newest`)
- `featured` - boolean, filter featured products
- `page` - pagination page number
- `limit` - items per page (default 12)

#### Feedback
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/feedback` | List approved feedback | No |
| POST | `/api/feedback` | Submit feedback | No |

#### Contact
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit contact message | No |
| GET | `/api/contact` | List messages (admin) | Yes |

#### Auth
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/login` | Admin login | No |
| POST | `/api/auth/verify` | Verify token | No |

---

### Authentication Implementation

#### Admin Password Gate
```javascript
// Environment variable
ADMIN_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_here

// Login flow
1. Admin enters password
2. Server compares with ADMIN_PASSWORD env var
3. If match, generate JWT token with 24h expiry
4. Return token to client
5. Client stores in localStorage
6. Client sends token in Authorization header for protected routes
```

#### Protected Route Middleware
```javascript
// Middleware checks Authorization: Bearer <token>
// Verifies JWT signature and expiry
// Returns 401 if invalid
```

---

### File Upload Implementation

#### Image Upload Flow
1. Frontend sends images as multipart/form-data
2. Backend receives files via multer middleware
3. Sharp processes images:
   - Resize to max 1200px width
   - Create thumbnail (300px)
   - Convert to WebP for optimization
4. Save to `/uploads/products/{productId}/`
5. Store relative paths in database
6. Serve static files via Express

#### Folder Structure
```
/uploads
  /products
    /{productId}
      /original-{uuid}.webp
      /thumb-{uuid}.webp
```

---

## Frontend Component Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   └── Modal.jsx
│   ├── home/
│   │   ├── Hero.jsx
│   │   ├── ValueProps.jsx
│   │   ├── Bestsellers.jsx
│   │   ├── Testimonial.jsx
│   │   └── Newsletter.jsx
│   ├── shop/
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── FilterSidebar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SortDropdown.jsx
│   │   └── ImageCarousel.jsx
│   ├── cart/
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── QuantitySelector.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── ProductForm.jsx
│       ├── ProductTable.jsx
│       └── ImageUploader.jsx
├── pages/
│   ├── Home.jsx
│   ├── Shop.jsx
│   ├── ProductDetail.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Feedback.jsx
│   ├── Cart.jsx
│   └── admin/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── Products.jsx
│       └── ProductEdit.jsx
├── context/
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── hooks/
│   ├── useProducts.js
│   ├── useCart.js
│   └── useAuth.js
├── services/
│   └── api.js
├── utils/
│   ├── formatPrice.js
│   └── validators.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## Backend Structure

```
server/
├── src/
│   ├── routes/
│   │   ├── products.js
│   │   ├── feedback.js
│   │   ├── contact.js
│   │   └── auth.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── productsController.js
│   │   ├── feedbackController.js
│   │   ├── contactController.js
│   │   └── authController.js
│   ├── services/
│   │   └── imageService.js
│   ├── db/
│   │   ├── schema.sql
│   │   ├── seed.js
│   │   └── index.js
│   └── index.js
├── uploads/
├── .env
└── package.json
```

---

## Seed Data

### Sample Products

```javascript
const seedProducts = [
  {
    name: "Tibetan Singing Bowl - Handcrafted",
    description: "Authentic handcrafted singing bowl from Nepal. Perfect for meditation, sound healing, and creating a peaceful atmosphere. Each bowl produces unique harmonic overtones.",
    price: 89.99,
    category: "meditation",
    featured: true,
    images: ["singing-bowl-1.jpg", "singing-bowl-2.jpg"]
  },
  {
    name: "Sandalwood Incense Sticks - Premium",
    description: "Hand-rolled sandalwood incense sticks made with natural ingredients. Burns for approximately 45 minutes with a calming, woody fragrance.",
    price: 12.99,
    category: "incense",
    featured: true,
    images: ["incense-sandalwood.jpg"]
  },
  {
    name: "Buddha Statue - Meditation Pose",
    description: "Elegant Buddha statue in meditation pose. Hand-carved from resin with antique bronze finish. Height: 12 inches.",
    price: 149.99,
    category: "statues",
    featured: true,
    images: ["buddha-meditation.jpg", "buddha-meditation-2.jpg"]
  },
  {
    name: "Tibetan Prayer Flags - Large",
    description: "Traditional Tibetan prayer flags featuring sacred mantras. Set of 25 flags, each measuring 10x10 inches. Spreads blessings with the wind.",
    price: 24.99,
    category: "decor",
    featured: false,
    images: ["prayer-flags.jpg"]
  },
  {
    name: "Meditation Cushion - Zafu",
    description: "Traditional round meditation cushion filled with organic buckwheat hulls. Removable cover in sage green. Supports proper posture during meditation.",
    price: 54.99,
    category: "meditation",
    featured: false,
    images: ["zafu-cushion.jpg"]
  },
  {
    name: "Brass Butter Lamp - Traditional",
    description: "Handcrafted brass butter lamp for altar offerings. Traditional Tibetan design. Height: 4 inches.",
    price: 34.99,
    category: "ritual",
    featured: false,
    images: ["butter-lamp.jpg"]
  },
  {
    name: "White Sage Smudge Bundle",
    description: "Ethically harvested California white sage for cleansing and purification rituals. Bundle approximately 4 inches.",
    price: 8.99,
    category: "incense",
    featured: false,
    images: ["white-sage.jpg"]
  },
  {
    name: "Mala Beads - Rose Quartz",
    description: "108 rose quartz mala beads for meditation and mantra practice. Promotes love and compassion. Handknotted with silk tassel.",
    price: 39.99,
    category: "meditation",
    featured: true,
    images: ["mala-rose-quartz.jpg"]
  }
];
```

### Placeholder Images (Unsplash URLs)
Use these for development:
- Singing bowls: `https://images.unsplash.com/photo-1545558014-8692077e9b5c`
- Incense: `https://images.unsplash.com/photo-1603006905003-be475563bc59`
- Buddha statue: `https://images.unsplash.com/photo-1609619385002-f40f1df827b7`
- Prayer flags: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64`
- Meditation cushion: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b`

---

## Environment Variables

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DATABASE_URL=./database.sqlite

# Auth
ADMIN_PASSWORD=BajraGuru@Admin2024
JWT_SECRET=your-256-bit-secret-key-here

# File Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

---

## Responsive Breakpoints

```css
/* Tailwind defaults */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

---

## Performance Considerations

1. **Image Optimization**
   - Convert all images to WebP
   - Generate multiple sizes (thumbnail, medium, large)
   - Lazy load images below the fold
   - Use blur placeholder while loading

2. **Code Splitting**
   - Lazy load admin routes
   - Dynamic import for heavy components

3. **Caching**
   - Cache product list with React Query (5 min stale time)
   - Browser cache static assets

4. **SEO (Future)**
   - Meta tags per page
   - Structured data for products
   - Sitemap generation

---

## Deployment Considerations

### MVP Deployment Options
1. **Railway** - Easy full-stack deployment
2. **Render** - Free tier available
3. **DigitalOcean App Platform** - Simple setup
4. **VPS** - Full control (requires more setup)

### Production Checklist
- [ ] Set secure ADMIN_PASSWORD
- [ ] Generate strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Set up error logging

---

## Future Enhancements (Post-MVP)

1. **Payment Integration** - Stripe/Razorpay checkout
2. **User Accounts** - Customer registration, order history
3. **Order Management** - Full order lifecycle in admin
4. **Inventory Tracking** - Stock management
5. **Email Notifications** - Order confirmations, shipping updates
6. **Wishlist** - Save products for later
7. **Reviews** - Customer product reviews
8. **Analytics** - Sales dashboard, popular products
9. **Multi-language** - Hindi, Tibetan support
10. **Progressive Web App** - Offline support, installable

---

## Development Phases

### Phase 1: Foundation (Days 1-2)
- [ ] Project setup (Vite + Express)
- [ ] Database schema and migrations
- [ ] Basic API endpoints
- [ ] Authentication system

### Phase 2: Public Frontend (Days 3-5)
- [ ] Component library setup
- [ ] Home page with all sections
- [ ] Shop page with filtering
- [ ] Product detail page
- [ ] Cart functionality
- [ ] About, Contact, Feedback pages

### Phase 3: Admin Panel (Days 6-7)
- [ ] Admin login
- [ ] Product CRUD interface
- [ ] Image upload system

### Phase 4: Polish (Days 8-10)
- [ ] Animations and transitions
- [ ] Responsive testing
- [ ] Error handling
- [ ] Loading states
- [ ] Seed data and testing
- [ ] Deployment

---

## Notes for Implementation

1. **Design First**: Build components to match Etherea aesthetic before adding functionality
2. **Mobile First**: Start with mobile layout, enhance for desktop
3. **Accessibility**: Ensure proper contrast, focus states, ARIA labels
4. **Error States**: Design empty states, error messages, loading skeletons
5. **Form Validation**: Client-side validation with helpful messages
6. **Image Fallbacks**: Handle broken images gracefully

---

*Document Version: 1.0*  
*Created: February 2025*  
*Project: BajraGuru E-Commerce Platform*
