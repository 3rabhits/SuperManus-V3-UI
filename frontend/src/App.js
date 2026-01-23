import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// Icons (SVG Components)
// ============================================================================

const Icons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#6366F1"/>
      <path d="M7 8h10M7 12h10M7 16h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  NewTask: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Library: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Folder: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  File: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  Globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Send: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  ExternalLink: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Loader: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  ),
  User: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Slides: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  Website: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  App: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Design: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    </svg>
  ),
  More: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
    </svg>
  ),
  Share: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  ),
  Panel: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="15" y1="3" x2="15" y2="21"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Terminal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
};

// ============================================================================
// WebSocket Hook
// ============================================================================

function useWebSocket(sessionId) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [steps, setSteps] = useState([]);
  const [status, setStatus] = useState('idle');
  const [files, setFiles] = useState([]);
  const wsRef = useRef(null);
  const reconnectRef = useRef(null);

  const connect = useCallback(() => {
    if (!sessionId) return;

    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = window.location.hostname.includes('localhost') 
      ? 'localhost:8000' 
      : window.location.hostname.replace('3003-', '8000-');
    const wsUrl = `${wsProtocol}//${wsHost}/ws/${sessionId}`;
    
    console.log('Connecting to:', wsUrl);
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      const pingInterval = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'ping' }));
        }
      }, 30000);
      ws._pingInterval = pingInterval;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WS Message:', data);

        switch (data.type) {
          case 'message':
            setMessages(prev => [...prev, data.data]);
            break;
          case 'step':
            setSteps(prev => [...prev, data.data]);
            break;
          case 'step_update':
            setSteps(prev => prev.map(s => 
              s.id === data.data.id ? { ...s, ...data.data } : s
            ));
            break;
          case 'status':
            setStatus(data.data.status);
            break;
          case 'files':
            setFiles(data.data.files || []);
            break;
          case 'file_created':
            setFiles(prev => [data.data, ...prev.filter(f => f.name !== data.data.name)]);
            break;
          case 'pong':
            break;
          default:
            console.log('Unknown message type:', data.type);
        }
      } catch (e) {
        console.error('Parse error:', e);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      if (ws._pingInterval) clearInterval(ws._pingInterval);
      reconnectRef.current = setTimeout(() => connect(), 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (ws._pingInterval) clearInterval(ws._pingInterval);
      ws.close();
    };
  }, [sessionId]);

  useEffect(() => {
    const cleanup = connect();
    return () => {
      cleanup?.();
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
    };
  }, [connect]);

  const sendMessage = useCallback((prompt) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        role: 'user', 
        content: prompt, 
        timestamp: new Date().toISOString() 
      }]);
      setSteps([]);
      wsRef.current.send(JSON.stringify({ type: 'chat', prompt }));
      return true;
    }
    return false;
  }, []);

  const refreshFiles = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'get_files' }));
    }
  }, []);

  return { isConnected, messages, steps, status, files, sendMessage, refreshFiles };
}

// ============================================================================
// Resizable Hook
// ============================================================================

function useResizable(initialWidth, minWidth, maxWidth) {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);

  const startResize = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      setWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, maxWidth]);

  return { width, isResizing, startResize };
}

// ============================================================================
// Sidebar Component
// ============================================================================

function Sidebar({ onNewTask }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Icons.Logo />
          <span>SuperManus</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <button className="nav-item" onClick={onNewTask}>
          <Icons.NewTask />
          <span>New task</span>
        </button>
        <button className="nav-item">
          <Icons.Search />
          <span>Search</span>
          <kbd>Ctrl+K</kbd>
        </button>
        <button className="nav-item">
          <Icons.Library />
          <span>Library</span>
        </button>
      </nav>

      <div className="sidebar-section">
        <div className="section-title">PROJECTS</div>
      </div>

      <div className="sidebar-section">
        <div className="section-title">ALL TASKS</div>
      </div>

      <div className="sidebar-footer">
        <button className="share-button">
          <Icons.Share />
          <div className="share-text">
            <span>Share with a friend</span>
            <small>Get 500 credits each</small>
          </div>
        </button>
      </div>
    </aside>
  );
}

// ============================================================================
// TopBar Component
// ============================================================================

function TopBar({ isConnected }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="version-badge">SuperManus V3</span>
      </div>
      <div className="topbar-right">
        <div className={`connection-status ${isConnected ? 'connected' : ''}`}>
          <span className="status-dot"></span>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <button className="topbar-button"><Icons.Bell /></button>
        <button className="topbar-button user-button"><Icons.User /></button>
      </div>
    </header>
  );
}

// ============================================================================
// Chat Input Component
// ============================================================================

