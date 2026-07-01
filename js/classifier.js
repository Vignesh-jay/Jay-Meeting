const RULES = {

    action: [

        "will",
        "shall",
        "need to",
        "must",
        "prepare",
        "send",
        "contact",
        "follow up",
        "complete",
        "submit"

    ],

    decision: [

        "approved",
        "agreed",
        "confirmed",
        "accepted",
        "resolved",
        "finalized"

    ],

    risk: [

        "issue",
        "problem",
        "delay",
        "blocked",
        "pending",
        "risk"

    ],

    nextStep: [

        "tomorrow",
        "next week",
        "friday",
        "monday",
        "review",
        "meeting"

    ]

};

function classifySentence(sentence){

    const lower = sentence.toLowerCase();

    const scores = {};
    const matches = {};

    Object.keys(RULES).forEach(type => {

        scores[type] = 0;
        matches[type] = [];

        RULES[type].forEach(keyword => {

            if(lower.includes(keyword)){

                scores[type]++;

                matches[type].push(keyword);

            }

        });

    });

    let category = "discussion";
    let highest = 0;

    Object.keys(scores).forEach(type => {

        if(scores[type] > highest){

            highest = scores[type];
            category = type;

        }

    });

    const maxKeywords = RULES[category]
        ? RULES[category].length
        : 1;

    const confidence =
        category === "discussion"
            ? 0
            : highest / maxKeywords;

    return{

        category,

        score: highest,

        confidence,

        matched: matches[category]

    };

}