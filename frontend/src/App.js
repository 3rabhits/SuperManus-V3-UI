import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './index.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Icons - Manus.im Style SVG Icons
const Icons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  NewTask: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
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
  Share: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14" cy="14" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 8L12 5M6 10L12 13" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 3V5M9 13V15M15 9H13M5 9H3M13.2 4.8L11.8 6.2M6.2 11.8L4.8 13.2M13.2 13.2L11.8 11.8M6.2 6.2L4.8 4.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9L15 3L9 15L8 10L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ChevronUp: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 9L7 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  File: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 2H11L14 5V16H4V2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 2V5H14" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Download: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 3V12M9 12L5 8M9 12L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Expand: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 7V3H7M11 3H15V7M15 11V15H11M7 15H3V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Folder: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 5V14H16V7H9L7 5H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Clock: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3C7.5 3 6 4.5 6 6.5C6 7.5 6.5 8.5 7 9C5.5 9.5 4 11 4 13C4 15 5.5 17 8 17H12C14.5 17 16 15 16 13C16 11 14.5 9.5 13 9C13.5 8.5 14 7.5 14 6.5C14 4.5 12.5 3 10 3Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9V13M8 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Analyze: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 8H10M8 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Execute: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M6 4L14 9L6 14V4Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Review: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Copy: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4" y="4" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M10 4V3C10 2.44772 9.55228 2 9 2H3C2.44772 2 2 2.44772 2 3V9C2 9.55228 2.44772 10 3 10H4" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  ),
  Success: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Error: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Warning: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 8V11M10 14V14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Info: () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 9V14M10 6V6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Rocket: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 8L4 14M6 12L2 16M12 6C14 4 15 2 15 2C15 2 13 3 11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="6" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  Thinking: () => <span className="thinking-dot">●</span>,
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
  'html': 1, 'css': 2, 'js': 3, 'jsx': 4, 'ts': 5, 'tsx': 6,
  'json': 7, 'md': 8, 'py': 9, 'txt': 10, 'zip': 11,
  'png': 12, 'jpg': 13, 'jpeg': 14, 'gif': 15, 'svg': 16, 'pdf': 17,
};

// File type groups for display
const FILE_TYPE_GROUPS = {
  'Web Pages': ['html', 'htm'],
  'Stylesheets': ['css', 'scss', 'sass', 'less'],
  'JavaScript': ['js', 'jsx', 'ts', 'tsx'],
  'Data Files': ['json', 'xml', 'yaml', 'yml'],
  'Documents': ['md', 'txt', 'pdf', 'doc', 'docx'],
  'Python': ['py', 'pyw', 'ipynb'],
  'Images': ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
  'Archives': ['zip', 'tar', 'gz', 'rar'],
};

// Get file extension
const getFileExtension = (filename) => {
  if (!filename || typeof filename !== 'string') return '';
  return filename.split('.').pop().toLowerCase();
};

// Get file icon based on extension
const getFileIcon = (filename) => {
  const ext = getFileExtension(filename);
  const iconMap = {
    'html': '🌐', 'htm': '🌐', 'css': '🎨', 'scss': '🎨',
    'js': '📜', 'jsx': '⚛️', 'ts': '📘', 'tsx': '⚛️',
    'json': '📋', 'md': '📝', 'txt': '📄',
    'py': '🐍', 'ipynb': '📓',
    'png': '🖼️', 'jpg': '🖼️', 'jpeg': '🖼️', 'gif': '🎞️', 'svg': '🎨',
    'zip': '📦', 'pdf': '📕',
  };
  return iconMap[ext] || '📄';
};

