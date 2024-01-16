export const isValidDomain = (domain: string): boolean => {
    // This regex checks for a simple domain with a second-level domain and a top-level domain (e.g., example.com).
    // It does not allow for prefixes (like https://) or paths/routes after the top-level domain (like .com/abc).
    const domainRegex: RegExp = /^[a-zA-Z0-9-]+\.(com|xyz|app)$/;
  
    return domainRegex.test(domain);
  };