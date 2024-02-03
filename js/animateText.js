let animating = [];

async function animateText(elementClass, after, interval = 50) {
    if (after === undefined) {
        after = "";
    }

    if (animating.includes(elementClass)) {
        setTimeout(function() {animateText(elementClass, after)}, 500);
        return
    }

    animating.push(elementClass);

    let loginTitle = document.querySelector(elementClass);
    let loginTitleText = loginTitle.innerHTML;
    let loginTitleTextArray = loginTitleText.split("");
    let loginTitleTextArrayLength = loginTitleTextArray.length;
    let loginTitleTextArrayIndex = 0;
    let stage = 0; // 0 = going to "", 1 = going to after
    let loginTitleTextArrayInterval = setInterval(() => {
        if (stage === 0) {
            loginTitleTextArray[loginTitleTextArrayIndex] = "";
            loginTitleTextArrayIndex++;
            if (loginTitleTextArrayIndex >= loginTitleTextArrayLength) {
                loginTitleTextArrayIndex = 0;
                stage = 1;
            }
        } else {
            loginTitleTextArray[loginTitleTextArrayIndex] = after[loginTitleTextArrayIndex];
            loginTitleTextArrayIndex++;
            if (loginTitleTextArrayIndex >= after.length) {
                clearInterval(loginTitleTextArrayInterval);
                animating.splice(animating.indexOf(elementClass), 1);
            }
        }
        loginTitle.innerHTML = loginTitleTextArray.join("");
    }, interval);
}