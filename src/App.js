import { useEffect } from "react";
import "./App.css";

function App() {
    useEffect(() => {
        /**
         * Send information from parent window to child iframe
         */

        const button = document.querySelector("#sendMessage");
        const messageArea = document.querySelector("#messageArea");

        const sendMessage = () => {
            const message = document.querySelector("#message").value;
            const iframe = document.querySelector("iframe");
            iframe.contentWindow.postMessage(message, "*");
        };

        /**
         * Send information from child to parent.
         */

        const onMessageHandler = (event) => {
            if (typeof event.data === "string") {
                messageArea.innerText = event.data;
            }
        };

        button && button.addEventListener("click", sendMessage);
        window.addEventListener("message", onMessageHandler);

        return () => {
            button.removeEventListener("click", sendMessage);
            window.removeEventListener("message", onMessageHandler);
        };
    }, []);

    return (
        <div className="App">
            <div id="app">
                <input id="message" type="text" />
                <button id="sendMessage">Send Message</button>
                <h3>Messages Sent by the Child will be visible here:</h3>
                <div id="messageArea">No message received from child yet.</div>
            </div>

            <h2>Iframe:</h2>
            <iframe
                style={{ marginTop: "1em", width: "100%", height: 200, border: "solid 1px #ccc", borderRadius: 4, overflow: "hidden" }}
                title="Child iframe"
                src="page2.html"
            />
        </div>
    );
}

export default App;
