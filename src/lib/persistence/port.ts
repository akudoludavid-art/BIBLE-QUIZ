// Only the adapter may touch browser storage; domain modules consume snapshots.
export interface KeyValueStore {
 getItem(key:string):string|null;
 setItem(key:string,value:string):void;
 removeItem(key:string):void;
}
export class MemoryStore implements KeyValueStore {
 private values=new Map<string,string>();
 getItem(key:string):string|null{return this.values.get(key)??null;}
 setItem(key:string,value:string):void{this.values.set(key,value);}
 removeItem(key:string):void{this.values.delete(key);}
}
