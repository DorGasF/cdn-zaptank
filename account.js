$(function () {
    var base = $('link[rel="base"]').attr('href') + "/_cdn/widgets/accddtankeiros/account";

    $("#modalaccount").modal({
        show: true
        // backdrop: 'static'
    });
    
    $('body').on('click', '.resend-activation-token', function(e){
        e.preventDefault();

        var formData = new FormData();
            formData.append('action', 'resend_activation_email');
            formData.append('email', $(this).data('email'));

        $.ajax({
            url: base + '.ajax.php',
            type: 'post',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function(){
                $('body').find('.account_form_callback').html('<div class="trigger trigger_ajax trigger_info">Reenviando e-mail de ativaÃ§Ã£o para sua conta... <i class="fa fa-spinner fa-pulse fa-fw" style="font-size: 1em;"></i><span class="sr-only">Loading...</span></div>').fadeIn(400);
                $('body').find('.wc_callback').animate({'right': '0'}, 100);
                $('body').find('.wc_callback').click(function () {
                    $(this).fadeOut(400, function () {
                        $(this).html('').css('right', '-400px');
                    });
                });
                $('body').find('.wc_overlay').css({visibility: 'visible'});
            },
            success: function(callback){
                $('body').find('.wc_overlay').css({visibility: 'hidden'});
                $('body').find('.account_form_callback').html(callback.trigger).fadeIn(400);
                $('body').find('.wc_callback').animate({'right': '0'}, 100);
                $('body').find('.wc_callback').click(function () {
                    $(this).fadeOut(400, function () {
                        $(this).html('').css('right', '-400px');
                    });
                });
            }
        });
        return false;
    });

    $('.account_form_callback_fixed').mouseover(function () {
        $(this).fadeOut(400, function () {
            $(this).html('');
        });
    });

    //BLOCK FORM
    $("form[name='account_form']").submit(function () {
        var Form = $(this);

        Form.ajaxSubmit({
            url: base + '.ajax.php',
            type: 'POST',
            dataType: 'json',
            beforeSubmit: function () {
                Form.find('img').fadeIn();
            },
            uploadProgress: function (evento, posicao, total, completo) {
            },
            success: function (data) {
                Form.find('img').fadeOut();

                if (data.trigger) {
                    Form.find(".account_form_callback").fadeOut(400, function () {
                        $(this).html(data.trigger).fadeIn();
                    });
                }

                if (data.redirect) {
                    setTimeout(function () {
                        window.location.href = data.redirect;
                    }, 2000);
                }

                if (data.clear) {
                    Form.clearForm();
                }

                Form.find('input[type="file"]').val('');
            }
        });
        return false;
    });

    //CAPA VIEW
    $('.wc_loadimage').change(function () {
        var input = $(this);
        var target = $('.' + input.attr('id'));
        var fileDefault = target.attr('default');

        if (!input.val()) {
            target.fadeOut('fast', function () {
                $(this).attr('src', fileDefault).fadeIn('slow');
            });
            return false;
        }

        if (this.files && this.files[0].type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                target.fadeOut('fast', function () {
                    $(this).attr('src', e.target.result).fadeIn('fast');
                });
            };
            reader.readAsDataURL(this.files[0]);
        } else {
            $("form[name='account_form'] .account_form_callback").fadeOut(400, function () {
                $(this).html('<div class="trigger trigger_alert trigger_ajax"><b class="icon-warning">OPPSSS:</b> O arquivo selecionado nÃ£o Ã© vÃ¡lido! Selecione uma <b>imagem JPG ou PNG</b> para enviar!</div>').fadeIn();
            });

            target.fadeOut('fast', function () {
                $(this).attr('src', fileDefault).fadeIn('slow');
            });
            input.val('');
            return false;
        }
    });
});