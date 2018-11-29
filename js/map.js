$(document).ready(function(){
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
    ymaps.ready(function () {
        var myMap = new ymaps.Map('map_where', {
                center: [55.751574, 37.573856],
                zoom: 9
            }, {
                searchControlProvider: 'yandex#search'
            }),
    
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
    
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: 'Собственный значок метки',
                balloonContent: 'Это красивая метка'
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
    
            myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
                hintContent: 'Собственный значок метки с контентом',
                balloonContent: 'А эта — новогодняя',
                iconContent: '12'
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '../img/point.png',
                // Размеры метки.
                iconImageSize: [33, 50],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [0, 0],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [0, 0],
                // Макет содержимого.
                iconContentLayout: MyIconContentLayout
            });
    
        myMap.geoObjects
            .add(myPlacemark)
            .add(myPlacemarkWithContent);
    });
})