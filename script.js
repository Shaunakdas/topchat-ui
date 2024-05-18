const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className, withThumbs = false) => {
  // Create a chat <li> element with passed message and className
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<p></p>`;
  if (withThumbs) {
    chatContent += `<div class="thumbs">
                            <button class="btn" title="Like"><i class='bx bx-like' ></i></button>
                            <button class="btn" title="Dislike"><i class='bx bx-dislike' ></i></button>
                        </div>`;
  }
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; // return chat <li> element
};

// Select all command buttons
const commandButtons = document.querySelectorAll(".command-btn");

// Function to handle command button click
const handleCommandButtonClick = (event) => {
  const command = event.target.dataset.command; // Get the command from the button's data attribute
  if (command) {
    // Append the command to the chatbox
    chatbox.appendChild(createChatLi(command, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
      // Display "Thinking..." message while waiting for the response
      const incomingChatLi = createChatLi("Thinking...", "incoming");
      chatbox.appendChild(incomingChatLi);
      chatbox.scrollTo(0, chatbox.scrollHeight);
      // Generate response for the command
      generateResponse(incomingChatLi);
    }, 600);
  }
};

// Add click event listener to each command button
commandButtons.forEach((button) => {
  button.addEventListener("click", handleCommandButtonClick);
});

const generateResponse = (chatElement) => {
    const messageElement = chatElement.querySelector("p");

    // Get user's message from the chat element
    const userMessage = messageElement.textContent;

    // Here you can implement your custom logic to generate a response based on the user's message
    // For example, you can use switch case or if-else statements to handle different cases
    
    // Example custom response generation
    let response = "" + userMessage;

    // Set the response as paragraph text
    messageElement.textContent = response;

    // Add thumbs to incoming messages
    if (chatElement.classList.contains("incoming") || chatElement.classList.contains("error")) {
        chatElement.appendChild(createChatLi("", "thumbs", true));
        const likeBtn = chatElement.querySelector(".btn[title='Like']");
        const dislikeBtn = chatElement.querySelector(".btn[title='Dislike']");
        // Add event listeners to like and dislike buttons
        likeBtn.addEventListener("click", () => {
            // Toggle between filled and outline thumbs-up icon classes
            likeBtn.querySelector("i").classList.toggle("bx-like");
            likeBtn.querySelector("i").classList.toggle("bxs-like");

            // Optionally, you can handle other actions related to liking here
        });
        dislikeBtn.addEventListener("click", () => {
            // Toggle between filled and outline thumbs-up icon classes
            dislikeBtn.querySelector("i").classList.toggle("bx-dislike");
            dislikeBtn.querySelector("i").classList.toggle("bxs-dislike");
        });
    }

    // Scroll to the bottom of the chatbox
    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append the user's message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Display "Thinking..." message while waiting for the response
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener("input", () => {
  // Adjust the height of the input textarea based on its content
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  // If Enter key is pressed without Shift key and the window
  // width is greater than 800px, handle the chat
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);

document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('.chatbox .thumbs .btn');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      button.classList.add('zoom-in-out');
      setTimeout(function() {
        button.classList.remove('zoom-in-out');
      }, 1300); // Remove the class after animation duration (0.3s)
    });
  });
});

// Scroll custom commands with mouse wheel
document.addEventListener("DOMContentLoaded", function() {
  document.querySelector(".custom-commands").addEventListener("wheel", function(event) {
    event.preventDefault();
    this.scrollLeft += event.deltaY;
  });
});