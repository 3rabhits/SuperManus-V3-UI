import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.css';

// Icons - Manus.im Style SVG Icons
const Icons = {
  Logo: () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="#7c3aed" fillOpacity="0.1"/>
      <path d="M14 7L20 10.5V17.5L14 21L8 17.5V10.5L14 7Z" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 14L20 10.5M14 14V21M14 14L8 10.5" stroke="#7c3aed" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  NewTask: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 6V12M6 9H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Search: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Library: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 4H15M3 9H15M3 14H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Folder: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 5C2 4.44772 2.44772 4 3 4H7L9 6H15C15.5523 6 16 6.44772 16 7V13C16 13.5523 15.5523 14 15 14H3C2.44772 14 2 13.5523 2 13V5Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  File: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2H9L12 5V14H4V2Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M9 2V5H12" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 4V14M4 9H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 14V4M9 4L5 8M9 4L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 7.5L6 4.5L9 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Expand: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 2H14V6M6 14H2V10M14 2L9 7M2 14L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2V10M8 10L5 7M8 10L11 7M3 14H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 8L12 5M6 10L12 13" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Filter: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 4H14M4 8H12M6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Save: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2H11L14 5V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 2V5H10V2M8 8V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Code: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 5L2 9L6 13M12 5L16 9L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Image: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="11" cy="13" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 22L10 16L14 20L20 14L28 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Terminal: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 4L6 7L3 10M7 10H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Thinking: () => <span className="thinking-dot">●</span>,
  Computer: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 17H14M10 14V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Mic: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 9C3 12.3137 5.68629 15 9 15C12.3137 15 15 12.3137 15 9M9 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Emoji: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10C6.5 11.5 7.5 12 9 12C10.5 12 11.5 11.5 12 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6.5" cy="7" r="1" fill="currentColor"/>
      <circle cx="11.5" cy="7" r="1" fill="currentColor"/>
    </svg>
  ),
  Globe: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 9H16M9 2C11 4 12 6.5 12 9C12 11.5 11 14 9 16C7 14 6 11.5 6 9C6 6.5 7 4 9 2Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Lightning: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 2L4 10H9L8 16L14 8H9L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L10.5 6.5L15 8L10.5 9.5L9 14L7.5 9.5L3 8L7.5 6.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

