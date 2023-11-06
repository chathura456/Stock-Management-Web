$(document).ready(function() {
    // Listen for click on the chatbot button
    $(document).on('click', '.chatbot-button', function() {
      // Toggle the chatbot panel
      $('#chatbot').collapse('toggle');
    });
  });


  
  document.querySelectorAll('.question-btn').forEach(function(button) {
    button.addEventListener('click', function() {
      var question = this.getAttribute('data-question');
      
      // Display the user's question
      var userMessageDiv = document.createElement('div');
      userMessageDiv.textContent = question;
      userMessageDiv.className = 'user-message'; // Add this class for styling
      document.getElementById('chatbot-messages').appendChild(userMessageDiv);
  
      // Get the bot's answer based on the data-question attribute
      var botAnswer = getBotAnswer(question);
  
      // Display the bot's answer
      var botMessageDiv = document.createElement('div');
      botMessageDiv.textContent = botAnswer;
      botMessageDiv.className = 'bot-message'; // Add this class for styling
      document.getElementById('chatbot-messages').appendChild(botMessageDiv);
    });
  });
  
  function getBotAnswer(question) {
    // Define your answers based on the question
    var answers = {
      "What is your return policy?": "You can return products within 30 days for a full refund.",
      "What are your opening hours?": "We are open from 9 AM to 8 PM Monday through Saturday.",
      "Do you offer international shipping?": "Yes, we offer shipping to select international destinations."
      // Add more question-answer pairs as needed
    };
  
    return answers[question] || "I'm not sure how to answer that. Can you try asking something else?";
  }

  const qaTree = {
    "main": {
      "viewCategories": {
        question: "What product categories can I browse?",
        answer: "You can browse various categories such as Seeds, Fertilizers, Pesticides, Tools, Machinery, and more.",
        followUpQuestions: ["browseSeeds", "browseFertilizers", "browsePesticides"]
      },
      "viewProducts": {
        question: "I want to see the products available.",
        answer: "Sure, which type of products are you interested in? We have Seeds, Fertilizers, Pesticides, Tools, etc.",
        followUpQuestions: ["productInquiry", "productAvailability"]
      },
      "purchaseHelp": {
        question: "How can I purchase products?",
        answer: "You can purchase products by adding them to your cart and proceeding to checkout.",
        followUpQuestions: ["addToCart", "paymentOptions"]
      }
    },
    "browseSeeds": {
      question: "Show me the variety of seeds available.",
      answer: "We have a wide range of seeds including Tomato Seeds, Coffee Plant Saplings, Banana Plant Saplings, etc.",
      followUpQuestions: ["addToCartSeeds"]
    },
    "browseFertilizers": {
      question: "I'm looking for fertilizers.",
      answer: "Our fertilizer selection includes Nitrogen Fertilizer, Organic Pesticide, Potash, and more.",
      followUpQuestions: ["addToCartFertilizers"]
    },
    "browsePesticides": {
      question: "Do you have eco-friendly pesticides?",
      answer: "Yes, we offer a variety of organic pesticides that are eco-friendly and effective.",
      followUpQuestions: ["addToCartPesticides"]
    },
    "productInquiry": {
      question: "Can I get more information on a specific product?",
      answer: "Absolutely, please provide the product name or category for more detailed information.",
      followUpQuestions: []
    },
    "productAvailability": {
      question: "How can I check if a product is in stock?",
      answer: "You can check the availability of a product by visiting the product page or asking me here.",
      followUpQuestions: []
    },
    "addToCart": {
      question: "How do I add items to my cart?",
      answer: "You can add items to your cart by selecting the 'Add to Cart' button on the product's page.",
      followUpQuestions: ["checkoutProcess"]
    },
    "paymentOptions": {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit cards, PayPal, and bank transfers.",
      followUpQuestions: []
    },
    "addToCartSeeds": {
      question: "How can I buy Tomato Seeds?",
      answer: "You can buy Tomato Seeds by selecting them and adding them to your cart. Would you like to proceed to checkout?",
      followUpQuestions: ["checkoutProcess"]
    },
    "addToCartFertilizers": {
      question: "I want to purchase Nitrogen Fertilizer.",
      answer: "Nitrogen Fertilizer can be added to your cart directly from the product page. Shall I take you there?",
      followUpQuestions: ["checkoutProcess"]
    },
    "addToCartPesticides": {
      question: "I'm interested in Organic Pesticide.",
      answer: "Organic Pesticide is available for purchase. You can add it to your cart and then checkout whenever you're ready.",
      followUpQuestions: ["checkoutProcess"]
    },
    "checkoutProcess": {
      question: "I'm ready to checkout. What should I do?",
      answer: "To checkout, go to your cart, review your items, and click on the 'Proceed to Checkout' button to finalize your purchase.",
      followUpQuestions: []
    }
  };
  
  
  function displayQuestion(key) {
    // Get the question data from the main or nested questions
    var questionData = qaTree.main[key] || qaTree[key];
  
    // Display the user's question
    var userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = questionData.question; // Use the question text from the questionData
    userMessageDiv.className = 'user-message';
    document.getElementById('chatbot-messages').appendChild(userMessageDiv);
  
    // Get the bot's answer and follow-up questions
    var botAnswer = questionData.answer;
    var followUpQuestions = questionData.followUpQuestions;
  
    // Display the bot's answer
    var botMessageDiv = document.createElement('div');
    botMessageDiv.textContent = botAnswer;
    botMessageDiv.className = 'bot-message';
    document.getElementById('chatbot-messages').appendChild(botMessageDiv);
  
    // Check if there are follow-up questions
    if (followUpQuestions && followUpQuestions.length > 0) {
      // Update the suggested questions with follow-ups
      updateSuggestedQuestions(followUpQuestions);
    } else {
      // If no follow-ups, display the initial set of main questions
      updateSuggestedQuestions(Object.keys(qaTree.main));
    }
  }
  
  
  function updateSuggestedQuestions(keys) {
    var questionsContainer = document.querySelector('.chatbot-questions');
    questionsContainer.innerHTML = ''; // Clear previous questions
  
    keys.forEach(function(key) {
      var questionText = qaTree.main[key] ? qaTree.main[key].question : qaTree[key].question;
      var questionButton = document.createElement('button');
      questionButton.className = 'btn btn-outline-secondary question-btn';
      questionButton.textContent = questionText;
      questionButton.onclick = function() { displayQuestion(key); };
      questionsContainer.appendChild(questionButton);
    });
  }
  
  // Initial call to set up the first set of main questions
  updateSuggestedQuestions(Object.keys(qaTree.main));
  
  function displayInitialGreeting() {
    var botGreetingDiv = document.createElement('div');
    botGreetingDiv.textContent = "Hello, how can I help you?";
    botGreetingDiv.className = 'bot-message';
    document.getElementById('chatbot-messages').appendChild(botGreetingDiv);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    displayInitialGreeting(); // Display the initial greeting
    updateSuggestedQuestions(Object.keys(qaTree.main)); // Set up the initial main questions
  });
  
  function resetChatbot() {
    // Clear the messages
    document.getElementById('chatbot-messages').innerHTML = '';
  
    // Display the initial greeting again
    displayInitialGreeting();
  
    // Reset to the initial set of main questions
    updateSuggestedQuestions(Object.keys(qaTree.main));
  }
  
  // Add event listener to the reset button
  document.getElementById('chatbot-reset').addEventListener('click', resetChatbot);
  