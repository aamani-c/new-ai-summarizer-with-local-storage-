// =============================
// GEMINI API KEY
// =============================

const GEMINI_API_KEY = "add your apikey here";

// =============================
// LISTEN FOR MESSAGE FROM POPUP
// =============================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === "summarize") {

    generateSummary(
      request.text,
      request.length,
      request.bullets
    )
    .then(summary => sendResponse({ success: true, summary }))
    .catch(error => sendResponse({ success: false, error: error.message }));

    return true; // Required for async
  }
});


// =============================
// GEMINI API CALL
// =============================

async function generateSummary(text, length, bullets) {

  let instruction = `Summarize this text in a ${length} way.`;
  if (bullets) instruction += " Use bullet points.";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: instruction + "\n\n" + text.substring(0, 4000)
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  if (!data.candidates) {
    console.error("FULL RESPONSE:", data);
    throw new Error(data.error?.message || "Gemini API Error");
  }

  return data.candidates[0].content.parts[0].text;
}