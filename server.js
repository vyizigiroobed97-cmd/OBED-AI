<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>OBED AI</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #ffffff;
      --panel: #f7f7f8;
      --text: #202123;
      --muted: #777;
      --border: #e5e5e5;
      --input: #ffffff;
      --hover: #eeeeee;
      --user: #eeeeee;
    }

    body.dark {
      --bg: #202123;
      --panel: #171717;
      --text: #ffffff;
      --muted: #aaa;
      --border: #333;
      --input: #2b2b2b;
      --hover: #333;
      --user: #343434;
    }

    body {
      font-family: Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      height: 100vh;
      overflow: hidden;
    }

    button,
    textarea,
    select,
    input {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    .app {
      display: flex;
      height: 100vh;
      width: 100%;
    }

    /* SIDEBAR */

    .sidebar {
      width: 275px;
      background: var(--panel);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      padding: 15px;
      flex-shrink: 0;
    }

    .logo {
      font-size: 22px;
      font-weight: bold;
      padding: 10px;
      margin-bottom: 15px;
    }

    .new-chat {
      border: 1px solid var(--border);
      background: var(--input);
      color: var(--text);
      border-radius: 10px;
      padding: 12px;
      text-align: left;
      margin-bottom: 20px;
    }

    .new-chat:hover {
      background: var(--hover);
    }

    .recent-title {
      font-size: 12px;
      color: var(--muted);
      margin: 5px 10px 10px;
      font-weight: bold;
    }

    .recent-list {
      flex: 1;
      overflow-y: auto;
    }

    .recent-item {
      padding: 11px;
      border-radius: 8px;
      margin-bottom: 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--text);
    }

    .recent-item:hover {
      background: var(--hover);
    }

    .profile {
      border-top: 1px solid var(--border);
      padding: 14px 10px 5px;
      margin-top: 10px;
      color: var(--text);
      cursor: pointer;
    }

    /* MAIN */

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      background: var(--bg);
    }

    .topbar {
      height: 60px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      flex-shrink: 0;
    }

    .topbar-title {
      font-weight: bold;
      font-size: 18px;
    }

    .top-actions {
      display: flex;
      gap: 5px;
    }

    .icon-btn {
      border: 0;
      background: transparent;
      color: var(--text);
      padding: 8px;
      border-radius: 8px;
    }

    .icon-btn:hover {
      background: var(--hover);
    }

    .mobile-menu {
      display: none;
    }

    /* CHAT */

    .chat {
      flex: 1;
      overflow-y: auto;
      padding: 25px 15%;
      scroll-behavior: smooth;
    }

    .welcome {
      text-align: center;
      margin-top: 12vh;
    }

    .welcome-icon {
      font-size: 55px;
      margin-bottom: 15px;
    }

    .welcome h1 {
      font-size: 32px;
      margin-bottom: 12px;
    }

    .welcome p {
      color: var(--muted);
      font-size: 15px;
      line-height: 1.6;
    }

    .message {
      margin: 18px 0;
      display: flex;
    }

    .message.user {
      justify-content: flex-end;
    }

    .bubble {
      max-width: 80%;
      padding: 13px 16px;
      border-radius: 15px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    .user .bubble {
      background: var(--user);
    }

    .assistant .bubble {
      background: transparent;
    }

    .typing {
      color: var(--muted);
      font-style: italic;
    }

    /* COMPOSER */

    .composer-area {
      padding: 12px 15%;
      border-top: 1px solid var(--border);
      background: var(--bg);
    }

    .tools {
      display: flex;
      gap: 7px;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }

    .tool-btn {
      border: 1px solid var(--border);
      background: var(--input);
      color: var(--text);
      padding: 7px 10px;
      border-radius: 8px;
      font-size: 13px;
    }

    .tool-btn:hover,
    .tool-btn.active {
      background: var(--hover);
    }

    .composer {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 8px;
      background: var(--input);
    }

    textarea {
      flex: 1;
      border: none;
      outline: none;
      resize: none;
      min-height: 42px;
      max-height: 160px;
      padding: 10px;
      background: transparent;
      color: var(--text);
    }

    textarea::placeholder {
      color: var(--muted);
    }

    .send {
      width: 42px;
      height: 42px;
      border: none;
      border-radius: 10px;
      background: var(--text);
      color: var(--bg);
      font-size: 18px;
    }

    .send:disabled {
      opacity: 0.5;
    }

    .footer {
      text-align: center;
      color: var(--muted);
      font-size: 11px;
      margin-top: 7px;
    }

    /* MODALS */

    .modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.55);
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 20px;
    }

    .modal-box {
      background: var(--input);
      color: var(--text);
      width: 100%;
      max-width: 430px;
      border-radius: 15px;
      padding: 22px;
    }

    .modal-box h2 {
      margin-bottom: 15px;
    }

    .modal-box input,
    .modal-box select {
      width: 100%;
      padding: 11px;
      margin: 7px 0;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: var(--bg);
      color: var(--text);
    }

    .modal-buttons {
      display: flex;
      gap: 8px;
      margin-top: 12px;
    }

    .modal-buttons button {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: var(--input);
      color: var(--text);
    }

    /* MOBILE */

    @media (max-width: 700px) {

      .sidebar {
        position: fixed;
        left: -285px;
        top: 0;
        bottom: 0;
        z-index: 90;
        transition: left 0.2s;
      }

      .sidebar.open {
        left: 0;
      }

      .mobile-menu {
        display: block;
      }

      .chat {
        padding: 20px 12px;
      }

      .composer-area {
        padding: 10px;
      }

      .bubble {
        max-width: 90%;
      }

      .welcome {
        margin-top: 15vh;
      }

      .welcome h1 {
        font-size: 26px;
      }

      .tools {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 3px;
      }

      .tool-btn {
        white-space: nowrap;
      }
    }
  </style>