// Get file type group
const getFileTypeGroup = (filename) => {
  const ext = getFileExtension(filename);
  for (const [group, extensions] of Object.entries(FILE_TYPE_GROUPS)) {
    if (extensions.includes(ext)) return group;
  }
  return 'Other Files';
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Format time ago
const formatTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

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

// ============================================================================
// ENHANCED THINKING INDICATOR - Premium Design
// ============================================================================
function ThinkingIndicator({ phase, progress, details }) {
  const phases = [
    { id: 'understanding', label: 'Understanding request', icon: Icons.Brain, color: '#8b5cf6' },
    { id: 'planning', label: 'Planning approach', icon: Icons.Analyze, color: '#3b82f6' },
    { id: 'executing', label: 'Executing task', icon: Icons.Execute, color: '#10b981' },
    { id: 'reviewing', label: 'Reviewing output', icon: Icons.Review, color: '#f59e0b' },
  ];

  const currentPhaseIndex = phases.findIndex(p => p.id === phase) || 0;
  const currentPhase = phases[currentPhaseIndex];

  return (
    <div className="thinking-container">
      {/* Main Thinking Card */}
      <div className="thinking-card">
        {/* Animated Header */}
        <div className="thinking-header">
          <div className="thinking-orb">
            <div className="orb-ring orb-ring-1"></div>
            <div className="orb-ring orb-ring-2"></div>
            <div className="orb-ring orb-ring-3"></div>
            <div className="orb-core">
              <Icons.Brain />
            </div>
          </div>
          <div className="thinking-title-section">
            <h3 className="thinking-title">
              Thinking
              <span className="thinking-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </h3>
            <p className="thinking-subtitle">{currentPhase?.label || 'Processing...'}</p>
          </div>
        </div>

        {/* Phase Progress */}
        <div className="thinking-phases-grid">
          {phases.map((p, index) => {
            const isCompleted = index < currentPhaseIndex;
            const isActive = index === currentPhaseIndex;
            const isPending = index > currentPhaseIndex;
            
            return (
              <div 
                key={p.id}
                className={`phase-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isPending ? 'pending' : ''}`}
                style={{ '--phase-color': p.color }}
              >
                <div className="phase-icon-wrapper">
                  {isCompleted ? (
                    <div className="phase-check">
                      <Icons.Check />
                    </div>
                  ) : isActive ? (
                    <div className="phase-spinner-wrapper">
                      <div className="phase-spinner"></div>
                      <p.icon />
                    </div>
                  ) : (
                    <div className="phase-icon-pending">
                      <p.icon />
                    </div>
                  )}
                </div>
                <span className="phase-label">{p.label}</span>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="thinking-progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="progress-bar-glow"></div>
                </div>
              </div>
              <span className="progress-percentage">{progress}%</span>
            </div>
          </div>
        )}

        {/* Details Section */}
        {details && (
          <div className="thinking-details-section">
            <div className="detail-card">
              <Icons.Terminal />
              <span className="detail-text">{details}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// ENHANCED STEP ITEM - Timeline Design
// ============================================================================
function StepItem({ step, index, isExpanded, onToggle, isLast, totalSteps }) {
  const [copied, setCopied] = useState(false);

  const getStepIcon = () => {
    if (step.status === 'completed') return <Icons.Check />;
    if (step.status === 'running') return <div className="step-spinner-mini"></div>;
    if (step.status === 'error') return <Icons.Error />;
    return <span className="step-number">{index + 1}</span>;
  };

  const getStepCategory = () => {
    const title = (step.title || step.action || '').toLowerCase();
    if (title.includes('analyz') || title.includes('understand') || title.includes('read') || title.includes('observ')) return 'analyze';
    if (title.includes('creat') || title.includes('writ') || title.includes('generat') || title.includes('build') || title.includes('sav')) return 'create';
    if (title.includes('execut') || title.includes('run') || title.includes('process') || title.includes('python')) return 'execute';
    if (title.includes('review') || title.includes('check') || title.includes('verify') || title.includes('termin') || title.includes('complet')) return 'review';
    return 'default';
  };

  const category = getStepCategory();
  const categoryColors = {
    analyze: { bg: '#eff6ff', border: '#3b82f6', text: '#1d4ed8' },
    create: { bg: '#fff7ed', border: '#f97316', text: '#c2410c' },
    execute: { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
    review: { bg: '#fefce8', border: '#eab308', text: '#a16207' },
    default: { bg: '#f8fafc', border: '#94a3b8', text: '#475569' },
  };

  const colors = categoryColors[category];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className={`step-card ${step.status || 'pending'} ${isExpanded ? 'expanded' : ''}`}
      style={{ '--step-color': colors.border, '--step-bg': colors.bg, '--step-text': colors.text }}
    >
      {/* Timeline Connector */}
      <div className="step-timeline">
        <div className={`timeline-dot ${step.status}`}>
          {getStepIcon()}
        </div>
        {!isLast && <div className={`timeline-line ${step.status === 'completed' ? 'completed' : ''}`}></div>}
      </div>

      {/* Step Content */}
      <div className="step-body">
        <div className="step-header" onClick={onToggle}>
          <div className="step-header-left">
            <span className={`step-category-badge category-${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
            <h4 className="step-title">{step.title || step.action}</h4>
          </div>
          <div className="step-header-right">
            {step.duration && (
              <span className="step-duration">
                <Icons.Clock />
                {step.duration}
              </span>
            )}
            <button className="step-toggle-btn">
              {isExpanded ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="step-expanded-content">
            {step.description && (
              <p className="step-description">{step.description}</p>
            )}
            
            {step.details && (
              <div className="step-code-section">
                <div className="code-header">
                  <span className="code-label">
                    <Icons.Terminal />
                    Output
                  </span>
                  <button 
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(typeof step.details === 'object' ? JSON.stringify(step.details, null, 2) : step.details)}
                  >
                    <Icons.Copy />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="step-code">
                  {typeof step.details === 'object' ? JSON.stringify(step.details, null, 2) : step.details}
                </pre>
              </div>
            )}

            {step.output && (
              <div className="step-output-section">
                <div className="output-header">
                  <Icons.Check />
                  <span>Result</span>
                </div>
                <div className="output-content">
                  {step.output}
                </div>
              </div>
            )}

            {step.files && step.files.length > 0 && (
              <div className="step-files-section">
                <div className="files-header">
                  <Icons.File />
                  <span>Files Created ({step.files.length})</span>
                </div>
                <div className="files-grid">
                  {step.files.map((file, i) => (
                    <div key={i} className="file-badge">
                      <span className="file-icon">{getFileIcon(file)}</span>
                      <span className="file-name">{file}</span>
                    </div>
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

// ============================================================================
// MARKDOWN CODE BLOCK - Enhanced Syntax Highlighting
// ============================================================================
const MarkdownCodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const codeString = String(children).replace(/\n$/, '');

  const copyCode = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!inline && (language || codeString.includes('\n'))) {
    return (
      <div className="code-block-wrapper">
        <div className="code-block-header">
          <div className="code-block-lang">
            <Icons.Code />
            <span>{language || 'code'}</span>
          </div>
          <button className={`code-copy-btn ${copied ? 'copied' : ''}`} onClick={copyCode}>
            <Icons.Copy />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <SyntaxHighlighter
          style={oneDark}
          language={language || 'text'}
          PreTag="div"
          customStyle={{
            margin: 0,
            borderRadius: '0 0 12px 12px',
            fontSize: '13px',
            padding: '20px',
            background: '#1e1e2e',
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

// ============================================================================
// MARKDOWN CONTENT RENDERER
// ============================================================================
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

// ============================================================================
// TASK SUMMARY COMPONENT - Shows at end of task
// ============================================================================
function TaskSummary({ steps, files, duration, status }) {
  const completedSteps = steps?.filter(s => s.status === 'completed').length || 0;
  const totalFiles = files?.length || 0;

  return (
    <div className={`task-summary-card ${status}`}>
      <div className="summary-header">
        <div className="summary-icon">
          {status === 'success' ? <Icons.Success /> : status === 'error' ? <Icons.Error /> : <Icons.Info />}
        </div>
        <div className="summary-title">
          <h3>{status === 'success' ? 'Task Completed' : status === 'error' ? 'Task Failed' : 'Task Summary'}</h3>
          <p>{status === 'success' ? 'All operations completed successfully' : 'See details below'}</p>
        </div>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-value">{completedSteps}</span>
          <span className="stat-label">Steps Completed</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">{totalFiles}</span>
          <span className="stat-label">Files Created</span>
        </div>
        {duration && (
          <>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{duration}</span>
              <span className="stat-label">Duration</span>
            </div>
          </>
        )}
      </div>

      {files && files.length > 0 && (
        <div className="summary-files">
          <h4>Created Files</h4>
          <div className="files-list">
            {files.slice(0, 5).map((file, i) => {
              const fileName = typeof file === 'string' ? file : file?.name || 'Unknown';
              return (
                <div key={i} className="file-item">
                  <span className="file-icon">{getFileIcon(fileName)}</span>
                  <span className="file-name">{fileName}</span>
                </div>
              );
            })}
            {files.length > 5 && (
              <div className="files-more">+{files.length - 5} more files</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// ENHANCED AGENT RESPONSE COMPONENT
// ============================================================================
function AgentResponse({ response, steps, status, thinkingPhase, thinkingDetails, expandedSteps, onStepToggle, files }) {
  const completedSteps = steps?.filter(s => s.status === 'completed').length || 0;
  const totalSteps = steps?.length || 0;
  const isComplete = status === 'complete' || status === 'success';

  return (
    <div className="agent-response-wrapper">
      {/* Thinking State */}
      {status === 'thinking' && (
        <ThinkingIndicator 
          phase={thinkingPhase || 'understanding'} 
          details={thinkingDetails}
          progress={totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : undefined}
        />
      )}
      
      {/* Steps Timeline */}
      {steps && steps.length > 0 && (
        <div className="steps-section">
          <div className="steps-header">
            <div className="steps-title-section">
              <h3 className="steps-title">Task Progress</h3>
              <span className="steps-counter">{completedSteps}/{totalSteps} steps</span>
            </div>
            {totalSteps > 0 && (
              <div className="steps-progress-mini">
                <div className="progress-mini-bar">
                  <div 
                    className="progress-mini-fill"
                    style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="steps-timeline-container">
            {steps.map((step, index) => (
              <StepItem
                key={step.id || index}
                step={step}
                index={index}
                isExpanded={expandedSteps.includes(index)}
                onToggle={() => onStepToggle(index)}
                isLast={index === steps.length - 1}
                totalSteps={totalSteps}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Response Content */}
      {response && status !== 'thinking' && (
        <div className="response-section">
          <div className="response-card">
            <MarkdownContent content={response} />
          </div>
        </div>
      )}

      {/* Task Summary - Show when complete */}
      {isComplete && steps && steps.length > 0 && (
        <TaskSummary 
          steps={steps}
          files={files}
          status="success"
        />
      )}
    </div>
  );
}

// ============================================================================
// MANUS COMPUTER MINI BAR
// ============================================================================
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
        {totalSteps > 0 && (
          <>
            <button className="nav-btn" onClick={() => onNavigate('prev')} disabled={currentStep <= 1}>
              <Icons.ArrowLeft />
            </button>
            <span className="step-indicator">{currentStep}/{totalSteps}</span>
            <button className="nav-btn" onClick={() => onNavigate('next')} disabled={currentStep >= totalSteps}>
              <Icons.ArrowRight />
            </button>
          </>
        )}
      </div>
      <div className="computer-mini-right">
        <button className="expand-btn" onClick={onExpand}>
          <Icons.Expand />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MANUS COMPUTER EXPANDED VIEW
// ============================================================================
function ManusComputerExpanded({ isOpen, onClose, currentStep, steps, screenshot }) {
  if (!isOpen) return null;

  return (
    <div className="manus-computer-overlay" onClick={onClose}>
      <div className="manus-computer-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Icons.Computer />
            <span>Manus's Computer</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <Icons.Close />
          </button>
        </div>
        <div className="modal-content">
          <div className="computer-screen">
            {screenshot ? (
              <img src={screenshot} alt="Computer screen" />
            ) : (
              <div className="screen-placeholder">
                <Icons.Computer />
                <p>No screen capture available</p>
              </div>
            )}
          </div>
          {steps && steps[currentStep - 1] && (
            <div className="current-step-info">
              <h4>Current Step: {steps[currentStep - 1].title}</h4>
              <p>{steps[currentStep - 1].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FILES PANEL COMPONENT
// ============================================================================
function FilesPanel({ files, sortBy, onSortChange, onFileSelect, selectedFile }) {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedFiles = useMemo(() => {
    if (!files) return [];
    
    let sorted = [...files];
    
    switch (sortBy) {
      case 'type':
        sorted.sort((a, b) => {
          const extA = getFileExtension(a.name);
          const extB = getFileExtension(b.name);
          return (FILE_TYPE_PRIORITY[extA] || 99) - (FILE_TYPE_PRIORITY[extB] || 99);
        });
        break;
      case 'date':
        sorted.sort((a, b) => new Date(b.modified || 0) - new Date(a.modified || 0));
        break;
      case 'size':
        sorted.sort((a, b) => (b.size || 0) - (a.size || 0));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    
    return sorted;
  }, [files, sortBy]);

  const groupedFiles = useMemo(() => {
    if (sortBy !== 'type') return null;
    
    const groups = {};
    sortedFiles.forEach(file => {
      const group = getFileTypeGroup(file.name);
      if (!groups[group]) groups[group] = [];
      groups[group].push(file);
    });
    return groups;
  }, [sortedFiles, sortBy]);

  const currentSortOption = SORT_OPTIONS.find(opt => opt.id === sortBy);

  return (
    <div className="files-panel">
      <div className="files-panel-header">
        <h3>Files <span className="file-count">{files?.length || 0}</span></h3>
        <div className="sort-dropdown">
          <button 
            className="sort-trigger"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            {currentSortOption && <currentSortOption.icon />}
            <span>{currentSortOption?.label}</span>
            <Icons.ChevronDown />
          </button>
          {showSortMenu && (
            <div className="sort-menu">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.id}
                  className={`sort-option ${sortBy === option.id ? 'active' : ''}`}
                  onClick={() => {
                    onSortChange(option.id);
                    setShowSortMenu(false);
                  }}
                >
                  <option.icon />
                  <span>{option.label}</span>
                  {sortBy === option.id && <Icons.Check />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="files-list-container">
        {sortBy === 'type' && groupedFiles ? (
          Object.entries(groupedFiles).map(([group, groupFiles]) => (
            <div key={group} className="file-group">
              <div className="file-group-header">{group}</div>
              {groupFiles.map((file, index) => (
                <div
                  key={index}
                  className={`file-item ${selectedFile === file.name ? 'selected' : ''}`}
                  onClick={() => onFileSelect(file)}
                >
                  <span className="file-icon">{getFileIcon(file.name)}</span>
                  <span className="file-name">{file.name}</span>
                  {file.size && <span className="file-size">{formatFileSize(file.size)}</span>}
                </div>
              ))}
            </div>
          ))
        ) : (
          sortedFiles.map((file, index) => (
            <div
              key={index}
              className={`file-item ${selectedFile === file.name ? 'selected' : ''}`}
              onClick={() => onFileSelect(file)}
            >
              <span className="file-icon">{getFileIcon(file.name)}</span>
              <span className="file-name">{file.name}</span>
              {sortBy === 'size' && file.size && (
                <span className="file-size">{formatFileSize(file.size)}</span>
              )}
              {sortBy === 'date' && file.modified && (
                <span className="file-date">{formatTimeAgo(file.modified)}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState([]);
  const [rightPanelTab, setRightPanelTab] = useState('preview');
  const [selectedFile, setSelectedFile] = useState(null);
  const [sortBy, setSortBy] = useState('type');
  const [showManusExpanded, setShowManusExpanded] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample files for demo
  const [files, setFiles] = useState([
    { name: 'index.html', size: 4520, modified: new Date() },
    { name: 'styles.css', size: 2340, modified: new Date(Date.now() - 3600000) },
    { name: 'app.js', size: 8900, modified: new Date(Date.now() - 7200000) },
    { name: 'utils.js', size: 1200, modified: new Date(Date.now() - 86400000) },
    { name: 'data.json', size: 15600, modified: new Date(Date.now() - 172800000) },
    { name: 'README.md', size: 890, modified: new Date(Date.now() - 259200000) },
    { name: 'logo.png', size: 45000, modified: new Date(Date.now() - 345600000) },
    { name: 'favicon.svg', size: 1200, modified: new Date(Date.now() - 432000000) },
  ]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleStepToggle = useCallback((index) => {
    setExpandedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  }, []);

  const simulateAgentResponse = useCallback((userMessage) => {
    // Create task with thinking state
    const taskId = Date.now();
    setCurrentTask({
      id: taskId,
      status: 'thinking',
      thinkingPhase: 'understanding',
      steps: [],
      response: null,
    });

    // Simulate thinking phases
    const phases = ['understanding', 'planning', 'executing', 'reviewing'];
    let phaseIndex = 0;

    const phaseInterval = setInterval(() => {
      phaseIndex++;
      if (phaseIndex < phases.length) {
        setCurrentTask(prev => ({
          ...prev,
          thinkingPhase: phases[phaseIndex],
        }));
      }
    }, 1500);

    // Simulate steps
    setTimeout(() => {
      const steps = [
        { id: 1, title: 'Analyzing task', action: 'analyze', status: 'completed', description: 'Understanding the requirements and planning the approach.' },
        { id: 2, title: 'Executing task', action: 'execute', status: 'completed', description: 'Running the necessary operations.', details: "{'observation': '55\\n', 'success': True}" },
      ];
      
      setCurrentTask(prev => ({
        ...prev,
        steps: steps,
      }));
    }, 2000);

    // Complete the task
    setTimeout(() => {
      clearInterval(phaseInterval);
      
      const response = `## Task Completed Successfully! 🎉

I've created a Python function to calculate Fibonacci numbers with comprehensive documentation.

### Function Overview

The \`fibonacci(n)\` function calculates the n-th Fibonacci number using an iterative approach for optimal performance.

\`\`\`python
def fibonacci(n):
    """
    Calculate the n-th Fibonacci number.
    
    Args:
        n (int): The position in the Fibonacci sequence (0-indexed)
        
    Returns:
        int: The n-th Fibonacci number
        
    Raises:
        ValueError: If n is negative
        
    Example:
        >>> fibonacci(10)
        55
    """
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return n
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
\`\`\`

### Features

- **Efficient**: Uses O(n) time complexity
- **Memory-safe**: O(1) space complexity
- **Well-documented**: Includes docstring with examples
- **Error handling**: Validates input parameters

### Usage Example

\`\`\`python
# Calculate the 10th Fibonacci number
result = fibonacci(10)
print(f"The 10th Fibonacci number is: {result}")
# Output: The 10th Fibonacci number is: 55
\`\`\`

Would you like me to:
- Save this to a file?
- Add more features?
- Create unit tests?`;

      setCurrentTask(prev => ({
        ...prev,
        status: 'complete',
        response: response,
        thinkingPhase: null,
      }));

      // Add new files
      setFiles(prev => [
        { name: 'fibonacci.py', size: 1250, modified: new Date() },
        ...prev,
      ]);
    }, 6000);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setExpandedSteps([]);
    
    simulateAgentResponse(inputValue);
  }, [inputValue, simulateAgentResponse]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const handleQuickAction = useCallback((action) => {
    const prompts = {
      research: 'Research the latest trends in AI and machine learning',
      code: 'Write a Python function to sort a list of numbers',
      automate: 'Create a workflow to automate daily tasks',
      create: 'Generate a creative story about space exploration',
    };
    setInputValue(prompts[action] || '');
    inputRef.current?.focus();
  }, []);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Icons.Logo />
            <span>supermanus</span>
          </div>
        </div>

        <div className="sidebar-actions">
          <button className="sidebar-btn primary">
            <Icons.NewTask />
            <span>New task</span>
          </button>
          <button className="sidebar-btn">
            <Icons.Search />
            <span>Search</span>
            <kbd>Ctrl+K</kbd>
          </button>
          <button className="sidebar-btn">
            <Icons.Library />
            <span>Library</span>
          </button>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">PROJECTS</h3>
        </div>

        <div className="sidebar-section">
          <h3 className="section-title">ALL TASKS</h3>
          {messages.filter(m => m.type === 'user').slice(-5).map((msg, index) => (
            <button key={index} className="task-item">
              <span className="task-title">{msg.content.substring(0, 30)}...</span>
              {index === 0 && <span className="task-active"></span>}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="sidebar-btn share-btn">
            <Icons.Share />
            <div className="share-text">
              <span>Share SuperManus with a friend</span>
              <small>Get 500 credits each</small>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
              <span className="status-dot"></span>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="topbar-center">
            <h1>SuperManus V3</h1>
          </div>
          <div className="topbar-right">
            <button className="topbar-btn"><Icons.Settings /></button>
            <button className="topbar-btn"><Icons.Expand /></button>
            <button className="topbar-btn primary"><Icons.Share /> Share</button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="chat-container">
          <div className="messages-area">
            {messages.length === 0 && !currentTask ? (
              <div className="welcome-screen">
                <h2>What can I do for you?</h2>
                <div className="input-wrapper welcome-input">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="What can I do for you?"
                    rows={1}
                  />
                  <div className="input-actions">
                    <button className="input-btn" title="Add emoji"><Icons.Emoji /></button>
                    <button className="input-btn" title="Voice input"><Icons.Mic /></button>
                    <button 
                      className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                    >
                      <Icons.Send />
                    </button>
                  </div>
                </div>
                <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>

                <div className="quick-actions">
                  <button className="quick-action-btn" onClick={() => handleQuickAction('research')}>
                    <Icons.Globe />
                    <span className="action-title">Research</span>
                    <span className="action-desc">Search and analyze information</span>
                  </button>
                  <button className="quick-action-btn" onClick={() => handleQuickAction('code')}>
                    <Icons.Code />
                    <span className="action-title">Code</span>
                    <span className="action-desc">Write and debug code</span>
                  </button>
                  <button className="quick-action-btn" onClick={() => handleQuickAction('automate')}>
                    <Icons.Lightning />
                    <span className="action-title">Automate</span>
                    <span className="action-desc">Create workflows</span>
                  </button>
                  <button className="quick-action-btn" onClick={() => handleQuickAction('create')}>
                    <Icons.Sparkle />
                    <span className="action-title">Create</span>
                    <span className="action-desc">Generate content</span>
                  </button>
                </div>

                <div className="tools-link">
                  <Icons.Settings />
                  <span>Connect your tools to SuperManus</span>
                </div>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg) => (
                  msg.type === 'user' ? (
                    <UserMessage key={msg.id} message={msg.content} time={msg.time} />
                  ) : null
                ))}
                
                {currentTask && (
                  <AgentResponse
                    response={currentTask.response}
                    steps={currentTask.steps}
                    status={currentTask.status}
                    thinkingPhase={currentTask.thinkingPhase}
                    thinkingDetails={currentTask.thinkingDetails}
                    expandedSteps={expandedSteps}
                    onStepToggle={handleStepToggle}
                    files={files}
                  />
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area (when not welcome screen) */}
          {(messages.length > 0 || currentTask) && (
            <div className="input-area">
              <div className="input-wrapper">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="What can I do for you?"
                  rows={1}
                />
                <div className="input-actions">
                  <button className="input-btn" title="Add emoji"><Icons.Emoji /></button>
                  <button className="input-btn" title="Voice input"><Icons.Mic /></button>
                  <button 
                    className={`send-btn ${inputValue.trim() ? 'active' : ''}`}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  >
                    <Icons.Send />
                  </button>
                </div>
              </div>
              <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
            </div>
          )}
        </div>

        {/* Manus Computer Mini Bar */}
        {currentTask && (
          <ManusComputerMini
            currentStep={currentStepIndex}
            totalSteps={currentTask.steps?.length || 0}
            status={currentTask.status === 'thinking' ? 'running' : 'idle'}
            onExpand={() => setShowManusExpanded(true)}
            onNavigate={(dir) => {
              if (dir === 'prev' && currentStepIndex > 1) {
                setCurrentStepIndex(prev => prev - 1);
              } else if (dir === 'next' && currentStepIndex < (currentTask.steps?.length || 0)) {
                setCurrentStepIndex(prev => prev + 1);
              }
            }}
          />
        )}
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="panel-tabs">
          <button 
            className={`panel-tab ${rightPanelTab === 'preview' ? 'active' : ''}`}
            onClick={() => setRightPanelTab('preview')}
          >
            Preview
          </button>
          <button 
            className={`panel-tab ${rightPanelTab === 'code' ? 'active' : ''}`}
            onClick={() => setRightPanelTab('code')}
          >
            Code
          </button>
          <button 
            className={`panel-tab ${rightPanelTab === 'files' ? 'active' : ''}`}
            onClick={() => setRightPanelTab('files')}
          >
            Files <span className="tab-count">{files.length}</span>
          </button>
        </div>

        <div className="panel-content">
          {rightPanelTab === 'files' ? (
            <FilesPanel
              files={files}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFileSelect={setSelectedFile}
              selectedFile={selectedFile?.name}
            />
          ) : rightPanelTab === 'preview' ? (
            <div className="preview-placeholder">
              <Icons.Image />
              <p>Select an HTML file to preview</p>
            </div>
          ) : (
            <div className="code-placeholder">
              <Icons.Code />
              <p>Select a file to view code</p>
            </div>
          )}
        </div>

        <div className="panel-actions">
          <button className="panel-action-btn"><Icons.Download /></button>
          <button className="panel-action-btn"><Icons.Expand /></button>
          <button className="panel-action-btn"><Icons.Share /></button>
        </div>
      </aside>

      {/* Manus Computer Expanded Modal */}
      <ManusComputerExpanded
        isOpen={showManusExpanded}
        onClose={() => setShowManusExpanded(false)}
        currentStep={currentStepIndex}
        steps={currentTask?.steps}
      />
    </div>
  );
}

export default App;
