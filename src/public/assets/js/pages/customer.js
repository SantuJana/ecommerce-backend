$(document).ready(() => {
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
    // status change
    $(".status-switch").change(function () {
        const customerId = $(this).data("value");
        const query = $(this).data("query");
        window.location.href = `/admin/customer/toggle-status/${customerId}${query}`;
    });
    // customer edit
    $(".edit-item-btn").click(function () {
        const customerId = $(this).data("value");
        $.ajax({
            url: "/admin/customer/details/" + customerId,
            type: "get",
            success: (res) => {
                $("#id-field1").val(res._id);
                $("#customerfirstname-field").val(res.firstName);
                $("#customerlastname-field").val(res.lastName);
                $("#email-field").val(res.email);
                $(".password-area").attr("hidden", true);
                $("#phone-field").val(res.phone);
                window["status-field"].setChoiceByValue(res.status);
                $("#add-btn").text("Update");
            },
            error: (error) => {
                alert("Something went wrong");
                $("#showModal").modal().hide();
            },
        });
    });
    // on modal close
    $("#showModal").on("hidden.bs.modal", function () {
        $("#add-btn").text("Add Customer");
        $("#showModal input").val("");
        $(".password-area").attr("hidden", false);
        window["status-field"].setChoiceByValue("");
    });
});
