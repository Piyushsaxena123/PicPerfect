const feedbackForm = document.getElementById('feedback-form');
const thankYouMessage = document.getElementById('thank-you-message');
const errorMessage = document.getElementById('error-message');
const feedbackList = document.getElementById('feedback-list');

const feedbackData = [];

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(feedbackForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const feedback = formData.get('feedback');
  const rating = formData.get('rating');

  // Simple client-side validation
  if (!rating) {
    alert("Please select a star rating before submitting!");
    return;
  }

  // Save feedback data
  const newFeedback = { name, email, feedback, rating };
  feedbackData.push(newFeedback);

  // Show Thank You message and hide the form
  thankYouMessage.classList.remove('hidden');
  feedbackForm.reset();
  errorMessage.classList.add('hidden');

  // Update the feedback list
  displayFeedbackList();
});

// Display feedback list
function displayFeedbackList() {
  feedbackList.innerHTML = '';
  feedbackData.forEach((item, index) => {
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback-item');

    feedbackItem.innerHTML = `
      <h3>${item.name} (${item.email})</h3>
      <p>${item.feedback}</p>
      <div class="rating">${'★'.repeat(item.rating)}</div>
    `;
    
    feedbackList.appendChild(feedbackItem);
  });
}
