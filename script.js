// AI responses database
const aiResponses = {
    'paris': 'Paris 1889 is absolutely magical! You\'ll witness the construction of the Eiffel Tower during the World\'s Fair. The best time to visit is spring for pleasant weather. Don\'t miss the Impressionist scene at Montmartre!',
    'cretace': 'The Crétacé period is thrilling but requires proper safety equipment. Our guides are well-trained in dinosaur encounters. The best experience is observing from elevated platforms. Duration: 2-3 hours recommended.',
    'florence': 'Florence 1504 is the heart of the Renaissance! You can meet Michelangelo and witness artistic masterpieces being created. The cultural atmosphere is unmatched. Plan for a full day to truly experience it.',
    'safety': 'Time travel is incredibly safe with our advanced technology! We have 99.9% success rate and comprehensive insurance coverage. All travelers receive orientation training before departure.',
    'pack': 'Pack light! Our agency provides period-appropriate clothing for each era. Bring comfortable shoes, water, and a time-travel pod remote. Weather-appropriate gear is provided.',
    'duration': 'Most experiences last 4-8 hours depending on the destination. You can extend your stay with our premium packages for up to 24 hours!',
    'price': 'Our packages range from $5,000 to $25,000 depending on period and duration. Group discounts available!',
    'booking': 'You can book directly through our website or contact our agents. We recommend booking 2-4 weeks in advance for best availability.'
};

// Image destination mapping for proper source selection
const imageMap = {
    'Paris 1889': 'photos/paris.png',
    'Crétacé Period': 'photos/cretace.png',
    'Florence 1504': 'photos/florence.png'
};

// Lazy Loading Optimization
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Scroll Animation Handler
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(element => {
        observer.observe(element);
    });

    // Observe destination cards
    document.querySelectorAll('.destination-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Observe chatbot section
    const chatbotSection = document.querySelector('.chatbot-section');
    if (chatbotSection) {
        observer.observe(chatbotSection);
    }
}

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Chatbot message sending - WIDGET VERSION
function sendMessage() {
    // This function is kept for backward compatibility but redirects to widget
    const input = document.getElementById('chatbot-widget-input');
    const message = input.value.trim();
    if (message === '') return;
    sendWidgetMessage();
}

function addMessage(text, sender) {
    // Legacy function - redirects to widget version
    addWidgetMessage(text, sender);
}

function askFAQ(question) {
    // Open the chatbot widget
    const chatWindow = document.getElementById('chatbot-window');
    chatWindow.classList.remove('hidden');

    // Set the question in the input and send it
    const input = document.getElementById('chatbot-widget-input');
    input.value = question;

    // Focus on the input
    input.focus();

    // Send the message
    setTimeout(() => {
        sendWidgetMessage();
    }, 100);
}

