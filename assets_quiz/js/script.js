var score = 0; // Initialize score globally
const correctAnswers = {
  step1: "opt_1", // Weather is daily; climate is long-term
  step2: "opt_5", // They absorb and trap heat in the atmosphere
  step3: "opt_12", // Oxygen (O₂)
  step4: "opt_13", // Rising global temperatures
  step5: "opt_17", // Burning fossil fuels
  step6: "opt_21", // Use energy-efficient appliances
  step7: "opt_25", // Agriculture
  step8: "opt_29", // It entangles marine animals
  step9: "opt_33", // Hydroelectric power
  step10: "opt_37", // Recycling materials
};

$(function () {
  "use strict";

  // Handle option selection and answer checking
  for (let i = 1; i <= 10; i++) {
    $(`.step_${i}`).on("click", function () {
      if ($(this).parent().hasClass("disabled")) return;

      $(`.step_${i}`).removeClass("active correct incorrect");
      $(this).addClass("active");
      $(`.step_${i}`).parent().addClass("disabled");

      const selectedOptionId = $(this).find("input").attr("id");
      const correctOptionId = correctAnswers[`step${i}`];

      if (selectedOptionId === correctOptionId) {
        $(this).addClass("correct");
      } else {
        $(this).addClass("incorrect");
        $(`#${correctOptionId}`).parent().addClass("correct");
      }
    });
  }

  // Countdown timer
  $(".countdown_timer").each(function () {
    $("[data-countdown]").each(function () {
      var $this = $(this),
        finalDate = new Date(Date.now() + 5 * 60 * 1000);
      $this.data("countdown", finalDate);

      $this
        .countdown(finalDate, function (event) {
          $(this).html(
            event.strftime(
              '<img class="clock_img" src="./assets_quiz/images/clock/clock.png" alt="image-not-found">' +
                '<span class="text-white">%M:%S</span>'
            )
          );
        })
        .on("finish.countdown", function () {
          nextPrev(1);
        });
    });
  });
});

var currentTab = 0; // Set the initial tab to the first one (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  var x = document.getElementsByClassName("multisteps_form_panel");
  x[n].style.display = "block";

  if (n === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  if (n === x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML =
      'Next Question <span><i class="fas fa-arrow-right"></i></span>';
  }

  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("multisteps_form_panel");

  // Hide the current step
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;

  // If reached the end of the form, submit it
  if (currentTab >= x.length) {
    handleSubmit(); // Show results at the end
    return false;
  }
  showTab(currentTab);
}

function fixStepIndicator(n) {
  var x = document.getElementsByClassName("step");
  for (let i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}

function handleSubmit() {
  score = 0; // Reset score for each submission

  for (let i = 1; i <= 10; i++) {
    const selectedOptionId = $(`.step_${i}.active input`).attr("id");
    const correctOptionId = correctAnswers[`step${i}`];

    // Check if the selected option is correct
    if (selectedOptionId === correctOptionId) {
      score++; // Increment score for each correct answer
    }
  }

  // Use SweetAlert to display the result
  swal({
    title: "Your Result",
    text: "You scored " + score + " out of 10!",
    icon: score >= 7 ? "success" : "error",
    buttons: {
      confirm: {
        text: "OK",
        value: true,
        visible: true,
        className: "sweet-alert-button",
        closeModal: true,
      },
    },
    closeOnClickOutside: false, // Prevent closing when clicking outside
    closeOnEsc: false, // Prevent closing with ESC key
    dangerMode: score < 7, // Show danger mode for low scores
  }).then((willRedirect) => {
    if (willRedirect) {
      // Redirect to index.html after a brief delay
      setTimeout(() => {
        window.location.href = `index.html`;
      }, 1000);
    }
  });
}

// Attach submit event listener to the form
document.getElementById("wizard").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  handleSubmit(); // Call the handleSubmit function
});
