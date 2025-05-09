# Skip Selection UI

### Better Information
- Added bin bag estimates to give a practical sense of skip capacity (e.g., "30-40 bin bags")
- Created an info button that shows a popup with the skip's exact measurements
- Made warning messages about road placement and waste types more noticeable

### Easier Selection
- Added a footer that shows your selected skip and stays visible while scrolling
- Made selected items clearly stand out with blue highlighting
- Built a layout that works well on both mobile and desktop screens

### New Info Popup
- Designed with a simple layout showing the skip's key measurements
- Used clear labels and spacing to make dimensions easy to read
- Made it smooth to open and close
- Added the ability to close it with the Escape key

## How I Built It

I used React with Tailwind CSS for the design. The code is organized with:
- Simple data loading through custom hooks
- Helper functions for calculating prices and handling images
- Components that can be easily reused and maintained

## Project Structure

```
src/
├── features/
│   └── skips/
│       └── components/
│           ├── SkipCard.js         # Individual skip option card
│           ├── SkipInfoModal.js    # Popup showing detailed measurements
│           └── SelectedSkipBar.js  # Footer showing selected skip
├── hooks/
│   └── useSkipData.js              # Data loading logic
├── pages/
│   └── SkipSelectionPage.js        # Main page component
├── utils/
│   ├── skipDimensions.js           # Skip size specifications
│   └── skipHelpers.js              # Helper functions for calculations
├── styles/
│   └── App.css                     # Global styles
└── App.js                          # Application entry point
```

The project follows a feature-based structure where related components are grouped together. Shared utilities and hooks are separated for reusability.

