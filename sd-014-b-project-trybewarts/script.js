const getEmail = document.getElementById('email');
const getSenha = document.getElementById('senha');
const getButtom = document.querySelector('.button-login');
const getChekbox = document.querySelector('#agreement');
const getButtomSubmit = document.querySelector('#submit-btn');

function validar() {
  if (getEmail.value === 'tryber@teste.com' && getSenha.value === '123456') {
    alert('Olá, Tryber!');
  }
  if (getEmail.value !== 'tryber@teste.com' && getSenha.value !== '123456') {
    alert('Login ou senha inválidos.');
  }
}

getButtom.addEventListener('click', validar);
function checar() {
  if (getChekbox.checked === true) {
    getButtomSubmit.disabled = false;
  } else if (getChekbox.checked === false) {
    getButtomSubmit.disabled = true;
  }
}

getButtomSubmit.disabled = true;
getChekbox.addEventListener('click', checar);
