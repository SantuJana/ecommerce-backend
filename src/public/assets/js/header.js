$(document).ready(() => {
  $(".nav-link").each(function () {
    let path = window.location.pathname.charAt(window.location.pathname.length-1) === '/' ? window.location.pathname.slice(0,window.location.pathname.length - 1) : window.location.pathname;
    if (path == $(this).attr("href")) {
      var mainMenu = $(this).data("menu");
      $(this).addClass("active");
      $(`.${mainMenu}-menu-link`).attr("aria-expanded", "true");
      $(this).closest(".menu-dropdown").addClass("show");
    }
  });

  setTimeout(() => {
    $('.alert').addClass('d-none');
  }, 3000);
});
