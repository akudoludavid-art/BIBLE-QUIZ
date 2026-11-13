export type Random = () => number;
export type Mode = 'ot' | 'nt' | 'mixed' | 'hard';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'mastery';
export interface AnswerOption { id: string; label: string }
export interface Question {
  id: string; knowledgePointId: string; equivalenceGroup: string; eventGroup: string;
  stem: string; options: AnswerOption[]; correctOptionId: string;
  primaryCategory: string; secondaryCategories: string[]; difficulty: Difficulty;
  difficultyRationale: string; testamentScope: 'OT' | 'NT' | 'CROSS'; bookCoverage: string[];
  era: string; references: string[]; explanation: string; whyDistractorsAreWrong: Record<string,string>;
  provenance: {edition:string;proofStatus:string;source:string;revision:string};
  editorialStatus: string; origin: string; questionType: 'single-choice';
  contextWarnings: string[]; legacySourceIds: string[];
}
export interface Character {t:'ot'|'nt'; n:string; kids:string; book:string; story:string}
export interface Scripture {book:string; ref:string; text:string}
export interface Parable {name:string; ref:string; theme:string}
export interface Miracle {name:string; ref:string}
export interface Passage {
  id:string; ref:string; book:string; vs:string[]; text:string; nt:boolean; tp:string[];
  pass?:number; custom?:boolean; verse?:string;
}
export interface KnowledgeGraph {
 version:number;scope:string;
 entities:{id:string;type:string;label:string;aliases?:string[];gender?:string;roles?:string[];references:string[]}[];
 edges:{from:string;to:string;relation:string;reference:string;explicitness:string}[];
}
export interface SourceContent {
 questions:Question[];characters:Character[];scriptures:Scripture[];parables:Parable[];miracles:Miracle[];
 graph:KnowledgeGraph;legacyEquivalences:Record<string,string>;ntBooks:string[];
 memorisation:{passages:[string,string,string[]][];library:Passage[];topics:Record<string,{source:string;flags:string}>};
}
export interface QuestionStats {
 attempts:number;correct:number;incorrect:number;exposures:number;streak:number;
 lastSeenSession?:number;lastSeenAt?:number;lastAnsweredCorrectly?:boolean;
}
export interface QuizHistory {version:14;session:number;items:Record<string,QuestionStats>}
export interface GeneratedQuestion {id:string;q:string;ans:string;opts:string[];exp:string}
export type ScriptureMode='all'|'ot'|'nt'|'parables'|'miracles'|'memo'|'book';
