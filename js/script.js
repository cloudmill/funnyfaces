$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping : true,
        speed: 1000,
        vertical: true,
        arrows: true,
        dots : true,
        infinity: false
    })
    
    $('.slider').bind('mousewheel', function(e){
        if(e.originalEvent.wheelDelta /120 > 0) {
            $('.slider').slick('slickPrev')
        }
        else{
            $('.slider').slick('slickNext')
        }
    });
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.slick-dots li button').removeClass('gray');
        $('.header').removeClass('black');
        if(nextSlide==1 || nextSlide==3 || nextSlide==4){
            $('.slick-dots li button').addClass("gray");
        }
        if(nextSlide==0){
            $('.slick-next').removeClass("gray");
        }
        else{
            $('.slick-next').addClass("gray");
        }
        if(nextSlide==5){
            $('.slick-next').addClass("hide");
            $('.slick-prev').removeClass("hide");
        }
        else{
            $('.slick-next').removeClass("hide");
            $('.slick-prev').addClass("hide");
        }
        if(nextSlide==1 || nextSlide==2 || nextSlide==3 || nextSlide==4){
            $('.header').addClass('black');
        }
        
    });
    $('.order_reg .divivery_type li').click(function(){
        $('.order_reg .divivery_type li').removeClass('active');
        $(this).addClass('active');
        console.log($(this).index())
        if($(this).index()==0){
            $('.order_reg .deliv').addClass('active');
            $('.order_reg .samov').removeClass('active');
        }
        else{
            $('.order_reg .samov').addClass('active');
            $('.order_reg .deliv').removeClass('active');
        }
    })
    $('.order_reg .delivery_method .item').click(function(){
        $('.order_reg .delivery_method .item').removeClass('active');
        $(this).addClass('active');
    })
    $('.order_reg .pay .item').click(function(){
        $('.order_reg .pay .item').removeClass('active');
        $(this).addClass('active');
    })
    var kolvo = 0;
    $('.make_postc .postcard .row .col .str').click(function(){
        if($(this).index()==0 && kolvo!=0){
            kolvo--;
        }
        if($(this).index()==2){
            kolvo++;
        }
        console.log($(this).index())
        $('.make_postc .postcard .value').text(kolvo);
    })
    $('.popup_open').click(function(event){
        event.preventDefault();
        $('.popup_shadow').removeClass('hide');
        var class_popap = String($(this).children('.id_hide').text());
        $('.popup_shadow').children(class_popap).removeClass('hide');
        console.log($('.popup_shadow').children(class_popap))
    })
    $('.popup_close').click(function(){
        event.preventDefault()
        $('.popup_shadow').addClass('hide');
        $('.popup_shadow > div').addClass('hide');
        $('.popup_shadow .photo_detail .container').slick('unslick');
    })
    $('.collection .item .zoom').click(function(){
        $('.popup_shadow .photo_detail .container img').remove();
        index = $('.collection .item .zoom').index(this)
        $('.popup_shadow .photo_detail .container').append($('.collection .item .images').eq(index).html())
        $('.popup_shadow .photo_detail .container').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            arrows: true,
            dots : true,
            infinity: false
        })
        $('.popup_shadow').removeClass('hide');
        $('.popup_shadow .photo_detail').removeClass('hide');

    })
    


    var size_section = function(){
        height = $(window).height();
        if(!$('.sidebar')[0]){
            $('.wrapper').css('width',$(window).width())
            $('.header').css('width',$(window).width())
        }
        $('.about').css('height',height);
        $('.section').css('height',height);
        $('.popup_shadow').css('height',height);
        $('.fullpage').css('height',height);
        $('.make_to_order').css('height',height);
        
    }
    size_section();
    $(window).on('resize',function(){
        size_section();
    })


    
})