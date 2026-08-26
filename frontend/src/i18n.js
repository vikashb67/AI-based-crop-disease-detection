const translations = {
  en: {
    appName: 'AI Crop Disease',
    tagline: 'Detect crop diseases instantly using your phone camera',
    login: 'Login',
    register: 'Register',
    uploadPhoto: 'Upload Photo',
    chooseFromGallery: 'Choose from Gallery',
    takeClearPhoto: 'Take a clear photo of the affected leaf',
    analysing: 'Analysing your crop...',
    whatThisIs: 'What this disease is',
    treatmentSuggestions: 'Treatment Suggestions',
    image: 'Image',
    saveHistory: 'Save to My History',
    askChatbot: 'Ask Chatbot a Question',
    analyseAnother: 'Analyse Another Leaf',
    history: 'History',
    help: 'Help',
    home: 'Home',
    noHistory: 'No history yet.',
    chatbotTitle: 'Chatbot',
    confidence: 'Confidence',
    severity: 'Severity',
    quickQuestions: ['How much pesticide should I use?', 'Will this spread to other plants?', 'Is the fruit safe to eat?']
  },
  hi: {
    appName: 'कृषि रोग पहचान',
    tagline: 'अपने फोन कैमरा से फसलों के रोग तुरंत पहचानें',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    uploadPhoto: 'फोटो अपलोड करें',
    chooseFromGallery: 'गैलरी से चुनें',
    takeClearPhoto: 'प्रभावित पत्ते की स्पष्ट फोटो लें',
    analysing: 'आपकी फसल का विश्लेषण किया जा रहा है...',
    whatThisIs: 'यह रोग क्या है',
    treatmentSuggestions: 'उपचार के सुझाव',
    image: 'छवि',
    saveHistory: 'मेरे इतिहास में सहेजें',
    askChatbot: 'चैटबॉट से प्रश्न पूछें',
    analyseAnother: 'एक और पत्ता विश्लेषित करें',
    history: 'इतिहास',
    help: 'मदद',
    home: 'होम',
    noHistory: 'अभी तक कोई इतिहास नहीं।',
    chatbotTitle: 'चैटबॉट',
    confidence: 'विश्वसनीयता',
    severity: 'तीव್ರता',
    quickQuestions: ['कितना कीटनाशक उपयोग करूँ?', 'क्या यह अन्य पौधों में फैल सकता है?', 'क्या फल खाने के लायक है?']
  },
  kn: {
    appName: 'ಕೃಷಿ ರೋಗ ಪತ್ತೆ',
    tagline: 'ನಿಮ್ಮ ಫೋನ್ ಕ್ಯಾಮೆರಾ ಬಳಸಿ ಕ್ಷಣದಲ್ಲೇ ಬೆಳೆ ರೋಗಗಳನ್ನು ಪತ್ತೆಮಾಡಿ',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    uploadPhoto: 'ಫೋಟೋ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    chooseFromGallery: 'ಗ್ಯಾಲರಿ ನಿಂದ ಆಯ್ಕೆಮಾಡಿ',
    takeClearPhoto: 'ಪ್ರಭಾವಿತ ಎಲೆ ಆಕೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ',
    analysing: 'ನಿಮ್ಮ ಬೆಳೆ ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    whatThisIs: 'ಈ ರೋಗ ಎಂದಾದರೆ',
    treatmentSuggestions: 'ಚಿಕಿತ್ಸೆ ಸಲಹೆಗಳು',
    image: 'ಚಿತ್ರ',
    saveHistory: 'ನನ್ನ ಇತಿಹಾಸಕ್ಕೆ ಉಳಿಸಿ',
    askChatbot: 'ಚಾಟ್‌ಬಾಟ್‌ಗೆ ಪ್ರಶ್ನೆ ಕೇಳಿ',
    analyseAnother: 'ಮತ್ತೊಂದು ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    history: 'ಇತಿಹಾಸ',
    help: 'ಸಹಾಯ',
    home: 'ಹೋಮ್',
    noHistory: 'ಇನ್ನೂ ಇತಿಹಾಸ ಇಲ್ಲ.',
    chatbotTitle: 'ಚಾಟ್‌ಬಾಟ್',
    confidence: 'ನಂಬಿಕೆ',
    severity: 'ತೀವ್ರತೆ',
    quickQuestions: ['ಎಷ್ಟು ರಾಸಾಯನಿಕ ಬಳಸಬೇಕು?', 'ಇದು ಇತರ ಗಿಡಗಳಿಗೆ ಹರಡಬಹುದಾ?', 'ಹಣ್ಣು ತಿನ್ನಬಹುದೇ?']
  }
};

export function t(lang, key) {
  const l = translations[lang] || translations.en;
  return l[key];
}

export function tq(lang, key) {
  const l = translations[lang] || translations.en;
  return l[key] || [];
}

export default translations;
