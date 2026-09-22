const questionInput = document.getElementById("question");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const loading = document.getElementById("loading");
const chatArea = document.getElementById("chatArea");


// ===============================
// ASK QUESTION
// ===============================

async function askQuestion() {

    const question = questionInput.value.trim();

    if (!question) {
        return;
    }

    // Hide welcome screen
    welcome.style.display = "none";

    // Add user message
    addUserMessage(question);

    // Clear input
    questionInput.value = "";

    autoResize();

    // Loading
    loading.innerHTML = `
        <div class="typing">
            <span></span>
            <span></span>
            <span></span>
            <label>KnowAI is thinking...</label>
        </div>
    `;

    scrollToBottom();


    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                question: question
            })

        });


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.error || "Something went wrong."
            );

        }


        // Add AI response
        addAIMessage(data.answer);


    } catch (error) {

        console.error(error);

        addAIMessage(
            `❌ **Error:** ${error.message}`
        );

    } finally {

        loading.innerHTML = "";

        scrollToBottom();

    }

}


// ===============================
// USER MESSAGE
// ===============================

function addUserMessage(text) {

    const message = document.createElement("div");

    message.className = "message user-message";

    message.innerHTML = `
        <div class="user-bubble">
            ${escapeHTML(text)}
        </div>
    `;

    messages.appendChild(message);

    scrollToBottom();
}


// ===============================
// AI MESSAGE
// ===============================

function addAIMessage(text) {

    const message = document.createElement("div");

    message.className = "message ai-message";

    message.innerHTML = `
        <div class="ai-avatar">
            ✦
        </div>

        <div class="ai-content">
            ${formatAnswer(text)}
        </div>
    `;

    messages.appendChild(message);

    scrollToBottom();
}


// ===============================
// FORMAT AI RESPONSE
// ===============================

function formatAnswer(text) {

    let safeText = escapeHTML(text);

    // Bold
    safeText = safeText.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );

    // Headings
    safeText = safeText.replace(
        /^### (.*?)$/gm,
        "<h3>$1</h3>"
    );

    safeText = safeText.replace(
        /^## (.*?)$/gm,
        "<h2>$1</h2>"
    );

    // Bullet points
    safeText = safeText.replace(
        /^\s*[-•]\s+(.*?)$/gm,
        "<div class='bullet'>• $1</div>"
    );

    // Numbered points
    safeText = safeText.replace(
        /^\s*(\d+)\.\s+(.*?)$/gm,
        "<div class='numbered'><strong>$1.</strong> $2</div>"
    );

    // Line breaks
    safeText = safeText.replace(
        /\n/g,
        "<br>"
    );

    return safeText;
}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


// ===============================
// SUGGESTION BUTTON
// ===============================

function useSuggestion(question) {

    questionInput.value = question;

    autoResize();

    askQuestion();

}


// ===============================
// ENTER KEY
// ===============================

function handleEnter(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        askQuestion();

    }

}


// ===============================
// TEXTAREA AUTO RESIZE
// ===============================

function autoResize() {

    questionInput.style.height = "auto";

    questionInput.style.height =
        Math.min(questionInput.scrollHeight, 120) + "px";

}


questionInput.addEventListener(
    "input",
    autoResize
);


// ===============================
// SCROLL
// ===============================

function scrollToBottom() {

    setTimeout(() => {

        chatArea.scrollTo({
            top: chatArea.scrollHeight,
            behavior: "smooth"
        });

    }, 50);

}


// ===============================
// NEW CHAT
// ===============================

function newChat() {

    messages.innerHTML = "";

    welcome.style.display = "block";

    questionInput.value = "";

    loading.innerHTML = "";

    autoResize();

    chatArea.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ===============================
// DARK MODE
// ===============================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const button =
        document.getElementById("themeButton");

    if (document.body.classList.contains("dark")) {

        button.innerHTML = "☀️";

    } else {

        button.innerHTML = "🌙";

    }

}