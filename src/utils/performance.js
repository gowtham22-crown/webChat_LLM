// Performance monitoring utilities for banking application

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.observers = [];
    this.init();
  }

  init() {
    // Monitor page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        this.measurePageLoad();
      });

      // Monitor navigation timing
      this.observeNavigation();
      
      // Monitor resource loading
      this.observeResources();
      
      // Monitor paint timing
      this.observePaintTiming();
    }
  }

  measurePageLoad() {
    const perfData = performance.getEntriesByType('navigation')[0];
    if (perfData) {
      this.metrics.pageLoad = {
        dns: perfData.domainLookupEnd - perfData.domainLookupStart,
        tcp: perfData.connectEnd - perfData.connectStart,
        ttfb: perfData.responseStart - perfData.requestStart,
        domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        windowLoad: perfData.loadEventEnd - perfData.navigationStart,
        timestamp: Date.now()
      };
      
      this.reportMetric('pageLoad', this.metrics.pageLoad);
    }
  }

  observeNavigation() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            this.metrics.navigation = {
              type: entry.type,
              redirectCount: entry.redirectCount,
              transferSize: entry.transferSize,
              timestamp: Date.now()
            };
            
            this.reportMetric('navigation', this.metrics.navigation);
          }
        }
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  observeResources() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            // Track important resources (images, scripts, API calls)
            if (this.isImportantResource(entry.name)) {
              this.metrics.resources = this.metrics.resources || [];
              this.metrics.resources.push({
                name: entry.name,
                duration: entry.duration,
                transferSize: entry.transferSize,
                timestamp: Date.now()
              });
              
              this.reportMetric('resource', {
                name: entry.name,
                duration: entry.duration
              });
            }
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  observePaintTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.metrics.paint = this.metrics.paint || {};
            this.metrics.paint[entry.name] = {
              startTime: entry.startTime,
              timestamp: Date.now()
            };
            
            this.reportMetric('paint', {
              type: entry.name,
              startTime: entry.startTime
            });
          }
        }
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  isImportantResource(url) {
    const importantPatterns = [
      '/api/',
      '.js',
      '.css',
      'fonts',
      'avatar',
      'logo'
    ];
    
    return importantPatterns.some(pattern => url.includes(pattern));
  }

  // Track user interactions
  trackUserAction(action, details = {}) {
    const metric = {
      action,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    this.metrics.userActions = this.metrics.userActions || [];
    this.metrics.userActions.push(metric);
    
    this.reportMetric('userAction', metric);
  }

  // Track banking-specific metrics
  trackBankingAction(actionType, data = {}) {
    const bankingMetric = {
      type: actionType,
      data,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    };
    
    this.metrics.banking = this.metrics.banking || [];
    this.metrics.banking.push(bankingMetric);
    
    this.reportMetric('banking', bankingMetric);
  }

  trackApiCall(endpoint, method, duration, status) {
    const apiMetric = {
      endpoint,
      method,
      duration,
      status,
      timestamp: Date.now()
    };
    
    this.metrics.api = this.metrics.api || [];
    this.metrics.api.push(apiMetric);
    
    this.reportMetric('api', apiMetric);
  }

  trackChatInteraction(type, messageLength, responseTime) {
    const chatMetric = {
      type, // 'text', 'voice', 'file'
      messageLength,
      responseTime,
      timestamp: Date.now()
    };
    
    this.metrics.chat = this.metrics.chat || [];
    this.metrics.chat.push(chatMetric);
    
    this.reportMetric('chat', chatMetric);
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('bankingAppSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('bankingAppSessionId', sessionId);
    }
    return sessionId;
  }

  reportMetric(type, data) {
    // In production, send to analytics service
    console.log(`[Performance] ${type}:`, data);
    
    // You can integrate with services like:
    // - Google Analytics
    // - Adobe Analytics
    // - Custom analytics endpoint
    
    // Example: Send to custom endpoint
    // this.sendToAnalytics(type, data);
  }

  async sendToAnalytics(type, data) {
    try {
      // Example implementation
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          sessionId: this.getSessionId(),
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }

  // Get performance summary
  getSummary() {
    return {
      metrics: this.metrics,
      summary: {
        totalApiCalls: this.metrics.api?.length || 0,
        totalChatInteractions: this.metrics.chat?.length || 0,
        totalUserActions: this.metrics.userActions?.length || 0,
        averagePageLoad: this.metrics.pageLoad?.windowLoad || 0,
        sessionId: this.getSessionId()
      }
    };
  }

  // Cleanup observers
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
}

// Create global instance
const performanceMonitor = new PerformanceMonitor();

// Export for use in components
export default performanceMonitor;

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  performanceMonitor.cleanup();
}); 