</head>

<body>

<div class="app">

  <!-- SIDEBAR -->

  <aside class="sidebar" id="sidebar">

    <div class="logo">
      🤖 OBED AI
    </div>

    <button class="new-chat" onclick="newChat()">
      ＋ New chat
    </button>

    <div class="recent-title">
      RECENTS
    </div>

    <div class="recent-list" id="recentList"></div>

    <div class="profile" id="profileDisplay" onclick="openProfile()">
      👤 Guest
    </div>

  </aside>


  <!-- MAIN -->

  <main class="main">

    <header class="topbar">

      <button
        class="icon-btn mobile-menu"
        onclick="toggleSidebar()">
        ☰
      </button>

      <div class="topbar-title">
        OBED AI
      </div>

      <div class="top-actions">

        <button
          class="icon-btn"
          onclick="toggleDarkMode()"
          title="Dark mode">
          🌙
        </button>

        <button
          class="icon-btn"
          onclick="openSettings()"
          title="Settings">
          ⚙️
        </button>

      </div>

    </header>


    <!-- CHAT -->

    <section class="chat" id="chat">

      <div class="welcome" id="welcome">

        <div class="welcome-icon">
          🤖
        </div>

        <h1>Hello, I am OBED AI</h1>

        <p>
          Ask me anything.<br>
          Ndashobora kugufasha mu Kirundi,
          Français, English n'izindi ndimi.
        </p>

      </div>

    </section>


    <!-- COMPOSER -->

    <div class="composer-area">

      <div class="tools">

        <button
          class="tool-btn"
          id="documentButton"
          onclick="selectDocument()">
          📎 Document
        </button>

        <button
          class="tool-btn"
          id="imageButton"
          onclick="selectImage()">
          🖼️ Image
        </button>

        <button
          class="tool-btn"
          id="createImageButton"
          onclick="imageMode()">
          🎨 Create image
        </button>

        <button
          class="tool-btn"
          id="webButton"
          onclick="webMode()">
          🌐 Web search
        </button>

        <select
          id="language"
          class="tool-btn"
          onchange="changeLanguage()">

          <option value="auto">🌐 Auto</option>
          <option value="rn">Kirundi</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
          <option value="sw">Kiswahili</option>
          <option value="es">Español</option>
          <option value="de">Deutsch</option>

        </select>

      </div>


      <input
        type="file"
        id="fileInput"
        hidden
        onchange="fileSelected(this)">

      <input
        type="file"
        id="imageInput"
        accept="image/*"
        hidden
        onchange="imageSelected(this)">


      <div class="composer">

        <textarea
          id="messageInput"
          placeholder="Message OBED AI..."
          rows="1"
          oninput="autoResize(this)"
          onkeydown="handleKey(event)"></textarea>

        <button
          class="send"
          id="sendButton"
          onclick="sendMessage()">
          ↑
        </button>

      </div>

      <div class="footer">
        OBED AI can make mistakes. Verify important information.
      </div>

    </div>

  </main>

