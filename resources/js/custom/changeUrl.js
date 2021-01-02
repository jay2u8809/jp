/**
 * 
 */

$(function() {

    let currentUrlOrigin = location.origin;
    let currentPathName = location.pathname;
    let jpLangPath = "/jp"

    let hasJp = currentPathName.indexOf(jpLangPath) != -1;

    // Breadcrumbs
    let categoryUlr = document.querySelector('#categoryUrl');
    let categoryName = document.querySelector('#categoryName');
    if (categoryUlr !== null && categoryName !== null) {
        
        let newCategoryUrl = categoryUlr.getAttribute('href') + 'page/#' + categoryName.getAttribute('value');
        categoryUlr.setAttribute('href', newCategoryUrl);
    }


    // Blog
    let koUrl = document.querySelector('#koUrl');
    let jpUrl = document.querySelector('#jpUrl');

    if (koUrl !== null && jpUrl !== null) {
        
        koUrl.setAttribute('href', currentUrlOrigin);
        jpUrl.setAttribute('href', currentUrlOrigin + jpLangPath);
    }


    // Post
    let koPostUrl = document.querySelector('#koPostUrl');
    let jpPostUrl = document.querySelector('#jpPostUrl');

    if (koPostUrl !== null && jpPostUrl !== null) {

        koPostUrl.setAttribute('href',  hasJp
                                    ? currentUrlOrigin + currentPathName.slice(jpLangPath.length, currentPathName.length)
                                    : location.href);
        jpPostUrl.setAttribute('href',  hasJp
                                    ? location.href
                                    : currentUrlOrigin + jpLangPath + currentPathName);
    }


    // Next/Previous Btn
    let nextPostBtn = document.querySelector('#nextPostBtn');
    let prevPostBtn = document.querySelector('#prevPostBtn');
    let originBtnHref = null;

    if (nextPostBtn !== null) {
        originBtnHref = nextPostBtn.getAttribute('href');
        nextPostBtn.setAttribute('href',  hasJp
                                    ? jpLangPath + originBtnHref
                                    : originBtnHref);
    }

    if (prevPostBtn !== null) {
        originBtnHref = prevPostBtn.getAttribute('href');
        prevPostBtn.setAttribute('href',  hasJp
                                    ? jpLangPath + originBtnHref
                                    : originBtnHref);
    }
});