// $(document).ready(function(){
//   $("h2, h3, h4, h5, h6").each(function(i, el) {
//     var $el, icon, id;
//     $el = $(el);
//     id = $el.attr('id');
//     icon = '<i class="fa fa-link"></i>';
//     if (id) {
//       return $el.prepend($("<a />").addClass("header-link").attr("href", "#" + id).html(icon));
//     }
//   });
// });

//https://github.com/jekyll/jekyll/blob/cba586f06fc7878fee888997b1465b6712e68d6a/site/_includes/anchor_links.html
// no jquery :D
(function(){
  var anchorForId = function (id) {
    var anchor = document.createElement("a");
    anchor.className = "header-link";
    anchor.href      = "#" + id;
    anchor.innerHTML = "<i class=\"fa fa-link\"></i>";
    return anchor;
  };
  var linkifyAnchors = function (level, containingElement) {
    var headers = containingElement.getElementsByTagName("h" + level);
    for (var h = 0; h < headers.length; h++) {
      var header = headers[h];
      if (typeof header.id !== "undefined" && header.id !== "") {
        header.appendChild(anchorForId(header.id));
      }
    }
  };
  document.onreadystatechange = function () {
    if (this.readyState === "complete") {
      var contentBlock = document.getElementsByClassName("page-content")[0];
      if (!contentBlock) {
        return;
      }
      for (var level = 1; level <= 6; level++) {
        linkifyAnchors(level, contentBlock);
      }
    }
  };
})();