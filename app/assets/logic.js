$(document).ready(function () {
    var storedFormValues = sessionStorage.getItem('storedFormValues');
    if (storedFormValues) {
        var parsedStoredFormValues = JSON.parse(storedFormValues);
        $("#templateFile").val(parsedStoredFormValues.templateFile);
        $("#jsonFile").val(parsedStoredFormValues.jsonFile);
    }
    $("#uploadForm").on('submit', function (e) {
        e.preventDefault();
        sessionStorage.setItem('storedFormValues', JSON.stringify({
            templateFile: $("#templateFile").val(),
            jsonFile: $("#jsonFile").val()
        }));
        $.post('http://localhost:20755/updateConfig', $("#uploadForm").serialize(), function () {
            open("http://localhost:20755/");
        });
    });

    $("a[target=_blank]").on('click', function (e) {
        e.preventDefault();
        open($(this).attr("href"));
    });

    $("#templateFile, #jsonFile").on("drop", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files[0];
        $(e.target).val(file.path);
        return false;
    });
});