</div>


<!-- PROFILE MODAL -->

<div class="modal" id="profileModal">

  <div class="modal-box">

    <h2>👤 Your profile</h2>

    <input
      id="nameInput"
      placeholder="Your name">

    <input
      id="schoolInput"
      placeholder="School / University">

    <input
      id="levelInput"
      placeholder="Your class / level">

    <div class="modal-buttons">

      <button onclick="closeProfile()">
        Cancel
      </button>

      <button onclick="saveProfile()">
        Save
      </button>

    </div>

  </div>

</div>


<!-- SETTINGS MODAL -->

<div class="modal" id="settingsModal">

  <div class="modal-box">

    <h2>⚙️ Settings</h2>

    <select id="defaultLanguage">

      <option value="auto">Automatic language</option>
      <option value="rn">Kirundi</option>
      <option value="fr">Français</option>
      <option value="en">English</option>
      <option value="sw">Kiswahili</option>

    </select>

    <div class="modal-buttons">

      <button onclick="closeSettings()">
        Close
      </button>

      <button onclick="saveSettings()">
        Save
      </button>

    </div>

  </div>

</div>


<script>

  const API_URL = "/api/chat";

  let conversationId = createId();

  let userId =
    localStorage.getItem("obed_user_id") || createId();

  localStorage.setItem("obed_user_id", userId);

  let useWeb = false;

  let imageCreationMode = false;

  let selectedDocument = null;

  let selectedImage = null;

  let recents =
    JSON.parse(
      localStorage.getItem("obed_recents") || "[]"
    );


  /* ID */

  function createId() {

    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2)
    );

  }


  /* ADD MESSAGE */

  function addMessage(role, text) {

    const chat =
      document.getElementById("chat");

    const welcome =
      document.getElementById("welcome");

    if (welcome) {
      welcome.remove();
    }

    const message =
      document.createElement("div");

    message.className =
      "message " + role;

    const bubble =
      document.createElement("div");

    bubble.className =
      "bubble";

    bubble.textContent =
      text;

    message.appendChild(bubble);

    chat.appendChild(message);

    chat.scrollTop =
      chat.scrollHeight;

  }


  /* TYPING */

  function showTyping() {

    const chat =
      document.getElementById("chat");

    const message =
      document.createElement("div");

    message.className =
      "message assistant";

    message.id =
      "typingMessage";

    const bubble =
      document.createElement("div");

    bubble.className =
      "bubble typing";

    bubble.textContent =
      "OBED AI is thinking...";

    message.appendChild(bubble);

    chat.appendChild(message);

    chat.scrollTop =
      chat.scrollHeight;

  }


  function removeTyping() {

    const typing =
      document.getElementById("typingMessage");

    if (typing) {
      typing.remove();
    }

  }


  /* SEND MESSAGE */

  async function sendMessage() {

    const input =
      document.getElementById("messageInput");

    const button =
      document.getElementById("sendButton");

    const message =
      input.value.trim();

    if (!message) return;

    addMessage("user", message);

    input.value = "";

    autoResize(input);

    button.disabled = true;

    addRecent(message);

    showTyping();

    try {

      const response =
        await fetch(API_URL, {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            message: message,

            userId: userId,

            conversationId: conversationId,

            useWeb: useWeb

          })

        });


      const data =
        await response.json();

      removeTyping();


      if (data.reply) {

        addMessage(
          "assistant",
          data.reply
        );

      } else {

        addMessage(
          "assistant",
          "OBED AI ntiyashoboye gusubiza ubu."
        );

      }

    } catch (error) {

      console.error(error);

      removeTyping();

      addMessage(
        "assistant",
        "Hari ikibazo co guhuza na OBED AI. Raba ko server iri online."
      );

    }


    button.disabled = false;

  }


  /* ENTER */

  function handleKey(event) {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }

  }


  /* AUTO RESIZE */

  function autoResize(textarea) {

    textarea.style.height =
      "auto";

    textarea.style.height =
      Math.min(
        textarea.scrollHeight,
        160
      ) + "px";

  }


  /* NEW CHAT */

  function newChat() {

    conversationId =
      createId();

    document.getElementById("chat").innerHTML = `

      <div class="welcome" id="welcome">

        <div class="welcome-icon">
          🤖
        </div>

        <h1>New conversation</h1>

        <p>
          Start talking with OBED AI.
        </p>

      </div>

    `;

    useWeb = false;

    imageCreationMode = false;

    updateToolButtons();

    document.getElementById(
      "messageInput"
    ).placeholder =
      "Message OBED AI...";

    toggleSidebar(false);

  }


  /* RECENTS */

  function addRecent(message) {

    const title =
      message.length > 40
        ? message.substring(0, 40) + "..."
        : message;

    recents =
      recents.filter(
        item => item.id !== conversationId
      );

    recents.unshift({

      id: conversationId,

      title: title

    });

    recents =
      recents.slice(0, 30);

    localStorage.setItem(
      "obed_recents",
      JSON.stringify(recents)
    );

    renderRecents();

  }


  function renderRecents() {

    const list =
      document.getElementById(
        "recentList"
      );

    list.innerHTML = "";

    recents.forEach(item => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "recent-item";

      div.textContent =
        item.title;

      div.onclick = () => {

        conversationId =
          item.id;

        loadHistory(item.id);

      };

      list.appendChild(div);

    });

  }


  /* LOAD HISTORY */

  async function loadHistory(id) {

    try {

      const response =
        await fetch(
          `/api/history/${encodeURIComponent(userId)}/${encodeURIComponent(id)}`
        );

      const data =
        await response.json();

      const chat =
        document.getElementById("chat");

      chat.innerHTML = "";

      if (
        !data.messages ||
        data.messages.length === 0
      ) {

        newChat();

        return;

      }

      data.messages.forEach(
        message => {

          addMessage(

            message.role === "user"
              ? "user"
              : "assistant",

            typeof message.content === "string"
              ? message.content
              : JSON.stringify(
                  message.content
                )

          );

        }
      );

      toggleSidebar(false);

    } catch (error) {

      console.error(error);

      addMessage(
        "assistant",
        "Ntivyashobotse gufungura iyi conversation."
      );

    }

  }


  /* WEB */

  function webMode() {

    useWeb =
      !useWeb;

    updateToolButtons();

    addMessage(
      "assistant",
      useWeb
        ? "🌐 Web search activated."
        : "🌐 Web search deactivated."
    );

  }


  /* IMAGE MODE */

  function imageMode() {

    imageCreationMode =
      !imageCreationMode;

    const input =
      document.getElementById(
        "messageInput"
      );

    if (imageCreationMode) {

      input.placeholder =
        "Describe the image you want OBED AI to create...";

      addMessage(
        "assistant",
        "🎨 Image mode is ready. Image generation backend will be connected next."
      );

    } else {

      input.placeholder =
        "Message OBED AI...";

    }

    updateToolButtons();

  }


  /* DOCUMENT */

  function selectDocument() {

    document
      .getElementById("fileInput")
      .click();

  }


  function fileSelected(input) {

    if (!input.files.length)
      return;

    selectedDocument =
      input.files[0];

    addMessage(
      "assistant",
      `📎 Document selected: ${selectedDocument.name}\nDocument upload/reading backend will be connected next.`
    );

  }


  /* IMAGE */

  function selectImage() {

    document
      .getElementById("imageInput")
      .click();

  }


  function imageSelected(input) {

    if (!input.files.length)
      return;

    selectedImage =
      input.files[0];

    addMessage(
      "assistant",
      `🖼️ Image selected: ${selectedImage.name}\nImage analysis backend will be connected next.`
    );

  }


  /* BUTTON STATES */

  function updateToolButtons() {

    document
      .getElementById("webButton")
      .classList.toggle(
        "active",
        useWeb
      );

    document
      .getElementById("createImageButton")
      .classList.toggle(
        "active",
        imageCreationMode
      );

  }


  /* DARK MODE */

  function toggleDarkMode() {

    document.body.classList.toggle(
      "dark"
    );

    localStorage.setItem(
      "obed_dark",
      document.body.classList.contains(
        "dark"
      )
    );

  }


  /* SIDEBAR */

  function toggleSidebar(force) {

    const sidebar =
      document.getElementById(
        "sidebar"
      );

    if (
      typeof force === "boolean"
    ) {

      sidebar.classList.toggle(
        "open",
      
