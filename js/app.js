const button = document.getElementById("generate");
const copyBtn = document.getElementById("copyBtn");

button.onclick = () => {

    const title = document.getElementById("title").value;
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const transcript = document.getElementById("transcript").value;

    if (transcript.trim() === "") {
        alert("Please paste the Teams transcript.");
        return;
    }

    document.getElementById("result").innerHTML = `

<h2>${title}</h2>

<hr>

<h3>Department</h3>
<p>${department}</p>

<h3>Date</h3>
<p>${date}</p>

<hr>

<h3>Executive Summary</h3>

<p>
This meeting discussed the submitted transcript.
This is currently placeholder content.
</p>

<hr>

<h3>Discussion Points</h3>

<ul>
<li>Discussion Point One</li>
<li>Discussion Point Two</li>
<li>Discussion Point Three</li>
</ul>

<hr>

<h3>Action Items</h3>

<ul>
<li>Follow up with stakeholders</li>
<li>Prepare implementation plan</li>
</ul>

<hr>

<h3>Next Steps</h3>

<p>Schedule the next review meeting.</p>

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