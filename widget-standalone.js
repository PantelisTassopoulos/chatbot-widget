/**
 * DAI Chatbot Widget - Standalone Version
 * 
 * Self-contained script that includes both CSS and JavaScript.
 * Perfect for platforms like Framer that only accept a single script tag.
 * 
 * Usage:
 *   <script src="https://your-domain.com/widget-standalone.js"></script>
 * 
 * Configuration:
 *   Change API_BASE_URL and WIDGET_TITLE below before deploying.
 */

(function() {
    'use strict';
    
    // ============================================================================
    // CONFIGURATION - CHANGE THESE VALUES
    // ============================================================================
    
    // API base URL - production backend URL
    const API_BASE_URL = "https://chatbot-bachelor-thesis.onrender.com";
    
    // Widget title (displayed in header)
    const WIDGET_TITLE = "Βοηθός Τμήματος Εφαρμοσμένης Πληροφορικής";
    
    // ============================================================================
    // CSS STYLES (injected inline)
    // ============================================================================
    
    const CSS_STYLES = `
        /* DAI Chatbot Widget Styles */
        #dai-chatbot-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #b90924;
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(185, 9, 36, 0.4);
            z-index: 9998;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: all 0.3s ease;
        }
        #dai-chatbot-button:hover {
            background: #9a071d;
            box-shadow: 0 6px 16px rgba(185, 9, 36, 0.5);
            transform: scale(1.05);
        }
        #dai-chatbot-button:active {
            transform: scale(0.95);
        }
        #dai-chatbot-panel {
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 400px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 120px);
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            display: none;
            flex-direction: column;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        #dai-chatbot-panel.open {
            display: flex;
        }
        #dai-chatbot-header {
            background: #b90924;
            color: white;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 16px 16px 0 0;
        }
        #dai-chatbot-header h3 {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
        #dai-chatbot-close {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s;
        }
        #dai-chatbot-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        #dai-chatbot-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .dai-message {
            max-width: 75%;
            padding: 12px 16px;
            border-radius: 18px;
            word-wrap: break-word;
            line-height: 1.5;
            font-size: 14px;
        }
        .dai-message.user {
            background: #b90924;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        .dai-message.assistant {
            background: white;
            color: #2d3748;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .dai-typing {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 8px 0;
        }
        .dai-typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #b90924;
            animation: dai-typing 1.4s infinite ease-in-out;
        }
        .dai-typing-dot:nth-child(1) {
            animation-delay: -0.32s;
        }
        .dai-typing-dot:nth-child(2) {
            animation-delay: -0.16s;
        }
        .dai-typing-dot:nth-child(3) {
            animation-delay: 0s;
        }
        @keyframes dai-typing {
            0%, 60%, 100% {
                transform: translateY(0);
                opacity: 0.7;
            }
            30% {
                transform: translateY(-10px);
                opacity: 1;
            }
        }
        #dai-chatbot-input-area {
            padding: 16px;
            background: white;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 8px;
            border-radius: 0 0 16px 16px;
        }
        #dai-chatbot-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #e0e0e0;
            border-radius: 24px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }
        #dai-chatbot-input:focus {
            border-color: #b90924;
        }
        #dai-chatbot-send {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #b90924;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            transition: all 0.2s;
            flex-shrink: 0;
        }
        #dai-chatbot-send:hover {
            background: #9a071d;
            transform: scale(1.05);
        }
        #dai-chatbot-send:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        .dai-sources {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid #e0e0e0;
            font-size: 12px;
        }
        .dai-sources-title {
            color: #b90924;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .dai-source-link {
            color: #b90924;
            text-decoration: none;
            display: block;
            margin: 4px 0;
            word-break: break-all;
        }
        .dai-source-link:hover {
            text-decoration: underline;
        }
        #dai-chatbot-messages::-webkit-scrollbar {
            width: 6px;
        }
        #dai-chatbot-messages::-webkit-scrollbar-track {
            background: transparent;
        }
        #dai-chatbot-messages::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 3px;
        }
        #dai-chatbot-messages::-webkit-scrollbar-thumb:hover {
            background: #999;
        }
        @media (max-width: 480px) {
            #dai-chatbot-panel {
                width: calc(100vw - 20px);
                right: 10px;
                bottom: 80px;
                height: calc(100vh - 100px);
            }
            #dai-chatbot-button {
                right: 10px;
                bottom: 10px;
            }
        }
    `;
    
    // ============================================================================
    // INITIALIZATION CHECK
    // ============================================================================
    
    // Prevent multiple initializations
    if (window.DAIChatbotInitialized) {
        return;
    }
    window.DAIChatbotInitialized = true;
    
    // ============================================================================
    // STYLES INJECTION
    // ============================================================================
    
    function injectStyles() {
        if (document.getElementById('dai-chatbot-styles')) {
            return;
        }
        const style = document.createElement('style');
        style.id = 'dai-chatbot-styles';
        style.textContent = CSS_STYLES;
        document.head.appendChild(style);
    }
    
    // ============================================================================
    // DOM CREATION
    // ============================================================================
    
    function createWidget() {
        // Create button
        const button = document.createElement('button');
        button.id = 'dai-chatbot-button';
        button.setAttribute('aria-label', 'Άνοιγμα chatbot');
        button.innerHTML = '🤖';
        button.onclick = togglePanel;
        
        // Create panel
        const panel = document.createElement('div');
        panel.id = 'dai-chatbot-panel';
        
        // Header
        const header = document.createElement('div');
        header.id = 'dai-chatbot-header';
        header.innerHTML = `
            <h3>${WIDGET_TITLE}</h3>
            <button id="dai-chatbot-close" aria-label="Κλείσιμο">×</button>
        `;
        header.querySelector('#dai-chatbot-close').onclick = closePanel;
        
        // Messages area
        const messages = document.createElement('div');
        messages.id = 'dai-chatbot-messages';
        
        // Input area
        const inputArea = document.createElement('div');
        inputArea.id = 'dai-chatbot-input-area';
        inputArea.innerHTML = `
            <input 
                type="text" 
                id="dai-chatbot-input" 
                placeholder="Γράψε την ερώτησή σου…"
                aria-label="Ερώτηση"
            />
            <button id="dai-chatbot-send" aria-label="Αποστολή">→</button>
        `;
        
        // Assemble panel
        panel.appendChild(header);
        panel.appendChild(messages);
        panel.appendChild(inputArea);
        
        // Inject into page
        document.body.appendChild(button);
        document.body.appendChild(panel);
        
        // Attach event listeners
        const input = document.getElementById('dai-chatbot-input');
        const sendButton = document.getElementById('dai-chatbot-send');
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        sendButton.onclick = sendMessage;
        
        // Add welcome message
        addMessage('assistant', 'Γεια σας! Πώς μπορώ να σας βοηθήσω σήμερα;');
    }
    
    // ============================================================================
    // PANEL CONTROLS
    // ============================================================================
    
    function togglePanel() {
        const panel = document.getElementById('dai-chatbot-panel');
        if (panel.classList.contains('open')) {
            closePanel();
        } else {
            openPanel();
        }
    }
    
    function openPanel() {
        const panel = document.getElementById('dai-chatbot-panel');
        panel.classList.add('open');
        setTimeout(() => {
            document.getElementById('dai-chatbot-input').focus();
        }, 100);
    }
    
    function closePanel() {
        const panel = document.getElementById('dai-chatbot-panel');
        panel.classList.remove('open');
    }
    
    // ============================================================================
    // MESSAGE HANDLING
    // ============================================================================
    
    function addMessage(role, text, sources = []) {
        const messagesArea = document.getElementById('dai-chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `dai-message ${role}`;
        
        let content = text;
        
        if (sources && sources.length > 0) {
            content += '<div class="dai-sources">';
            content += '<div class="dai-sources-title">📎 Πηγές:</div>';
            sources.forEach(source => {
                const url = source.url || '';
                if (url) {
                    content += `<a href="${url}" target="_blank" class="dai-source-link">${url}</a>`;
                }
            });
            content += '</div>';
        }
        
        messageDiv.innerHTML = content;
        messagesArea.appendChild(messageDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }
    
    function showTyping() {
        const messagesArea = document.getElementById('dai-chatbot-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'dai-message assistant dai-typing-indicator';
        typingDiv.innerHTML = `
            <div class="dai-typing">
                <div class="dai-typing-dot"></div>
                <div class="dai-typing-dot"></div>
                <div class="dai-typing-dot"></div>
            </div>
        `;
        messagesArea.appendChild(typingDiv);
        messagesArea.scrollTop = messagesArea.scrollHeight;
        return typingDiv;
    }
    
    function removeTyping(typingDiv) {
        if (typingDiv && typingDiv.parentNode) {
            typingDiv.parentNode.removeChild(typingDiv);
        }
    }
    
    // ============================================================================
    // API COMMUNICATION
    // ============================================================================
    
    async function sendMessage() {
        const input = document.getElementById('dai-chatbot-input');
        const sendButton = document.getElementById('dai-chatbot-send');
        const question = input.value.trim();
        
        if (!question) {
            return;
        }
        
        input.disabled = true;
        sendButton.disabled = true;
        
        addMessage('user', question);
        input.value = '';
        
        const typingDiv = showTyping();
        
        try {
            const response = await fetch(`${API_BASE_URL}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: question })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            removeTyping(typingDiv);
            
            const sources = data.sources || [];
            addMessage('assistant', data.answer, sources);
            
        } catch (error) {
            removeTyping(typingDiv);
            addMessage('assistant', `Συγγνώμη, προέκυψε σφάλμα: ${error.message}`);
            console.error('Chatbot error:', error);
        } finally {
            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }
    
    // ============================================================================
    // INITIALIZATION
    // ============================================================================
    
    function init() {
        injectStyles();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createWidget);
        } else {
            createWidget();
        }
    }
    
    // Start initialization
    init();
    
})();

