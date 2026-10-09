const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = document.querySelector('.feedback-form');

loadInitialData();
feedbackForm.addEventListener('input', onFormInput);
feedbackForm.addEventListener('submit', onFormSubmit);

function loadInitialData() {
  const initData = localStorage.getItem(STORAGE_KEY);

  if (initData) {
    try {
      const { email = '', message = '' } = JSON.parse(initData);
      formData.email = email;
      formData.message = message;
      feedbackForm.elements.email.value = email;
      feedbackForm.elements.message.value = message;
    } catch (e) {
      console.log('Data is invalid!');
    }
  }
}

function onFormInput(event) {
  const formEl = event.target;

  if ((!formEl.name) in formData) {
    return;
  }

  formData[formEl.name] = formEl.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (Object.values(formData).some(value => value === '')) {
    alert("Email and Message fields can't be empty!");
  } else {
    console.log(formData);

    formData.email = '';
    formData.message = '';

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));

    feedbackForm.reset();
  }
}