// Sidebar Component
function Sidebar({ tasks, currentTask, onNewTask, onSelectTask }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Icons.Logo />
          <span>supermanus</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <button className="nav-item new-task-btn" onClick={onNewTask}>
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
        <div className="section-title">Projects</div>
      </div>

      <div className="sidebar-section tasks-section">
        <div className="section-title">All tasks</div>
        <div className="tasks-list">
          {tasks.map((task, index) => (
            <button 
              key={index} 
              className={`task-item ${currentTask === index ? 'active' : ''}`}
              onClick={() => onSelectTask(index)}
            >
              <Icons.File />
              <span className="task-title">{task.title || task.message?.substring(0, 30) + '...'}</span>
              {task.status === 'running' && <span className="task-status running"></span>}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="share-button">
          <Icons.Share />
          <div className="share-text">
            <span>Share SuperManus with a friend</span>
            <small>Get 500 credits each</small>
          </div>
        </button>
      </div>
    </aside>
  );
}

// TopBar Component
function TopBar({ connected }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className={`connection-status ${connected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {connected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      <div className="topbar-center">
        <span className="model-name">SuperManus V3</span>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn">
          <Icons.Filter />
        </button>
        <button className="topbar-btn">
          <Icons.Save />
        </button>
        <button className="topbar-btn primary">
          <Icons.Share />
          <span>Share</span>
        </button>
      </div>
    </header>
  );
}

// Chat Input Component
function ChatInput({ onSend, disabled }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="What can I do for you?"
          disabled={disabled}
          rows={1}
        />
        <div className="input-actions">
          <button type="button" className="input-action-btn" title="Add emoji">
            <Icons.Emoji />
          </button>
          <button type="button" className="input-action-btn" title="Voice input">
            <Icons.Mic />
          </button>
          <button 
            type="submit" 
            className={`send-button ${message.trim() ? 'active' : ''}`}
            disabled={!message.trim() || disabled}
          >
            <Icons.Send />
          </button>
        </div>
      </div>
      <div className="input-footer">
        <span className="footer-hint">Press Enter to send, Shift+Enter for new line</span>
      </div>
    </form>
  );
}

// Quick Actions Component
function QuickActions({ onAction }) {
  const actions = [
    { icon: <Icons.Globe />, label: 'Research', desc: 'Search and analyze information' },
    { icon: <Icons.Code />, label: 'Code', desc: 'Write and debug code' },
    { icon: <Icons.Lightning />, label: 'Automate', desc: 'Create workflows' },
    { icon: <Icons.Sparkle />, label: 'Create', desc: 'Generate content' },
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index}
          className="quick-action-card"
          onClick={() => onAction(action.label)}
        >
          <span className="action-icon">{action.icon}</span>
          <span className="action-label">{action.label}</span>
          <span className="action-desc">{action.desc}</span>
        </button>
      ))}
    </div>
  );
}

// User Message Component
function UserMessage({ message, time }) {
  return (
    <div className="message user-message">
      <div className="message-content">
        <p>{message}</p>
      </div>
      <span className="message-time">{time}</span>
    </div>
  );
}

// Agent Response Component
function AgentResponse({ response, steps, status, expandedSteps, onStepToggle }) {
  return (
    <div className="message agent-message">
      {status === 'thinking' && (
        <div className="thinking-indicator">
          <div className="thinking-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="thinking-text">Thinking...</span>
        </div>
      )}
      
      {steps && steps.length > 0 && (
        <div className="agent-steps">
          {steps.map((step, index) => (
            <div 
              key={step.id || index}
              className={`step-item ${step.status || 'pending'} ${expandedSteps.includes(index) ? 'expanded' : ''}`}
            >
              <div 
                className="step-header"
                onClick={() => onStepToggle(index)}
              >
                <span className="step-icon">
                  {step.status === 'completed' ? (
                    <Icons.Check />
                  ) : step.status === 'running' ? (
                    <span className="step-spinner"></span>
                  ) : (
                    <span className="step-number">{index + 1}</span>
                  )}
                </span>
                <span className="step-title">{step.title || step.action}</span>
                <span className="step-toggle">
                  {expandedSteps.includes(index) ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
                </span>
              </div>
              {expandedSteps.includes(index) && step.details && (
                <div className="step-details">
                  <pre>{typeof step.details === 'object' ? JSON.stringify(step.details, null, 2) : step.details}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {response && status !== 'thinking' && (
        <div className="agent-response-content">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

// Manus Computer Mini Bar
function ManusComputerMini({ currentStep, totalSteps, time, status, onExpand, onNavigate }) {
  return (
    <div className={`manus-computer-mini ${status}`}>
      <div className="computer-mini-left">
        <Icons.Computer />
        <span className="computer-label">Manus's Computer</span>
        {status === 'running' && (
          <span className="computer-status">
            <span className="status-pulse"></span>
            Working...
          </span>
        )}
      </div>
      <div className="computer-mini-center">
        {currentStep && (
          <span className="current-step-preview">{currentStep.title || currentStep.action}</span>
        )}
      </div>
      <div className="computer-mini-right">
        <div className="step-navigation">
          <button onClick={() => onNavigate(-1)} disabled={!totalSteps}>
            <Icons.ArrowLeft />
          </button>
          <span className="step-counter">{totalSteps > 0 ? `${Math.min(totalSteps, totalSteps)}/${totalSteps}` : '0/0'}</span>
          <button onClick={() => onNavigate(1)} disabled={!totalSteps}>
            <Icons.ArrowRight />
          </button>
        </div>
        <button className="expand-btn" onClick={onExpand}>
          <Icons.Expand />
        </button>
      </div>
    </div>
  );
}

// Manus Computer Expanded View
function ManusComputerExpanded({ screenshot, currentStep, currentIndex, totalSteps, onClose, onNavigate }) {
  return (
    <div className="manus-computer-expanded">
      <div className="computer-overlay" onClick={onClose}></div>
      <div className="computer-modal">
        <div className="computer-header">
          <div className="computer-title">
            <Icons.Computer />
            <span>Manus's Computer</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <Icons.Close />
          </button>
        </div>
        <div className="computer-content">
          {screenshot ? (
            <img src={screenshot} alt="Screenshot" className="computer-screenshot" />
          ) : (
            <div className="computer-placeholder">
              <Icons.Computer />
              <span>No screenshot available</span>
            </div>
          )}
        </div>
        <div className="computer-footer">
          <div className="step-info">
            {currentStep && (
              <>
                <span className="step-action">{currentStep.title || currentStep.action}</span>
                {currentStep.details && (
                  <span className="step-detail">{typeof currentStep.details === 'string' ? currentStep.details : ''}</span>
                )}
              </>
            )}
          </div>
          <div className="step-navigation">
            <button onClick={() => onNavigate(-1)} disabled={currentIndex <= 0}>
              <Icons.ArrowLeft />
            </button>
            <span className="step-counter">{currentIndex + 1}/{totalSteps}</span>
            <button onClick={() => onNavigate(1)} disabled={currentIndex >= totalSteps - 1}>
              <Icons.ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// File icon helper
function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const iconMap = {
    'html': '🌐',
    'css': '🎨',
    'js': '📜',
    'jsx': '⚛️',
    'ts': '📘',
    'tsx': '📘',
    'json': '📋',
    'md': '📝',
    'py': '🐍',
    'png': '🖼️',
    'jpg': '🖼️',
    'jpeg': '🖼️',
    'gif': '🖼️',
    'svg': '🎨',
    'pdf': '📕',
    'txt': '📄',
    'zip': '📦',
  };
  return iconMap[ext] || '📄';
}

// Files Panel Component
function FilesPanel({ files, selectedFile, onSelectFile, onDownload, activeTab, onTabChange, previewUrl, width, onResize }) {
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth <= 800) {
        onResize(newWidth);
      }
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
  }, [isResizing, onResize]);

  return (
    <div 
      ref={panelRef}
      className={`files-panel ${isResizing ? 'resizing' : ''}`} 
      style={{ width: `${width}px` }}
    >
      <div 
        className="resize-handle"
        onMouseDown={handleMouseDown}
      >
        <div className="resize-line"></div>
      </div>
      
      <div className="panel-header">
        <div className="panel-tabs">
          <button 
            className={`panel-tab ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => onTabChange('preview')}
          >
            Preview
          </button>
          <button 
            className={`panel-tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => onTabChange('code')}
          >
            Code
          </button>
          <button 
            className={`panel-tab ${activeTab === 'files' ? 'active' : ''}`}
            onClick={() => onTabChange('files')}
          >
            Files <span className="file-count">{files.length}</span>
          </button>
        </div>
        <div className="panel-actions">
          <button className="panel-action"><Icons.Expand /></button>
        </div>
      </div>

      <div className="panel-content">
        {activeTab === 'preview' && (
          <div className="preview-container">
            {previewUrl ? (
              <>
                <div className="preview-filename">{selectedFile?.name}</div>
                <iframe 
                  src={previewUrl} 
                  title="Preview"
                  className="preview-iframe"
                />
              </>
            ) : (
              <div className="preview-empty">
                <Icons.Image />
                <span>Select an HTML file to preview</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="code-container">
            {selectedFile ? (
              <>
                <div className="code-filename">{selectedFile.name}</div>
                <pre className="code-content">{selectedFile.content || 'Loading...'}</pre>
              </>
            ) : (
              <div className="code-empty">
                <Icons.Code />
                <span>Select a file to view code</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="files-list">
            {files.map((file, index) => (
              <div 
                key={index}
                className={`file-item ${selectedFile?.name === file.name ? 'selected' : ''}`}
                onClick={() => onSelectFile(file)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="file-icon">{getFileIcon(file.name)}</span>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{file.size}</span>
                </div>
                <button 
                  className="file-download"
                  onClick={(e) => { e.stopPropagation(); onDownload(file); }}
                >
                  <Icons.Download />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [connected, setConnected] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
  const [messages, setMessages] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [panelWidth, setPanelWidth] = useState(450);
  const [expandedSteps, setExpandedSteps] = useState([]);
  const [showComputer, setShowComputer] = useState(false);
  const [computerIndex, setComputerIndex] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');
  
  const wsRef = useRef(null);
  const messagesEndRef = useRef(null);

  // WebSocket connection
  useEffect(() => {
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    const wsUrl = window.location.hostname === 'localhost' 
      ? `ws://localhost:8000/ws/${sessionId}`
      : `wss://${window.location.hostname.replace('3003', '8000')}/ws/${sessionId}`;
    
    const connect = () => {
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setConnected(true);
      };
      
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      };
      
      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        setConnected(false);
        setTimeout(connect, 3000);
      };
      
      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };
    
    connect();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const handleWebSocketMessage = (data) => {
    console.log('WS Message:', data);
    
    switch (data.type) {
      case 'status':
        if (currentTaskIndex >= 0) {
          setTasks(prev => {
            const updated = [...prev];
            if (updated[currentTaskIndex]) {
              updated[currentTaskIndex].status = data.data.status;
            }
            return updated;
          });
        }
        break;
        
      case 'step':
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.type === 'agent') {
            lastMsg.steps = lastMsg.steps || [];
            const existingIndex = lastMsg.steps.findIndex(s => s.id === data.data.id);
            if (existingIndex >= 0) {
              lastMsg.steps[existingIndex] = { ...lastMsg.steps[existingIndex], ...data.data };
            } else {
              lastMsg.steps.push(data.data);
            }
          }
          return updated;
        });
        break;
        
      case 'step_update':
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.type === 'agent' && lastMsg.steps) {
            const stepIndex = lastMsg.steps.findIndex(s => s.id === data.data.id);
            if (stepIndex >= 0) {
              lastMsg.steps[stepIndex].status = data.data.status;
            }
          }
          return updated;
        });
        break;
        
      case 'response':
        setMessages(prev => {
          const updated = [...prev];
          const lastMsg = updated[updated.length - 1];
          if (lastMsg && lastMsg.type === 'agent') {
            lastMsg.response = data.data.message;
            lastMsg.status = data.data.status;
          }
          return updated;
        });
        break;
        
      case 'message':
        if (data.data.role === 'assistant') {
          setMessages(prev => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg && lastMsg.type === 'agent') {
              lastMsg.response = data.data.content;
              lastMsg.status = 'completed';
            }
            return updated;
          });
          if (currentTaskIndex >= 0) {
            setTasks(prev => {
              const updated = [...prev];
              if (updated[currentTaskIndex]) {
                updated[currentTaskIndex].status = 'completed';
              }
              return updated;
            });
          }
        }
        break;
        
      case 'files':
        setFiles(data.data.files || []);
        break;
        
      case 'file_content':
        setSelectedFile(prev => ({
          ...prev,
          content: data.data.content
        }));
        break;
        
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    
    const time = new Date().toLocaleTimeString();
    
    setMessages(prev => [...prev, {
      type: 'user',
      message,
      time
    }]);
    
    setMessages(prev => [...prev, {
      type: 'agent',
      response: `Got it! I'll help you with: "${message}"`,
      steps: [],
      status: 'thinking'
    }]);
    
    const newTask = {
      title: message.length > 40 ? message.substring(0, 40) + '...' : message,
      message,
      status: 'running',
      time
    };
    setTasks(prev => [newTask, ...prev]);
    setCurrentTaskIndex(0);
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'chat',
        prompt: message
      }));
    }
  };

  const handleSelectFile = async (file) => {
    setSelectedFile(file);
    
    if (file.name.endsWith('.html')) {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'get_file',
          filename: file.name
        }));
      }
      
      const baseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : `https://${window.location.hostname.replace('3003', '8000')}`;
      setPreviewUrl(`${baseUrl}/files/${file.name}`);
      setActiveTab('preview');
    } else {
      setPreviewUrl('');
      setActiveTab('code');
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'get_file',
          filename: file.name
        }));
      }
    }
  };

  const handleDownload = (file) => {
    const baseUrl = window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : `https://${window.location.hostname.replace('3003', '8000')}`;
    window.open(`${baseUrl}/download/${file.name}`, '_blank');
  };

  const handleStepToggle = (index) => {
    setExpandedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleNewTask = () => {
    setMessages([]);
    setCurrentTaskIndex(-1);
    setExpandedSteps([]);
  };

  const handleSelectTask = (index) => {
    setCurrentTaskIndex(index);
  };

  const handleComputerNavigate = (direction) => {
    const lastAgentMsg = messages.filter(m => m.type === 'agent').pop();
    const totalSteps = lastAgentMsg?.steps?.length || 0;
    
    setComputerIndex(prev => {
      const newIndex = prev + direction;
      if (newIndex >= 0 && newIndex < totalSteps) {
        return newIndex;
      }
      return prev;
    });
  };

  const getCurrentStep = () => {
    const lastAgentMsg = messages.filter(m => m.type === 'agent').pop();
    return lastAgentMsg?.steps?.[computerIndex];
  };

  const getTotalSteps = () => {
    const lastAgentMsg = messages.filter(m => m.type === 'agent').pop();
    return lastAgentMsg?.steps?.length || 0;
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="app">
      <Sidebar 
        tasks={tasks}
        currentTask={currentTaskIndex}
        onNewTask={handleNewTask}
        onSelectTask={handleSelectTask}
      />
      
      <main className="main-content">
        <TopBar connected={connected} />
        
        <div className="content-area">
          <div className="chat-area">
            {!hasMessages ? (
              <div className="welcome-screen">
                <h1>What can I do for you?</h1>
                <ChatInput onSend={handleSendMessage} disabled={!connected} />
                <QuickActions onAction={(action) => handleSendMessage(action)} />
                <div className="connect-tools">
                  <span>🔗 Connect your tools to SuperManus</span>
                </div>
              </div>
            ) : (
              <>
                <div className="conversation-container">
                  {messages.map((msg, index) => (
                    msg.type === 'user' ? (
                      <UserMessage 
                        key={index}
                        message={msg.message}
                        time={msg.time}
                      />
                    ) : (
                      <AgentResponse
                        key={index}
                        response={msg.response}
                        steps={msg.steps}
                        status={msg.status}
                        expandedSteps={expandedSteps}
                        onStepToggle={handleStepToggle}
                      />
                    )
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="chat-input-fixed">
                  <ChatInput onSend={handleSendMessage} disabled={!connected} />
                </div>
              </>
            )}
          </div>
          
          {hasMessages && (
            <FilesPanel
              files={files}
              selectedFile={selectedFile}
              onSelectFile={handleSelectFile}
              onDownload={handleDownload}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              previewUrl={previewUrl}
              width={panelWidth}
              onResize={setPanelWidth}
            />
          )}
        </div>
        
        {/* Manus Computer Mini */}
        {hasMessages && getTotalSteps() > 0 && !showComputer && (
          <ManusComputerMini
            currentStep={getCurrentStep()}
            totalSteps={getTotalSteps()}
            time="0:00"
            status={messages[messages.length - 1]?.status || 'idle'}
            onExpand={() => setShowComputer(true)}
            onNavigate={handleComputerNavigate}
          />
        )}
        
        {/* Manus Computer Expanded */}
        {showComputer && (
          <ManusComputerExpanded
            screenshot={getCurrentStep()?.screenshot}
            currentStep={getCurrentStep()}
            currentIndex={computerIndex}
            totalSteps={getTotalSteps()}
            onClose={() => setShowComputer(false)}
            onNavigate={handleComputerNavigate}
          />
        )}
      </main>
    </div>
  );
}

export default App;
