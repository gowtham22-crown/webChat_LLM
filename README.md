# Standard Chartered AI Banking Assistant

A modern, responsive web application for AI-driven banking customer engagement featuring multi-language support, voice interactions, and comprehensive banking services.

## 🌟 Features

### 🔐 Authentication
- **Mobile-based Authentication**: Secure login using mobile number and OTP verification
- **Session Management**: Persistent login with secure localStorage management
- **Modern UI**: Clean, gradient-based login interface with animations

### 💬 AI Chat Interface
- **Intelligent Conversational Engine**: Powered by advanced NLP models (GPT-4o, Claude-3.5-Sonnet)
- **Contextual Memory**: Maintains conversation context across multiple turns
- **Multi-language Support**: English, Malay, Chinese (Mandarin), Tamil, Hindi
- **Voice Interactions**: Speech-to-text and text-to-speech capabilities using `react-speech-recognition`
- **File Attachments**: Support for document uploads (images, PDFs, documents)

### 🎙️ Enhanced Voice Features
- **Real-time Speech Recognition**: Powered by `react-speech-recognition` for Node.js 18+ compatibility
- **Voice Input**: Real-time speech recognition in multiple languages with continuous listening
- **Voice Output**: Text-to-speech responses with natural pronunciation and banking-optimized settings
- **Banking Commands**: Specialized voice commands for banking operations with enhanced intent detection
- **Professional Audio**: Optimized speech settings for banking context with clear pronunciation
- **Smart Error Handling**: Comprehensive error handling for microphone permissions and network issues
- **Cross-browser Support**: Enhanced compatibility across Chrome, Edge, Safari, and Firefox

### 📱 User Interface
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Modern Aesthetics**: 2025 design trends with green/blue color scheme
- **Sidebar Navigation**: 
  - New chat creation
  - Recent conversations with search
  - Conversation history and management
- **Main Chat Area**: 
  - Interactive message interface with text-to-speech for all messages
  - Quick action buttons
  - Typing indicators and message states
  - Message actions (copy, read aloud, thumbs up/down)

### 📊 Summary & Analytics
- **Activity Summary**: 40% viewport dropdown with comprehensive filters
- **Date Filtering**: Custom date ranges and predefined periods
- **Category Filtering**: Filter by transaction types and banking activities
- **Performance Metrics**: Real-time tracking of user interactions
- **Visual Reports**: Charts and statistics for banking activities

### 🎫 Support Tickets
- **Ticket Management**: Create, view, and track support tickets
- **Status Tracking**: Real-time ticket status updates with progress indicators
- **Detailed View**: Complete ticket history with communications timeline
- **Priority Management**: High, medium, low priority classification
- **Agent Communication**: Direct messaging with assigned support agents

### 🏦 Banking-Specific Features
- **Account Balance Display**: Toggle-able balance visibility
- **Quick Actions**: 
  - Check balance
  - Transfer money
  - Reset password
  - Get support
- **Transaction History**: Comprehensive transaction tracking
- **Multi-account Support**: Handle multiple banking accounts
- **Security Features**: Enhanced security measures for banking operations

