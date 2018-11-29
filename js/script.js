$(document).ready(function(){
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping : true,
        speed: 1000,
        vertical: true,
        swipe:false,
        arrows: true,
        dots : true,
        infinite: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                  swipe:true
              }
            }
        ]
    })
    
    function slider_collection(){
        $('.slider .three .slider_collection').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            arrows: true,
            infinite: false
        })
    }
    function slider_news(){
        $('.slider .five .slider_news').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            arrows: true,
            infinite: false
        })
    }
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
    $('.slider .three .slider_collection').on('beforeChange', function(event, slick, currentIndex, index){
        event.stopPropagation()
    })
    $('.slider .five .slider_news').on('beforeChange', function(event, slick, currentIndex, index){
        event.stopPropagation()
    })

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
    var kolvo_ar = [];
    for (i = 0; i< 100; i++){kolvo_ar[i]=0}
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
    
    $('.sidebar_order .row .col .inline .block .str').click(function(){
        index = $(this).parent().parent().parent().parent().index()-1
        if($(this).index()==0 && kolvo_ar[index]!=0){
            kolvo_ar[index]--;
        }
        if($(this).index()==2){
            kolvo_ar[index]++;
        }
        console.log(kolvo_ar[index])
        $('.sidebar_order .row').eq(index+1).find('.col .inline .block .value').text(kolvo_ar[index]);
    })
    $('.sidebar_order .row .col .inline .value .delete').click(function(){
        event.preventDefault()
        index = $('.sidebar_order .row .col .inline .value .delete').index(this)+ 1;
        $('.sidebar_order .row').eq(index).addClass('del');
    })
    $('.sidebar_order .dell').click(function(){
        event.preventDefault()
        $('.sidebar_order > .row +.row').addClass('del');
    })



    $('.popup_open').click(function(event){
        event.preventDefault();
        $('.popup_shadow').css('display','block');
        $('.popup_shadow').removeClass('hide');
        var class_popap = String($(this).children('.id_hide').text());
        if(class_popap == ".sidebar_order"){
            $('.wrapper .popup_shadow .sidebar_order').fadeTo(0, 1)
            $('.popup_shadow .sidebar_order').removeClass('hide');
        }
        $('.popup_shadow').children(class_popap).removeClass('hide');
        if(class_popap == ".new_detal_popup"){
            $('html').css('overflow','hidden');
        }
        
        
    })
    
    $('.popup_close').click(function(){
        event.preventDefault()
        $('.popup_shadow').addClass('hide');
        $('.popup_shadow > div').addClass('hide');
        $('html').css('overflow','auto');
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
        $('.popup_shadow').css('display','block');
        $('.popup_shadow').removeClass('hide');
        $('.popup_shadow .photo_detail').removeClass('hide');

    })
    $('.burger_menu').click(function(){
        $('.header ul.menu').css('display','flex');
        $('.header ul.menu').addClass('active');
    })
    $('.menu_close').click(function(){
        $('.header ul.menu').removeClass('active');
    })



    
    
    


    var size_section = function(){
        height = $(window).height();
        if($('.sidebar').css('display') != "flex"){
            $('.wrapper').css('width',$(window).width())
            $('.header').css('width',$(window).width())
        }
        $('.about').css('min-height',height);
        $('.section').css('height',height);
        $('.popup_shadow').css('height',height);
        $('.fullpage').css('height',height);
        //$('.make_to_order').css('height',height);
        if($(window).width()<=850){
            slider_news();
        }
        else{
            $('.slider_news').slick('unslick')
        }
        if($(window).width()<=950){
            slider_collection();
        }
        else{
            $('.slider_collection').slick('unslick')
        }
    }
    size_section();
    $(window).on('resize',function(){
        size_section();
    })


    
})