/**
 * subCategory
 */
$(function() {
  
  let isSubCategory = ( location.href.indexOf('/category/page/') != -1 );
  if(isSubCategory) {
    let categoryPath = location.pathname.split('/');
    let categoryList = document.querySelectorAll('.left > ul > span');  // total categoryContents
    let categoryName = location.href.split('#')[1];                     // get the categoryName in path
    
    for(let i=0; i<categoryList.length; i++) {
        
        if(categoryName != categoryList[i].className) {                 // delete other contents
            // categoryList[i].innerHTML="";
            categoryList[i].style.display = "none";
        }
    }

    // history.pushState(null, null, '/category/');                            // change browser path
    let newPathName = '/' + categoryPath[1] 
    newPathName += categoryPath.length > 4 ? '/' + categoryPath[2] : '';
    history.replaceState(null, null, newPathName);
  }

});
