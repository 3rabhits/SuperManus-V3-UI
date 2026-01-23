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
  GitHub: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 12.315 3.6675 15.0975 6.7125 16.1025C7.0875 16.17 7.2225 15.9375 7.2225 15.7425C7.2225 15.57 7.215 14.9925 7.215 14.385C5.25 14.7525 4.785 13.9275 4.635 13.4925C4.5525 13.2675 4.185 12.63 3.8625 12.4575C3.6 12.315 3.225 11.9475 3.855 11.94C4.455 11.9325 4.8825 12.5025 5.0175 12.735C5.7075 13.9125 6.8175 13.5825 7.2525 13.3875C7.32 12.915 7.515 12.5925 7.725 12.4125C5.9175 12.2325 4.035 11.535 4.035 8.6325C4.035 7.7925 4.335 7.095 5.0325 6.555C4.9575 6.375 4.6875 5.5875 5.1075 4.545C5.1075 4.545 5.7525 4.3575 7.2225 5.3325C7.8375 5.1675 8.4825 5.085 9.1275 5.085C9.7725 5.085 10.4175 5.1675 11.0325 5.3325C12.5025 4.35 13.1475 4.545 13.1475 4.545C13.5675 5.5875 13.2975 6.375 13.2225 6.555C13.92 7.095 14.22 7.785 14.22 8.6325C14.22 11.5425 12.33 12.2325 10.5225 12.4125C10.7925 12.6375 11.0325 13.0725 11.0325 13.7475C11.0325 14.715 11.025 15.495 11.025 15.7425C11.025 15.9375 11.16 16.1775 11.535 16.1025C14.3325 15.0975 16.5 12.3075 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z" fill="currentColor"/>
    </svg>
  ),
  Email: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 6L9 10L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Threads: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2C5.13 2 2 5.13 2 9C2 12.87 5.13 16 9 16C12.87 16 16 12.87 16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 6V9L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  Mic: () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="6" y="2" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 9C3 12.3137 5.68629 15 9 15C12.3137 15 15 12.3137 15 9M9 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Refresh: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8C2 4.68629 4.68629 2 8 2C10.5 2 12.5 3.5 13.5 5.5M14 8C14 11.3137 11.3137 14 8 14C5.5 14 3.5 12.5 2.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M13 2V6H9M3 14V10H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export default Icons;