// Modal functions
function openModal(destination) {
    const modalId = destination + 'Modal';
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(destination) {
    const modalId = destination + 'Modal';
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

/* ===== FLOATING CHATBOT WIDGET ===== */

// Mistral API Configuration
const MISTRAL_API_KEY = 'YOUR_API_KEY_HERE'; // À remplacer par votre clé API
const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';

// System prompt for TimeTravel Agency assistant
const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe haut de gamme. Ton rôle est de conseiller les clients sur les meilleures destinations temporelles et de répondre à leurs questions.

Ton ton :
- Professionnel mais chaleureux et enthousiaste
- Passionné d'histoire et des voyages
- Expert en voyage temporel (fictif mais crédible)
- Toujours utile et bienveillant sans être trop familier

Tu connais parfaitement :
1. **Paris 1889** - Belle Époque, construction de la Tour Eiffel, Exposition Universelle, art impressionniste à Montmartre
2. **Crétacé -65M** - Dinosaures majestueuses, nature préhistorique sauvage, observation du Tyrannosaure Rex
3. **Florence 1504** - Renaissance, Michelangelo, sculpture du David, art et architecture, patrons Médicis

Tarifs pour les voyages (en USD) :
- Expérience Essentielle (4h) : $4,499
- Expérience Premium (8h) : $7,999
- Expérience Luxe VIP (24h) : $15,999
- Groupe (4+ personnes) : -20% de réduction

Conseil pour choisir :
- Fans d'art/culture → Florence 1504
- Amateurs d'histoire urbaine → Paris 1889
- Amoureux de la nature → Crétacé

Tu peux suggérer des destinations selon les intérêts du client. Réponds toujours en français, sois concis mais informatif, et pose des questions pour mieux aider.`;

// Chat conversation history for context
let conversationHistory = [];

// Initialize floating chatbot
document.addEventListener('DOMContentLoaded', function() {
    initFloatingChatbot();
});

function initFloatingChatbot() {
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatWindow = document.getElementById('chatbot-window');

    // Toggle chat window
    toggleBtn.addEventListener('click', function() {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            document.getElementById('chatbot-widget-input').focus();
        }
    });

    // Close chat window
    closeBtn.addEventListener('click', function() {
        chatWindow.classList.add('hidden');
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('hidden');
        }
    });
}

function sendWidgetMessage() {
    const input = document.getElementById('chatbot-widget-input');
    const message = input.value.trim();

    if (message === '') return;

    // Add user message to UI
    addWidgetMessage(message, 'user');
    input.value = '';

    // Add to conversation history
    conversationHistory.push({
        role: 'user',
        content: message
    });

    // Show typing indicator
    showTypingIndicator();

    // Get response from Mistral API
    getAssistantResponse(message);
}

function addWidgetMessage(text, sender) {
    const messagesDiv = document.getElementById('chatbot-widget-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-widget-message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = text; // Allow simple HTML formatting

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesDiv.appendChild(messageDiv);

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function showTypingIndicator() {
    const messagesDiv = document.getElementById('chatbot-widget-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-widget-message bot';
    messageDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';

    const typingBox = document.createElement('div');
    typingBox.className = 'message-content';
    typingBox.innerHTML = '<div class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(typingBox);
    messagesDiv.appendChild(messageDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

async function getAssistantResponse(userMessage) {
    // Try to use Mistral API if key is configured
    if (MISTRAL_API_KEY !== 'YOUR_API_KEY_HERE') {
        try {
            const response = await callMistralAPI(userMessage);
            removeTypingIndicator();
            addWidgetMessage(response, 'bot');
            conversationHistory.push({
                role: 'assistant',
                content: response
            });
        } catch (error) {
            console.error('API Error:', error);
            removeTypingIndicator();
            handleFallbackResponse(userMessage);
        }
    } else {
        // Use fallback responses if no API key
        removeTypingIndicator();
        handleFallbackResponse(userMessage);
    }
}

async function callMistralAPI(userMessage) {
    const messages = [
        ...conversationHistory.slice(-10) // Keep last 10 messages for context
    ];

    try {
        const response = await fetch(MISTRAL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MISTRAL_API_KEY}`
            },
            body: JSON.stringify({
                model: 'mistral-small-latest',
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT
                    },
                    ...messages
                ],
                max_tokens: 500,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

// Fallback responses for demo purposes
function handleFallbackResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = '';

    // Price questions
    if (lowerMessage.includes('prix') || lowerMessage.includes('coût') || lowerMessage.includes('tarif')) {
        response = `Voici nos tarifs de voyage ✈️<br><br>
            <strong>Expérience Essentielle (4h)</strong> : $4,499<br>
            <strong>Expérience Premium (8h)</strong> : $7,999<br>
            <strong>Expérience Luxe VIP (24h)</strong> : $15,999<br><br>
            💰 <strong>Réduction groupe</strong> : -20% pour 4+ personnes<br>
            Tous les prix incluent l'équipement, l'assurance temporelle et un guide expert.`;
    }
    // Paris questions
    else if (lowerMessage.includes('paris') || lowerMessage.includes('1889') || lowerMessage.includes('eiffel')) {
        response = `🗼 <strong>Paris 1889 - La Belle Époque</strong><br><br>
            Vivez la construction de la Tour Eiffel pendant l'Exposition Universelle ! Explorez :<br>
            • Montmartre et ses artistes impressionnistes<br>
            • Les cafés historiques de la Rive Gauche<br>
            • L'architecture révolutionnaire fin de siècle<br><br>
            ✨ Parfait pour : Amateurs d'art, d'histoire urbaine, de culture`;
    }
    // Cretace questions
    else if (lowerMessage.includes('cretace') || lowerMessage.includes('dinosaur') || lowerMessage.includes('préhistor')) {
        response = `🦕 <strong>Période Crétacé -65M - L'Âge des Dinosaures</strong><br><br>
            Rencontrez les créatures les plus majestueuses de tous les temps :<br>
            • Observation sécurisée du Tyrannosaure Rex<br>
            • Troupeaux de Triceratops<br>
            • Paysages préhistoriques intact<br><br>
            ⚠️ Parfait pour : Aventuriers, naturalistes, amateurs de sensations`;
    }
    // Florence questions
    else if (lowerMessage.includes('florence') || lowerMessage.includes('1504') || lowerMessage.includes('renaissance')) {
        response = `🎨 <strong>Florence 1504 - La Renaissance</strong><br><br>
            Assistez à l'apogée de la création humaine :<br>
            • Inauguration du David de Michel-Ange<br>
            • Ateliers des maîtres florentins<br>
            • Patronage des Médicis et mécénat d'art<br><br>
            🌟 Parfait pour : Passionnés d'art, d'histoire, de culture`;
    }
    // Recommendation questions
    else if (lowerMessage.includes('quelle') || lowerMessage.includes('recommand') || lowerMessage.includes('choisir') || lowerMessage.includes('conseil')) {
        response = `🤔 <strong>Aide pour choisir votre destination</strong><br><br>
            Répondez-moi :<br>
            • Vous préférez l'<strong>art et la culture</strong> ? → Florence 1504<br>
            • Vous aimez l'<strong>histoire urbaine</strong> ? → Paris 1889<br>
            • Vous êtes <strong>amoureux de la nature</strong> ? → Crétacé<br><br>
            Dites-moi vos passions et je suggérerai la meilleure destination !`;
    }
    // Safety questions
    else if (lowerMessage.includes('sécurit') || lowerMessage.includes('danger') || lowerMessage.includes('risque')) {
        response = `🛡️ <strong>Sécurité & Protection</strong><br><br>
            TimeTravel Agency garantit la sécurité absolue :<br>
            ✅ Taux de succès : 99.9%<br>
            ✅ Assurance temporelle complète incluse<br>
            ✅ Guides experts formés<br>
            ✅ Équipement de protection dernière génération<br>
            ✅ Monitoring médical continu<br><br>
            Vos données temporelles sont notre priorité !`;
    }
    // FAQ
    else if (lowerMessage.includes('faq') || lowerMessage.includes('question') || lowerMessage.includes('info')) {
        response = `❓ <strong>Questions Fréquentes</strong><br><br>
            <strong>Durée recommandée ?</strong> 8h pour la première visite<br>
            <strong>Meilleure saison ?</strong> Notre technologie fonctionne toute l'année<br>
            <strong>Équipement fourni ?</strong> Oui, tenue d'époque incluse<br>
            <strong>Restrictions d'âge ?</strong> À partir de 18 ans<br>
            <strong>Décalage horaire ?</strong> Aucun, retour immédiat<br><br>
            Des autres questions ? Je suis là !`;
    }
    // Default response
    else {
        response = `Je suis votre assistant TimeTravel Agency ! 🚀<br><br>
            Vous pouvez me poser des questions sur :<br>
            • Les destinations (Paris 1889, Crétacé, Florence 1504)<br>
            • Les tarifs et paquets<br>
            • Conseils pour choisir<br>
            • Sécurité et assurances<br>
            • Informations générales<br><br>
            Comment puis-je vous aider aujourd'hui ?`;
    }

    addWidgetMessage(response, 'bot');
    conversationHistory.push({
        role: 'assistant',
        content: response
    });
}
