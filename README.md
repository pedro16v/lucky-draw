# Random Concept Draw

A simple web application for workshops that allows participants to draw random concepts across different categories: Timor-Leste, Entrepreneurship, Youth, and Sustainability. Each participant gets one unique concept, and the background color changes based on the concept category.

## Features

- One-time random concept drawing per user
- Persistent results across page reloads
- QR code access for easy mobile participation
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

## Environment Variables

- `PORT` - Server port (default: 3000)
- `HOST` - Server host (default: 'localhost')
- `WIFI_SSID` - WiFi network name
- `WIFI_PASSWORD` - WiFi password
- `WIFI_ENCRYPTION` - WiFi encryption type (WPA, WEP, or empty for none)

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

3. Copy `.env.example` to `.env` and configure your settings

4. Receive your unique concept
5. The background will change color based on the concept category
6. Your concept persists until the server restarts

Access the QR code at `/qr` to easily share the application with participants.

## Testing

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

Access the QR code at `/qr` to easily share the application with participants.

## Testing

Use the test page at `/test` to:
- Draw multiple concepts
- See the draw history
- Test the color-coding system
- Verify the remaining count

## Created for

MOVE Entrepreneurship Workshop | Catalpa International