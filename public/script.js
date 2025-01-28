// Check status when page loads
window.addEventListener('load', checkStatus);

async function checkStatus() {
  try {
    const response = await fetch('/status');
    const data = await response.json();
    
    if (data.drawn) {
      // User has already drawn - show their result
      document.getElementById('drawButton').style.display = 'none';
      const resultElement = document.getElementById('result');
      resultElement.style.display = 'block';
      resultElement.innerText = data.concept;
      document.body.style.backgroundColor = data.color;
    }
    // Otherwise, leave the draw button visible
  } catch (err) {
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = "Error checking status.";
  }
}

async function drawConcept() {
  try {
    const response = await fetch('/draw');
    const data = await response.json();
    
    if (response.status === 403) {
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerText = data.error;
      document.getElementById('drawButton').style.display = 'none';
      return;
    }
    
    if (data.concept) {
      // Hide button and show result
      document.getElementById('drawButton').style.display = 'none';
      const resultElement = document.getElementById('result');
      resultElement.style.display = 'block';
      resultElement.innerText = data.concept;
      
      // Change background color based on concept type
      document.body.style.backgroundColor = data.color;
    } else {
      document.getElementById('result').style.display = 'block';
      document.getElementById('result').innerText = "No more concepts left!";
      document.getElementById('drawButton').style.display = 'none';
    }
  } catch (err) {
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = "Error drawing concept.";
  }
} 