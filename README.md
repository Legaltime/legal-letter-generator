# Legal Letter Generator

A comprehensive web application for generating legally robust letters for UK Litigants in Person (LiPs). This project aims to assist individuals in creating professional legal correspondence while ensuring compliance with UK legal standards and protocols.

## Features

- Interactive form-based letter generation
- Support for multiple pre-action protocols
- Dynamic templates based on claim types
- Real-time validation and error checking
- Professional formatting and layout
- Clipboard integration for easy copying

## Technology Stack

- Frontend: React.js with Tailwind CSS
- Backend: Node.js with Express
- API Integration: OpenAI GPT for intelligent letter generation
- Form Validation: Joi
- UI Components: shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Legaltime/legal-letter-generator.git
   cd legal-letter-generator
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   npm install
   ```

4. Configure environment variables:
   Create a `.env` file in the backend directory with:
   ```
   PORT=3001
   OPENAI_API_KEY=your_api_key_here
   ```

5. Start the development servers:
   ```bash
   # In the backend directory
   npm run dev

   # In the frontend directory (new terminal)
   npm start
   ```

## Usage

1. Fill in the required personal and recipient details
2. Select applicable pre-action protocols
3. Provide claim-specific information
4. Review and submit the form
5. Copy the generated letter to clipboard

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built to support UK Litigants in Person
- Inspired by the need for accessible legal document generation
- Uses best practices from UK legal protocols