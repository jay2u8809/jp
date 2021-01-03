/**
 * 
 */

$(function() {

    let currentUrlOrigin = location.origin;
    let currentPathName = location.pathname;
    let jpLangPath = "/jp"

    let hasJp = currentPathName.indexOf(jpLangPath) != -1;

    // Breadcrumbs
    let postCategoryUrl = document.querySelector('#postCategoryUrl');
    let categoryName = document.querySelector('#categoryName');
    if (postCategoryUrl !== null && categoryName !== null) {
        
        let categoryNameVal = categoryName.getAttribute('value');
        let newPostCategoryUrl = postCategoryUrl.getAttribute('href') + 'page/#' + categoryNameVal;
        postCategoryUrl.setAttribute('href', newPostCategoryUrl);
        postCategoryUrl.text = categoryNameVal;
    }


    // Blog
    let koUrl = document.querySelector('#koUrl');
    let jpUrl = document.querySelector('#jpUrl');

    if (koUrl !== null && jpUrl !== null) {
        
        koUrl.setAttribute('href', currentUrlOrigin);
        jpUrl.setAttribute('href', currentUrlOrigin + jpLangPath);

        koUrl.innerHTML = hasJp 
                        ? koUrl.innerHTML 
                        : koUrl.firstChild.outerHTML + '<b>' + koUrl.text + '</b>';
        jpUrl.innerHTML = hasJp 
                        ? jpUrl.firstChild.outerHTML + '<b>' + jpUrl.text + '</b>' 
                        : jpUrl.innerHTML;
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


    // Setting Post Date
    let postedDate = document.querySelector('#postedDate');
    if (postedDate !== null) {

        let postDateInnerHTML = '&nbsp;<i class="fa fa-calendar-o"></i> ';
        document.querySelector('#postDate').innerHTML = postDateInnerHTML + postedDate.getAttribute('value');
    }
});