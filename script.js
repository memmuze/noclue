function nextPage() {
  const playerCount = document.getElementById("playerCount").value;
  const userCards = document.getElementById("userCards")
    ? document.getElementById("userCards").value
    : null;

  if (playerCount >= 3 && playerCount <= 6) {
    localStorage.setItem("playerCount", playerCount);
    if (userCards !== null) {
      localStorage.setItem("userCards", userCards);
    }
    window.location.href = "page3.html";
  } else {
    alert("Please enter a valid number of players (3-6).");
  }
}

function processSuspicions() {
  const suspicions = document.getElementById("suspicions").value;
  const userCards = localStorage.getItem("userCards");
  const playerCount = localStorage.getItem("playerCount");

  // Implement your logic to process suspicions and display results
  // For simplicity, let's just display entered suspicions and user cards
  const results = document.getElementById("results");
  results.innerHTML = `<h2>Results:</h2>
        <p><strong>User Cards:</strong> ${userCards}</p>
        <p><strong>Suspicions:</strong> ${suspicions}</p>`;
}
