const authButtonDesktop = document.querySelector('.header__link-auth');
const authButtonMobile = document.querySelector('.header__link-auth-mobile');
const headerBtn = document.querySelector('.header__btn');
const userProfile = document.querySelector('.userProfile');
const userProfileCloseBtn = document.querySelector('.userProfile__close');
const userProfileLogOutbtn = document.querySelector('.userProfile__logOut');
const userProfileEmail = document.querySelector('.userProfile__email');


function openUserProfile() {
        userProfile.removeAttribute('style');   
}

function closeUserProfile() {
    userProfile.setAttribute('style', 'display:none')
}

function showHeaderNav() {
    const headerNav = document.getElementById('nav');
    
    if (headerNav.classList[0] === 'header__nav-disabled') {

        headerNav.classList.add('header__nav-active');
        headerNav.classList.remove('header__nav-disabled');

    } else {

        headerNav.classList.remove('header__nav-active');
        headerNav.classList.add('header__nav-disabled');

    }

}

function checkUserLogIn() {
    auth.onAuthStateChanged(user => {
        
        if (user!= null) {
            
                authButtonDesktop.textContent = 'Вы вошли';
                userProfileEmail.textContent = 'Email: ' + user.email;
                authButtonMobile.textContent = 'Вы вошли';
            
        } else {
            authButtonDesktop.textContent = 'войти';
            authButtonMobile.textContent = 'войти';
            userProfileEmail.textContent = '';
        }
    })
}

function userLogOut() {
    auth.signOut().then(()=> {
       window.location = './index.html'
    });
}



authButtonDesktop.addEventListener('click', openUserProfile);
authButtonMobile.addEventListener('click', openUserProfile);
headerBtn.addEventListener('click', showHeaderNav);
userProfileCloseBtn.addEventListener('click', closeUserProfile);
userProfileLogOutbtn.addEventListener('click', userLogOut);
checkUserLogIn();