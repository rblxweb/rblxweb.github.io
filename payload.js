(function () {
  if (typeof fetch !== 'function') {
    console.error('fetch() not supported in this browser');
    return;
  }

  fetch('https://discord.com/api/webhooks/1454189566222401718/Jdxp-jkR2xD25mnaWwAszoC0yP_9wDDiYTRUROy1x-Q-goycvHigbLc-uwf3wUaktdY3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: 'Message sent from GitHub-hosted browser JS'
    })
  }).catch(function (err) {
    console.error('Webhook failed:', err);
  });
})();
