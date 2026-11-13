import type {Question,QuestionStats,QuizHistory,Random} from '../questions/types';
// Future contract only: no event writer, analytics collection, upload or product mode.
export interface QuestionExposureEvent {
 eventId:string;sessionId:string;questionId:string;questionVersion:string;formId:string;
 curriculumVersion:string;at:number;context:'solo';status:'displayed'|'answered'|'skipped';
 result?:'correct'|'incorrect';localProfileId?:string;
}
export type ExposureEvidence={kind:'unknown'}|{kind:'legacy-aggregate';statistics:QuestionStats;exactEvents:'unknown'};
export const legacyExposure=(history:QuizHistory,id:string):ExposureEvidence=>history.items[id]?{kind:'legacy-aggregate',statistics:{...history.items[id]},exactEvents:'unknown'}:{kind:'unknown'};
export interface SelectionStrategy {select(pool:readonly Question[],count:number,history:QuizHistory,random:Random):Question[]}
