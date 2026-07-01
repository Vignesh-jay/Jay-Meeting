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

    summary: "",
  };

  sentences.forEach((sentence) => {
    processSentence(sentence, meeting);
  });

  meeting.summary = buildSummary(
    sentences,
    meeting.decisions,
    meeting.actions,
    meeting.nextSteps,
  );

  return meeting;
}

function processSentence(sentence, meeting) {

    const speakerInfo = detectSpeaker(sentence);

    const topic = detectTopic(
        speakerInfo.text
    );

    const result = classifySentence(
        speakerInfo.text
    );
  switch (result.category) {
    case "action":
      const action = extractAction(speakerInfo.speaker, speakerInfo.text);

      action.confidence = result.confidence;
      action.matched = result.matched;
      action.topic = topic;

      meeting.actions.push(action);

      break;

    case "decision":
      meeting.decisions.push({
        speaker: speakerInfo.speaker,
        text: speakerInfo.text,
        confidence: result.confidence,
        matched: result.matched,
        topic: topic,
      });

      break;

    case "risk":
      meeting.risks.push({
        speaker: speakerInfo.speaker,
        text: speakerInfo.text,
        confidence: result.confidence,
        matched: result.matched,
        topic: topic,
      });

      break;

    case "nextStep":
      meeting.nextSteps.push({
        speaker: speakerInfo.speaker,
        text: speakerInfo.text,
        confidence: result.confidence,
        matched: result.matched,
        topic: topic,
      });

      break;

    default:
      meeting.discussion.push({
        speaker: speakerInfo.speaker,
        text: speakerInfo.text,
        topic: topic,
        confidence: result.confidence,
        matched: result.matched,
      });
  }
}
