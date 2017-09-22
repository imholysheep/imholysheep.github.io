        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: {
                    lat: 24.173357,
                    lng: 120.515625
                }
            });

            var infowindow = new google.maps.InfoWindow();
            var urlnum = location.search.replace("?", "");
            currentzoom = map.getZoom();

            for (i = 0; i < data.length; i++) {
                var marker = new google.maps.Marker({
                    map: map,
                    icon: {
                        url: 'https://www.cotabank.com.tw/web/wp-content/uploads/markerG.png',
                        scaledSize: new google.maps.Size(20, 20)
                    },
                    position: new google.maps.LatLng(data[i].lat, data[i].lng),
                    name: data[i].name, //增加給 marker 物件
                    addr: data[i].addr,
                    area: data[i].city
                });
                markersArray.push(marker);
                google.maps.event.addListener(marker, 'click', function () {
                    var content = '<div class="popup_container"><h3>' + this.name + '</h3><p>地區：' + this.area + '</p><span>地址：' + this.addr + '</span></div>';
                    infowindow.open(map, this);
                    infowindow.setContent(content);
                }, false);
            }

            if (urlnum !== "") {
                var d = data[urlnum],
                    lat = d.lat,
                    lng = d.lng,
                    name = d.name,
                    area = d.city,
                    addr = d.addr,
                    latlng = new google.maps.LatLng(lat, lng);
                var content = '<div class="popup_container"><h3>' + name + '</h3><p>地區：' + area + '</p><span>地址：' + addr + '</span></div>';
                map.setCenter(latlng);
                map.setZoom(12);
                var marker = new google.maps.Marker({
                    map: map,
                    icon: {
                        url: 'https://www.cotabank.com.tw/web/wp-content/uploads/markerR.png',
                        scaledSize: new google.maps.Size(30, 30)
                    },
                    position: new google.maps.LatLng(lat, lng)
                });
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, this);
                    infowindow.setContent(content);
                }, false);
                infowindow.open(map, marker);
                infowindow.setContent(content);
                //infowindow.setPosition(new google.maps.LatLng(lat+1, lng)); //直接開

            }

            function search() {
                var address = document.getElementById('address').value;
                var set = new google.maps.Geocoder();
                geocodeSearch(set, map, address, infowindow);
                return false;
            }

            function submit() {
                var inpt = document.getElementById('address');
                var sbmt = document.getElementById('submit');

                sbmt.addEventListener("click", function () {
                    search();
                })
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
                    inpt.addEventListener("keypress", function () {
                        if (event.keyCode == 13) {
                            search();
                        }
                    });
                }

            }
            submit();

            var findme = document.getElementById('findme');
            findme.addEventListener("click", function () {
                whereAmI();
            })
            //----取得當前位置----
            function whereAmI() {
                // Try HTML5 geolocation.
                function success(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    var posL = new google.maps.LatLng(pos.lat, pos.lng);
                    infowindow.setPosition(pos);
                    infowindow.open(map);
                    infowindow.setContent('目前位置'+posL);
                    map.setCenter(pos);
                    map.setZoom(8);
                    find_closest_marker(map, posL, infowindow);//0905
                }

                function error(err) {
                    handleLocationError(true, infowindow, map.getCenter(), err);
                }

                var options = {
                    enableHighAccuracy: true,
                    timeout: 2000,
                    maximumAge: 2000
                };

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error, options)
                } else {
                    // Browser doesn't support Geolocation
                    handleLocationError(false, infowindow, map.getCenter());
                }

            }
            //定位報錯
            function handleLocationError(browserHasGeolocation, infowindow, pos, err) {
                //infowindow.setPosition(pos);
                //infowindow.open(map);
                panel(browserHasGeolocation ?
                err.message + '：定位失敗' :
                '：沒有定位功能');
            }

            google.maps.event.addListener(map, 'zoom_changed', function (event) {
                currentzoom = map.getZoom();
            });
        }
        //------end of init

        var markersArray = [];
        //----找最近點----
        function rad(x) {
            return x * Math.PI / 180;
        }

        function find_closest_marker(map, searchloc, infowindow) {//0905
            var lat = searchloc.lat();
            var lng = searchloc.lng();
            var R = 6371; // 地球半徑
            var distances = [];
            var closest = -1;
            for (i = 0; i < markersArray.length; i++) {
                var mlat = markersArray[i].position.lat();
                var mlng = markersArray[i].position.lng();
                var dLat = rad(mlat - lat);
                var dLong = rad(mlng - lng);
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                var d = R * c;
                distances[i] = d;
                if (closest == -1 || d < distances[closest]) {
                    closest = i;
                }
            }
            var blat = markersArray[closest].position.lat(),
                blng = markersArray[closest].position.lng();
            var searchinfo = document.getElementById('search-info');
            if (distances[closest] <= 10) {
                calcRoute(map, searchloc, markersArray[closest], infowindow);
            } else {

                infowindow.setContent('您附近沒有可供跨國提款的ATM');
				infowindow.setPosition(searchloc);//0905
                infowindow.open(map);
            }
            //searchinfo.innerHTML = markersArray[closest].name +'直線距離'+distances[closest]
        }

        //----繪製路線----
        var Rarray = [];
        var Marray = [];
        function calcRoute(map, a, b, infowindow) {
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer();
            var request = {
                origin: a,
                destination: b.position,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL
            };
            var marker1 = new google.maps.Marker({
                        //map: map,
                        icon: {
                            url: 'https://www.cotabank.com.tw/web/wp-content/uploads/walker.png',
                            scaledSize: new google.maps.Size(80, 104)
                        },
                        position: a
                    });
            directionsService.route(request, function (result, status) {
                if (status == 'OK') {
                    var myDistance = result.routes[0].legs[0];
                    if (myDistance != undefined) {
                        myDistance = Math.round(result.routes[0].legs[0].distance.value / 100) / 10 + '公里';
                    } else {
                        myDistance = '無法估算距離';
                    }
                    var content = '<p>距離您較近的ATM是：<b>' + b.name + '</b></p><p>地址：' + b.addr + '</p><p>距離為：' + myDistance + '</p>';
                    infowindow.setContent(content);
                    infowindow.setPosition(b.position);
                    infowindow.open(map);
                    panel('此路線規劃僅供參考');
                } else {
                    infowindow.setPosition(new google.maps.LatLng(a.lat(), a.lng()));
                    infowindow.setContent('沒有可用路徑');
                    infowindow.open(map);

                }
                if (Rarray.length != 0) {
                    Rarray[0].setMap(null);
                } //清除上一個路徑
                if (Marray.length != 0) {
                    Marray[0].setMap(null);
                } //清除上一個圖標
                
                directionsDisplay.setDirections(result);
                Rarray = []; 
                Marray = [];//清空
                Rarray.push(directionsDisplay);
                Marray.push(marker1);
                Rarray[0].setMap(map);
                Marray[0].setMap(map);
            });
        }

        //----地址搜尋----
        function geocodeSearch(geocoder, map, addrset, infowindow) {
            geocoder.geocode({
                'address': addrset
            }, function (results, status) {
                if (status === 'OK') {
                    map.setCenter(results[0].geometry.location);
                    //map.setZoom(currentzoom + 1);
                    find_closest_marker(map, results[0].geometry.location, infowindow);//0905
                } else {
                    panel('很抱歉，找不到您所搜尋的地方!');
                }
            });

        }

        function deleteMarkers() {
            Marray = [];
        }

        function panel(msg) {
            var panel = document.getElementById('panel');
            panel.innerHTML = msg;
            panel.classList.remove('hidden');
            setTimeout(function () {
                panel.classList.add('hidden');
            }, 5000);
        }
