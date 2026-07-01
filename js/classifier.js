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

    const scores = {

        action:0,
        decision:0,
        risk:0,
        nextStep:0

    };

    const lower = sentence.toLowerCase();

    Object.keys(RULES).forEach(type=>{

        RULES[type].forEach(keyword=>{

            if(lower.includes(keyword)){

                scores[type]++;

            }

        });

    });

    let bestCategory = "discussion";
    let highestScore = 0;

    Object.keys(scores).forEach(category=>{

        if(scores[category] > highestScore){

            highestScore = scores[category];
            bestCategory = category;

        }

    });

    return{

        category:bestCategory,

        score:highestScore

    };

}