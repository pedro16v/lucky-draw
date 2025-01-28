# Random Concept Draw

A simple web application for workshops that allows participants to draw random concepts across different categories: Timor-Leste, Entrepreneurship, Youth, and Sustainability. Each participant gets one unique concept, and the background color changes based on the concept category.

## Features

- One-time random concept drawing per user
- Persistent results across page reloads
- Color-coded categories:
  - Timor-Leste (Green)
  - Entrepreneurship (Blue)
  - Youth (Orange)
  - Sustainability (Yellow)
- Test mode for trying out the system
- Simple, minimalist interface

## Prerequisites

- Node.js (v12 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd random-concept-draw
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the server:

```bash
node index.js
```

The application will be available at `http://localhost:3000`

For testing purposes (unlimited draws), visit `http://localhost:3000/test`

## Project Structure

```
random-concept-draw/
├── index.js # Main server file
├── public/ # Static files
│ ├── index.html # Main page
│ ├── test.html # Test page
│ ├── styles.css # Styles
│ └── script.js # Client-side JavaScript
└── package.json # Project dependencies
```

## Dependencies

- express - Web framework
- morgan - HTTP request logger middleware

## Usage

1. Visit the main page
2. Click the "DRAW A CONCEPT" button
3. Receive your unique concept
4. The background will change color based on the concept category
5. Your concept persists until the server restarts

## Testing

Use the test page at `/test` to:
- Draw multiple concepts
- See the draw history
- Test the color-coding system
- Verify the remaining count

## Created for

MOVE Entrepreneurship Workshop | Catalpa International