function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="input-tools-left">
          <button className="tool-button"><Icons.Plus /></button>
        </div>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Assign a task or ask anything"
          disabled={disabled}
          rows={1}
        />
        <div className="input-tools-right">
          <button 
            className={`send-button ${input.trim() ? 'active' : ''}`}
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
          >
            <Icons.Send />
          </button>
        </div>
      </div>
      <div className="quick-actions">
        <button className="quick-action" onClick={() => onSend('Create a presentation')}>
          <Icons.Slides />
          <span>Create slides</span>
        </button>
        <button className="quick-action" onClick={() => onSend('Build a website')}>
          <Icons.Website />
          <span>Build website</span>
        </button>
        <button className="quick-action" onClick={() => onSend('Develop an app')}>
          <Icons.App />
          <span>Develop apps</span>
        </button>
        <button className="quick-action" onClick={() => onSend('Design something')}>
          <Icons.Design />
          <span>Design</span>
        </button>
        <button className="quick-action">
          <Icons.More />
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// User Message Component (Blue bubble at top)
// ============================================================================

function UserMessage({ content, timestamp }) {
  return (
    <div className="user-message-container">
      <div className="user-message">
        <p>{content}</p>
      </div>
      <span className="message-time">{new Date(timestamp).toLocaleTimeString()}</span>
    </div>
  );
}

// ============================================================================
// Agent Response Component (Like Manus.im)
// ============================================================================

