$(document).ready(()=>{
    // data table sorting
  $(".sort").click(function () {
    const sortColumn = $(this).data("sort");
    sessionStorage.setItem("sortColumn", sortColumn);
    sessionStorage.setItem("sortBy", 1);
    const sortIndex = $(this).data("sort-index") || "1";
    let query = window.location.search;
    if (query === "") {
      window.location.search = `?sort=${encodeURIComponent(
        sortColumn + ":" + sortIndex
      )}`;
    } else if (query.includes("sort=")) {
      let queryString = query.slice(1, query.length);
      let queryArray = queryString.split("&");
      let newQueryArray = queryArray.map((query) => {
        if (query.includes("sort=")) {
          return `sort=${encodeURIComponent(sortColumn + ":" + sortIndex)}`;
        } else {
          return query;
        }
      });
      queryString = "?" + newQueryArray.join("&");
      window.location.search = queryString;
    }
  });
  // row select
  $(".check-all-row").change(function () {
    if ($(this).prop("checked")) {
      $(".row-check").prop("checked", true);
    } else {
      $(".row-check").prop("checked", false);
    }
    manageSelectedDeleteBtn();
  });

  $(".row-check").change(function () {
    if ($(".row-check").length === $(".row-check:checked").length) {
      $(".check-all-row").prop("checked", true);
    } else {
      $(".check-all-row").prop("checked", false);
    }
    manageSelectedDeleteBtn();
  });
  // check visibility of selected row delete button
  function manageSelectedDeleteBtn() {
    if ($(".row-check:checked").length < 1) {
      $("#delete-selected-row").addClass("d-none");
    } else {
      $("#delete-selected-row").removeClass("d-none");
    }
    let selectedIds = $(".row-check:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    $("#selected-rows").val(selectedIds);
  }
  // capitalize name
  $('#name-field').on('input', function(){
    $(this).val($(this).val().split(' ').map( element => element.charAt(0).toUpperCase()+element.slice(1)).join(' '))
  })
  // status change
  $(".status-switch").change(function () {
    const rowId = $(this).data("value");
    const query = $(this).data("query");
    window.location.href = `/admin/product/category/toggle-status/${rowId}${query}`;
  });
  // customer edit
//   $(".edit-item-btn").click(function () {
//     const customerId = $(this).data("value");
//     $.ajax({
//       url: "/admin/customer/details/" + customerId,
//       type: "get",
//       success: (res) => {
//         $("#id-field1").val(res._id);
//         $("#customerfirstname-field").val(res.firstName);
//         $("#customerlastname-field").val(res.lastName);
//         $("#email-field").val(res.email);
//         $(".password-area").attr("hidden", true);
//         $("#phone-field").val(res.phone);
//         window["status-field"].setChoiceByValue(res.status);
//         $("#add-btn").text("Update");
//       },
//       error: (error) => {
//         alert("Something went wrong");
//         $("#showModal").modal().hide();
//       },
//     });
//   });
  // on modal close
  $("#showModal").on("hidden.bs.modal", function () {
    $("#add-btn").text("Add Category");
    $("#showModal input").val("");
    window["status-field"].setChoiceByValue("");
  });
  // delete selected rows
  $("#delete-selected-row").click(function () {
    let selectedIds = $(".row-check:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
  });
})