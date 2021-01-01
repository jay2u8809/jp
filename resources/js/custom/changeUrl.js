/**
 * 
 */

$(function() {
    let koUrl = document.querySelector('#koUrl');
    let jpUrl = document.querySelector('#jpUrl');

    if (koUrl !== undefined || jpUrl !== undefined) {
        
        let currentHostName = location.hostname;
        let currentPathName = location.pathname;
        let hasJp = currentPathName.indexOf('/jp/') != -1;
        koUrl.setAttribute('href',  hasJp
                                    ? currentHostName + currentPathName.slice(3, currentPathName.length)
                                    : location.href);
        jpUrl.setAttribute('href',  hasJp
                                    ? location.href
                                    : currentHostName + '/jp' + currentPathName);
    }
});