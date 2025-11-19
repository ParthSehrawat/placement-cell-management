document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form).entries());
    const submitBtn = form.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Please wait...';

    try {
      if (form.dataset.mode === 'signup') {
        await api.signup(formData);
        alert('Sign up successful. Please login now.');
        window.location.href = 'login.html';
      } else {
        const role = formData.role || 'student';
        await api.login({ email: formData.email, password: formData.password, role });
        window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'student-dashboard.html';
      }
    } catch (error) {
      alert(error.message || 'Something went wrong');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = form.dataset.mode === 'signup' ? 'Sign Up' : 'Login';
    }
  });
});


