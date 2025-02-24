function formatTime(elapsedTime) {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = seconds / 60; // Convert seconds to minutes (decimal)
  const hours = minutes / 60; // Convert minutes to hours (decimal)

  if (hours >= 1) {
    // Display in hours (e.g., 1.5 hours)
    return `${hours.toFixed(1)} hours`;
  } else if (minutes >= 1) {
    // Display in minutes (e.g., 1.5 minutes)
    return `${minutes.toFixed(1)} minutes`;
  } else {
    // Display in seconds (e.g., 59 seconds)
    return `${seconds} seconds`;
  }
}

function updateTime() {
  chrome.runtime.sendMessage({ action: "getElapsedTime" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error("Error:", chrome.runtime.lastError.message);
      return;
    }
    if (response && response.elapsedTime) {
      const formattedTime = formatTime(response.elapsedTime);
      document.getElementById('time').textContent = formattedTime;
    } else {
      console.error("Invalid response:", response);
    }
  });
}

// Update the time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();