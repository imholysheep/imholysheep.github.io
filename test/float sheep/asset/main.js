        var button = document.getElementById("s4-button"),
            s4btn = document.getElementsByClassName("s4-btn"),
            s4CSS = document.getElementById("s4-btn-css"),
            s4mouth = document.getElementById("s4-mouth");
        var windowPos = $(window).scrollTop(),
            half = $(window).width() / 2;
        var mainPos;
        var mainTop = $('#main').offset().top;
        var score = 0;
        var bubles = [];
        var total = 36;
        var end_time = 20000;
        var wind = 10;
        var freq = 1000;

        /*----泡泡物件----*/
        function buble() {
            this.depth = random(0, 1);
            this.mood = '';
        }

        buble.prototype.newDom = function () {
            var newDiv, newImg, dapth;
            newDiv = document.createElement("div");
            newImg = document.createElement("img");
            newImg.classList.add('buble');
            newDiv.dataset.depth = this.depth;

            switch (this.mood) {
                case 'happy':
                    newImg.src = 'img/pink_buble.png';
                    newImg.classList.add('happy');
                    break;
                case 'sad':
                    newImg.src = 'img/blue_buble.png';
                    newImg.classList.add('sad');
                    break;
            }
            newDiv.appendChild(newImg);
            var scene = document.getElementById('scene');
            scene.appendChild(newDiv);
        }

        function createBuble(total) {
            var happy = Math.floor(total / 3);
            for (i = 0; i < total; i++) {
                var b = new buble();
                bubles.push(b);

                if (i < happy) {
                    b.mood = 'happy'
                    b.newDom();
                } else {
                    b.mood = 'sad'
                    b.newDom();
                }
            }
        }

        function bubble_bounce() {
            $('.buble').each(function (i, e) {
                mainPos = mainTop - parseInt($(this).css('padding-top'));
                //bounce(mainPos, $(this));
            });
            requestAnimationFrame(bubble_bounce);
        }

        function bubble_move() {
            //自由的泡泡
            let ran1 = Math.random(),
                ran2 = Math.random();
            $('.buble').each(function (i, e) {
                $(this).offset(
                    function (i, cor) {
                        newPos = new Object();
                        newPos.left = cor.left - (ran1 - ran2) * wind;
                        newPos.top = cor.top + 10;
                        newPos.top = comeback(newPos.left, newPos.top, $(this)).top;
                        newPos.left = comeback(newPos.left, newPos.top, $(this)).left;
                        return newPos;
                    });
            });
        }

        function comeback(posX, posY, e) {
            if (posX > half * 2 || posX < 0) {
                posX = 0;
                e.css({
                    marginLeft: 100
                });
            } else if (posY > $(document).height()) {
                posY = 100;
            } else if (posY < 0) {
                posY = $(document).height() - 100;
            }
            return {
                top: posY,
                left: posX
            };
        }

        /*function bounce(mP, ele) {
            let top, left;
            top = ele.offset().top;
            left = ele.offset().left + (ele.width()) / 2;
            if (mP + 400 > top && mP < top && half - 200 < left && half + 200 > left) {
                ele.offset(
                    function (i, cor) {
                        newPos = new Object();
                        if (left < half) {
                            newPos.left = cor.left - 5000 / (half - left);
                        } else {
                            newPos.left = cor.left + 5000 / (left - half);
                        }

                        newPos.top = top + 100;
                        let Y1 = window.pageYOffset;
                        scroll[0] = scroll[1];
                        scroll[1] = Y1;
                        if (scroll[1] > scroll[0]) { //下行
                        } else if (scroll[1] < scroll[0]) { //上行
                            newPos.top = top - 200;
                        }
                        newPos.top = comeback(newPos.left, newPos.top, $(this)).top;
                        newPos.left = comeback(newPos.left, newPos.top, $(this)).left;
                        return newPos;
                    });
            }
        }*/
        function bounce(mP, ele) {
            let top, left, mTop, mLeft;
            top = ele.offset().top+ (ele.width()) / 2;
            mTop= mP.top;
            mLeft= mP.left;
            left = ele.offset().left + (ele.width()) / 2;
            if (mTop+240 > top && mTop-40 < top && mLeft-40< left && mLeft + 240 > left) {
                console.log('do')
                ele.offset(
                    function (i, cor) {
                        newPos = new Object();
                        let mhalf = mLeft+100;
                        let middle = mTop+100;
                        if (left < mhalf && middle<top) {
                            newPos.left = cor.left + 5000 / (mhalf - left);
                            newPos.top = top + 100;
                        } else if(left > mhalf && middle<top){
                            newPos.left = cor.left + 5000 / (left - mhalf);
                            newPos.top = top + 100;
                        }else if(left < mhalf && middle>top){
                            newPos.left = cor.left + 5000 / (mhalf - left);
                            newPos.top = top - 100;
                        }else if(left > mhalf && middle>top){
                            newPos.left = cor.left + 5000 / (left - mhalf);
                            newPos.top = top - 100;
                        }

                        
                        let Y1 = window.pageYOffset;
                        scroll[0] = scroll[1];
                        scroll[1] = Y1;
                        if (scroll[1] > scroll[0]) { //下行
                        } else if (scroll[1] < scroll[0]) { //上行
                            newPos.top = top - 200;
                        }
                        newPos.top = comeback(newPos.left, newPos.top, $(this)).top;
                        newPos.left = comeback(newPos.left, newPos.top, $(this)).left;
                        return newPos;
                    });
            }
        }
        $('#main').draggable();
        /*泡泡閃開*/
        $('#main').on('click', function (e) {
            mainTop = $('#main').offset().top;
            console.log('11');
            $('.buble').each(function (i, e) {
                //mainPos = mainTop - parseInt($(this).css('padding-top'));
                mainPos = $('#main').offset();
                //bounce(mainPos, $(this));
                bounce(mainPos, $(this));
            });
        });

        function bubble_pa(e) {
            e.attr("src", "img/pa.gif");
            e.addClass('bubble-pa');
            setTimeout(function () {
                e.remove();
            }, 500);
        }
        /*----onload----*/
        document.getElementsByTagName("BODY")[0].onload = function () {
            createBuble(total);
            $('#score').html(score);
            $('#main').css({'left':'50vw','margin-left':half-100,'top':'50vh'})
            $('#timer').each(function () {
                $(this).text();
                $(this).prop('Counter', end_time / 1000).animate({
                    Counter: $(this).text()
                }, {
                    duration: end_time,
                    easing: 'linear',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
            //https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach
            //dom元素不能直接當array使用
            //SMIL方法，原始的svg動畫tag，但已逐漸被淘汰
            Array.prototype.forEach.call(s4btn, function (item, idx) {
                item.addEventListener('click', function () {
                    let f = 's4-' + this.dataset.feel;
                    var aniId = document.getElementById(f);
                    var aniClass = document.getElementsByClassName(f);
                    var faceO = document.getElementById('faceO');

                    aniId.beginElement();
                    if (this.dataset.feel == "sad") {
                        aniClass[0].beginElement();
                    } else if (this.dataset.feel == "happy") {
                        faceO.classList.add('happy')
                        setTimeout(function () {
                            faceO.classList.remove('happy');
                        }, 2500);
                    }
                });
            });

            var scene = document.getElementById('scene');
            var parallax = new Parallax(scene);
            var scene2 = document.getElementById('scene2');
            var parallax2 = new Parallax(scene2);
            /*var scene3 = document.getElementById('scene3');
            var parallax3 = new Parallax(scene3);
            var scene4 = document.getElementById('scene4');
            var parallax = new Parallax(scene4);*/

            var bubles = $('.buble');
            bubles.each(function (i, e) {
                let random = Math.random();
                $(this).css({
                    marginLeft: 10 * random * random * 10 + '%',
                    marginTop: 10 * Math.random() * 10 + '%',
                    width: $(this).parent().data('depth') * 200 + 'px',
                    height: $(this).parent().data('depth') * 200 + 'px'
                })
            });

            //滑鼠事件-眼睛
            $(document).on("mousemove", function (event) {
                let eyest = $('#eyes').offset().top;
                let eyesl = $('#eyes').offset().left;
                let eyewL = $('#eyewL').offset();
                let eyewR = $('#eyewR').offset();
                var face = $('#face').offset();

                function eyeRangeT(rangeT) {
                    if (rangeT * 0.05 > 11) {
                        return 8;
                    } else if (rangeT * 0.05 < -11) {
                        return -8;
                    } else {
                        return rangeT * 0.05;
                    }
                }

                function eyeRangeL(rangeL) {
                    if (rangeL * 0.05 > 10) {
                        return 8;
                    } else if (rangeL * 0.05 < -16) {
                        return -8;
                    } else {
                        return rangeL * 0.05;
                    }
                }

                $('#eyes').css({
                    'margin-top': eyeRangeT(event.pageY - face.top - 100),
                    'margin-left': eyeRangeL(event.pageX - face.left - 100),
                });
            });

            //滑鼠事件-點擊泡泡
            $('.buble.sad').on("click", function (event) {
                document.getElementById('s4-sad').beginElement();
                document.getElementsByClassName('s4-sad')[0].beginElement();
                bubble_pa($(this));
                score -= 1;
                $('#score').html(score);
            });

            $('.buble.happy').on("click", function (event) {
                var faceO = document.getElementById('faceO');
                faceO.classList.add('happy')
                setTimeout(function () {
                    faceO.classList.remove('happy');
                }, 2500);
                document.getElementById('s4-happy').beginElement();
                bubble_pa($(this));
                score += 1;
                $('#score').html(score);
            });

            //CSS方法，不支援變形。
            /*s4CSS.addEventListener('click', function(){		
            	s4mouth.classList.add('sad');			
            });*/
            bubble_bounce();
            setInterval(bubble_move, freq);


        } /*[end of window onload]*/


        /*----on scroll----*/

        $(window).scroll(function () {
            mainTop = $('#main').offset().top;
            $('.buble').each(function (i, e) {
                mainPos = mainTop - parseInt($(this).css('padding-top'));
                var scrollTop = windowPos - $(this).offset().top;
                if (scrollTop > 0) {
                    $(this).css({
                        paddingTop:
                            (function (t) {
                                if (scrollTop * t.parent().data('depth') > 800) {
                                    return '800px';
                                } else {
                                    return scrollTop * t.parent().data('depth') + 'px';
                                }
                            }($(this)))
                    })
                }
                bounce(mainPos, $(this));

            })
        }); /*[end of windowscroll]*/

        /*---- resize ----*/
        $(window).resize(function () {
            half = $(window).width() / 2;
            $('#final-wrap').css({
                'left': half - 250
            });
        });

        setTimeout(function () {
            $('#main-wrap').addClass('rain');
            $('body').addClass('rain');
        }, end_time);

        setTimeout(function () {
            $('.buble').each(function (i, e) {
                var t = $(this);
                setTimeout(function () {
                    bubble_pa(t);
                }, 200 * i);
            });

        }, end_time + 1000);

        setTimeout(function () {
            $('#main-wrap').addClass('end');
            $('html').addClass('end');
            $('#final-wrap').css({
                'display': 'block',
                'top': window.scrollY,
                'left': half - 250
            });
            var f_text = "你一共得到 " + score + " 分";
            var f_comment = "<br>我沒有什麼好說的。"
            if (score >= 0 && score < 5) {
                $('#final').css('background-image', 'url(img/f_1.png)');
                f_comment = "<br>爛到咩咩叫。"
            } else if (score >= 5 && score < 8) {
                $('#final').css('background-image', 'url(img/f_2.png)');
                f_comment = "<br>瓜哩唒"
            } else if (score >= 8 && score < 10) {
                $('#final').css('background-image', 'url(img/f_4.png)');
                f_comment = "<br>還不錯喔。送你羊"
            } else if (score >= 10) {
                $('#final').css('background-image', 'url(img/f_5.png)');
                f_comment = "<br>100億分之一的機率!!!恭喜你幸運中獎!!!"
            } else {
                $('#final').css('background-image', 'url(img/f_3.png)');
            }

            $('#final-wrap p').html(f_text + f_comment);
        }, end_time + 3000);

        setTimeout(function () {
            $('#final-wrap').css('opacity', '1');
        }, end_time + 3500);


        /*----各種功能----*/
        //起始值，最大值，回傳這區間的一個數
        function random(min, max) {
            var num = (Math.random() * (max - min) + min).toFixed(1);
            return num;
        }

        //註冊手機事件
        var mouseEventTypes = {
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        };

        for (originalType in mouseEventTypes) {
            document.addEventListener(originalType, function (originalEvent) {
                event = document.createEvent("MouseEvents");
                touch = originalEvent.changedTouches[0];
                event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true, window, 0, touch.screenX, touch.screenY, touch.clientX,
                    touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
                    touch.metaKey, 0, null);
                originalEvent.target.dispatchEvent(event);
            });
        }
