
const problems = {
  foundation: {
    title: "Let's solve it together",
    context: "Find two numbers that multiply to 6 and add to 5.",
    equation: "x² − 5x + 6 = 0",
    answer: [2, 3],
    hint: "Find two numbers whose product is 6 and sum is 5: 2 and 3.",
    steps: [
      "Find the pair 2 and 3.",
      "Factor: (x − 2)(x − 3) = 0.",
      "Set each factor equal to zero.",
      "The roots are x = 2 and x = 3."
    ]
  },
  standard: {
    title: "Factor and solve",
    context: "Factor the equation and verify both roots.",
    equation: "x² − 7x + 12 = 0",
    answer: [3, 4],
    hint: "Find two numbers with product 12 and sum −7.",
    steps: [
      "Choose −3 and −4.",
      "Factor: (x − 3)(x − 4) = 0.",
      "Set each factor equal to zero.",
      "The roots are x = 3 and x = 4."
    ]
  },
  advanced: {
    title: "A garden challenge",
    context: "A rectangle has area 40 m². Its length is 3 m greater than its width. Find its dimensions.",
    equation: "w(w + 3) = 40",
    answer: [-8, 5],
    hint: "Rearrange to w² + 3w − 40 = 0. Which root gives a positive width?",
    steps: [
      "Rearrange: w² + 3w − 40 = 0.",
      "Factor: (w + 8)(w − 5) = 0.",
      "The roots are −8 and 5.",
      "Reject the negative width. Width = 5 m, length = 8 m."
    ]
  }
};

let level = "foundation";

const $ = id => document.getElementById(id);

function showProblem() {
  const p = problems[level];

  $("problemTitle").textContent = p.title;
  $("context").textContent = p.context;
  $("equation").textContent = p.equation;
  $("feedback").textContent = "";
  $("answer").value = "";
  $("coachMessage").textContent =
    "Choose a hint or view the worked solution.";
  $("steps").replaceChildren();

  document.querySelectorAll(".level").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.level === level
    );
  });
}

document.querySelectorAll(".level").forEach(button => {
  button.addEventListener("click", () => {
    level = button.dataset.level;
    showProblem();
  });
});

$("check").addEventListener("click", () => {
  const p = problems[level];
  const values = $("answer").value.match(/[-+]?\d*\.?\d+/g);
  const feedback = $("feedback");

  if (!values || values.length !== 2) {
    feedback.textContent = "Enter both roots, for example: 2, 3.";
    feedback.style.color = "#b64d3c";
    return;
  }

  const entered = values.map(Number).sort((a, b) => a - b);
  const expected = [...p.answer].sort((a, b) => a - b);

  const correct = entered.every(
    (value, index) => Math.abs(value - expected[index]) < 0.001
  );

  feedback.textContent = correct
    ? "Correct! Well done."
    : "Not quite. Check the signs and try again.";

  feedback.style.color = correct ? "#23765a" : "#b64d3c";
});

$("hint").addEventListener("click", () => {
  $("coachMessage").textContent = problems[level].hint;
  $("steps").replaceChildren();
});

$("solution").addEventListener("click", () => {
  const p = problems[level];
  $("coachMessage").textContent =
    "Here is the step-by-step solution:";

  const list = $("steps");
  list.replaceChildren();

  p.steps.forEach(step => {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });
});

$("newProblem").addEventListener("click", () => {
  // Built-in fallback problems for a basic demo.
  const alternatives = {
    foundation: {
      title: "Try a new factorization",
      context: "Solve this quadratic equation.",
      equation: "x² − 6x + 8 = 0",
      answer: [2, 4],
      hint: "Find two numbers with product 8 and sum 6.",
      steps: [
        "Factor: (x − 2)(x − 4) = 0.",
        "Set each factor equal to zero.",
        "The roots are 2 and 4."
      ]
    },
    standard: {
      title: "New quadratic challenge",
      context: "Factor the equation and find both roots.",
      equation: "x² − 9x + 20 = 0",
      answer: [4, 5],
      hint: "Find two numbers with product 20 and sum −9.",
      steps: [
        "Factor: (x − 4)(x − 5) = 0.",
        "Set each factor equal to zero.",
        "The roots are 4 and 5."
      ]
    },
    advanced: {
      title: "Another garden problem",
      context: "A rectangle has area 54 m² and length 3 m more than its width.",
      equation: "w(w + 3) = 54",
      answer: [-9, 6],
      hint: "Rearrange and factor. A width must be positive.",
      steps: [
        "Rearrange: w² + 3w − 54 = 0.",
        "Factor: (w + 9)(w − 6) = 0.",
        "Reject −9. Width = 6 m and length = 9 m."
      ]
    }
  };

  problems[level] = alternatives[level];
  showProblem();
  $("coachMessage").textContent =
    "A new practice problem is ready. Give it a try!";
});

showProblem();
