import "./styles.css";

/**
 * Send information from parent window to child iframe
 */
var button = document.querySelector("#sendMessage");
var messageArea = document.querySelector("#messageArea");

function sendMessage() {
  const message = document.querySelector("#message").value;
  const iframe = document.querySelector("iframe");
  iframe.contentWindow.postMessage(message, "*");
}

button.addEventListener("click", sendMessage);

/**
 * Send information from child to parent.
 */

function onMessageHandler(event) {
  if (typeof event.data === "string") {
    messageArea.innerText = event.data;
  }
}

window.addEventListener("message", onMessageHandler);
