import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  // New Icons for enhanced features
  SortAsc: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 2L12 6M4 10H12M4 14H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  SortDesc: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 10L8 14L12 10M4 6H12M4 2H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  FileType: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2H10L13 5V14H3V2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 9H11M5 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  SizeIcon: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 11V8M8 11V5M11 11V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Brain: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2C6.5 2 5 3.5 5 5.5C5 6.5 5.5 7.5 6 8C4.5 8.5 3 10 3 12C3 14 4.5 16 7 16H11C13.5 16 15 14 15 12C15 10 13.5 8.5 12 8C12.5 7.5 13 6.5 13 5.5C13 3.5 11.5 2 9 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 8V12M7 10H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Analyze: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Execute: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 4L14 9L6 14V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Review: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Thinking: () => <span className="thinking-dot">●</span>,
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M10 4V3C10 2.44772 9.55228 2 9 2H3C2.44772 2 2 2.44772 2 3V9C2 9.55228 2.44772 10 3 10H4" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
};

// Sort options configuration
const SORT_OPTIONS = [
  { id: 'type', label: 'Type', icon: Icons.FileType },
  { id: 'date', label: 'Last Modified', icon: Icons.Clock },
  { id: 'size', label: 'Size', icon: Icons.SizeIcon },
  { id: 'name', label: 'Name', icon: Icons.SortAsc },
];

// File type priority for sorting
const FILE_TYPE_PRIORITY = {
  'html': 1,
  'css': 2,
  'js': 3,
  'jsx': 4,
  'ts': 5,
  'tsx': 6,
  'json': 7,
  'md': 8,
  'py': 9,
  'txt': 10,
  'zip': 11,
  'png': 12,
  'jpg': 13,
  'jpeg': 14,
  'gif': 15,
  'svg': 16,
  'pdf': 17,
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
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What can I do for you?"
          disabled={disabled}
          rows={1}
        />
        <div className="input-actions">
          <button type="button" className="input-action" title="Add emoji">
            <Icons.Emoji />
          </button>
          <button type="button" className="input-action" title="Voice input">
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
      <div className="input-hint">Press Enter to send, Shift+Enter for new line</div>
    </form>
  );
}

