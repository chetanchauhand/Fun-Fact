
const questions = [
    {
        q: "Physics ka naam sunte hi kya yaad aata hai?",
        o: ["Numericals", "Derivations", "Units and dimensions", "Kal padhungi"],
        f: "Physics ki yaadein abhi bhi fresh hain!"
    },
    {
        q: "Maths mein sabse dangerous kya lagta hai?",
        o: ["Integration", "Differentiation", "Probability", "Sab kuch"],
        f: "Maths ne sabko pareshan kiya hai!"
    },
    {
        q: "Chemistry padhte waqt sabse zyada kya hota hai?",
        o: ["Reactions yaad karna", "Formula bhool jaana", "Notes banana", "Book kholte hi neend"],
        f: "Chemistry ka reaction toh banta hai!"
    },
    {
        q: "Physics ka numerical nahi bane toh?",
        o: ["Dobara try", "Formula check", "Friend se poochungi", "Question syllabus mein nahi hoga"],
        f: "Scientist ji, kya plan hai!"
    },
    {
        q: "Maths ka question dekhkar brain kya kehta hai?",
        o: ["Easy hai", "Ho jayega", "Samajh nahi aa raha", "Bhagwan bharose"],
        f: "Brain abhi processing kar raha hai!"
    },
    {
        q: "Chemistry ki equation balance na ho toh?",
        o: ["Phir se try", "Teacher se poochungi", "Notes check", "Life bhi balanced nahi hai"],
        f: "Equation se zyada life complicated hai!"
    },
    {
        q: "Exam se ek din pehle preparation kitni hoti hai?",
        o: ["Full preparation", "Half syllabus", "Important questions only", "Ab jo hoga dekha jayega"],
        f: "Last-minute preparation specialist!"
    },
    {
        q: "Teen subjects homework dein toh?",
        o: ["Pehle Maths", "Pehle Physics", "Pehle Chemistry", "Pehle so jaungi"],
        f: "Homework se bachne ka plan interesting hai!"
    },
    {
        q: "PCM student ka powerful weapon kya hai?",
        o: ["Calculator", "Formula sheet", "Rough copy", "Friend ka solution"],
        f: "Friendship ka asli use yahi hai!"
    },
    {
        q: "12th PCM ke baad pehla thought kya hota hai?",
        o: ["Finally freedom", "Ab kya karna hai", "College life", "Pehle rest"],
        f: "PCM ke baad life ka next chapter!"
    }
];

let current = 0;
let score = 0;
let answered = false;

const $ = id => document.getElementById(id);

function showScreen(id) {
    ["welcome-screen", "quiz-screen", "result-screen"].forEach(screen => {
        $(screen).classList.add("hidden");
    });

    $(id).classList.remove("hidden");
}

function startQuiz() {
    current = 0;
    score = 0;
    $("confetti-layer").replaceChildren();
    showScreen("quiz-screen");
    renderQuestion();
}

function renderQuestion() {
    answered = false;

    const item = questions[current];

    $("question-count").textContent =
        `Question ${current + 1} of ${questions.length}`;

    $("score-label").textContent = `Score: ${score}`;

    $("progress-fill").style.width =
        `${((current + 1) / questions.length) * 100}%`;

    $("question-text").textContent = item.q;
    $("feedback").textContent = "Choose your answer!";
    $("next-btn").disabled = true;

    $("next-btn").textContent =
        current === questions.length - 1 ? "See Result" : "Next";

    $("options").replaceChildren();

    item.o.forEach((option, index) => {
        const btn = document.createElement("button");

        btn.className = "option-btn";
        btn.textContent = option;

        btn.onclick = () => {
            if (answered) return;

            answered = true;
            score++;

            btn.classList.add("selected");

            document.querySelectorAll(".option-btn")
                .forEach(button => button.disabled = true);

            $("score-label").textContent = `Score: ${score}`;
            $("feedback").textContent =
                index === 3 ? item.f : "Interesting choice!";

            $("next-btn").disabled = false;
        };

        $("options").appendChild(btn);
    });
}

function showResult() {
    showScreen("result-screen");

    $("final-score").textContent = `${score}/10`;

    let title, message, emoji;

    if (score >= 5) {
        title = "PCM survivor detected!";
        message = "Your PCM memories are still going strong!";
        emoji = "🏆";
        confetti();
    } else if (score >= 3) {
        title = "PCM memories are still alive!";
        message = "Some formulas are remembered, others forgotten.";
        emoji = "📚";
    } else if (score >= 1) {
        title = "PCM erased your memory!";
        message = "Looks like your brain has moved on.";
        emoji = "😂";
    } else {
        title = "PCM took its revenge!";
        message = "Physics, Chemistry and Maths won this round.";
        emoji = "😭";
    }

    $("result-title").textContent = title;
    $("result-message").textContent = message;
    $("result-emoji").textContent = emoji;
}

function confetti() {
    const colors = ["#7565d8", "#ff8db4", "#ffd166", "#72d6c4"];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.background = colors[
            Math.floor(Math.random() * colors.length)
        ];

        $("confetti-layer").appendChild(piece);
    }

    setTimeout(() => {
        $("confetti-layer").replaceChildren();
    }, 3500);
}

$("start-btn").onclick = startQuiz;

$("next-btn").onclick = () => {
    if (!answered) return;

    if (current < questions.length - 1) {
        current++;
        renderQuestion();
    } else {
        showResult();
    }
};

$("play-again-btn").onclick = startQuiz;