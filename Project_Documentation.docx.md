# OmerGPT Web Application - BCA Final Semester VI Project Documentation

Submitted by:  
Name: Mohammed Omer  
Course: BCA SEM VI  
College: St. Paul Degree & PG College

## 1. INTRODUCTION

### 1.1 Introduction

The OmerGPT Web Application is a modern, full-stack web application that provides users with an intuitive interface to interact with OpenAI's ChatGPT model. This project demonstrates the implementation of contemporary web technologies and best practices in software development.

The application features a Vue.js-based frontend with a clean, responsive user interface, backed by an Express.js server that handles API requests and authentication. It incorporates features such as real-time chat interactions, user authentication, conversation history management, and theme customization.

#### 1.1.1 Dual Model Support

The application supports two distinct methods for interacting with ChatGPT:

1. **ChatGPT API (gpt-3.5-turbo-0301)**
   - Paid service requiring OpenAI API Key
   - High reliability and stability
   - Consistent but relatively basic responses
   - Direct integration with OpenAI's official API

2. **ChatGPT Unofficial Proxy API (Web AccessToken)**
   - Free to use
   - Moderate reliability (dependent on third-party servers)
   - More advanced and contextually aware responses
   - Uses unofficial proxy to access ChatGPT's backend API

#### 1.1.2 Implementation Considerations

**API Selection Guidelines:**
- The OpenAI API method is recommended as the primary choice
- For users in regions with restricted access, a proper proxy setup is required
- Public proxies should be avoided for security reasons

**Security Considerations:**
- When using the accessToken method, be aware that tokens are exposed to third-party proxies
- For public deployments, implement access control using AUTH_SECRET_KEY
- Modify the index.html title to prevent unwanted keyword searches

**Configuration:**
- Environment setup is managed through service/.env file
- OPENAI_API_KEY takes precedence when both API methods are configured
- Proxy settings can be customized for different network environments

[Insert diagram of System Overview - High Level Architecture]

### 1.2 Objective

The primary objectives of this project are:

1. To create a user-friendly web interface for interacting with OmerGPT
2. To implement secure user authentication and session management
3. To provide a responsive and modern user interface
4. To ensure efficient handling of API requests and responses
5. To maintain conversation history and user preferences
6. To support multiple languages and themes

## 2. SOFTWARE REQUIREMENT SPECIFICATION

### 2.1 Requirement Analysis

The project requirements were analyzed based on:
- User needs for a seamless chat interface
- Security requirements for handling user data
- Performance requirements for real-time communication
- Scalability needs for handling multiple concurrent users
- Integration requirements with OpenAI's API

### 2.2 Problem Statement

The project addresses the following challenges:
1. Creating an accessible interface for AI interaction
2. Ensuring secure and efficient API communication
3. Managing user sessions and authentication
4. Handling real-time chat functionality
5. Providing a responsive and intuitive user experience

### 2.3 Functional Requirements

1. User Authentication
   - User registration
   - User login/logout
   - Session management

2. Chat Interface
   - Real-time message sending and receiving
   - Conversation history management
   - Message formatting and rendering

3. User Preferences
   - Theme customization
   - Language selection
   - Chat settings management

4. API Integration
   - OpenAI API integration
   - Error handling
   - Rate limiting

### 2.4 Software Requirement Specification

#### 2.4.1 Purpose

The purpose of this software is to provide a web-based interface for users to interact with ChatGPT, offering features like conversation management, user authentication, and customization options.

#### 2.4.2 Technologies Used

1. Frontend:
   - Vue.js 3
   - Vite
   - TypeScript
   - Tailwind CSS
   - Pinia (State Management)

2. Backend:
   - Node.js
   - Express.js
   - TypeScript
   - PostgreSQL

3. Development Tools:
   - Git
   - ESLint
   - Prettier
   - Husky

### 2.5 Software Requirements

- Node.js (v16 or higher)
- npm or pnpm package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git version control
- Code editor (VS Code recommended)
- PostgreSQL database

### 2.6 Hardware Requirements

- Processor: Intel Core i3 or equivalent (minimum)
- RAM: 4GB (minimum), 8GB (recommended)
- Storage: 1GB free space
- Internet connection: Broadband (minimum 1Mbps)

## 3. ANALYSIS & DESIGN

### 3.1 Introduction

#### 3.1.1 Purpose

##### 3.1.1.1 Document Purpose

This document provides a comprehensive overview of the system architecture, design decisions, and implementation details of the ChatGPT Web Application.

