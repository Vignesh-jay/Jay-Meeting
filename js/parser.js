function parseTranscript(text){

    const lines = text.split("\n");

    const decisions = [];

    const actions = [];

    const nextSteps = [];

    lines.forEach(line=>{

        line=line.trim();

        if(line.toLowerCase().startsWith("decision:")){

            decisions.push(
                line.replace(/decision:/i,"").trim()
            );

        }

        if(line.toLowerCase().startsWith("action:")){

            actions.push(
                line.replace(/action:/i,"").trim()
            );

        }

        if(line.toLowerCase().startsWith("next meeting:")){

            nextSteps.push(
                line.replace(/next meeting:/i,"").trim()
            );

        }

    });

    return{

        totalLines:lines.length,

        decisions,

        actions,

        nextSteps,
        summary:
        `${lines.length} lines of discussion were analysed. ${
        actions.length
        } action item(s), ${
        decisions.length
        } decision(s) and ${
        nextSteps.length
        } next meeting item(s) were detected.`

    };

}