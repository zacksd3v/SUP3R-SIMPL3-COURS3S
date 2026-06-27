// This is a customized chatbot for selling Data & Airtime in Nigeria
// Designed to be integrated into your VTU/Data reselling website.

const Chatbot = {
  defaultResponses: {
    'Assalam hello hi hey greetings': `Hello! Welcome to our Data and Airtime platform. How can I help you today? You can ask me about data prices, how to buy, checking your balance, or internet troubleshooting.`,
    
    'how to buy purchase order transaction process': `Buying Data or Airtime is very easy! Just navigate to the 'Buy Data' or 'Top-up Airtime' page on our website, input your phone number, select your network (MTN, Airtel, Glo, 9mobile), choose your plan, and make a secure payment via ATM Card or Bank Transfer.`,
    
    'mtn data plan price cost codes bundle': `Here are our popular MTN Data plans (2026):\n- 1.5GB (7 Days) = ₦1,000\n- 3.5GB (30 Days) = ₦2,500\n- 7GB (30 Days) = ₦3,500\n- 12.5GB (30 Days) = ₦5,500\nYou can purchase directly on our website or dial *312# on your MTN line.`,
    
    'airtel data plan price cost codes bundle': `Here are our affordable Airtel Data plans (2026):\n- 1.5GB (7 Days) = ₦1,000\n- 3GB (30 Days) = ₦1,500\n- 4.5GB (30 Days) = ₦2,000\n- 10GB (30 Days) = ₦3,000\nYou can purchase on our platform or dial *312# on your Airtel line.`,
    
    'glo data plan price cost codes bundle': `Our current Glo Data plans include:\n- 1.35GB (7 Days) = ₦500\n- 2.9GB (7 Days) = ₦1,000\n- 5.8GB (30 Days) = ₦2,000\n- 10GB (30 Days) = ₦3,000\nYou can buy via our website or dial *312# on your Glo line.`,
    
    '9mobile data plan price cost codes bundle': `Our current 9mobile Data plans include:\n- 1.5GB (7 Days) = ₦500\n- 2GB (30 Days) = ₦1,000\n- 7GB (30 Days) = ₦3,000\nYou can order instantly on our website or dial *312# on your line.`,
    
    'check balance data airtime remaining': `Nigeria uses unified USSD codes for all networks:\n- To check your DATA balance: Dial *323#\n- To check your AIRTIME balance: Dial *310#\nSimply dial the code on your mobile phone to view your balance.`,
    
    'slow internet network issue data not working connection': `If your internet is slow or not working, please try these quick fixes:\n1. Turn on 'Airplane Mode' for 10 seconds, then turn it off.\n2. Ensure your phone network mode is set to '4G' or '5G' in your settings.\n3. Verify that your data plan has not expired by dialing *323#.\n4. Restart your mobile device entirely.`,
    
    'data share transfer gift send data': `You can share or gift data to another line using these official network codes:\n- MTN: Dial *321# or *312*7#\n- Airtel: Dial *312# and select 'Gifting and Sharing'\n- Glo: Dial *127*Phone Number*Data Plan#\n- 9mobile: Dial *229*Phone Number*Data Plan#`,
    
    'wrong number mistake error transaction': `If you mistakenly sent airtime or data to the wrong phone number, please contact our Customer Support immediately through the 'Contact Us' page. Provide your transaction receipt details so we can investigate and assist you.`,
    
    'thank you thanks appreciated': `You're welcome! We are always happy to help. Let me know if you need assistance with anything else!`,
  },

  additionalResponses: {},

  unsuccessfulResponse: `Sorry, I didn't quite understand that. Currently, I can help you with Data prices (MTN, Airtel, Glo, 9mobile), how to make a purchase, checking balances, or fixing internet connection issues. Please try rephrasing your question!`,

  emptyMessageResponse: `Error: Your message appears to be empty. Please type a question so I can assist you.`,

  addResponses: function (additionalResponses) {
    this.additionalResponses = {
      ...this.additionalResponses,
      ...additionalResponses
    };
  },

  getResponse: function (message) {
    if (!message) {
      return this.emptyMessageResponse;
    }

    const responses = {
      ...this.defaultResponses,
      ...this.additionalResponses,
    };

    const {
      ratings,
      bestMatchIndex,
    } = this.stringSimilarity(message, Object.keys(responses));

    const bestResponseRating = ratings[bestMatchIndex].rating;
    if (bestResponseRating <= 0.2) { 
      return this.unsuccessfulResponse;
    }

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    if (typeof response === 'function') {
      return response();
    } else {
      return response;
    }
  },

  getResponseAsync: function (message) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getResponse(message));
      }, 1000);
    });
  },

  compareTwoStrings: function (first, second) {
    first = first.toLowerCase().replace(/\s+/g, '')
    second = second.toLowerCase().replace(/\s+/g, '')

    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram) + 1
        : 1;

      firstBigrams.set(bigram, count);
    };

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram)
        ? firstBigrams.get(bigram)
        : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity: function (mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const currentTargetString = targetStrings[i];
      const currentRating = this.compareTwoStrings(mainString, currentTargetString)
      ratings.push({target: currentTargetString, rating: currentRating})
      if (currentRating > ratings[bestMatchIndex].rating) {
        bestMatchIndex = i
      }
    }

    const bestMatch = ratings[bestMatchIndex]

    return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
  },
};

function uuidPolyfill() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
    const randomNumber = Math.random() * 16 | 0;
    const result = char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);
    return result.toString(16);
  });
}

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    if (typeof root.crypto === 'undefined') {
      try { root.crypto = {}; } catch (e) {}
    }
    if (root.crypto && typeof root.crypto.randomUUID !== 'function') {
      try { root.crypto.randomUUID = uuidPolyfill; } catch (e) {}
    }
    root.Chatbot = factory();
    root.chatbot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  return Chatbot;
}));