##### 3.1.1.2 Project Purpose

The project aims to create a professional-grade web application that demonstrates modern web development practices while providing practical utility through AI interaction.

#### 3.1.2 Scope

##### 3.1.2.1 Document Scope

This documentation covers:
- System architecture and design
- Implementation details
- Testing procedures
- Deployment processes
- User interface design

### 3.2 System Overview

[Insert diagram of System Components and Their Interactions]

The system consists of:
1. Frontend Vue.js application
2. Backend Express.js server
3. PostgreSQL database
4. OpenAI API integration

#### 3.2.1 Development Tools

1. Version Control:
   - Git for source code management
   - GitHub for repository hosting

2. Development Environment:
   - VS Code with extensions
   - ESLint for code linting
   - Prettier for code formatting

3. Build Tools:
   - Vite for frontend building
   - tsup for backend compilation

### 3.3 System Architecture

#### 3.3.1 Architectural Design

[Insert diagram of Detailed System Architecture]

The application follows a modern client-server architecture with:

1. Frontend Layer:
   - Vue.js components
   - Pinia state management
   - Vue Router
   - API service layer

2. Backend Layer:
   - Express.js server
   - Authentication middleware
   - API routes
   - Database access layer

3. Database Layer:
   - PostgreSQL tables
   - Data models
   - Migrations

#### Web Components

Key frontend components include:
1. Chat interface
2. Authentication forms
3. Settings panel
4. Navigation components
5. Error boundaries

#### Benefits

1. Scalability
2. Maintainability
3. Security
4. Performance
5. User Experience

## 4. MODELING

### 4.1 Design

#### 4.1.1 Use Case Diagram

[Insert diagram of Use Case Diagram showing user interactions]

Key use cases:
- User registration
- User authentication
- Chat interaction
- Settings management

#### 4.1.2 Sequence Diagram

[Insert diagram of Sequence Diagram for chat interaction]

Shows the flow of:
- User authentication
- Message sending
- API communication
- Response handling

#### 4.1.3 Activity Diagram

[Insert diagram of Activity Diagram for main application flow]

Details the flow of:
- User login process
- Chat session management
- Error handling

#### 4.1.4 Class Diagram

[Insert diagram of Class Diagram showing system components]

Shows relationships between:
- Frontend components
- Backend services
- Data models

## 5. CODE IMPLEMENTATION

### Frontend Code (Vue.js)

#### Main Application (App.vue)
```vue
// Content from src/App.vue
```

#### Router Configuration
```typescript
// Content from src/router/index.ts
```

#### State Management
```typescript
// Content from src/store/modules/
```

### Backend Code (Express.js)

#### Server Setup
```typescript
// Content from service/src/index.ts
```

#### API Routes
```typescript
// Content from service/src/routes/
```

#### Database Models
```typescript
// Content from service/src/models/
```

## 6. IMPLEMENTATION

### 6.2 Screen Captures

#### 6.2.1 Welcome Screen
[Insert screenshot of Welcome Screen]

#### 6.2.2 Login Screen
[Insert screenshot of Login Screen]

#### 6.2.3 Chat Interface
[Insert screenshot of Main Chat Interface]

#### 6.2.4 Settings Panel
[Insert screenshot of Settings Panel]

## 7. TESTING

### 7.1 Software Testing

The application underwent comprehensive testing to ensure reliability and performance.

### 7.2 Black Box Testing

Functional testing of:
- User authentication
- Chat functionality
- API integration
- Error handling

### 7.3 White Box Testing

Unit tests for:
- Frontend components
- Backend services
- Utility functions
- API endpoints

### 7.4 Performance Testing

Tested for:
- Response time
- Concurrent users
- Resource usage
- API latency

### 7.5 Load Testing

Verified system behavior under:
- High user load
- Multiple concurrent requests
- Extended usage periods

### 7.6 Manual Testing

Conducted for:
- User interface
- Navigation flow
- Error scenarios
- Cross-browser compatibility

## 8. CONCLUSIONS

The OmerGPT Web Application successfully demonstrates the implementation of modern web development technologies and practices. The project achieves its objectives of providing a user-friendly interface for AI interaction while maintaining security, performance, and scalability.

Key achievements:
1. Successful implementation of real-time chat functionality
2. Secure user authentication system
3. Responsive and intuitive user interface
4. Efficient API integration
5. Comprehensive testing coverage

The project serves as a practical example of full-stack web development and provides a foundation for future enhancements and features.