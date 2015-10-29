$(function () {
    $.ajax({
        url: "http://emspost.ru/api/rest/",
        dataType: "jsonp",
        data: ({
            method: "ems.get.locations",
            type: "cities",
            plain: "true"
        }),
        success: function (data) {
            for (i = 0; i < data.rsp.locations.length; i++) {
                var output = "<option>" + data.rsp.locations[i].value.replace('city--', '');
                $("#sending,#going").append(output);
            }
        }
    });
    $.ajax({
        url: "http://emspost.ru/api/rest/",
        dataType: "jsonp",
        data: ({
            method: "ems.get.max.weight"
        }),
        error: function (data) {
            $("#max-weight").append("Error. Try again later");
        },
        success: function (data) {
            $("#max-weight").append(data.rsp.max_weight + " kg");
        }
    });
    $("#calc").click(function () {
        $.ajax({
            url: "http://emspost.ru/api/rest/",
            dataType: "jsonp",
            data: ({
                method: "ems.calculate",
                from: "city--" + $("#sending option:selected").val(),
                to: "city--" + $("#going option:selected").val(),
                weight: $("#weight").val()
            }),
            error: function (data) {
                $("#price").append("Error. Try again later");
            },
            success: function (data) {
                if (data.rsp.stat == "fail") {
                    $("#price").empty().append("Wrong weight!");
                } else {
                    $("#price").empty().append("Postage: " + data.rsp.price + " RUB");
                    $("#term").empty().html("Delivery time: " + data.rsp.term.min + " - " + data.rsp.term.max + " days");
                }
            }
        });
    });
});