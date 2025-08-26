import { ProfessionalApplication, CompetencyScore, ProLevel } from '@/types/professional';

export function calculateCompetencyScore(application: ProfessionalApplication): CompetencyScore {
  let score = 0;
  const breakdown: any = {};

  // Years of Oncology Practice (0-20 points)
  const yearsPractice = application.yearsPractice;
  if (yearsPractice >= 20) {
    breakdown.yearsPractice = 20;
  } else if (yearsPractice >= 10) {
    breakdown.yearsPractice = 15;
  } else if (yearsPractice >= 5) {
    breakdown.yearsPractice = 10;
  } else {
    breakdown.yearsPractice = 5;
  }
  score += breakdown.yearsPractice;

  // Board Certification (10 points)
  breakdown.boardCertification = 10;
  score += 10;

  // Subspecialty Focus (5 points)
  if (application.subspecialties.length > 0) {
    breakdown.subspecialtyFocus = 5;
    score += 5;
  } else {
    breakdown.subspecialtyFocus = 0;
  }

  // Publications (0-15 points)
  const publications = application.publications;
  if (publications > 20) {
    breakdown.publications = 15;
  } else if (publications >= 6) {
    breakdown.publications = 10;
  } else if (publications >= 1) {
    breakdown.publications = 5;
  } else {
    breakdown.publications = 0;
  }
  score += breakdown.publications;

  // Clinical Trials (0-10 points)
  if (application.clinicalTrials.involved) {
    // Check if they mentioned being PI or lead in description
    const description = application.clinicalTrials.description?.toLowerCase() || '';
    if (description.includes('principal investigator') || description.includes('pi') || description.includes('lead')) {
      breakdown.clinicalTrials = 10;
    } else {
      breakdown.clinicalTrials = 5;
    }
  } else {
    breakdown.clinicalTrials = 0;
  }
  score += breakdown.clinicalTrials;

  // Conference/Teaching (0-10 points)
  let conferenceTeaching = 0;
  if (application.conferencePresentations.involved) {
    conferenceTeaching += 5;
  }
  if (application.teachingRoles.involved) {
    conferenceTeaching += 5;
  }
  breakdown.conferenceTeaching = Math.min(conferenceTeaching, 10);
  score += breakdown.conferenceTeaching;

  // Society Membership (5 points)
  if (application.societyMemberships.length > 0) {
    breakdown.societyMembership = 5;
    score += 5;
  } else {
    breakdown.societyMembership = 0;
  }

  // Leadership Roles (0-10 points)
  if (application.leadershipRoles) {
    const leadership = application.leadershipRoles.toLowerCase();
    if (leadership.includes('national') || leadership.includes('board') || leadership.includes('committee')) {
      breakdown.leadershipRoles = 10;
    } else if (leadership.includes('hospital') || leadership.includes('department') || leadership.includes('chief')) {
      breakdown.leadershipRoles = 5;
    } else {
      breakdown.leadershipRoles = 2;
    }
  } else {
    breakdown.leadershipRoles = 0;
  }
  score += breakdown.leadershipRoles;

  // Peer Review/Guideline Involvement (0-15 points)
  let peerReviewGuidelines = 0;
  // Check if they mentioned guideline involvement in leadership roles
  if (application.leadershipRoles?.toLowerCase().includes('guideline')) {
    peerReviewGuidelines += 15;
  } else if (application.leadershipRoles?.toLowerCase().includes('review')) {
    peerReviewGuidelines += 10;
  }
  breakdown.peerReviewGuidelines = Math.min(peerReviewGuidelines, 15);
  score += breakdown.peerReviewGuidelines;

  // Determine level based on total score
  let level: ProLevel;
  if (score >= 80) {
    level = 'DISTINGUISHED';
  } else if (score >= 60) {
    level = 'EXPERT';
  } else if (score >= 40) {
    level = 'SENIOR';
  } else {
    level = 'JUNIOR';
  }

  return {
    yearsPractice: breakdown.yearsPractice,
    boardCertification: breakdown.boardCertification,
    subspecialtyFocus: breakdown.subspecialtyFocus,
    publications: breakdown.publications,
    clinicalTrials: breakdown.clinicalTrials,
    conferenceTeaching: breakdown.conferenceTeaching,
    societyMembership: breakdown.societyMembership,
    leadershipRoles: breakdown.leadershipRoles,
    peerReviewGuidelines: breakdown.peerReviewGuidelines,
    totalScore: score,
    level,
  };
}

export function getLevelDescription(level: ProLevel): string {
  switch (level) {
    case 'JUNIOR':
      return 'Early-career oncologist with basic qualifications and limited experience';
    case 'SENIOR':
      return 'Experienced oncologist with solid clinical practice and some academic contributions';
    case 'EXPERT':
      return 'Highly qualified oncologist with extensive experience and significant academic contributions';
    case 'DISTINGUISHED':
      return 'Leading oncologist with exceptional expertise, extensive publications, and leadership roles';
    default:
      return 'Level not determined';
  }
}

export function getScoreBreakdown(score: CompetencyScore) {
  return [
    { category: 'Years of Practice', score: score.yearsPractice, max: 20 },
    { category: 'Board Certification', score: score.boardCertification, max: 10 },
    { category: 'Subspecialty Focus', score: score.subspecialtyFocus, max: 5 },
    { category: 'Publications', score: score.publications, max: 15 },
    { category: 'Clinical Trials', score: score.clinicalTrials, max: 10 },
    { category: 'Conference/Teaching', score: score.conferenceTeaching, max: 10 },
    { category: 'Society Membership', score: score.societyMembership, max: 5 },
    { category: 'Leadership Roles', score: score.leadershipRoles, max: 10 },
    { category: 'Peer Review/Guidelines', score: score.peerReviewGuidelines, max: 15 },
  ];
}
