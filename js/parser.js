// ============================================
// JΛY Meeting Parser Engine v1.0
// ============================================

function getSentences(text) {

    return text
        .replace(/\r/g, "")
        .replace(/\n+/g, " ")
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);

}

// ============================================

function parseDecisions(sentences) {

    const decisions = [];

    const decisionPatterns = [

        /\bdecision:/i,

        /\bapproved\b/i,

        /\bagreed\b/i,

        /\baccepted\b/i,

        /\bconfirmed\b/i,

        /\bfinalized\b/i,

        /\bcompleted\b/i,

        /\bclosed\b/i,

        /\bresolved\b/i

    ];

    sentences.forEach(sentence => {

        const match = decisionPatterns.some(pattern =>
            pattern.test(sentence)
        );

        if (match) {

            decisions.push(
                sentence.replace(/^decision:/i, "").trim()
            );

        }

    });

    return decisions;

}

// ============================================

function parseActions(sentences) {

    const actions = [];

    const actionPatterns = [

        /\baction:/i,

        /\bwill\b/i,

        /\bshall\b/i,

        /\bneed to\b/i,

        /\bhas to\b/i,

        /\bmust\b/i,

        /\blet'?s\b/i,

        /\bprepare\b/i,

        /\bsend\b/i,

        /\bcontact\b/i,

        /\bfollow up\b/i,

        /\bcomplete\b/i,

        /\bsubmit\b/i

    ];

    sentences.forEach(sentence => {

        const match = actionPatterns.some(pattern =>
            pattern.test(sentence)
        );

        if (match) {

            actions.push(
                sentence.replace(/^action:/i, "").trim()
            );

        }

    });

    return actions;

}

// ============================================

function parseNextSteps(sentences) {

    const nextSteps = [];

    sentences.forEach(sentence => {

        if (sentence.toLowerCase().startsWith("next meeting:")) {

            nextSteps.push(
                sentence.replace(/next meeting:/i, "").trim()
            );

        }

    });

    return nextSteps;

}

// ============================================

function buildSummary(
    sentences,
    decisions,
    actions,
    nextSteps
){

    return `

${sentences.length} sentence(s) analysed.

${decisions.length} decision(s)

${actions.length} action item(s)

${nextSteps.length} next step(s)

`;

}

// ============================================

function extractAction(speaker, text){

    let task = text.trim();

    // Remove common prefixes

    task = task.replace(/^I'll\s+/i, "");

    task = task.replace(/^I will\s+/i, "");

    task = task.replace(/^We will\s+/i, "");

    task = task.replace(/^Let's\s+/i, "");

    task = task.replace(/^Need to\s+/i, "");

    task = task.replace(/^Must\s+/i, "");

    task = task.replace(/^Should\s+/i, "");

    return {

        owner: speaker || "Unassigned",

        task: task

    };

}

// ============================================

function parseTranscript(text){

    return analyseMeeting(text);

}