function AgentResponse({ steps, status }) {
  const [expandedSteps, setExpandedSteps] = useState({});

  const toggleStep = (stepId) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'planning': return 'PLANNING';
      case 'executing': return 'EXECUTING';
      case 'completed': return 'COMPLETED';
      default: return 'IDLE';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'planning': return '#f59e0b';
      case 'executing': return '#3b82f6';
      case 'completed': return '#22c55e';
      default: return '#6b7280';
    }
  };

  return (
    <div className="agent-response">
      <div className="agent-header">
        <div className="agent-avatar">
          <Icons.Logo />
        </div>
        <span className="agent-name">manus</span>
        <span className="agent-badge">Max</span>
      </div>

      <div className="agent-content">
        {/* Status Badge */}
        <div className="status-section">
          <span className="status-label" style={{ color: getStatusColor() }}>
            {getStatusLabel()}
          </span>
        </div>

        {/* Steps */}
        <div className="steps-list">
          {steps.map((step, index) => (
            <div key={step.id || index} className={`step-item ${step.status}`}>
              <div className="step-header" onClick={() => toggleStep(step.id || index)}>
                <span className="step-toggle">
                  {expandedSteps[step.id || index] ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                </span>
                <span className="step-title">{step.title}</span>
                <span className="step-status-icon">
                  {step.status === 'completed' && <Icons.Check />}
                  {step.status === 'running' && <Icons.Loader />}
                </span>
              </div>
              
              {expandedSteps[step.id || index] && step.description && (
                <div className="step-details">
                  {step.description.includes('Executing command') || step.description.includes('cmd') ? (
                    <div className="command-block">
                      <div className="command-header">
                        <Icons.Terminal />
                        <span>Terminal</span>
                      </div>
                      <pre className="command-content">{step.description}</pre>
                    </div>
                  ) : (
                    <p className="step-text">{step.description}</p>
                  )}
                  {step.result && (
                    <div className="step-result">
                      <pre>{step.result}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step Counter */}
        {steps.length > 0 && (
          <div className="step-counter">
            <span>{steps.filter(s => s.status === 'completed').length} / {steps.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Files Panel Component
// ============================================================================

function FilesPanel({ files, width, onStartResize, onRefresh, selectedFile, onSelectFile }) {
  const [activeTab, setActiveTab] = useState('preview');
  const [previewFile, setPreviewFile] = useState(null);
  const [codeContent, setCodeContent] = useState('');

  useEffect(() => {
    if (files.length > 0 && !previewFile) {
      const htmlFile = files.find(f => f.can_preview);
      if (htmlFile) setPreviewFile(htmlFile);
    }
  }, [files, previewFile]);

  const handleFileClick = async (file) => {
    onSelectFile(file);
    if (file.can_preview) {
      setPreviewFile(file);
      setActiveTab('preview');
    } else {
      setActiveTab('code');
    }
    
    // Fetch code content
    try {
      const baseUrl = window.location.hostname.includes('localhost')
        ? 'http://localhost:8000'
        : `https://${window.location.hostname.replace('3003-', '8000-')}`;
      const response = await fetch(`${baseUrl}/api/preview/${file.name}`);
      const text = await response.text();
      setCodeContent(text);
    } catch (e) {
      setCodeContent('Error loading file content');
    }
  };

  const getPreviewUrl = () => {
    if (!previewFile) return '';
    const baseUrl = window.location.hostname.includes('localhost')
      ? 'http://localhost:8000'
      : `https://${window.location.hostname.replace('3003-', '8000-')}`;
    return `${baseUrl}/api/preview/${previewFile.name}`;
  };

  const getFileIcon = (file) => {
    if (file.type === 'html' || file.type === 'htm') return <Icons.Globe />;
    if (['js', 'jsx', 'ts', 'tsx', 'py', 'css'].includes(file.type)) return <Icons.Code />;
    return <Icons.File />;
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="files-panel" style={{ width }}>
      <div className="resize-handle" onMouseDown={onStartResize}>
        <div className="resize-line"></div>
      </div>

      <div className="panel-header">
        <div className="panel-tabs">
          <button 
            className={`panel-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`panel-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
          <button 
            className={`panel-tab ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => setActiveTab('files')}
          >
            Files <span className="file-count">{files.length}</span>
          </button>
        </div>
        <div className="panel-actions">
          <button className="panel-action" onClick={onRefresh} title="Refresh files">
            <Icons.Refresh />
          </button>
          {previewFile && (
            <a 
              href={getPreviewUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className="panel-action"
              title="Open in new tab"
            >
              <Icons.ExternalLink />
            </a>
          )}
        </div>
      </div>

      <div className="panel-content">
        {activeTab === 'preview' && (
          <div className="preview-container">
            {previewFile ? (
              <>
                <div className="preview-filename">{previewFile.name}</div>
                <iframe
                  src={getPreviewUrl()}
                  title="Preview"
                  className="preview-iframe"
                />
              </>
            ) : (
              <div className="preview-empty">
                <Icons.Globe />
                <p>No preview available</p>
                <small>Select an HTML file to preview</small>
              </div>
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="code-container">
            {selectedFile ? (
              <>
                <div className="code-filename">{selectedFile.name}</div>
                <pre className="code-content">{codeContent}</pre>
              </>
            ) : (
              <div className="code-empty">
                <Icons.Code />
                <p>No file selected</p>
                <small>Select a file to view its code</small>
              </div>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="files-list">
            {files.length === 0 ? (
              <div className="files-empty">
                <Icons.Folder />
                <p>No files yet</p>
                <small>Files created by the agent will appear here</small>
              </div>
            ) : (
              files.map((file, index) => (
                <div 
                  key={file.name + index}
                  className={`file-item ${selectedFile?.name === file.name ? 'selected' : ''}`}
                  onClick={() => handleFileClick(file)}
                >
                  <div className="file-icon">{getFileIcon(file)}</div>
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{formatSize(file.size)}</span>
                  </div>
                  <a 
                    href={`${window.location.hostname.includes('localhost') ? 'http://localhost:8000' : `https://${window.location.hostname.replace('3003-', '8000-')}`}/api/download/${file.path}`}
                    className="file-download"
                    onClick={(e) => e.stopPropagation()}
                    title="Download"
                  >
                    <Icons.Download />
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main App Component
// ============================================================================

function App() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [showFilesPanel, setShowFilesPanel] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const { 
    isConnected, 
    messages, 
    steps, 
    status, 
    files, 
    sendMessage, 
    refreshFiles 
  } = useWebSocket(sessionId);

  const { width: panelWidth, isResizing, startResize } = useResizable(400, 250, 700);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, steps]);

  const handleNewTask = () => {
    window.location.reload();
  };

  const isWorking = status === 'planning' || status === 'executing';
  const hasConversation = messages.length > 0 || steps.length > 0;

  return (
    <div className={`app ${isResizing ? 'resizing' : ''}`}>
      <Sidebar onNewTask={handleNewTask} />
      
      <main className="main-content">
        <TopBar isConnected={isConnected} />
        
        <div className="content-area">
          <div className="chat-area">
            {!hasConversation ? (
              <div className="welcome-screen">
                <h1>What can I do for you?</h1>
                <ChatInput onSend={sendMessage} disabled={!isConnected || isWorking} />
              </div>
            ) : (
              <div className="conversation-container">
                {/* User Messages */}
                {messages.filter(m => m.role === 'user').map((msg, i) => (
                  <UserMessage 
                    key={msg.id || i} 
                    content={msg.content} 
                    timestamp={msg.timestamp}
                  />
                ))}
                
                {/* Agent Response with Steps */}
                {steps.length > 0 && (
                  <AgentResponse steps={steps} status={status} />
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}

            {hasConversation && (
              <div className="chat-input-fixed">
                <ChatInput onSend={sendMessage} disabled={!isConnected || isWorking} />
              </div>
            )}
          </div>

          {showFilesPanel && (
            <FilesPanel 
              files={files}
              width={panelWidth}
              onStartResize={startResize}
              onRefresh={refreshFiles}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
            />
          )}
        </div>

        <button 
          className="toggle-panel-button"
          onClick={() => setShowFilesPanel(!showFilesPanel)}
          title={showFilesPanel ? 'Hide files panel' : 'Show files panel'}
        >
          <Icons.Panel />
        </button>
      </main>
    </div>
  );
}

export default App;
