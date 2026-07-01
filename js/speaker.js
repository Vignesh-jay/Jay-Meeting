function detectSpeaker(sentence){

    const patterns = [

        /^([^:]+):(.*)$/,

        /^([A-Z][a-z]+)\s*-\s*(.*)$/,

        /^([A-Z][a-z]+)\s+said\s+(.*)$/i

    ];

    for(const pattern of patterns){

        const match = sentence.match(pattern);

        if(match){

            return{

                speaker:match[1].trim(),

                text:match[2].trim()

            };

        }

    }

    return{

        speaker:"Unknown",

        text:sentence

    };

}