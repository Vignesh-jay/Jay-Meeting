// ======================================
// JΛY Meeting Engine
// ======================================

function analyseMeeting(transcript) {

    const sentences = getSentences(transcript);

    const meeting = {

        totalSentences: sentences.length,

        discussion: [],

        decisions: [],

        actions: [],

        risks: [],

        nextSteps: [],

        summary: ""

    };

    sentences.forEach(sentence => {

        processSentence(sentence, meeting);

    });

    meeting.summary = buildSummary(
        sentences,
        meeting.decisions,
        meeting.actions,
        meeting.nextSteps
    );

    return meeting;

}

function processSentence(sentence, meeting) {

    const speakerInfo = detectSpeaker(sentence);

    const result = classifySentence(speakerInfo.text);

    switch (result.category) {

        case "action":

            meeting.actions.push(
                extractAction(
                    speakerInfo.speaker,
                    speakerInfo.text
                )
            );

            break;

        case "decision":

            meeting.decisions.push({
                speaker: speakerInfo.speaker,
                text: speakerInfo.text
            });

            break;

        case "risk":

            meeting.risks.push({
                speaker: speakerInfo.speaker,
                text: speakerInfo.text
            });

            break;

        case "nextStep":

            meeting.nextSteps.push({
                speaker: speakerInfo.speaker,
                text: speakerInfo.text
            });

            break;

        default:

            meeting.discussion.push({
                speaker: speakerInfo.speaker,
                text: speakerInfo.text
            });

    }

}