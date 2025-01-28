# Random Concept Draw

A simple web application for workshop facilitators to distribute unique concepts to participants. Each participant scans a QR code to draw their own random concept from four categories: Timor-Leste, Entrepreneurship, Youth, and Sustainability. The background color changes based on the concept category, making it easy to identify which theme each participant got.

## Features

- One-time random concept drawing per user (based on IP address)
- Persistent results across page reloads (until server restart)
- QR codes for easy access:
  - WiFi connection QR code
  - Application access QR code
- Color-coded concept categories:
  - Timor-Leste (Green)
  - Entrepreneurship (Blue)
  - Youth (Orange)
  - Sustainability (Yellow)
- Test mode for facilitators to try out the system
- Simple, minimalist interface

## Workshop Setup & Usage

1. **Network Setup**
   - Configure the `.env` file with your WiFi network details
   - Start the server (see Running the Application below)
   - Access `/wifi` to get the WiFi QR code
   - Have all participants scan this code to join the same network

2. **Application Access**
   - Once participants are on the network, access `/qr` to get the application QR code
   - Share this QR code with participants
   - Each participant scans the code to access the application

3. **Concept Drawing**
   - Participants click the "DRAW A CONCEPT" button
   - They receive a unique concept with a color-coded background
   - The concept stays with them even if they reload the page
   - Each IP address can only draw once until the server restarts

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

3. Copy `.env.example` to `.env` and configure your settings:
   - Set the HOST to your computer's local IP address
   - Configure your WiFi network details

## Running the Application

Start the server:

```bash
node index.js
```

The server will:
1. Generate QR codes for WiFi and application access
2. Log the URLs for both QR codes
3. Start listening for connections

## Project Structure

```
random-concept-draw/
├── index.js          # Main server file
├── public/           # Static files
│   ├── index.html    # Main page
│   ├── test.html    # Test page
│   ├── wifi.html    # WiFi QR code page
│   ├── qr.html      # App QR code page
│   ├── styles.css   # Styles
│   └── script.js    # Client-side JavaScript
├── .env.example     # Example configuration
└── package.json     # Project dependencies
```

## Dependencies

- express - Web framework
- morgan - HTTP request logger middleware
- qrcode - QR code generation
- dotenv - Environment configuration

## Testing

Use the test page at `/test` to:
- Draw multiple concepts
- See the draw history
- Test the color-coding system
- Verify the remaining count

This is useful for facilitators to test the system before a workshop.

## Created for

MOVE Entrepreneurship Workshop | Catalpa International