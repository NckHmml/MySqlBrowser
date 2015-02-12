$(function () {
    var curDatabase;
    function LoadTables() {
        $.ajax({
            type: "POST",
            data: {
                database: curDatabase
            },
            dataType: "json",
            url: "Tables.php",
            success: function (data) {
                $("#tableInput").html('');
                for (var row in data)
                    for (var key in data[row])
                        $("#tableInput").append("<option value='" + data[row][key] + "'>" + data[row][key] + "</option>");
                $("#tableInput").removeAttr("disabled");
            }
        });
    }

    $.getJSON("Databases.php", function (data) {
        for (var i = 0; i < data.length; i++)
            $("#databaseNav").append("<li><a href='#' data-database='" + data[i] + "'>" + data[i] + "</a></li>");

        $("[data-database]").on("click", function () {
            $("li.active").toggleClass("active");
            $(this).parent().toggleClass("active");
            curDatabase = $(this).attr("data-database");
            LoadTables();
        });
    });

    $("#btnQuery").on("click", function () {
        var table = $("#tableInput").val();
        if (table == null)
            return;
        $("#txtQuery").val("SELECT * FROM " + table + ";");
    });

    $("#btnStruct").on("click", function () {
        var table = $("#tableInput").val();
        if (table == null)
            return;
        $("#txtQuery").val("DESCRIBE " + table + ";");
    });

    $("#btnExecute").on("click", function () {
        var sQuery = $("#txtQuery").val();
        $.ajax({
            type: "POST",
            data: {
                database: curDatabase,
                query: sQuery
            },
            dataType: "json",
            url: "Query.php",
            success: function (data) {
                $("#tblResult").html('');
                var thead = "<tr>";
                var tbody;
                for (var row in data) {
                    tbody += "<tr>";
                    for (var key in data[row]) {
                        if (row == 0)
                            thead += "<th>" + key + "</th>";
                        tbody += "<td>" + data[row][key] + "</td>";
                    }
                    tbody += "</tr>";
                }
                thead += "</tr>";
                $("#tblResult").append("<thead>" + thead + "</thead><tbody>" + tbody + "</tbody>");
            }
        });
    });
});