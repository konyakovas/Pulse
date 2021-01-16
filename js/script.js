$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
         adaptiveHeight: false,
        prevArrow:'<button type="button" class="slick-prev"> <img src="../icons/carousel/left.png"> </button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../icons//carousel/right.png"></button>',
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              autoplay : false,
              variableWidth:true,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
              dots: false,
              arrows: true,
            }
           },
          {
            breakpoint: 992,
            settings: {
              autoplay : false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            }
          },
          {
            breakpoint: 767,
            settings: {
              autoplay: false,  
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: true,
              arrows: false,
            }
          },
          {
            breakpoint: 575,
            settings: {
              autoplay : false,
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
              arrows:false,
           }
          },
          {
              breakpoint: 480,
              settings: {
                autoplay: false,
                slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,

            }
          }
        ]
      });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    
    function toggleSlide (item) 
    {$(item).each(function (i) {
      $(this).on ('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };
  toggleSlide ('.catalog-item__link');
  toggleSlide ('.catalog-item__back');


  //modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn('slow'); 
  });
  $(".modal__close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut('slow');
  });
  $(".button_mini").on("click", function() {
    $(".overlay, #order").fadeIn('slow');
  });
  $(".button_mini").each(function(i) {
    $(this).on("click", function() {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn('slow');
    });
  });

  //validate
  function valideForms (form) { $ (form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "пожалуйства ввиде ваше имя",
        minlength: jQuery.validator.format("Введите {0} символов!")
      },
      phone: "пожалуйста введите ваш номер телефона",
      email: {
        required: "Пожалуйста введите вашу почту",
        email: "Ваш почтовый адрес должен содержать@"
      }
    }
}); 
  };

  valideForms ("#consultation-form");
  valideForms ("#consultation form");
  valideForms ("#order form");

  $("input[name=phone]").mask("+7(999) 999-99-99");

  $('form').submit(function(e) {
   // e.preventDefault();
    $.ajax({ 
      type: "POST",
      url:"mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
       $(this).find('input').val("");

       $("form").trigger('reset');
    });
    return false;  
  });

});
