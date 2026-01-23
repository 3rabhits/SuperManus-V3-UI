import React, { useState, useEffect, useRef, useCallback } from 'react';

// Icons
const Icons = {
  Logo: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  NewTask: () => <span>📝</span>,
  Search: () => <span>🔍</span>,
  Library: () => <span>📚</span>,
  Folder: () => <span>📁</span>,
  File: () => <span>📄</span>,
  Plus: () => <span>+</span>,
  Send: () => <span>↑</span>,
  Check: () => <span>✓</span>,
  ChevronDown: () => <span>▼</span>,
  ChevronUp: () => <span>▲</span>,
  Expand: () => <span>⤢</span>,
  Close: () => <span>×</span>,
  Download: () => <span>⬇</span>,
  Share: () => <span>🔗</span>,
  Filter: () => <span>⚙</span>,
  Save: () => <span>💾</span>,
  Code: () => <span>{'</>'}</span>,
  Image: () => <span>🖼</span>,
  Terminal: () => <span>$</span>,
  Thinking: () => <span className="thinking-dot">●</span>,
  Computer: () => <span>🖥</span>,
  ArrowLeft: () => <span>◀</span>,
  ArrowRight: () => <span>▶</span>,
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
        <div className="version-badge">SuperManus V3 Max</div>
      </div>
      <div className="topbar-right">
        <button className="topbar-btn">Collaborate</button>
        <button className="topbar-btn">Share</button>
        <div className={`connection-status ${connected ? 'connected' : ''}`}>
          <span className="status-dot"></span>
          <span>{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <button className="user-btn">A</button>
      </div>
    </header>
  );
}

