BASE = $("link[rel='base']").attr("href");

$(function () {
    $.getScript(BASE + "/_cdn/widgets/hellobar/hellobar.wc.js", function () {
        $("head").append("<link rel='stylesheet' href='" + BASE + "/_cdn/widgets/hellobar/hellobar.wc.css'/>");
    });
});
/*CHAMADA DA PROMOBAR*/
$.getScript(BASE + "/_cdn/widgets/promobar/promobar.wc.js", function () {
    $("head").append("<link rel='stylesheet' href='" + BASE +
        "/_cdn/widgets/promobar/promobar.wc.css'/>");
});

// $(document).ready(function () {
//     $('.publicidade').modal('show')
// });
//
// $(".modal").on("hidden.bs.modal", function () {
//     $(".modal-body1").html("");
// });

// function mostrarAnuncio() {
//     $("#anuncio").fadeIn(500, atualizarTempo);
// }

