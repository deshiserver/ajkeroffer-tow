(function ($) {
    'use strict';

    $(document).ready(function ($) {

        //copy to clip board [used in coupon popup from single coupon]
        var clipboard = new Clipboard('.clipboard');

        $(document).ready(function () {
            $(".owl-carousel").owlCarousel({
                loop: true,
                items: 6,
                // margin:10,
                autoplay: true,
                dots: true,
                nav: true,
                autoPlay: 5000,
                navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 6
                    }
                }
            })

        });

        // sticky js 

        $(document).ready(function () {
            $("#sticker").sticky({ topSpacing: 0 });
        });

        // flatpickr [used in coupon submit page]
        $(".datePickr").flatpickr();

        // submit-coupon form start
        var coupon_type = $('#coupon_type').val();

        if (coupon_type != 'code') {
            $('#coupon_code_wrapper').hide();
        }

        $('#coupon_type').on('change', function () {
            if ($(this).val() != 'code') {
                $('#coupon_code_wrapper').hide();
            } else {
                $('#coupon_code_wrapper').show();
            }
        });
        // submit-coupon form end

        //Local PATH

        var ao_path = window.location.protocol + '//' + window.location.host;
        var pathArray = window.location.pathname.split('/');
        for (var i = 1; i < (pathArray.length - 1); i++) {
            ao_path += '/';
            ao_path += pathArray[i];
        }

        //Start Contact Form Validation And Ajax Submission

        var $contactForm = $('form#ao-contact-form');

        $contactForm.validate({
            submitHandler: function (form) {
                // console.log(form);
                //form.submit();
                var $contactForm = $(form);
                $.ajax({
                    url: ao_path + '/php/contact.php',
                    type: 'post',
                    data: $contactForm.serialize() + '&action=ao_contact_us',
                    beforeSubmit: function (argument) {
                        // body...
                    },
                    success: function (ajaxResponse) {
                        try {
                            var ajaxResponse = $.parseJSON(ajaxResponse);
                            console.log(ajaxResponse);
                            if (ajaxResponse.error) {
                                //for field error
                                $.each(ajaxResponse.error_field, function (i) {
                                    $('label#' + ajaxResponse.error_field[i] + '-error').text(ajaxResponse.message[ajaxResponse.error_field[i]]);
                                });
                            } else if (ajaxResponse.successmessage) {

                                //alert(ajaxResponse.successmessage);
                                //$( '.ao-formalert' ).addClass( "alert alert-success" );
                                $('#ao-formalert').addClass("alert alert alert-success").html(ajaxResponse.successmessage);
                                $contactForm[0].reset();
                            }
                        } catch (e) {
                            //consoe.log(e.message );
                            //alert(ajaxResponse.message);
                        }

                        $contactForm.reset();
                    },
                    error: function (argument) {
                        // body...
                        //console.log('error');
                        //alert('Sorry, Mail could not be sent. Please contact server admin.');
                        //$('#ao-formalert').addClass( "alert alert-danger" ).html('Sorry, Mail could not be sent. Please contact server admin.');
                        $contactForm.reset();
                    }
                });

                return false;

            },

            rules: {
                'aoname': {
                    required: true
                },
                'aoemail': {
                    required: true
                },
                'aomessage': {
                    required: true
                }
            }
        });

        //End Contact Form Validation And Ajax Submission


        //Email Subscription Validation And Ajax Submission

        var isEmail = function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        };

        $('form#ao-subscribe-form').on('submit', function (evnt) {
            evnt.preventDefault();

            var $form = $(this);
            var emailInput = $('form#ao-subscribe-form').find('input#subscribe');
            if (isEmail(emailInput.val())) {

                $.ajax({
                    url: ao_path + '/php/subscribe.php',
                    type: 'post',
                    data: { 'email': emailInput.val().toLowerCase() },
                    beforeSubmit: function (argument) {
                        // body...
                    },
                    success: function (ajaxResponse) {

                        console.log(ajaxResponse);
                        try {
                            var ajaxResponse = $.parseJSON(ajaxResponse);
                            if (!ajaxResponse.error) {
                                emailInput.css('color', '#0f0');
                            } else {
                                emailInput.removeAttr('style'); //css('color', '#f00');
                                throw ajaxResponse.message;
                            }
                            //alert( ajaxResponse.message );
                        } catch (e) {
                            //e.message;
                            //alert(e.message );
                        }
                    },
                    error: function (argument) {
                        // body...
                    }
                });
                $form[0].reset();
            } else {
                emailInput.css('color', '#f00');
                return false;
            }
        });

        $('form.subscribe-form input#subscribe').on('keyup', function (evnt) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            this.style.color = (isEmail($(this).val())) ? '#f5832b' : '#f00';
        });

        //End Email Subscription Validation And Ajax Submission

        // bootstrap slider
        $("#filterByPrice").slider({});

        // tooltip for progress bar
        $('[data-toggle="tooltip"]').tooltip({ trigger: 'manual' }).tooltip('show');

        //progress bar deal start
        $(".progress-bar").each(function () {
            var each_bar_width = $(this).attr('aria-valuenow');
            $(this).width(each_bar_width + '%');
        });
        //progress bar deal end


        //Check to see if the window is top if not then display button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Click event to scroll to top
        $('.scrollToTop').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });


        //Deal Coupon Slider Start
        $("#deal-coupon-slider").owlCarousel({
            loop: true,
            items: 1,
            autoplay: true,
            dots: true,
            nav: true,
            autoPlay: 8000,
            navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
        });
        //Deal Coupon Slider End

        //New Deal Carousel Start
        $("#new-deal-carousel").owlCarousel({
            loop: true,
            items: 4,
            autoplay: false,
            margin: 20,
            dots: false,
            nav: true,
            autoPlay: 8000,
            navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
        //New Deal Carousel End

        $("#new-catagory-carousel").owlCarousel({
            loop: true,
            items: 6,
            autoplay: true,
            dots: true,
            nav: true,
            autoPlay: 8000,
            navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
        });


        //Popular Deal Carousel Start
        $("#popular-deal-carousel").owlCarousel({
            loop: true,
            items: 4,
            autoplay: true,
            margin: 20,
            dots: false,
            nav: true,
            autoPlay: 4000,
            navText: ["<div class='lnr lnr-arrow-left'></div>", "<div class='lnr lnr-arrow-right'></div>"],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
        //Popular Deal Carousel End


    }); //end DOM ready



})(jQuery);

