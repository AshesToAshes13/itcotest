const regForm = document.forms.reg;
const authForm = document.forms.auth;
const switchButton = document.querySelector('.main__switch');
const emailRegex = /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
const allertTitle = document.querySelector('.main__allert');

function switchRegAuth() {
    const btnText = 'Уже зарагестрированный? Войти';
    const textToSwitch = 'Нет аккаунта? Регистрация';
    const authTitle = 'Авторизация'
    const regTitle = 'Регистрация'
    

    if (switchButton.textContent == btnText) {
        regForm.setAttribute('style', 'display: none');
        authForm.removeAttribute('style');
        switchButton.textContent = textToSwitch;
        document.title = authTitle;

    } else {
        authForm.setAttribute('style', 'display: none');
        regForm.removeAttribute('style');
        switchButton.textContent = btnText;
        document.title = regTitle;
    }
}

function regInputHandler() {
    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.pass.value;
    const repeatPassword = event.currentTarget.elements.reppass.value;
    const button = event.currentTarget.elements.btn;

    if (emailRegex.test(email) && password.length > 5 && password == repeatPassword) {
        button.removeAttribute('disabled');
        button.classList.remove('main__button-disabled');
        button.classList.add('main__button-active');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('main__button-disabled');
        button.classList.remove('main__button-active');
    }
}

function authInputHandler() {
    const email = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.pass.value;
    const button = event.currentTarget.elements.btn;

    if (emailRegex.test(email) && password.length > 5) {
        button.removeAttribute('disabled');
        button.classList.remove('main__button-disabled');
        button.classList.add('main__button-active');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('main__button-disabled');
        button.classList.remove('main__button-active');
    }
}

function registreUser(e) {
    e.preventDefault();
    const email = regForm.elements.email.value;
    const password = regForm.elements.pass.value;

    auth.createUserWithEmailAndPassword(email, password).then(res => {
        res.user.sendEmailVerification().then(()=>{
            allertTitle.textContent = 'На ваш email было отправлено писмо с подтвержением регистрации. Как закончите вернетсь на страницу и обновите';
            allertTitle.removeAttribute('style');
        });
        regForm.reset();
    });
}

function checkUserAuth() {
    auth.onAuthStateChanged(user => {
        if (user != null) {
            if (user.emailVerified == false) {
                allertTitle.textContent = 'Вы не подтвердили регистрацию';
                allertTitle.removeAttribute('style');
            } else {
                window.location = './main.html';
            }
        }  
    });
}

function logInUser(e) {
    e.preventDefault();
    const email = authForm.elements.email.value;
    const password = authForm.elements.pass.value;
    auth.signInWithEmailAndPassword(email, password).then(() => {
        checkUserAuth();
    }); 
}


switchButton.addEventListener('click', switchRegAuth);
regForm.addEventListener('input', regInputHandler);
authForm.addEventListener('input', authInputHandler);
regForm.addEventListener('submit', registreUser);
authForm.addEventListener('submit', logInUser);
checkUserAuth();
