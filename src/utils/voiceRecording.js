// Voice recording and speech utilities for banking chat
// Updated for Node.js 18 and react-speech-recognition compatibility

class VoiceRecording {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.isRecording = false;
    this.recognition = null;
    this.synthesis = null;
    this.supportedLanguages = [
      { code: 'en-US', name: 'English (US)' },
      { code: 'en-GB', name: 'English (UK)' },
      { code: 'zh-CN', name: 'Chinese (Mandarin)' },
      { code: 'ms-MY', name: 'Malay (Malaysia)' },
      { code: 'ta-IN', name: 'Tamil (India)' },
      { code: 'hi-IN', name: 'Hindi (India)' },
    ];
    this.currentLanguage = 'en-US';
    this.onlineStatus = navigator.onLine;
    this.init();
  }

  init() {
    // Monitor online status for better error handling
    window.addEventListener('online', () => {
      this.onlineStatus = true;
    });
    
    window.addEventListener('offline', () => {
      this.onlineStatus = false;
    });

    // Initialize Speech Recognition with better error handling
    if (this.isSpeechRecognitionSupported()) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.setupSpeechRecognition();
      } catch (error) {
        console.warn('Speech recognition initialization failed:', error);
      }
    }

    // Initialize Speech Synthesis with better compatibility
    if (this.isSpeechSynthesisSupported()) {
      this.synthesis = window.speechSynthesis;
      
      // Handle Chrome bug where voices are not loaded immediately
      if (this.synthesis.getVoices().length === 0) {
        this.synthesis.addEventListener('voiceschanged', () => {
          // Voices are now loaded
        });
      }
    }
  }

  // Better browser support detection
  isSpeechRecognitionSupported() {
    return ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }

  isSpeechSynthesisSupported() {
    return ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  }

  isMediaRecorderSupported() {
    return ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && 'MediaRecorder' in window);
  }

  setupSpeechRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = true; // Better for conversation
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
    this.recognition.lang = this.currentLanguage;

    this.recognition.onstart = () => {
      console.log('Speech recognition started');
    };

    this.recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      // Better error handling for different error types
      switch (event.error) {
        case 'network':
          console.warn('Network error in speech recognition. Check internet connection.');
          break;
        case 'not-allowed':
          console.warn('Microphone permission denied.');
          break;
        case 'no-speech':
          console.info('No speech detected.');
          break;
        default:
          console.error('Unexpected speech recognition error:', event.error);
      }
    };
  }

  // Enhanced browser support check
  getVoiceSupport() {
    return {
      recording: this.isMediaRecorderSupported(),
      speechRecognition: this.isSpeechRecognitionSupported(),
      speechSynthesis: this.isSpeechSynthesisSupported(),
      online: this.onlineStatus,
      userAgent: navigator.userAgent,
      // Additional checks for better compatibility
      webkitSpeechRecognition: 'webkitSpeechRecognition' in window,
      mozSpeechRecognition: 'mozSpeechRecognition' in window,
      msSpeechRecognition: 'msSpeechRecognition' in window,
    };
  }

  // Enhanced recording with better error handling
  async startRecording() {
    if (!this.isMediaRecorderSupported()) {
      throw new Error('Media recording is not supported in this browser');
    }

    try {
      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1, // Mono for better compatibility
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Check for supported MIME types (Node.js 18 compatibility)
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/wav',
        'audio/ogg;codecs=opus'
      ];

      let selectedMimeType = 'audio/webm';
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedMimeType
      });

      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: selectedMimeType });
        this.audioChunks = [];
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
        
        return audioBlob;
      };

      this.mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        stream.getTracks().forEach(track => track.stop());
      };

      this.mediaRecorder.start(1000); // Collect data every second
      this.isRecording = true;

      return true;
    } catch (error) {
      console.error('Error starting recording:', error);
      
      // Better error messages for different scenarios
      if (error.name === 'NotAllowedError') {
        throw new Error('Microphone permission denied. Please allow microphone access.');
      } else if (error.name === 'NotFoundError') {
        throw new Error('No microphone found. Please connect a microphone.');
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Audio recording is not supported in this browser.');
      } else {
        throw new Error(`Failed to start recording: ${error.message}`);
      }
    }
  }

  // Enhanced stop recording with Promise handling
  stopRecording() {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder && this.isRecording) {
        const timeout = setTimeout(() => {
          reject(new Error('Recording stop timeout'));
        }, 5000);

        this.mediaRecorder.onstop = () => {
          clearTimeout(timeout);
          const audioBlob = new Blob(this.audioChunks, { type: this.mediaRecorder.mimeType });
          this.audioChunks = [];
          this.isRecording = false;
          resolve(audioBlob);
        };
        
        this.mediaRecorder.onerror = (event) => {
          clearTimeout(timeout);
          this.isRecording = false;
          reject(new Error(`Recording error: ${event.error}`));
        };
        
        try {
          this.mediaRecorder.stop();
        } catch (error) {
          clearTimeout(timeout);
          this.isRecording = false;
          reject(error);
        }
      } else {
        resolve(null);
      }
    });
  }

  // Enhanced speech recognition with better integration for react-speech-recognition
  startSpeechRecognition(onResult, onError, onEnd) {
    if (!this.isSpeechRecognitionSupported()) {
      const error = new Error('Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.');
      if (onError) onError(error);
      return;
    }

    if (!this.onlineStatus) {
      const error = new Error('Speech recognition requires an internet connection.');
      if (onError) onError(error);
      return;
    }

    this.recognition.lang = this.currentLanguage;

    this.recognition.onresult = (event) => {
      try {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (onResult) {
          onResult({
            final: finalTranscript,
            interim: interimTranscript,
            confidence: event.results[0]?.[0]?.confidence || 0,
            timestamp: Date.now()
          });
        }
      } catch (error) {
        console.error('Error processing speech result:', error);
        if (onError) onError(error);
      }
    };

    this.recognition.onerror = (event) => {
      const error = new Error(`Speech recognition error: ${event.error}`);
      console.error('Speech recognition error:', event);
      if (onError) onError(error);
    };

    this.recognition.onend = () => {
      if (onEnd) onEnd();
    };

    try {
      this.recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      if (onError) onError(error);
    }
  }

  // Enhanced stop speech recognition
  stopSpeechRecognition() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  }

  // Enhanced text to speech with better error handling
  speak(text, options = {}) {
    if (!this.isSpeechSynthesisSupported()) {
      console.error('Speech synthesis not supported');
      return Promise.reject(new Error('Speech synthesis not supported in this browser'));
    }

    return new Promise((resolve, reject) => {
      try {
        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set language based on current language
        utterance.lang = this.currentLanguage;
        
        // Set voice options with defaults
        utterance.rate = options.rate || 0.9; // Slightly slower for banking clarity
        utterance.pitch = options.pitch || 1.0; // Professional tone
        utterance.volume = options.volume || 1.0;

        // Find appropriate voice with better fallback
        const voices = this.synthesis.getVoices();
        let selectedVoice = null;

        // Try to find exact language match
        selectedVoice = voices.find(voice => voice.lang === this.currentLanguage);
        
        // Fallback to language family match
        if (!selectedVoice) {
          const langFamily = this.currentLanguage.split('-')[0];
          selectedVoice = voices.find(voice => voice.lang.startsWith(langFamily));
        }

        // Fallback to English
        if (!selectedVoice) {
          selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
        }

        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }

        // Set up event handlers
        utterance.onend = () => {
          resolve();
        };
        
        utterance.onerror = (event) => {
          console.error('Speech synthesis error:', event);
          reject(new Error(`Speech synthesis error: ${event.error}`));
        };

        utterance.onstart = () => {
          console.log('Speech synthesis started');
        };

        // Banking-specific optimizations
        if (options.banking) {
          utterance.rate = 0.8; // Even slower for financial information
          utterance.volume = 0.9; // Slightly lower volume for professional feel
        }

        this.synthesis.speak(utterance);
        
        // Timeout fallback for browsers that don't fire onend reliably
        setTimeout(() => {
          if (this.synthesis.speaking) {
            this.synthesis.cancel();
            resolve();
          }
        }, (text.length * 100) + 5000); // Estimate based on text length + buffer

      } catch (error) {
        console.error('Error in speak method:', error);
        reject(error);
      }
    });
  }

  // Enhanced stop speaking
  stopSpeaking() {
    if (this.synthesis) {
      try {
        this.synthesis.cancel();
      } catch (error) {
        console.error('Error stopping speech synthesis:', error);
      }
    }
  }

  // Enhanced language setting with validation
  setLanguage(languageCode) {
    const supportedCodes = this.supportedLanguages.map(lang => lang.code);
    if (!supportedCodes.includes(languageCode)) {
      console.warn(`Language ${languageCode} not in supported list, but setting anyway`);
    }
    
    this.currentLanguage = languageCode;
    if (this.recognition) {
      this.recognition.lang = languageCode;
    }
  }

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Get supported languages
  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  // Enhanced voice detection with better filtering
  getAvailableVoices() {
    if (!this.synthesis) return [];
    
    const allVoices = this.synthesis.getVoices();
    
    // Filter voices for current language with better matching
    const languageVoices = allVoices.filter(voice => {
      const voiceLang = voice.lang.toLowerCase();
      const currentLang = this.currentLanguage.toLowerCase();
      const langFamily = currentLang.split('-')[0];
      
      return voiceLang === currentLang || voiceLang.startsWith(langFamily);
    });

    // If no voices found for current language, return English voices as fallback
    if (languageVoices.length === 0) {
      return allVoices.filter(voice => voice.lang.toLowerCase().startsWith('en'));
    }

    return languageVoices;
  }

  // Enhanced audio processing with better error handling
  async audioToBase64(audioBlob) {
    return new Promise((resolve, reject) => {
      if (!audioBlob || audioBlob.size === 0) {
        reject(new Error('Invalid audio blob'));
        return;
      }

      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          const result = reader.result;
          if (typeof result === 'string') {
            const base64 = result.split(',')[1];
            resolve(base64);
          } else {
            reject(new Error('Failed to convert audio to base64'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read audio blob'));
      };
      
      reader.readAsDataURL(audioBlob);
    });
  }

  // Enhanced audio URL creation with cleanup tracking
  createAudioUrl(audioBlob) {
    if (!audioBlob) {
      throw new Error('Invalid audio blob');
    }
    return URL.createObjectURL(audioBlob);
  }

  // Enhanced cleanup
  releaseAudioUrl(url) {
    if (url) {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error releasing audio URL:', error);
      }
    }
  }

  // Enhanced banking command processing with better intent detection
  processBankingCommand(transcript) {
    const command = transcript.toLowerCase().trim();
    
    // Enhanced banking intents with more keywords
    const intents = {
      balance: ['balance', 'account balance', 'how much money', 'check balance', 'current balance', 'available funds'],
      transfer: ['transfer', 'send money', 'transfer money', 'pay', 'payment', 'wire transfer', 'bank transfer'],
      history: ['history', 'transactions', 'statement', 'recent transactions', 'transaction history', 'account statement'],
      help: ['help', 'support', 'assistance', 'customer service', 'need help', 'contact support'],
      login: ['login', 'sign in', 'authenticate', 'log me in'],
      logout: ['logout', 'sign out', 'exit', 'log me out'],
      cards: ['card', 'credit card', 'debit card', 'block card', 'activate card'],
      loans: ['loan', 'mortgage', 'personal loan', 'home loan', 'loan application'],
    };

    // Calculate confidence based on keyword matching
    let bestMatch = { intent: 'general', confidence: 0, originalText: transcript };

    for (const [intent, keywords] of Object.entries(intents)) {
      const matches = keywords.filter(keyword => command.includes(keyword));
      const confidence = matches.length / keywords.length;
      
      if (confidence > bestMatch.confidence) {
        bestMatch = {
          intent,
          confidence: Math.min(confidence + 0.2, 1.0), // Boost confidence slightly
          originalText: transcript,
          matchedKeywords: matches
        };
      }
    }

    return bestMatch;
  }

  // Enhanced speech formatting for banking context
  formatForSpeech(text) {
    return text
      // Currency formatting
      .replace(/\$(\d+)/g, '$1 dollars')
      .replace(/SGD\s*(\d+)/g, '$1 Singapore dollars')
      .replace(/USD\s*(\d+)/g, '$1 US dollars')
      .replace(/EUR\s*(\d+)/g, '$1 euros')
      .replace(/GBP\s*(\d+)/g, '$1 British pounds')
      
      // Decimal handling
      .replace(/(\d+)\.(\d{2})/g, '$1 dollars and $2 cents')
      .replace(/(\d+)\.(\d{1})/g, '$1 dollars and $2 0 cents')
      
      // Account numbers and IDs
      .replace(/\*{4}(\d{4})/g, 'ending in $1')
      .replace(/account\s+(\d+)/gi, 'account number $1')
      
      // Banking abbreviations
      .replace(/\bATM\b/g, 'A T M')
      .replace(/\bPIN\b/g, 'pin')
      .replace(/\bOTP\b/g, 'O T P')
      .replace(/\bAPI\b/g, 'A P I')
      .replace(/\bAML\b/g, 'A M L')
      .replace(/\bKYC\b/g, 'K Y C')
      
      // Add natural pauses
      .replace(/\. /g, '. ... ')
      .replace(/\? /g, '? ... ')
      .replace(/! /g, '! ... ')
      .replace(/: /g, ': ... ')
      
      // Time formats
      .replace(/(\d{1,2}):(\d{2})\s*(AM|PM)/gi, '$1 $2 $3')
      
      // Dates
      .replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g, '$2 $1 $3');
  }

  // Enhanced cleanup with better resource management
  cleanup() {
    try {
      this.stopRecording();
      this.stopSpeechRecognition();
      this.stopSpeaking();
      
      // Clear any remaining audio chunks
      this.audioChunks = [];
      
      // Reset flags
      this.isRecording = false;
      
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // New method: Get detailed browser capabilities for debugging
  getDetailedCapabilities() {
    const support = this.getVoiceSupport();
    
    return {
      ...support,
      availableVoices: this.getAvailableVoices().length,
      currentLanguage: this.currentLanguage,
      mediaRecorderSupported: this.isMediaRecorderSupported(),
      supportedMimeTypes: [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/wav',
        'audio/ogg;codecs=opus'
      ].filter(type => typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(type)),
      browserInfo: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        onLine: navigator.onLine,
      }
    };
  }
}

// Create global instance with better error handling
let voiceRecording;
try {
  voiceRecording = new VoiceRecording();
} catch (error) {
  console.error('Failed to initialize VoiceRecording:', error);
  // Create a mock object to prevent app crashes
  voiceRecording = {
    getVoiceSupport: () => ({ recording: false, speechRecognition: false, speechSynthesis: false }),
    startRecording: () => Promise.reject(new Error('Voice recording not available')),
    stopRecording: () => Promise.resolve(null),
    startSpeechRecognition: (onResult, onError) => onError(new Error('Speech recognition not available')),
    stopSpeechRecognition: () => {},
    speak: () => Promise.reject(new Error('Speech synthesis not available')),
    stopSpeaking: () => {},
    cleanup: () => {},
    setLanguage: () => {},
    getCurrentLanguage: () => 'en-US',
    getSupportedLanguages: () => [],
    getAvailableVoices: () => [],
    processBankingCommand: (text) => ({ intent: 'general', confidence: 0, originalText: text }),
    formatForSpeech: (text) => text,
    getDetailedCapabilities: () => ({ error: 'Voice recording not initialized' })
  };
}

export default voiceRecording; 