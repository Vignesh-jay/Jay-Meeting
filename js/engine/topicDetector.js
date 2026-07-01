// =====================================
// Topic Detector v1
// =====================================

const STOP_WORDS = [

    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "will",
    "would",
    "should",
    "could",
    "to",
    "of",
    "for",
    "and",
    "or",
    "with",
    "by",
    "from",
    "on",
    "in",
    "at",
    "it",
    "this",
    "that",
    "we",
    "i",
    "you"

];

function detectTopic(sentence){

    const words = sentence
        .toLowerCase()
        .replace(/[^\w\s]/g,"")
        .split(/\s+/);

    const candidates = words.filter(word=>{

        return word.length > 3 &&
               !STOP_WORDS.includes(word);

    });

    if(candidates.length===0){

        return "General";

    }

    return candidates[0];

}