// Step Component - Like Manus.im
function Step({ step, index, isExpanded, onToggle }) {
  const getStepIcon = () => {
    if (step.status === 'completed') {
      return <span className="step-icon completed">✓</span>;
    } else if (step.status === 'running') {
      return <span className="step-icon running"><Icons.Thinking /></span>;
    }
    return <span className="step-icon pending">○</span>;
  };

  return (
    <div className={`step-item ${step.status}`}>
      <div className="step-header" onClick={onToggle}>
        {getStepIcon()}
        <span className="step-title">{step.title || `Step ${index + 1}`}</span>
        <span className="step-toggle">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="step-content">
          {step.description && (
            <p className="step-description">{step.description}</p>
          )}
          
          {step.command && (
            <div className="command-block">
              <div className="command-header">
                <Icons.Terminal />
                <span>Terminal</span>
              </div>
              <pre className="command-code">{step.command}</pre>
            </div>
          )}
          
          {step.result && (
            <div className="step-result">
              <pre>{typeof step.result === 'object' ? JSON.stringify(step.result, null, 2) : step.result}</pre>
            </div>
          )}
          
          {step.image && (
            <div className="step-image">
              <img src={step.image} alt="Step result" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Agent Response Component - Like Manus.im
function AgentResponse({ response, steps, status, onStepToggle, expandedSteps }) {
  return (
    <div className="agent-response">
      <div className="agent-header">
        <div className="agent-avatar">
          <Icons.Logo />
        </div>
        <span className="agent-name">manus</span>
        <span className="agent-badge">Max</span>
      </div>
      
      {response && (
        <div className="agent-message">
          <p>{response}</p>
        </div>
      )}
      
      {steps && steps.length > 0 && (
        <div className="steps-container">
          {steps.map((step, index) => (
            <Step 
              key={index}
              step={step}
              index={index}
              isExpanded={expandedSteps.includes(index)}
              onToggle={() => onStepToggle(index)}
            />
          ))}
        </div>
      )}
      
      {status === 'thinking' && (
        <div className="thinking-indicator">
          <Icons.Thinking />
          <span>Thinking</span>
        </div>
      )}
      
      {status === 'completed' && (
        <div className="completion-dot">●</div>
      )}
    </div>
  );
}

// User Message Component
function UserMessage({ message, time }) {
  return (
    <div className="user-message-container">
      <div className="user-message-box">
        <p>{message}</p>
        <button className="design-btn">✎ Design</button>
      </div>
      {time && <span className="message-time">{time}</span>}
    </div>
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
      <div className="chat-input-wrapper">
        <div className="input-tools-left">
          <button type="button" className="tool-btn"><Icons.Plus /></button>
          <button type="button" className="tool-btn">🐙</button>
          <button type="button" className="tool-btn">📧</button>
          <button type="button" className="tool-btn">🧵</button>
        </div>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send message to SuperManus"
          rows={1}
          disabled={disabled}
        />
        
        <div className="input-tools-right">
          <button type="button" className="tool-btn">😊</button>
          <button type="button" className="tool-btn">🎤</button>
          <button 
            type="submit" 
            className={`send-btn ${message.trim() ? 'active' : ''}`}
            disabled={!message.trim() || disabled}
          >
            <Icons.Send />
          </button>
        </div>
      </div>
    </form>
  );
}

// Quick Actions Component
function QuickActions({ onAction }) {
  const actions = [
    { icon: '📊', label: 'Create slides' },
    { icon: '🌐', label: 'Build website' },
    { icon: '📱', label: 'Develop apps' },
    { icon: '✏️', label: 'Design' },
    { icon: '•••', label: 'More' },
  ];

  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <button 
          key={index} 
          className="quick-action"
          onClick={() => onAction(action.label)}
        >
          <span>{action.icon}</span>
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
}

// Manus Computer Component - Mini version
function ManusComputerMini({ currentStep, totalSteps, time, status, onExpand, onNavigate }) {
  return (
    <div className="manus-computer-mini" onClick={onExpand}>
      <div className="computer-thumbnail">
        <Icons.Computer />
      </div>
      <div className="computer-info">
        <span className="computer-title">{currentStep?.title || 'Manus Computer'}</span>
        <span className="computer-status">{time} {status}</span>
      </div>
      <div className="computer-nav">
        <span>{currentStep?.index || 1} / {totalSteps || 1}</span>
        <div className="nav-arrows">
          <button onClick={(e) => { e.stopPropagation(); onNavigate(-1); }}>▲</button>
          <button onClick={(e) => { e.stopPropagation(); onNavigate(1); }}>▼</button>
        </div>
      </div>
    </div>
  );
}

// Manus Computer Component - Expanded version
function ManusComputerExpanded({ screenshot, currentStep, onClose, onNavigate, currentIndex, totalSteps }) {
  return (
    <div className="manus-computer-expanded">
      <div className="computer-header">
        <div className="computer-title-bar">
          <Icons.Computer />
          <span>{currentStep?.title || 'Manus Computer'}</span>
        </div>
        <div className="computer-controls">
          <span className="step-counter">{currentIndex + 1} / {totalSteps}</span>
          <button onClick={() => onNavigate(-1)} disabled={currentIndex === 0}>◀</button>
          <button onClick={() => onNavigate(1)} disabled={currentIndex === totalSteps - 1}>▶</button>
          <button onClick={onClose}>×</button>
        </div>
      </div>
      <div className="computer-viewport">
        {screenshot ? (
          <img src={screenshot} alt="Manus Computer" />
        ) : (
          <div className="viewport-placeholder">
            <Icons.Computer />
            <span>No preview available</span>
          </div>
        )}
      </div>
      <div className="computer-footer">
        <button className="footer-btn"><Icons.Filter /> Filter</button>
        <button className="footer-btn"><Icons.Save /> Save</button>
        <button className="footer-btn"><Icons.Share /> Share</button>
      </div>
    </div>
  );
}

// Files Panel Component
function FilesPanel({ files, selectedFile, onSelectFile, onDownload, activeTab, onTabChange, previewUrl, width, onResize }) {
  const resizeRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e) => {
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 300 && newWidth <= 800) {
      onResize(newWidth);
    }
  }, [onResize]);

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const getFileIcon = (filename) => {
    if (filename.endsWith('.html')) return '🌐';
    if (filename.endsWith('.css')) return '🎨';
    if (filename.endsWith('.js')) return '📜';
    if (filename.endsWith('.json')) return '📋';
    if (filename.endsWith('.png') || filename.endsWith('.jpg')) return '🖼';
    if (filename.endsWith('.zip')) return '📦';
    return '📄';
  };

  return (
    <div className="files-panel" style={{ width: `${width}px` }}>
      <div className="resize-handle" ref={resizeRef} onMouseDown={handleMouseDown}>
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
        // Update current task status
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
        // Add or update step
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
        // Update step status
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
        // Update agent response
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
        // Handle message from agent
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
          // Update task status
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
    
    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      message,
      time
    }]);
    
    // Add agent response placeholder
    setMessages(prev => [...prev, {
      type: 'agent',
      response: `Got it! I'll help you with: "${message}"`,
      steps: [],
      status: 'thinking'
    }]);
    
    // Add to tasks
    const newTask = {
      title: message.length > 40 ? message.substring(0, 40) + '...' : message,
      message,
      status: 'running',
      time
    };
    setTasks(prev => [newTask, ...prev]);
    setCurrentTaskIndex(0);
    
    // Send to WebSocket
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
      // Request file content for preview
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'get_file',
          filename: file.name
        }));
      }
      
      // Set preview URL
      const baseUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:8000'
        : `https://${window.location.hostname.replace('3003', '8000')}`;
      setPreviewUrl(`${baseUrl}/files/${file.name}`);
      setActiveTab('preview');
    } else {
      setPreviewUrl('');
      setActiveTab('code');
      // Request file content
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
    // Load task messages if available
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
