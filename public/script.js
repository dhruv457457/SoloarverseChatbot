document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return; // Prevent empty messages

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<p class="user-message"><strong>User:</strong> ${userInput}</p>`;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userInput }), // Sending user input as a JSON string
        });

        const data = await response.json();
        
        // Ensure the bot's message is well formatted by replacing line breaks
        const botReply = data.reply.replace(/\n/g, '<br>');
        
        // Append bot's message with better readability
        chatBox.innerHTML += `<p class="bot-message"><strong>AI:</strong> ${botReply}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatBox.innerHTML += '<p><strong>Error:</strong> Unable to fetch the response.</p>';
    }

    // Clear the input field after sending the message
    document.getElementById('user-input').value = '';
});
