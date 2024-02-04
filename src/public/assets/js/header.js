$(document).ready(() => {
  $(".nav-link").each(function () {
    if (window.location.pathname.includes($(this).attr("href"))) {
      var mainMenu = $(this).data("menu");
      $(this).addClass("active");
      $(`.${mainMenu}-menu-link`).attr("aria-expanded", "true");
      $(this).closest(".menu-dropdown").addClass("show");
    }
  });
});
