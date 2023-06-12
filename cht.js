document.addEventListener("DOMContentLoaded", function() {
  const chatLog = document.getElementById("chat-log");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const placeholderText = "Got any questions...:>";
  const chatContainer = document.querySelector(".chat-container");
  const closeButton = document.querySelector(".close-button");
  let openButton = null;

  chatContainer.classList.add("show");

  userInput.addEventListener("focus", function() {
    if (userInput.placeholder === placeholderText) {
      userInput.placeholder = "";
    }
  });

  closeButton.addEventListener("click", function() {
    chatContainer.classList.remove("show");
    openButton = createOpenButton(); // Create the open button when closing the chat box
    chatContainer.parentNode.insertBefore(openButton, chatContainer.nextSibling); // Insert the open button after the chat container
  });

  userInput.addEventListener("blur", function() {
    if (userInput.placeholder === "") {
      userInput.placeholder = placeholderText;
    }
  });

  sendBtn.addEventListener("click", function() {
    const userMessage = userInput.value;
    if (userMessage.trim() !== "") {
      appendMessage("user", userMessage);
      processUserMessage(userMessage);
      userInput.value = "";
    }
  });
    function createOpenButton() {
        const openButton = document.createElement("button");
        openButton.innerText = "Open Chat";
        openButton.classList.add("open-button");
        openButton.addEventListener("click", function() {
          chatContainer.classList.add("show");
          chatContainer.parentNode.removeChild(openButton); // Remove the open button when opening the chat box
        });
        return openButton;
      }
      sendBtn.classList.add("send-button");



  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageElement.innerHTML = `<span class="sender">${sender}: </span>${message}`;
    chatLog.appendChild(messageElement);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function processUserMessage(message) {
    const lowercaseMessage = message.toLowerCase();
    
    
      if (lowercaseMessage.includes("location")) {
        appendMessage("Admin", "Our location is at 824 C Tayuman St, Tondo, Manila. Please visit us!");
      } else if (lowercaseMessage.includes("deliver") || lowercaseMessage.includes("delivery")) {
        appendMessage("Admin", "Yes, we offer delivery services with partner couriers.");
      } else if (lowercaseMessage.includes("time")) {
        appendMessage("Admin", "We open at 8 am and close at 7 pm.");
      } else if (lowercaseMessage.includes("photocopy") || lowercaseMessage.includes("xerox")) {
        appendMessage("Admin", "The price for photocopy is 2 pesos per page.");
      } else if (lowercaseMessage.includes("tarpaulin")) {
        appendMessage("Admin", "The price for tarpaulin is 15 pesos per SQ Feet.");
      } else if (lowercaseMessage.includes("picture")) {
        appendMessage("Admin", "The price for ID picture is 40 pesos for 6pcs (wallet size).");
      } else if (lowercaseMessage.includes("print")) {
        appendMessage("Admin", "The price for our printing services is 3 pesos per page and 5 pesos for colored.");
      } else if (lowercaseMessage.includes("lamination")) {
        appendMessage("Admin", "The price for lamination is 40 pesos.");
      } else if (lowercaseMessage.includes("card")) {
        appendMessage("Admin", "The price depends on the design and size of the card.");
      } else if (lowercaseMessage.includes("logo")) {
        appendMessage("Admin", "The price depends on the design and quality of the logo.");
      } else if (lowercaseMessage.includes("labeling")) {
        appendMessage("Admin", "The quality of the label will determine the price.");
      } else if (lowercaseMessage.includes("cardboard")) {
        appendMessage("Admin", "The price will be determined by the size and quantity of the cardboard.");
      } else if (lowercaseMessage.includes("wrapper")) {
        appendMessage("Admin", "The price will be determined by the type of wrapper, for example, if it is a can wrapper.");
      } else if (lowercaseMessage.includes("banner")) {
        appendMessage("Admin", "The price for a banner is the same as a tarpaulin, 15 pesos per SQ Feet.");
      } else if (lowercaseMessage.includes("more")) {
        appendMessage("Admin", "For more information, please visit our Facebook page at Gio's Printing Services.");
      } else if (lowercaseMessage.includes("services")) {
        appendMessage("Admin", "We offer different kinds of services. Please refer to the Services page.");
      } else if (lowercaseMessage.includes("hi")) {
        appendMessage("Admin", "Hello, how can I help you?");
      } else {
        appendMessage("Admin", "Sorry, I don't have the knowledge to answer that. and I would appreciate your feedback.");
      }
    
    
      function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }
    }
    
  });
  