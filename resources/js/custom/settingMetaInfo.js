/**
 * Generate Info for Meta tag
 */

$(function() {

    let metaName = document.querySelector('meta[name="description"]');

    if (metaName !== null) {
        metaName.content = document.querySelector('title').text;
    }
});