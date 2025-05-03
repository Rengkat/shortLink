# ShortLink - URL Shortener Service

## Overview
A full-stack URL shortening service that allows users to:
- Create short URLs from long URLs
- Redirect to original URLs via short links
- View URL statistics and analytics
- Search through created URLs

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: In-memory storage (for development)
- **Testing**: Jest, Supertest, React Testing Library

## Features
### Core Functionality
- URL encoding/decoding
- URL redirection
- Visit tracking
- Creation timestamps

### Additional Features
- Search functionality (minimum 3 characters)
- Statistics dashboard
- API endpoints for programmatic access
- Responsive web interface

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rengkat/shortlink.git
   cd shortlink

### Backend Setup
```bash
cd server
npm install
npm start
```
Server runs on 
- http://localhost:5000
- API endpoints available at http://localhost:5000/api

### Testing: Server
```bash
cd server
npm test
```
### Server Test Coverage Report:
```bash
cd server
npm run test:coverage
```
### Frontend Setup
```bash
cd Client
npm install
npm run dev
```
### Testing: Frontend
```bash
cd server
npm test
```
