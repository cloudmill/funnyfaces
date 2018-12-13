
    ymaps.ready(function () {

        var map = new ymaps.Map('map', {
            center: [67.596552, 79.351193],
            zoom: 2,
            type: null,
            controls: ['zoomControl']
        },{
            restrictMapArea: [[10, 10], [85,-160]]
        });
        map.controls.get('zoomControl').options.set({size: 'small'});
        // Добавим заливку цветом.
        var pane = new ymaps.pane.StaticPane(map, {
            zIndex: 100, css: {
                width: '100%', height: '100%', backgroundColor: "#333039"
            }
        });
        map.panes.append('red', pane);
        // Загрузим регионы.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),
        myPlacemark = new ymaps.Placemark([67.661574, 79.573856], {
            hintContent: 'Москва',
            balloonContent: 'ыыыыы'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/point.png',
            // Размеры метки.
            iconImageSize: [30, 42],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        }),
        map.geoObjects.add(myPlacemark);
        ymaps.borders.load('RU', {
            lang: 'ru',
            quality: 2
        }).then(function (result) {
            // Создадим объект, в котором будут храниться коллекции с нашими регионами.
            var districtCollections;
            // Для каждого федерального округа создадим коллекцию.
                districtCollections = new ymaps.GeoObjectCollection(null, {
                    fillColor: '#333039',
                    strokeColor: '#434149',
                    strokeOpacity: 1,
                });
            // Создадим свойство в коллекции, которое позже наполним названиями субъектов РФ.
            result.features.forEach(function (feature) {
                districtCollections.add(new ymaps.GeoObject(feature));
            });
            
                map.geoObjects.add(districtCollections)
                
        })
        
    });
    ymaps.ready(init);
    var myMap;
    var sities = [
        'Москва',
        'Санкт-Петербург'
    ]
    var names = [
        'Гостинный двор',
        'Гостинный двор'
    ]
    var location_mark = [
        'ул. Садовая, 17',
        'ул. Ленина, 20'
    ]
    var temp_coords = [
        [0, 0],
        [0, 0]
    ]
    function init() {
        myMap = new ymaps.Map('map_where', {
                center: [55.751574, 37.573856],
                zoom: 9,
                controls: ['smallMapDefaultSet']    
            }, {
                searchControlProvider: 'yandex#search'
            });
            myPlacemark = Array();
            for(i in sities){
                temp = sities[i]+", "+location_mark[i]
                
                x = 0;
                y = 0;
                ymaps.geocode(temp,{results:1}).then(
                    function(res){  var MyGeoObj = res.geoObjects.get(0);
                        x = MyGeoObj.geometry.getCoordinates()[0];
                        y = MyGeoObj.geometry.getCoordinates()[1];
                        console.log(x+' '+y)
                        temp_coords[i] = [x,y]
                myPlacemark[i] = new ymaps.Placemark(temp_coords[i], {
                    hintContent:location_mark[i],
                    balloonContentHeader: names[i],
                    balloonContentBody: location_mark[i],
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/point.png',
                    iconImageSize: [30, 42],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-15, -42]
                })
                myMap.behaviors.disable('scrollZoom');
                myMap.geoObjects.add(myPlacemark[i])
                    })
            }
            
    }
    $('.where_to_buy .location a').click(function(){
        event.preventDefault()
        temp = $(this).text()
        if(!$(this).hasClass('active')){
            $('.where_to_buy .location a').removeClass('active')
            $(this).addClass('active')
        }
        console.log(temp)
        ymaps.geocode(temp,{results:1}).then(
            function(res){  var MyGeoObj = res.geoObjects.get(0);
                x = MyGeoObj.geometry.getCoordinates()[0];
                y = MyGeoObj.geometry.getCoordinates()[1];
                myMap.setCenter([x, y]);
            }
        )
    })