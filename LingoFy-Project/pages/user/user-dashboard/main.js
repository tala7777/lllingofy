document.addEventListener("DOMContentLoaded", () => {
  const quizList = document.getElementById("quizList");
  const quizSection = document.getElementById("quizSection");
  const emptySection = document.getElementById("emptySection");

  const tests = JSON.parse(localStorage.getItem("forms")) || [];

  // Reset visibility
  quizSection.classList.add("d-none");
  emptySection.classList.add("d-none");

  if (tests.length === 0) {
    emptySection.classList.remove("d-none");
    quizList.innerHTML = "";
  } else {
    quizSection.classList.remove("d-none");
    quizList.innerHTML = "";

    tests.forEach((test) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";

      card.innerHTML = `
        <div class="card shadow-sm p-3 h-100">
          <h5>${test.formTitle}</h5>
          <p class="text-muted">${test.formDesc}</p>
          <p class="text-muted small">Questions: ${test.numberOfQuestions}</p>
          <p class="text-muted small">Created: ${test?.formDate ?? "Not Set"}</p>
          <button class="btn btn-primary w-100" onclick="startQuiz('${test.formId}')">Start</button>
        </div>
      `;

      quizList.appendChild(card);
    });
  }
});

function startQuiz(id) {
  localStorage.setItem("userAnswers", JSON.stringify([]));
  localStorage.setItem("currentQuiz", id);
  window.location.href = "../quiz-page/index.html";
}
