(function() {

    "use strict";

const responses = [
    "لماذا لم تتايعني على TikTok",
    "شارك الصفحة أولا لنعطيك المزيد من المعلومات ويمكن أن تظهر لك صور شخصيات عامة قد تعرفها",
    "كم عمرك",
    "وماهو أسمك",
    "أذا كنت تحب الترند أضغط على متابعة وشارك فيديو له أكثر مشاهدة في صفحتي فقط وشكرلزيارتكم الصفحة وأنتظروا كل جديد"
];

const submit = document.querySelector(".chat-submit");
const chatBox = document.querySelector(".chat-box");
const chatInput = document.querySelector(".chat-input");

// const aiThinking = false;

function chatTemplate(aiOrPerson) {
    return (
        `
        <div class="ai-person-container">
            <div class="${aiOrPerson.class}">
            <p>${aiOrPerson.text}</p>
            </div>
            <span class="${aiOrPerson.class}-date">${aiOrPerson.date}</span>
        </div>
        `
    );
    }

    submit.addEventListener("click", function(e) {
    appendChatBox(true);
    });

    document.addEventListener("keypress", function(e) {
    if (e.keyCode == "13") {
        appendChatBox(true);
    }
    })

    function appendChatBox(fromPerson) {
    const date = new Date()
    if (!fromPerson){
        date.setSeconds(date.getSeconds() + 1)
    }
    if (fromPerson && !chatInput.value.trim()) {
        return;
    }
    const timestamp = date.toLocaleTimeString()
    const newChatDiv = chatTemplate({
        class: fromPerson ? "person" : "ai",
        text: fromPerson ? chatInput.value.trim() : aiResponse(),
        date: timestamp
    });
    if (!fromPerson) {
        // make it so it only responds once to multiple fast sentences
        setTimeout(function() {
        chatBox.innerHTML += newChatDiv;
        chatBox.scrollTop = chatBox.scrollHeight;
        }, 2000)
    } else {
        chatBox.innerHTML += newChatDiv;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    if (fromPerson) {
        chatInput.value = "";
        appendChatBox(false);
    }
    }

    function aiResponse() {
    const responseIndex = getRandomInt(0, responses.length - 1);
    const response = responses[responseIndex];
    return response;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

}())