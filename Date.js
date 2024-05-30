function getCurrentDateTime12Hour() {
    const now = new Date();
  
    // Get date components
    const day = now.getDate();
    const month = now.getMonth() + 1; // Month is zero-based, so we add 1
    const year = now.getFullYear();
  
    // Get time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
  
    // Determine AM/PM and convert hours to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
  
    // Format date and time components
    const formattedDate = `${day.toString().padStart(2, '0')}:${month.toString().padStart(2, '0')}:${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
  
    // Combine date sand time into the desired format
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
  
    return formattedDateTime;
  }
  
  // Example usage:
  const currentDateTime = getCurrentDateTime12Hour();
   export {currentDateTime}
  