export type Exercise='read'|'blank'|'first'|'ref'|'type'|'prec'|'recite';
export type Grade='got'|'almost'|'missed';
export interface Draft {key:string;blankIndices?:number[];values?:string[];text?:string;ref?:string;[key:string]:unknown}
export interface MemoRecord {
 cs:number;ls:number;bl:number;fl:number;box:number;due:number;diff:number;lapses:number;
 tn:number;ts:number;tb:number;up:number;added?:number;active?:boolean;draft?:Draft;
 [key:string]:unknown;
}
export interface MemoState {items:Record<string,MemoRecord>;[key:string]:unknown}
export interface CustomScripture {id:string;book:string;verse:string;text:string;[key:string]:unknown}
export const memoKey='bibleMemo_v1',customKey='bibleCustomScriptures_v1';
