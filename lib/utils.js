function formatTimeString(time, showMsecs, showHours) {
  let msecs = time % 1000;

  if (msecs < 10) {
    msecs = `00${msecs}`;
  } else if (msecs < 100) {
    msecs = `0${msecs}`;
  }

  let seconds = Math.floor(time / 1000);
  let minutes = Math.floor(time / 60000);
  let hours = Math.floor(time / 3600000);
  seconds = seconds - minutes * 60;
  minutes = minutes - hours * 60;  
  
  let formattedHours = showHours ? `${hours < 10 ? 0 : ""}${hours}:` : '';
  let formattedMinutes = `${minutes < 10 ? 0 : ""}${minutes}:`;
  let formattedSeconds = `${seconds < 10 ? 0 : ""}${seconds}`; 
  let formattedMsecs = showMsecs ? `:${msecs}` : '';
  
  return `${formattedHours}${formattedMinutes}${formattedSeconds}${formattedMsecs}`;  
}

export { formatTimeString };
