<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h2>AI Summarizer</h2>

    <div class="controls">
      <select id="length">
        <option value="short">Short</option>
        <option value="medium" selected>Medium</option>
        <option value="long">Long</option>
      </select>

      <label class="checkbox">
        <input type="checkbox" id="bullets">
        Bullet Points
      </label>
    </div>

    <button id="summarize">Summarize Page</button>

    <div id="result" class="result"></div>

    <div class="actions">
      <button id="copy">Copy</button>
      <button id="toggleTheme">Dark</button>
    </div>

    <h3>History</h3>
    <ul id="history"></ul>
    <button id="clearHistory" class="danger">Clear History</button>
  </div>

  <script src="popup.js"></script>
</body>
</html>