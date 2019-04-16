        var winwidth = window.innerWidth;
        var halfwidth = winwidth / 2;
        var header = document.getElementById('myheader');
        var headBottom = $('.myheader').height() + 500;
        var windowYOffset = window.pageYOffset;
        var padwidth = 767;
        (function ($) {
            $(window).on("load", function () {
                if (winwidth > padwidth) {
                    //loop();
                    header.onmousemove = function (event) {
                        Mousemove(event);
                    }
                } else {
                    header.onmousemove = null;
                }

                //卷軸外掛
                $("#content-1").mCustomScrollbar({
                    theme: "minimal"
                });

                //圖片地圖點擊星標高亮
                $('.marks').on("click", function (e) {
                    $('#marklight').offset({
                        left: e.pageX,
                        top: e.pageY
                    }).addClass('active').css({
                        visibility: "visible"
                    });;
                    setTimeout(function () {
                        $('#marklight').removeClass('active')
                    }, 800);
                });
                listdata('北海道');
                listdata('香港');
            });
            $(window).resize(function () {
                winwidth = window.innerWidth;
                headBottom = $('.header').height();
                halfwidth = winwidth / 2;
                mouse(plane, 0, 0, 0.1, 0.4, 0.08);
                mouse(balloon, 0, 0, 0.8, 0.4, 0.02);
                mouse(cloud, 0, 0, 0.05, 0.25, 0.1);
                $('#marklight').css({
                    visibility: 'hidden'
                }); //縮放星標消失
                if (winwidth < padwidth) {
                    $('#animate').stop(true);
                } else {
                    $('#animate').stop();
                    //loop();
                }
            });

//            window.addEventListener("scroll", function () {
//                windowYOffset = window.pageYOffset;
//                if (windowYOffset > 800) {
//                    $('#animate').stop(true);
//                } else if (windowYOffset == 0 && winwidth > padwidth) {
//                    $('#animate').stop(true);
//                    //loop();
//                }
//            });

            //不執行，算手機版標籤用
            //                function mTages() {
            //                    if (winwidth <= 767) {
            //                        var mtg = document.getElementsByClassName('marksh');
            //                        for (i = 0; i < mtg.length; i++) {
            //                            mtg[i].coords = '0,' + (i * 43) + ',100,' + (i + 1) * 43;
            //                        }
            //                    }
            //                }
            //-----------滑鼠位移動畫-------
            function Mousemove(event) {
                event = event || window.event;
                var x = event.clientX - header.offsetLeft,
                    y = event.clientY - header.offsetTop;
                mouse(plane, x, y, 0.1, 0.4, 0.08);
                mouse(balloon, x, y, 0.8, 0.3, 0.02);
                mouse(cloud, x, y, 0.05, 0.25, 0.2);
            }

            function mouse(obj, x, y, left, top, speed) {
                var headBottom = $('.myheader').height() + 500; //在裡面選才有
                var moveX = winwidth * left - x * speed;
                var moveY = headBottom * top - y * speed;
                //                var oleft = objin.style.left;
                //                var otop = objin.style.top;
                //                oleft = moveX;
                //                otop = moveY;
                $(obj).offset({left: moveX, top: moveY}); //改為JQ的選法
            }
            //--------------拋物線動畫---------
            function loop() {
                //                 console.log('動畫撥放');
                //                 var w = winwidth;
                //
                //                 function animation(obj, t) {
                //                     // $.fx.interval = 200;
                //                     var o = $(obj);
                //                     var v = 0.36 / w; //1200-0.0003
                //                     var initY = Math.pow(halfwidth, 2) * v; //X等於0時下推的高度
                //                     o.offset({
                //                         left: -10
                //                     });
                //                     o.animate({
                //                         display: 'block',
                //                         left: w,
                //                         percent: 100
                //                     }, {
                //                         duration: t,
                //                         progress: function() {
                //                             var x = parseInt(this.style.left) - halfwidth + 50; //拋物線中心點是0
                //                             var y = parseInt(this.style.top);
                //                             y = x * x * v + headBottom - initY - $(obj).height() / 1.2; //y=x^2+初始地平線-初始Y最低值
                //                             this.style.top = y;
                //                             var ro = this.percent / 3 - 10;
                //                             // this.style.width = 100-Math.abs(this.percent-50);
                //                             this.style.width = 100;
                //                             this.style.transform = "rotate(" + ro + "deg)";
                //                         },
                //                         always: function(e) {
                //                             //動畫停止時
                //                            this.style.display = 'none';
                //                            this.style.left = 0;
                //                             this.percent = 0;
                //                         },
                //                         complete: function() {
                //                             this.style.display = 'none';
                //                             this.style.left = 0;
                //                             this.percent = 0;
                //                             //loop();
                //                         }
                //                     });
                //                 }
                //                 animation('#animate', 10000);
                //                 // animation('#animate1', 50000);
            }

            //----到達清單按鈕----
            $.each(['JP', 'HK'], function (index, value) {
                $('#to' + value).click(function () {
                    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
                    $('html, body').animate({
                        scrollTop: $("#area" + value).offset().top
                    }, 1000);
                });
            })
        })(jQuery);

        //----列出清單----
        function listdata(name) {
            var listj = document.getElementById('listj'),
                listh = document.getElementById('listh');
            var ul = document.createElement('ul');
            var num, mCSB;
            for (i = 0; i < data.length; i++) {
                if (data[i].city == name) {
                    var li = document.createElement('li');
                    ul.appendChild(li);
                    li.innerHTML = '<div><b>' + data[i].name + '</b><p>' + data[i].addr + ' </p></div>';
                    if (data[i].lat == 'null') {} else {
                        li.innerHTML += '<a onClick=\'OpenMapPage(\"' + i + '\");\'><img src="img/mark.png" alt="" class="mark"></a>';
                    }
                    if (data[i].country == '日本') {
                        num = 1;
                    } else {
                        num = 2
                    }
                }
            }
            (function (a) {
                mCSB = document.getElementById('mCSB_1_container_' + a + '_container');
                mCSB.appendChild(ul);
                mCSB.insertBefore(ul, mCSB.childNodes[0]);
                document.getElementById('title' + a).innerHTML = name+' / 跨國提款ATM';
            }(num))
            mCSB.removeChild(mCSB.lastElementChild);
        }
        //----開啟地圖----
        function OpenMapPage(loc) {
            var WinSetting = "menubar=no,toolbar=no,scrollbars=yes, left=0,top=0,width=1000,height=900";
            var winATM = window.open("mapSearch.html?" + loc, "samrt2pay_map", WinSetting);
            //var winATM = window.open("https://www.cotabank.com.tw/web/smart2pay_map?" + loc, "samrt2pay_map");
            winATM.focus();
        }
