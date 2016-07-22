$(document).ready(function () {
    $("body").queryLoader2({
        barColor: "#6fd556",
        backgroundColor: "#790000",
        percentage: false,
        barHeight: 10,
        completeAnimation: "grow",
        minimumTime: 100,
        onLoadComplete: hidePreLoader
    });
    function hidePreLoader() {
        $("#preloader").hide();
    }
});