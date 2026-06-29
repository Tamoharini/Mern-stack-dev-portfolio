/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  stack: string[];
  links: {
    live?: string;
    github: string;
  };
  highlights: string[];
  description: string;
  category: 'frontend' | 'database-sql' | 'database-nosql';
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  type: string;
  location: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  score: string;
  stream?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; info?: string }[];
}

export interface ContactMessage {
  id: string;
  timestamp: string;
  senderName: string;
  senderEmail: string;
  phone: string;
  message: string;
  isRead?: boolean;
}
