//https://github.com/jekyll/jekyll/blob/cba586f06fc7878fee888997b1465b6712e68d6a/site/_includes/anchor_links.html
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