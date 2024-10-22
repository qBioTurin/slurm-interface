// convert UNIX timestamps to human-readable dates
export const formatDate = (timestamp: number): string => {
    if (!timestamp) {
      return 'Invalid date';
    }
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString(); 
  };

  // convert seconds to human-readable duration
export const formatDuration = (seconds: number): string => {
    if (seconds < 0) {
      return 'Invalid duration';
    }
  
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    const parts: string[] = [];
    if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`);
    if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`);
  
    return parts.length > 0 ? parts.join(', ') : '0 minutes';
  };