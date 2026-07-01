const button = document.getElementById("generate");
const copyBtn = document.getElementById("copyBtn");
const downloadHtmlBtn =
    document.getElementById("downloadHtml");

const downloadMdBtn =
    document.getElementById("downloadMd");const saveDraftBtn = document.getElementById("saveDraft");

    const clearBtn = document.getElementById("clearForm");

button.onclick = async () => {

    const title = document.getElementById("title").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const transcript = document.getElementById("transcript").value;
    const parsed = parseTranscript(transcript); 

    document.getElementById("stats").innerHTML = `

    <div class="stats">

        <div class="stat">

            <h3>${parsed.totalLines}</h3>

            <p>Lines</p>

        </div>

        <div class="stat">

            <h3>${parsed.decisions.length}</h3>

            <p>Decisions</p>

        </div>

        <div class="stat">

            <h3>${parsed.actions.length}</h3>

            <p>Actions</p>

        </div>

        <div class="stat">

            <h3>${parsed.nextSteps.length}</h3>

            <p>Next Meetings</p>

        </div>

    </div>

    `;

    if (transcript.trim() === "") {
        alert("Please paste the Teams transcript.");
        return;
    }

    const result = document.getElementById("result");

    // Loading Screen
    result.innerHTML = `
    <div class="loading">
        <div class="spinner"></div>

        <h3>Analyzing Meeting...</h3>

        <p>Preparing professional meeting minutes...</p>
    </div>
    `;

    // Fake AI delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Show Minutes
    result.innerHTML = `

    <h2>${title}</h2>

    <hr>

    <h3>Department</h3>
    <p>${department}</p>

    <h3>Date</h3>
    <p>${date}</p>

    <hr>

    <h3>Executive Summary</h3>

    <p>${parsed.summary}</p>

    <hr>

    <h3>Discussion Points</h3>

    <p>Total transcript lines: ${parsed.totalLines}</p>

    <hr>

    <h3>Decisions</h3>

    <ul>

    ${
    parsed.decisions.length
    ?
    parsed.decisions.map(decision=>`<li>${decision}</li>`).join("")
    :
    "<li>No decisions found.</li>"
    }

    </ul>

    <hr>

    <h3>Action Items</h3>

    <ul>

    ${
    parsed.actions.length
    ?
    parsed.actions.map(action=>`<li>${action}</li>`).join("")
    :
    "<li>No action items found.</li>"
    }

    </ul>

    <hr>

    <h3>Next Steps</h3>

    <ul>

    ${
    parsed.nextSteps.length
    ?
    parsed.nextSteps.map(step=>`<li>${step}</li>`).join("")
    :
    "<li>No next meeting found.</li>"
    }

    </ul>

    `;

};

copyBtn.onclick = async () => {

    const text = document.getElementById("result").innerText;

    try {

        await navigator.clipboard.writeText(text);

        copyBtn.innerHTML = "✅ Copied";

        setTimeout(() => {

            copyBtn.innerHTML = "📋 Copy";

        }, 2000);

    } catch (err) {

        alert("Unable to copy.");

    }

};

downloadHtmlBtn.onclick = () => {

    const content = document.getElementById("result").innerHTML;

    const title = document.getElementById("title").value || "Meeting";

    const html = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>${title}</title>

<style>

body{

font-family:Arial;

padding:40px;

line-height:1.7;

}

h2{

color:#6D28D9;

}

</style>

</head>

<body>

${content}

</body>

</html>

`;

    const blob = new Blob([html], {

        type:"text/html"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${title}.html`;

    a.click();

    URL.revokeObjectURL(url);

};

downloadMdBtn.onclick = () => {

    const text =
        document.getElementById("result").innerText;

    const title =
        document.getElementById("title").value || "Meeting";

    const blob = new Blob(
        [text],
        {
            type:"text/markdown"
        }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `${title}.md`;

    a.click();

    URL.revokeObjectURL(url);

};

saveDraftBtn.onclick = () => {

    const draft = {

        title: document.getElementById("title").value,

        department: document.getElementById("department").value,

        date: document.getElementById("date").value,

        transcript: document.getElementById("transcript").value

    };

    localStorage.setItem("jayMeetingDraft", JSON.stringify(draft));

    alert("Draft Saved.");

};

clearBtn.onclick = () => {

    if (!confirm("Clear the current meeting?")) {
        return;
    }

    document.getElementById("title").value = "";
    document.getElementById("department").value = "";
    document.getElementById("date").value = "";
    document.getElementById("transcript").value = "";

    document.getElementById("stats").innerHTML = "";

    document.getElementById("result").innerHTML =
        "Meeting Minutes will appear here.";

    localStorage.removeItem("jayMeetingDraft");

};

window.onload = () => {

    const draft = JSON.parse(localStorage.getItem("jayMeetingDraft"));

    if(!draft) return;

    document.getElementById("title").value = draft.title;

    document.getElementById("department").value = draft.department;

    document.getElementById("date").value = draft.date;

    document.getElementById("transcript").value = draft.transcript;

};

const fields = [

    "title",

    "department",

    "date",

    "transcript"

];

fields.forEach(id => {

    document
        .getElementById(id)
        .addEventListener("input", autoSave);

});

function autoSave(){

    const draft = {

        title: document.getElementById("title").value,

        department: document.getElementById("department").value,

        date: document.getElementById("date").value,

        transcript: document.getElementById("transcript").value

    };

    localStorage.setItem(

        "jayMeetingDraft",

        JSON.stringify(draft)

    );

}