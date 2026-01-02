# Ebrahim Reyan - Professional Video Editor Portfolio

A stunning, modern 3D portfolio website built with HTML, CSS, JavaScript, and Three.js.

## Features

✨ **3D Animated Background** - Cinematic Three.js particle system with floating geometric shapes
🎨 **Tokyo Night Color Palette** - Consistent, beautiful color scheme throughout
📱 **Fully Responsive** - Perfect on desktop, tablet, and mobile devices
🎭 **Interactive 3D Elements** - Hover effects and animations on all cards and sections
🎬 **Portfolio Showcase** - Grid layout with smooth hover transitions
💼 **Services Display** - Animated service cards with 3D icons
💬 **Testimonials Carousel** - Auto-rotating 3D carousel with client reviews
📧 **Contact Form** - Validated form with smooth animations
🚀 **Performance Optimized** - Fast loading with efficient animations

## Sections

1. **Hero Section** - 3D animated background with name, title, and CTAs
2. **About Me** - Bio with 3D interactive skill cards
3. **Portfolio** - Grid of 6 video projects with hover effects
4. **Services** - 4 service cards (Video Editing, Color Grading, Motion Graphics, Sound Design)
5. **Testimonials** - 3D carousel with client reviews
6. **Contact** - Form with validation and social media links
7. **Footer** - Minimalist footer with scroll-to-top button

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS for all interactions
- **Three.js** - 3D graphics and animations
- **Font Awesome** - Icons
- **Google Fonts** - Orbitron & Inter

## How to Use

### Local Development

1. Simply open `index.html` in your web browser
2. No build process or server required!
3. For best experience, use a modern browser (Chrome, Firefox, Edge)

### Customization

#### Change Colors
Edit the CSS custom properties in `css/style.css`:
```css
:root {
    --bg-dark: #1a1b26;
    --cyan: #7dcfff;
    --blue: #7aa2f7;
    /* ... etc */
}
```

#### Update Content
Edit the HTML content in `index.html`:
- Portfolio projects
- Services descriptions
- Testimonials
- Contact information
- Social media links

#### Modify Animations
Adjust Three.js settings in `js/three-background.js`:
- Particle count
- Colors
- Animation speed
- Geometric shapes

## File Structure

```
protofolio/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styles and animations
├── js/
│   ├── main.js            # Main JavaScript logic
│   ├── three-background.js # Three.js 3D background
│   └── 3d-elements.js     # 3D interactive elements
├── assets/
│   └── images/            # Portfolio project images
│       ├── project1.jpg
│       ├── project2.jpg
│       ├── project3.jpg
│       ├── project4.jpg
│       ├── project5.jpg
│       └── project6.jpg
└── README.md              # This file
```

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Edge
- ✅ Safari
- ⚠️ IE11 (limited support)

## Performance Tips

- The 3D background uses WebGL - ensure hardware acceleration is enabled
- On mobile devices, some 3D effects are automatically simplified
- Images are optimized for web display

## Credits

**Design & Development:** Created with modern web technologies
**Color Palette:** Tokyo Night theme
**Fonts:** Orbitron (headings), Inter (body text)
**Icons:** Font Awesome 6.5.1

## License

Free to use and customize for personal and commercial projects.

---

**Contact:** ebrahim.reyan@videoedit.pro
**Created:** 2024
