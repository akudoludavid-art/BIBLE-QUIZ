const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
for(const r of JSON.parse(fs.readFileSync('legacy/ORIGINAL_SHA256.txt','utf8'))){const bytes=fs.readFileSync(r.archive);assert.equal(bytes.length,r.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),r.sha256)}
console.log('PASS both immutable archive hashes');