// Quick Actions Component
function QuickActions({ onAction }) {
  const actions = [
    { icon: Icons.Globe, label: 'Research', description: 'Search and analyze information', prompt: 'Research' },
    { icon: Icons.Code, label: 'Code', description: 'Write and debug code', prompt: 'Code' },
    { icon: Icons.Lightning, label: 'Automate', description: 'Create workflows', prompt: 'Automate' },
    { icon: Icons.Sparkle, label: 'Create', description: 'Generate content', prompt: 'Create' },
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index}
          className="quick-action-card"
          onClick={() => onAction(action.prompt)}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <action.icon />
          <span className="action-label">{action.label}</span>
          <span className="action-description">{action.description}</span>
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

// Enhanced Thinking Indicator Component
function ThinkingIndicator({ phase, progress, details }) {
  const phases = [
    { id: 'understanding', label: 'Understanding request', icon: Icons.Brain },
    { id: 'planning', label: 'Planning approach', icon: Icons.Analyze },
    { id: 'executing', label: 'Executing task', icon: Icons.Execute },
    { id: 'reviewing', label: 'Reviewing output', icon: Icons.Review },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === phase) || 0;

  return (
    <div className="thinking-indicator-enhanced">
      <div className="thinking-header">
        <div className="thinking-animation">
          <div className="thinking-ring">
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
            <div className="ring-segment"></div>
          </div>
          <Icons.Brain />
        </div>
        <div className="thinking-title">
          <span className="title-text">Thinking</span>
          <span className="thinking-dots-inline">
            <span></span><span></span><span></span>
          </span>
        </div>
      </div>
      
      <div className="thinking-phases">
        {phases.map((p, index) => (
          <div 
            key={p.id}
            className={`thinking-phase ${index < currentPhaseIndex ? 'completed' : ''} ${index === currentPhaseIndex ? 'active' : ''} ${index > currentPhaseIndex ? 'pending' : ''}`}
          >
            <div className="phase-icon">
              {index < currentPhaseIndex ? (
                <Icons.Check />
              ) : index === currentPhaseIndex ? (
                <span className="phase-spinner"></span>
              ) : (
                <p.icon />
              )}
            </div>
            <span className="phase-label">{p.label}</span>
          </div>
        ))}
      </div>

      {details && (
        <div className="thinking-details">
          <div className="detail-item">
            <Icons.Terminal />
            <span>{details}</span>
          </div>
        </div>
      )}

      {progress !== undefined && (
        <div className="thinking-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="progress-text">{progress}%</span>
        </div>
      )}
    </div>
  );
}

// Enhanced Step Item Component
function StepItem({ step, index, isExpanded, onToggle, isLast }) {
  const getStepIcon = () => {
    if (step.status === 'completed') return <Icons.Check />;
    if (step.status === 'running') return <span className="step-spinner"></span>;
    if (step.status === 'error') return <span className="step-error">!</span>;
    return <span className="step-number">{index + 1}</span>;
  };

  const getStepCategory = () => {
    const title = (step.title || step.action || '').toLowerCase();
    if (title.includes('analyz') || title.includes('understand') || title.includes('read')) return 'analyze';
    if (title.includes('creat') || title.includes('writ') || title.includes('generat') || title.includes('build')) return 'create';
    if (title.includes('execut') || title.includes('run') || title.includes('process')) return 'execute';
    if (title.includes('review') || title.includes('check') || title.includes('verify')) return 'review';
    return 'default';
  };

  return (
    <div 
      className={`step-item-enhanced ${step.status || 'pending'} ${isExpanded ? 'expanded' : ''} category-${getStepCategory()}`}
    >
      <div className="step-connector">
        <div className={`connector-line ${step.status === 'completed' ? 'completed' : ''}`}></div>
        {!isLast && <div className="connector-line-bottom"></div>}
      </div>
      
      <div className="step-content">
        <div className="step-header" onClick={onToggle}>
          <div className={`step-icon ${step.status || 'pending'}`}>
            {getStepIcon()}
          </div>
          <div className="step-info">
            <span className="step-title">{step.title || step.action}</span>
            {step.duration && (
              <span className="step-duration">{step.duration}</span>
            )}
          </div>
          <span className="step-toggle">
            {isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
          </span>
        </div>
        
        {isExpanded && (
          <div className="step-details-enhanced">
            {step.description && (
              <p className="step-description">{step.description}</p>
            )}
            {step.details && (
              <div className="step-code-block">
                <pre>{typeof step.details === 'object' ? JSON.stringify(step.details, null, 2) : step.details}</pre>
              </div>
            )}
            {step.output && (
              <div className="step-output">
                <span className="output-label">Output:</span>
                <pre>{step.output}</pre>
              </div>
            )}
            {step.files && step.files.length > 0 && (
              <div className="step-files">
                <span className="files-label">Files created:</span>
                <div className="files-list-mini">
                  {step.files.map((file, i) => (
                    <span key={i} className="file-tag">{file}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Markdown Code Block Component with Syntax Highlighting
const MarkdownCodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');
  
  if (!inline && language) {
    return (
      <div className="markdown-code-block">
        <div className="code-block-header">
          <span className="code-language">{language}</span>
          <button 
            className="copy-code-btn"
            onClick={() => navigator.clipboard.writeText(codeString)}
          >
            <Icons.Copy /> Copy
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '0 0 8px 8px',
            fontSize: '13px',
            padding: '16px',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
  
  if (!inline) {
    return (
      <div className="markdown-code-block">
        <SyntaxHighlighter
          style={oneDark}
          language="text"
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '8px',
            fontSize: '13px',
            padding: '16px',
          }}
          {...props}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
    );
  }
  
  return (
    <code className="inline-code" {...props}>
      {children}
    </code>
  );
};

// Markdown Renderer Component
function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: MarkdownCodeBlock,
        h1: ({ children }) => <h1 className="md-h1">{children}</h1>,
        h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
        h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
        h4: ({ children }) => <h4 className="md-h4">{children}</h4>,
        p: ({ children }) => <p className="md-paragraph">{children}</p>,
        ul: ({ children }) => <ul className="md-list">{children}</ul>,
        ol: ({ children }) => <ol className="md-list md-list-ordered">{children}</ol>,
        li: ({ children }) => <li className="md-list-item">{children}</li>,
        a: ({ href, children }) => (
          <a href={href} className="md-link" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
        table: ({ children }) => (
          <div className="md-table-wrapper">
            <table className="md-table">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="md-th">{children}</th>,
        td: ({ children }) => <td className="md-td">{children}</td>,
        hr: () => <hr className="md-hr" />,
        strong: ({ children }) => <strong className="md-strong">{children}</strong>,
        em: ({ children }) => <em className="md-em">{children}</em>,
        img: ({ src, alt }) => (
          <div className="md-image-wrapper">
            <img src={src} alt={alt} className="md-image" />
          </div>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// Enhanced Agent Response Component
function AgentResponse({ response, steps, status, thinkingPhase, thinkingDetails, expandedSteps, onStepToggle }) {
  const completedSteps = steps?.filter(s => s.status === 'completed').length || 0;
  const totalSteps = steps?.length || 0;

  return (
    <div className="message agent-message">
      {status === 'thinking' && (
        <ThinkingIndicator 
          phase={thinkingPhase || 'understanding'} 
          details={thinkingDetails}
          progress={totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : undefined}
        />
      )}
      
      {steps && steps.length > 0 && (
        <div className="agent-steps-enhanced">
          <div className="steps-header">
            <span className="steps-title">Task Progress</span>
            <span className="steps-count">{completedSteps}/{totalSteps} steps</span>
          </div>
          <div className="steps-timeline">
            {steps.map((step, index) => (
              <StepItem
                key={step.id || index}
                step={step}
                index={index}
                isExpanded={expandedSteps.includes(index)}
                onToggle={() => onStepToggle(index)}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      )}
      
      {response && status !== 'thinking' && (
        <div className="agent-response-content markdown-body">
          <MarkdownContent content={response} />
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

// Sort Dropdown Component
function SortDropdown({ sortBy, sortOrder, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = SORT_OPTIONS.find(o => o.id === sortBy);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button 
        className={`sort-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <currentOption.icon />
        <span>{currentOption.label}</span>
        <Icons.ChevronDown />
      </button>
      
      {isOpen && (
        <div className="sort-menu">
          <div className="sort-menu-header">Sort by</div>
          {SORT_OPTIONS.map(option => (
            <button
              key={option.id}
              className={`sort-option ${sortBy === option.id ? 'active' : ''}`}
              onClick={() => {
                onSortChange(option.id, sortBy === option.id ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc');
                setIsOpen(false);
              }}
            >
              <option.icon />
              <span>{option.label}</span>
              {sortBy === option.id && (
                <span className="sort-direction">
                  {sortOrder === 'asc' ? <Icons.SortAsc /> : <Icons.SortDesc />}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Enhanced Files Panel Component
function FilesPanel({ files, selectedFile, onSelectFile, onDownload, activeTab, onTabChange, previewUrl, width, onResize }) {
  const [isResizing, setIsResizing] = useState(false);
  const [sortBy, setSortBy] = useState('type');
  const [sortOrder, setSortOrder] = useState('asc');
  const [prettyPrint, setPrettyPrint] = useState(false);
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

  // Sort files
  const sortedFiles = useMemo(() => {
    const sorted = [...files].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'type':
          const extA = a.name.split('.').pop().toLowerCase();
          const extB = b.name.split('.').pop().toLowerCase();
          const priorityA = FILE_TYPE_PRIORITY[extA] || 99;
          const priorityB = FILE_TYPE_PRIORITY[extB] || 99;
          comparison = priorityA - priorityB;
          break;
        case 'date':
          const dateA = a.modified ? new Date(a.modified).getTime() : 0;
          const dateB = b.modified ? new Date(b.modified).getTime() : 0;
          comparison = dateB - dateA; // Newest first by default
          break;
        case 'size':
          const sizeA = typeof a.size === 'number' ? a.size : parseInt(a.size) || 0;
          const sizeB = typeof b.size === 'number' ? b.size : parseInt(b.size) || 0;
          comparison = sizeB - sizeA; // Largest first by default
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return sorted;
  }, [files, sortBy, sortOrder]);

  // Group files by type when sorting by type
  const groupedFiles = useMemo(() => {
    if (sortBy !== 'type') return null;
    
    const groups = {};
    sortedFiles.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      const groupName = getFileGroupName(ext);
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(file);
    });
    
    return groups;
  }, [sortedFiles, sortBy]);

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

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
                <div className="code-header">
                  <span className="code-filename">{selectedFile.name}</span>
                  <label className="pretty-print-toggle">
                    <input 
                      type="checkbox" 
                      checked={prettyPrint} 
                      onChange={(e) => setPrettyPrint(e.target.checked)}
                    />
                    <span>Pretty-print</span>
                  </label>
                </div>
                <pre className={`code-content ${prettyPrint ? 'pretty' : ''}`}>
                  {selectedFile.content || '{"detail":"Not Found"}'}
                </pre>
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
          <div className="files-container">
            <div className="files-toolbar">
              <SortDropdown 
                sortBy={sortBy} 
                sortOrder={sortOrder} 
                onSortChange={handleSortChange}
              />
            </div>
            
            <div className="files-list">
              {sortBy === 'type' && groupedFiles ? (
                Object.entries(groupedFiles).map(([groupName, groupFiles]) => (
                  <div key={groupName} className="file-group">
                    <div className="file-group-header">
                      <span className="group-name">{groupName}</span>
                      <span className="group-count">{groupFiles.length}</span>
                    </div>
                    {groupFiles.map((file, index) => (
                      <FileItem
                        key={file.name + index}
                        file={file}
                        isSelected={selectedFile?.name === file.name}
                        onSelect={onSelectFile}
                        onDownload={onDownload}
                        index={index}
                      />
                    ))}
                  </div>
                ))
              ) : (
                sortedFiles.map((file, index) => (
                  <FileItem
                    key={file.name + index}
                    file={file}
                    isSelected={selectedFile?.name === file.name}
                    onSelect={onSelectFile}
                    onDownload={onDownload}
                    index={index}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// File Item Component
function FileItem({ file, isSelected, onSelect, onDownload, index }) {
  return (
    <div 
      className={`file-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(file)}
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <span className="file-icon">{getFileIcon(file.name)}</span>
      <div className="file-info">
        <span className="file-name">{file.name}</span>
        <span className="file-size">{formatFileSize(file.size)}</span>
      </div>
      <button 
        className="file-download"
        onClick={(e) => { e.stopPropagation(); onDownload(file); }}
        title="Download file"
      >
        <Icons.Download />
      </button>
    </div>
  );
}

// Helper function to get file group name
function getFileGroupName(ext) {
  const groups = {
    'html': 'Web Pages',
    'css': 'Stylesheets',
    'js': 'JavaScript',
    'jsx': 'React Components',
    'ts': 'TypeScript',
    'tsx': 'TypeScript React',
    'json': 'Data Files',
    'md': 'Documentation',
    'py': 'Python',
    'png': 'Images',
    'jpg': 'Images',
    'jpeg': 'Images',
    'gif': 'Images',
    'svg': 'Vector Graphics',
    'pdf': 'Documents',
    'txt': 'Text Files',
    'zip': 'Archives',
  };
  return groups[ext] || 'Other Files';
}

// Helper function to format file size
function formatFileSize(size) {
  if (typeof size === 'string') return size;
  if (!size) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let fileSize = size;
  
  while (fileSize >= 1024 && unitIndex < units.length - 1) {
    fileSize /= 1024;
    unitIndex++;
  }
  
  return `${fileSize.toFixed(unitIndex > 0 ? 1 : 0)} ${units[unitIndex]}`;
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
  const [thinkingPhase, setThinkingPhase] = useState('understanding');
  const [thinkingDetails, setThinkingDetails] = useState('');
  
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
      
      case 'thinking':
        setThinkingPhase(data.data.phase || 'understanding');
        setThinkingDetails(data.data.details || '');
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
        // Update thinking phase based on step
        if (data.data.status === 'running') {
          setThinkingPhase('executing');
        }
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
        setThinkingPhase('reviewing');
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
    
    // Reset thinking state
    setThinkingPhase('understanding');
    setThinkingDetails('');
    
    setMessages(prev => [...prev, {
      type: 'user',
      message,
      time
    }]);
    
    setMessages(prev => [...prev, {
      type: 'agent',
      response: '',
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
    setThinkingPhase('understanding');
    setThinkingDetails('');
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
                        thinkingPhase={thinkingPhase}
                        thinkingDetails={thinkingDetails}
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
