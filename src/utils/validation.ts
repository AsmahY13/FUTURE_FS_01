// Enhanced email validation with domain checking
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Extract domain
  const domain = email.split('@')[1].toLowerCase();
  
  // List of common legitimate email domains
  const legitimateDomains = [
    // Free email providers
    'gmail.com', 'googlemail.com', 'google.com',
    'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
    'yahoo.com', 'ymail.com', 'rocketmail.com',
    'icloud.com', 'me.com', 'mac.com',
    'protonmail.com', 'proton.me',
    'zoho.com', 'gmx.com', 'yandex.com', 'mail.com',
    
    // Business/Education domains (common patterns)
    'edu', // .edu domains
    'ac.', // academic domains
    'gov', // government domains
    'org', // organization domains
    'co.', // company domains
    'inc.', // incorporated
    'ltd', // limited
    'corp', // corporation
  ];

  // List of known disposable/temporary email domains
  const disposableDomains = [
    'tempmail.com', '10minutemail.com', 'guerrillamail.com',
    'mailinator.com', 'trashmail.com', 'throwawaymail.com',
    'temp-mail.org', 'fakeinbox.com', 'yopmail.com',
    'getairmail.com', 'maildrop.cc', 'sharklasers.com'
  ];

  // Check if it's a disposable email
  if (disposableDomains.some(disposable => domain.includes(disposable))) {
    return { 
      isValid: false, 
      error: 'Please use a permanent email address (no temporary/disposable emails)' 
    };
  }

  // Check for common typos in popular domains
  const commonTypos: Record<string, string> = {
    'gamil.com': 'gmail.com',
    'gmial.com': 'gmail.com',
    'gmal.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmail.co': 'gmail.com',
    'gmail.cm': 'gmail.com',
    'outlook.co': 'outlook.com',
    'hotmail.co': 'hotmail.com',
    'yahoo.co': 'yahoo.com',
    'yaho.com': 'yahoo.com',
  };

  if (commonTypos[domain]) {
    return { 
      isValid: false, 
      error: `Did you mean ${email.split('@')[0]}@${commonTypos[domain]}?` 
    };
  }

  // Check if domain appears legitimate
  const isLegitimate = legitimateDomains.some(legitDomain => 
    domain.includes(legitDomain) || legitDomain.includes(domain)
  );

  if (!isLegitimate) {
    // For custom domains, we can do a basic MX record check (optional)
    // For now, we'll accept it but warn
    console.log(`Custom domain detected: ${domain}`);
    // You might want to accept it or add additional checks
  }

  return { isValid: true };
};

// Form validation
export const validateForm = (formData: { name: string; email: string; message: string }) => {
  const errors: string[] = [];

  if (!formData.name.trim()) {
    errors.push('Name is required');
  }

  if (!formData.email.trim()) {
    errors.push('Email is required');
  } else {
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid && emailValidation.error) {
      errors.push(emailValidation.error);
    }
  }

  if (!formData.message.trim()) {
    errors.push('Message is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};