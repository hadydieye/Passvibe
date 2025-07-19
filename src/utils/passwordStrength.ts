export interface PasswordAnalysis {
  score: number;
  length: number;
  charset: {
    lowercase: boolean;
    uppercase: boolean;
    numbers: boolean;
    symbols: boolean;
    size: number;
  };
  entropy: number;
  strength: 'Très Faible' | 'Faible' | 'Moyen' | 'Bon' | 'Fort' | 'Très Fort';
  bruteForceTime: string;
  feedback: string[];
}

export function analyzePassword(password: string): PasswordAnalysis {
  const length = password.length;
  
  // Analyse du charset
  const charset = {
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
    size: 0
  };

  // Calcul de la taille du charset
  let charsetSize = 0;
  if (charset.lowercase) charsetSize += 26;
  if (charset.uppercase) charsetSize += 26;
  if (charset.numbers) charsetSize += 10;
  if (charset.symbols) charsetSize += 32;
  
  charset.size = charsetSize;

  // Calcul de l'entropie
  const entropy = length * Math.log2(charsetSize || 1);

  // Calcul du score (0-100)
  let score = 0;
  
  // Points pour la longueur
  if (length >= 8) score += 25;
  if (length >= 12) score += 15;
  if (length >= 16) score += 10;

  // Points pour la diversité des caractères
  if (charset.lowercase) score += 10;
  if (charset.uppercase) score += 10;
  if (charset.numbers) score += 10;
  if (charset.symbols) score += 15;

  // Points pour l'entropie
  if (entropy >= 50) score += 10;
  if (entropy >= 70) score += 10;

  // Pénalités pour les motifs communs
  if (/(.)\1{2,}/.test(password)) score -= 10; // Caractères répétés
  if (/123|abc|qwe|password|motdepasse/i.test(password)) score -= 15; // Motifs communs

  score = Math.max(0, Math.min(100, score));

  // Détermination de la force
  let strength: PasswordAnalysis['strength'];
  if (score < 20) strength = 'Très Faible';
  else if (score < 40) strength = 'Faible';
  else if (score < 60) strength = 'Moyen';
  else if (score < 80) strength = 'Bon';
  else if (score < 95) strength = 'Fort';
  else strength = 'Très Fort';

  // Calcul du temps de brute force
  const bruteForceTime = calculateBruteForceTime(length, charsetSize);

  // Génération des feedback
  const feedback = generateFeedback(password, charset, length, score);

  return {
    score,
    length,
    charset,
    entropy,
    strength,
    bruteForceTime,
    feedback
  };
}

function calculateBruteForceTime(length: number, charsetSize: number): string {
  if (length === 0 || charsetSize === 0) return 'Instantané';
  
  const combinations = Math.pow(charsetSize, length);
  const averageAttempts = combinations / 2;
  
  // Supposons 1 milliard de tentatives par seconde
  const attemptsPerSecond = 1e9;
  const seconds = averageAttempts / attemptsPerSecond;
  
  if (seconds < 1) return 'Instantané';
  if (seconds < 60) return `${Math.round(seconds)} secondes`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} heures`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} jours`;
  if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} ans`;
  
  const years = seconds / 31536000;
  if (years < 1e6) return `${Math.round(years)} ans`;
  if (years < 1e9) return `${Math.round(years / 1e6)} millions d'années`;
  if (years < 1e12) return `${Math.round(years / 1e9)} milliards d'années`;
  
  return "Plus long que l'âge de l'univers";
}

function generateFeedback(password: string, charset: any, length: number, score: number): string[] {
  const feedback: string[] = [];
  
  if (length < 8) {
    feedback.push('Utilisez au moins 8 caractères');
  }
  
  if (length < 12) {
    feedback.push('Considérez 12+ caractères pour une meilleure sécurité');
  }
  
  if (!charset.lowercase) {
    feedback.push('Ajoutez des lettres minuscules');
  }
  
  if (!charset.uppercase) {
    feedback.push('Ajoutez des lettres majuscules');
  }
  
  if (!charset.numbers) {
    feedback.push('Ajoutez des chiffres');
  }
  
  if (!charset.symbols) {
    feedback.push('Ajoutez des caractères spéciaux (!@#$%^&*)');
  }
  
  if (/(.)\1{2,}/.test(password)) {
    feedback.push('Évitez les caractères répétés');
  }
  
  if (/123|abc|qwe|password|motdepasse/i.test(password)) {
    feedback.push('Évitez les motifs et mots communs');
  }
  
  if (score >= 80) {
    feedback.push('Excellent ! Votre mot de passe est très sécurisé');
  }
  
  return feedback;
}