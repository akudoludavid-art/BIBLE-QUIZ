import type {AnswerOption,GeneratedQuestion,Question,Random} from '../questions/types';
import {shuffle} from '../questions/random';
export interface PresentedQuestion {id:string;prompt:string;options:AnswerOption[];correctOptionId:string;explanation:string;references:string[];detail?:Question}
export function presentMain(q:Question,random:Random):PresentedQuestion{return {id:q.id,prompt:q.stem,options:shuffle(q.options,random),correctOptionId:q.correctOptionId,explanation:q.explanation,references:q.references,detail:q};}
export function presentScripture(q:GeneratedQuestion):PresentedQuestion{const id=(label:string)=>q.id+':choice:'+encodeURIComponent(label);return {id:q.id,prompt:q.q,options:q.opts.map(label=>({id:id(label),label})),correctOptionId:id(q.ans),explanation:q.exp,references:[]};}
export const singleChoiceForm={id:'single-choice',evaluate:(q:PresentedQuestion,optionId:string)=>q.options.some(o=>o.id===optionId)&&optionId===q.correctOptionId};
export interface Session{id:string;questions:PresentedQuestion[];index:number;score:number;startedAt:number;endedAt?:number;status:'active'|'feedback'|'completed'|'aborted';answerId?:string}
export type SessionAction={type:'answer';sessionId:string;questionId:string;optionId:string}|{type:'next';sessionId:string;at:number}|{type:'abort';sessionId:string;at:number};
export function transition(s:Session,a:SessionAction):Session{
 if(a.sessionId!==s.id||s.status==='completed'||s.status==='aborted')return s;
 if(a.type==='abort')return {...s,status:'aborted',endedAt:a.at};
 if(a.type==='answer'){
  const q=s.questions[s.index];if(s.status!=='active'||!q||q.id!==a.questionId||!q.options.some(o=>o.id===a.optionId))return s;
  return {...s,status:'feedback',answerId:a.optionId,score:s.score+(singleChoiceForm.evaluate(q,a.optionId)?1:0)};
 }
 if(s.status!=='feedback')return s;
 if(s.index+1>=s.questions.length)return {...s,status:'completed',endedAt:a.at};
 return {...s,index:s.index+1,status:'active',answerId:undefined};
}
export const formatTime=(seconds:number):string=>String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
export function resultText(score:number,total:number,scripture=false):string{const p=Math.round(score/total*100);return scripture?(p>=90?'Excellent Scripture recognition.':p>=70?'Strong result. Keep repeating the passages until the references become automatic.':p>=50?'Good progress. Review the passages you missed and repeat the session.':'Use Browse Scripture Bank for a study round, then try again.'):(p>=90?'Excellent — outstanding Bible character knowledge.':p>=70?'Strong result — you know many of these characters well.':p>=50?'Good start — review the explanations and try again.':'Keep studying — the obscure characters will become much easier with repetition.');}