### 🌐 Technical Features
- **Performance Monitoring**: Real-time performance tracking and analytics
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Accessibility**: WCAG compliant with screen reader support
- **PWA Ready**: Progressive Web App capabilities
- **Offline Support**: Service worker integration for offline functionality
- **Node.js 18+ Compatible**: Optimized for modern Node.js environments

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.20.4 or higher (see `.nvmrc` file)
- **npm**: v8.0.0 or higher
- **Modern web browser** with ES6+ support and Web Speech API support
- **Microphone access** for voice features (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/banking-ai-chat.git
   cd banking-ai-chat
   ```

2. **Use the correct Node.js version** (if using nvm)
   ```bash
   nvm use
   # or manually install Node.js 18.20.4+
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🎯 Usage

### Authentication
1. Enter your mobile number on the login screen
2. Wait for OTP verification code
3. Enter OTP (use `123456` for demo)
4. Access the banking dashboard

### Chat Interface
1. **Text Chat**: Type messages in the input field
2. **Voice Chat**: Click the microphone icon to speak (requires microphone permission)
3. **File Upload**: Click the attachment icon to upload documents
4. **New Conversation**: Click "New chat" in the sidebar
5. **Recent Chats**: Browse and search previous conversations

### Enhanced Voice Features
1. **Enable Microphone**: Grant microphone permissions when prompted
2. **Voice Input**: 
   - Click the microphone button to start listening
   - Speak clearly in your preferred language
   - The system supports continuous listening for natural conversation
3. **Voice Commands**: Use natural language for banking operations
   - "Check my balance"
   - "Transfer money"
   - "Show transaction history"
   - "Reset my password"
   - "Help me with my account"
4. **Text-to-Speech**: Click the speaker icon on any message to hear it read aloud
5. **Language Selection**: Choose your preferred language in settings (English, Malay, Chinese, Tamil, Hindi)

### Browser Compatibility for Voice Features
- **Chrome**: Full support for speech recognition and synthesis
- **Edge**: Full support for speech recognition and synthesis
- **Safari**: Full support for speech recognition and synthesis
- **Firefox**: Limited speech synthesis support
- **Mobile**: Best support on iOS Safari and Android Chrome

### Summary & Reports
1. Click the "Summary" button in the top bar
2. Use date filters to customize the time range
3. Filter by category (Account, Transfers, Security, Support)
4. View detailed activity breakdowns and metrics

### Support Tickets
1. Click the "Ticket" button to view active tickets
2. Click on any ticket to see detailed information
3. Track progress and communicate with agents
4. Create new tickets for additional support

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **Material-UI 5**: Component library with custom theming
- **Emotion**: CSS-in-JS styling solution
- **Date-fns**: Date manipulation and formatting

### Voice & Audio (Updated)
- **react-speech-recognition**: Modern React hooks for speech recognition (Node.js 18+ compatible)
- **Web Speech API**: Native browser speech recognition and synthesis
- **MediaRecorder API**: Audio recording capabilities with enhanced MIME type support
- **Web Audio API**: Advanced audio processing

### Performance & Analytics
- **Performance Observer API**: Real-time performance monitoring
- **Web Vitals**: Core web vitals tracking
- **Custom Analytics**: Banking-specific metrics tracking

### Development Tools
- **React Scripts**: Development and build tools (Node.js 18+ compatible)
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting

## 🎨 Design System

### Color Palette
- **Primary Green**: #00C389 (Standard Chartered Green)
- **Secondary Blue**: #0078D4 (Professional Blue)
- **Background**: #F8FFFE (Light mint)
- **Text Primary**: #1A1A1A
- **Text Secondary**: #666666

### Typography
- **Font Family**: Inter, Roboto, Helvetica, Arial
- **Modern Scale**: Responsive typography with clear hierarchy
- **Banking-Appropriate**: Professional and accessible fonts

### Components
- **Cards**: Elevated design with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with proper validation states
- **Navigation**: Intuitive sidebar and top bar design

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_BASE_URL=https://api.your-backend.com
REACT_APP_ANALYTICS_ID=your-analytics-id
REACT_APP_ENVIRONMENT=development
GENERATE_SOURCEMAP=false
```

### Voice Configuration
The application automatically detects browser capabilities and adjusts voice features accordingly:

```javascript
// Voice feature detection
const voiceSupport = voiceRecording.getVoiceSupport();
console.log('Voice capabilities:', voiceSupport);

// Detailed capabilities for debugging
const capabilities = voiceRecording.getDetailedCapabilities();
console.log('Detailed voice capabilities:', capabilities);
```

### AI Model Integration
The application is designed to integrate with various AI models:
- GPT-4o for advanced conversational AI
- Whisper for speech-to-text
- Claude-3.5-Sonnet for specialized banking queries
- Custom embedding models for semantic search

## 📱 Mobile Support

The application is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Mobile-specific navigation patterns
- Optimized voice input for mobile browsers
- Progressive Web App capabilities
- Offline functionality

## 🔒 Security Features

- **Secure Authentication**: OTP-based mobile verification
- **Session Management**: Encrypted local storage
- **HTTPS Only**: Secure communication protocols
- **Input Validation**: Comprehensive input sanitization
- **Banking Compliance**: Designed for financial industry standards
- **Voice Privacy**: No voice data stored; real-time processing only

## 🌐 Browser Support

### General Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Android Chrome 90+

### Voice Feature Support
- **Chrome/Chromium**: Full speech recognition and synthesis support
- **Edge**: Full speech recognition and synthesis support
- **Safari**: Full speech recognition and synthesis support
- **Firefox**: Speech synthesis support (limited speech recognition)
- **Mobile Safari**: Full support with permission prompts
- **Android Chrome**: Full support with permission prompts

## 📋 Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   └── LoginPage.js
│   └── Dashboard/
│       ├── MainDashboard.js (Enhanced with react-speech-recognition)
│       ├── Sidebar.js
│       ├── ChatArea.js (Enhanced with text-to-speech)
│       ├── SummaryDropdown.js
│       └── TicketStatus.js
├── theme/
│   └── index.js
├── utils/
│   ├── performance.js
│   └── voiceRecording.js (Enhanced for Node.js 18+ compatibility)
├── App.js
└── index.js
```

## 🔧 Troubleshooting

### Voice Features Not Working
1. **Check browser support**: Ensure you're using a supported browser
2. **Enable microphone permissions**: Allow microphone access when prompted
3. **Check internet connection**: Speech recognition requires internet connectivity
4. **Verify HTTPS**: Speech recognition only works over HTTPS in production

### Node.js Version Issues
1. **Use Node.js 18+**: Check with `node --version`
2. **Update npm**: Use `npm install -g npm@latest`
3. **Clear cache**: Run `npm cache clean --force` if installation issues occur

### Build Issues
1. **Clear node_modules**: `rm -rf node_modules && npm install`
2. **Check Node.js version**: Ensure Node.js 18+ is installed
3. **Update dependencies**: Run `npm update` to get latest compatible versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation for common solutions

## 🚀 Future Enhancements

- **Advanced AI Models**: Integration with latest language models
- **Biometric Authentication**: Fingerprint and facial recognition
- **Enhanced Analytics**: Advanced reporting and insights
- **API Integration**: Real banking system connections
- **Multi-channel Support**: SMS, email, and social media integration
- **Personalization**: AI-driven personalized experiences
- **Voice Biometrics**: Voice-based user authentication
- **Offline Voice Processing**: Local speech processing capabilities

---

**Built with ❤️ for Standard Chartered Bank**

*This application demonstrates modern web development practices and AI integration for the banking industry, focusing on user experience, security, accessibility, and cutting-edge voice interaction capabilities.* 