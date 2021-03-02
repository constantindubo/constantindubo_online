@@include('alert.js')
@@include('myfuckingslick.js')

// Начало нициализации слайдера

$(document).ready(function () {
    $('.slider').slick({
        adaptiveHeight: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        centerPadding: '60px',
        responsive: [
            {
                breakpoint: 786,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    infinite: true,
                    arrows: false,
                    dots: false
                }
    }
  ]
    });
});

// Конец инициализации слайдера

// Начало установки высоты слайда

//$(document).ready(function () {
//    $('.certbox').height($('.certbox').width() * 0.7);
//    $(window).resize(function () {
//       $('.certbox').height($('.certbox').width() * 0.7);
//    });
//});

// Конец установки высоты слайда

// Начало раскрытия блока аккордеона

//    $(document).ready(function(){
//    $('.acc__toggle').click(function(){
//        $(this).prev('.acc__hiderow').toggleClass('acc__hiderow_open');
//        $(this).prev('.acc__hiderow').toggleClass('acc__hiderow_close').slideToggle(300 ease-in);
//        $(this).toggleClass('acc__toggle_open');
//        });
//    });

$(document).ready(function () {
    $('.acc__toggle').click(function () {
        $(this).parent().prev('.acc__hideblock').slideToggle(300); //вставил .parent()
        $(this).toggleClass('acc__toggle_open');
    });
});

// Конец раскрытия блока аккордеона 

// Начало преключения бургера

$(document).ready(function () {
    $('.header__burger').click(function (event) {
        $('.header__burger,.global__menu').toggleClass('active');
    });
});

