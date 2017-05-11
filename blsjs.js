/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){if(s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt",""),altText=""!==s.attr("data-thumb-alt")?altText=' alt="'+s.attr("data-thumb-alt")+'"':"",a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+altText+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var c=s.attr("data-thumbcaption");""!==c&&void 0!==c&&(a+='<span class="'+i+'caption">'+c+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,x=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!x||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!x&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,x=!1,y=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),y=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:y,o=d?y:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){y=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-y,x=d?Math.abs(m)<Math.abs(y-o):Math.abs(m)<Math.abs(b-o);var t=500;(!x||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!x&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).height()},e):t.height(n.slides.eq(n.animatingTo).height())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);



// Theia Sticky Sidebar v1.3.0 - https://github.com/WeCodePixels/theia-sticky-sidebar
!function(i){i.fn.theiaStickySidebar=function(t){function o(t,o){var a=e(t,o);a||(console.log("TST: Body width smaller than options.minWidth. Init is delayed."),i(document).scroll(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)),i(window).resize(function(t,o){return function(a){var n=e(t,o);n&&i(this).unbind(a)}}(t,o)))}function e(t,o){return t.initialized===!0?!0:i("body").width()<t.minWidth?!1:(a(t,o),!0)}function a(t,o){t.initialized=!0,i("head").append(i('<style>.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')),o.each(function(){function o(){a.fixedScrollTop=0,a.sidebar.css({"min-height":"1px"}),a.stickySidebar.css({position:"static",width:""})}function e(t){var o=t.height();return t.children().each(function(){o=Math.max(o,i(this).height())}),o}var a={};a.sidebar=i(this),a.options=t||{},a.container=i(a.options.containerSelector),0==a.container.size()&&(a.container=a.sidebar.parent()),a.sidebar.parents().css("-webkit-transform","none"),a.sidebar.css({position:"relative",overflow:"visible","-webkit-box-sizing":"border-box","-moz-box-sizing":"border-box","box-sizing":"border-box"}),a.stickySidebar=a.sidebar.find(".theiaStickySidebar"),0==a.stickySidebar.length&&(a.sidebar.find("script").remove(),a.stickySidebar=i("<div>").addClass("theiaStickySidebar").append(a.sidebar.children()),a.sidebar.append(a.stickySidebar)),a.marginTop=parseInt(a.sidebar.css("margin-top")),a.marginBottom=parseInt(a.sidebar.css("margin-bottom")),a.paddingTop=parseInt(a.sidebar.css("padding-top")),a.paddingBottom=parseInt(a.sidebar.css("padding-bottom"));var n=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight();a.stickySidebar.css("padding-top",1),a.stickySidebar.css("padding-bottom",1),n-=a.stickySidebar.offset().top,d=a.stickySidebar.outerHeight()-d-n,0==n?(a.stickySidebar.css("padding-top",0),a.stickySidebarPaddingTop=0):a.stickySidebarPaddingTop=1,0==d?(a.stickySidebar.css("padding-bottom",0),a.stickySidebarPaddingBottom=0):a.stickySidebarPaddingBottom=1,a.previousScrollTop=null,a.fixedScrollTop=0,o(),a.onScroll=function(a){if(a.stickySidebar.is(":visible")){if(i("body").width()<a.options.minWidth)return void o();if(a.sidebar.outerWidth(!0)+50>a.container.width())return void o();var n=i(document).scrollTop(),d="static";if(n>=a.container.offset().top+(a.paddingTop+a.marginTop-a.options.additionalMarginTop)){var r,s=a.paddingTop+a.marginTop+t.additionalMarginTop,c=a.paddingBottom+a.marginBottom+t.additionalMarginBottom,p=a.container.offset().top,b=a.container.offset().top+e(a.container),g=0+t.additionalMarginTop,l=a.stickySidebar.outerHeight()+s+c<i(window).height();r=l?g+a.stickySidebar.outerHeight():i(window).height()-a.marginBottom-a.paddingBottom-t.additionalMarginBottom;var h=p-n+a.paddingTop+a.marginTop,f=b-n-a.paddingBottom-a.marginBottom,S=a.stickySidebar.offset().top-n,u=a.previousScrollTop-n;"fixed"==a.stickySidebar.css("position")&&"modern"==a.options.sidebarBehavior&&(S+=u),"legacy"==a.options.sidebarBehavior&&(S=r-a.stickySidebar.outerHeight(),S=Math.max(S,r-a.stickySidebar.outerHeight())),S=u>0?Math.min(S,g):Math.max(S,r-a.stickySidebar.outerHeight()),S=Math.max(S,h),S=Math.min(S,f-a.stickySidebar.outerHeight());var m=a.container.height()==a.stickySidebar.outerHeight();d=(m||S!=g)&&(m||S!=r-a.stickySidebar.outerHeight())?n+S-a.sidebar.offset().top-a.paddingTop<=t.additionalMarginTop?"static":"absolute":"fixed"}if("fixed"==d)a.stickySidebar.css({position:"fixed",width:a.sidebar.width(),top:S,left:a.sidebar.offset().left+parseInt(a.sidebar.css("padding-left"))});else if("absolute"==d){var y={};"absolute"!=a.stickySidebar.css("position")&&(y.position="absolute",y.top=n+S-a.sidebar.offset().top-a.stickySidebarPaddingTop-a.stickySidebarPaddingBottom),y.width=a.sidebar.width(),y.left="",a.stickySidebar.css(y)}else"static"==d&&o();"static"!=d&&1==a.options.updateSidebarHeight&&a.sidebar.css({"min-height":a.stickySidebar.outerHeight()+a.stickySidebar.offset().top-a.sidebar.offset().top+a.paddingBottom}),a.previousScrollTop=n}},a.onScroll(a),i(document).scroll(function(i){return function(){i.onScroll(i)}}(a)),i(window).resize(function(i){return function(){i.stickySidebar.css({position:"static"}),i.onScroll(i)}}(a))})}var n={containerSelector:"",additionalMarginTop:0,additionalMarginBottom:0,updateSidebarHeight:!0,minWidth:0,sidebarBehavior:"modern"};t=i.extend(n,t),t.additionalMarginTop=parseInt(t.additionalMarginTop)||0,t.additionalMarginBottom=parseInt(t.additionalMarginBottom)||0,o(t,this)}}(jQuery);
/*GLOBAL SETTINGS, USER CAN CHANGE*/
var monthFormat = [, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
var noThumbnail = "http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png"; 
var postperPage = 10; 
var labelResults = 10; 
var recentpostsText = "Recent Posts"; 
var postnavPrevText = "Previous"; 
var postnavNextText = "Next"; 
var navPrevMsg = "You are seeing the Last Post";
var navNextMsg = "You are seeing the Latest Post";
var relatedTitleText = "Related Posts";
var cmmTitleText = "Post a Comment";
var cmmBloggerText = "Blogger";
var cmmDisqusText = "Disqus";
var cmmFaceText = "Facebook";



$(document)['ready'](function () {
	$('img')['each'](function () {
		var _0x23c5x1 = $(this);
		var _0x23c5x2 = _0x23c5x1['attr']
			('src');
		_0x23c5x1['attr']
			('title', _0x23c5x2['substring']((_0x23c5x2['lastIndexOf']
					('/')) + 1, _0x23c5x2['lastIndexOf']
				('.')));
		_0x23c5x1['attr']
			('alt', _0x23c5x2['substring']((_0x23c5x2['lastIndexOf']
					('/')) + 1, _0x23c5x2['lastIndexOf']
				('.')))
	})
});
$(function () {
	$('.post-outer .post:odd')['addClass']('odd')
});
$(document)['ready'](function (_0x23c5x3) {
	_0x23c5x3('#menu')['each'](function () {
		var _0x23c5x4 = -1
			, _0x23c5x5 = ''
			, _0x23c5x6 = '';
		_0x23c5x3(this)['find']
			('ul')['find']
			('li')['each']
			(function () {
				for (var _0x23c5x7 = _0x23c5x3(this)['text']
						(), _0x23c5x8 = _0x23c5x3(this)['find']
						('a')['attr']
						('href'), _0x23c5x9 = 0, _0x23c5xa = 0; _0x23c5xa < _0x23c5x7['length'] && (_0x23c5x9 = _0x23c5x7['indexOf']
						('_', _0x23c5x9), -1 != _0x23c5x9); _0x23c5xa++) {
					_0x23c5x9++
				};
				if (level = _0x23c5xa, level > _0x23c5x4 && (_0x23c5x5 += '<ul>', _0x23c5x6 += '<ul>'), level < _0x23c5x4) {
					offset = _0x23c5x4 - level;
					for (var _0x23c5xa = 0; _0x23c5xa < offset; _0x23c5xa++) {
						_0x23c5x5 += '</ul></li>', _0x23c5x6 += '</ul></li>'
					}
				};
				_0x23c5x7 = _0x23c5x7['replace']
					(/_/gi, ''), _0x23c5x5 += '<li><a href=\'' + _0x23c5x8 + '\'>' + _0x23c5x7 + '</a>', _0x23c5x6 += '<li><a href=\'' + _0x23c5x8 + '\'>';
				for (var _0x23c5xa = 0; _0x23c5xa < level; _0x23c5xa++) {
					_0x23c5x6 += ''
				};
				_0x23c5x6 += _0x23c5x7 + '</a>', _0x23c5x4 = level
			});
		for (var _0x23c5x9 = 0; _0x23c5x4 >= _0x23c5x9; _0x23c5x9++) {
			_0x23c5x5 += '</ul>', _0x23c5x6 += '</ul>', 0 != _0x23c5x9 && (_0x23c5x5 += '</li>', _0x23c5x6 += '</li>')
		};
		_0x23c5x3('#menu .LinkList')['html'](_0x23c5x6);
		_0x23c5x3('#menu > .LinkList > ul')['attr']('id', 'nav2');
		_0x23c5x3('#nav2')['tinyNav']
			({
				header: 'Main Menu'
			});
		_0x23c5x3('#menu ul li ul')['parent']
			('li')['addClass']('has-sub');
		_0x23c5x3('#menu .widget')['css']('display', 'block');
		_0x23c5x3(this)['find']
			('li')['each']
			(function () {
				var _0x23c5xb = _0x23c5x3(this)['find']
					('ul:first');
				_0x23c5x3(this)['hover']
					(function () {
						_0x23c5xb['stop']
							()['css']
							({
								overflow: 'hidden'
								, height: 'auto'
								, display: 'none'
							})['slideDown']
							(200, function () {
								_0x23c5x3(this)['css']
									({
										overflow: 'visible'
										, height: 'auto'
									})
							})
					}, function () {
						_0x23c5xb['stop']
							()['slideUp']
							(200, function () {
								_0x23c5x3(this)['css']
									({
										overflow: 'hidden'
										, display: 'none'
									})
							})
					})
			})
	});
	_0x23c5x3('#nav1')['tinyNav']({
		header: 'Menu'
	});
	_0x23c5x3('#search-icon')['on']('click', function () {
		_0x23c5x3('#nav-search')['slideToggle'](200)
	});
	_0x23c5x3('.posts-title h2 a')['text'](recentpostsText);
	_0x23c5x3('#related-wrap .title-wrap h2')['text'](relatedTitleText);
	_0x23c5x3('.cmm-title h2')['text'](cmmTitleText);
	_0x23c5x3('.block-image .thumb img, .PopularPosts ul li img')['attr']('src', function (_0x23c5xc, _0x23c5xd) {
		if (_0x23c5xd['match']('hqdefault.jpg')) {
			return _0x23c5xd['replace']('/hqdefault.jpg', '/mqdefault.jpg')
		} else {
			if (_0x23c5xd['match']('default.jpg')) {
				return _0x23c5xd['replace']
					('/default.jpg', '/mqdefault.jpg')
			} else {
				if (_0x23c5xd['match']
					('s72-c')) {
					return _0x23c5xd['replace']
						('/s72-c', '/s1600')
				} else {
					if (_0x23c5xd['match']
						('w72-h72-p-nu')) {
						return _0x23c5xd['replace']
							('/w72-h72-p-nu', '/s1600')
					} else {
						return _0x23c5xd['replace']
							('http://3.bp.blogspot.com/-Yw8BIuvwoSQ/VsjkCIMoltI/AAAAAAAAC4c/s55PW6xEKn0/s1600-r/nth.png', noThumbnail)
					}
				}
			}
		}
	});
	_0x23c5x3('.sidebar > .widget > h2')['wrap']('<div class=\'side-header\'><div class=\'sidehead\'/></div>');
	_0x23c5x3('.PopularPosts .widget-content ul li')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5xe = _0x23c5xc['find']
			('.item-title a')
			, _0x23c5xf = _0x23c5xe['attr']
			('href');
		_0x23c5x3['ajax']
			({
				url: _0x23c5xf
				, type: 'get'
				, success: function (_0x23c5x10) {
					var _0x23c5x11 = _0x23c5x3(_0x23c5x10)['find']
						('.published')['text']
						()
						, _0x23c5x12 = _0x23c5x3(_0x23c5x10)['find']
						('.post-cmm a')['text']
						();
					_0x23c5xe['parent']
						()['after']
						('<div class="item-meta"><span class="item-date">' + _0x23c5x11 + '</span><span class="item-cmm">' + _0x23c5x12 + '</span></div>')
				}
			})
	});
	_0x23c5x3('.avatar-image-container img')['attr']('src', function (_0x23c5xc, _0x23c5xd) {
		if (_0x23c5xd['match']('s35')) {
			return _0x23c5xd['replace']('/s35', '/s45')
		} else {
			return _0x23c5xd['replace']('//img1.blogblog.com/img/blank.gif', '//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s45-r/avatar.png')
		}
	});
	_0x23c5x3('.Label a')['attr']('href', function (_0x23c5xc, _0x23c5x13) {
		return _0x23c5x13['replace'](_0x23c5x13, _0x23c5x13 + '?&max-results=' + labelResults)
	});
	_0x23c5x3('#sidebar-tabs')['each'](function () {
		var _0x23c5x14 = _0x23c5x3('#sidebar-tabs #tab1 .widget > h2')['text']();
		_0x23c5x3('#sidebar-tabs .select-tab .tab1 > span')['text'](_0x23c5x14);
		var _0x23c5x15 = _0x23c5x3('#sidebar-tabs #tab2 .widget > h2')['text']();
		_0x23c5x3('#sidebar-tabs .select-tab .tab2 > span')['text'](_0x23c5x15);
		var _0x23c5x16 = _0x23c5x3('#sidebar-tabs #tab3 .widget > h2')['text']();
		_0x23c5x3('#sidebar-tabs .select-tab .tab3 > span')['text'](_0x23c5x16);
		var _0x23c5x17 = _0x23c5x3('#sidebar-tabs div.tab-widget');
		_0x23c5x17['hide']
			();
		_0x23c5x3('#sidebar-tabs .select-tab')['show']();
		if (_0x23c5x3('#sidebar-tabs #tab1')['hasClass']('no-items')) {
			_0x23c5x3('#sidebar-tabs .select-tab')['hide']()
		};
		_0x23c5x3('#sidebar-tabs .select-tab li:first')['addClass']('active');
		_0x23c5x3('#sidebar-tabs div.tab-widget:first')['show']();
		_0x23c5x3('#sidebar-tabs li.tab')['click'](function () {
			_0x23c5x3('#sidebar-tabs .select-tab li')['removeClass']
				('active');
			_0x23c5x3(this)['addClass']
				('active');
			_0x23c5x17['hide']
				();
			var _0x23c5x18 = _0x23c5x3(this)['attr']
				('data-tab');
			_0x23c5x3(_0x23c5x18)['slideDown']
				();
			return false
		})
	});
	_0x23c5x3('.post-nav')['each'](function () {
		_0x23c5x3('.prev .nav-inner span')['text'](postnavPrevText);
		_0x23c5x3('.prev .nav-inner p')['text'](navPrevMsg);
		_0x23c5x3('.next .nav-inner span')['text'](postnavNextText);
		_0x23c5x3('.next .nav-inner p')['text'](navNextMsg);
		var _0x23c5x19 = _0x23c5x3('a.prev-post')['attr']('href')
			, _0x23c5x1a = _0x23c5x3('a.next-post')['attr']('href');
		_0x23c5x3['ajax']
			({
				url: _0x23c5x19
				, type: 'get'
				, success: function (_0x23c5x1b) {
					var _0x23c5x1c = _0x23c5x3(_0x23c5x1b)['find']
						('.post h1.post-title')['text']
						();
					var _0x23c5x7 = postnavPrevText;
					var _0x23c5x1d = '';
					var _0x23c5x1e = _0x23c5x3(_0x23c5x1b)['find']
						('.post-body img:first')['attr']
						('src');
					if (_0x23c5x1e === undefined) {
						var _0x23c5x1e = noThumbnail
					};
					_0x23c5x1d += '<div class=\'nav-thumb\'><img alt=\'' + _0x23c5x1c + '\' src=\'' + _0x23c5x1e + '\'/></div><div class=\'nav-content\'><span>' + _0x23c5x7 + '</span><p>' + _0x23c5x1c + '</p></div>';
					_0x23c5x3('a.prev-post')['html']
						(_0x23c5x1d)
				}
			});
		_0x23c5x3['ajax']
			({
				url: _0x23c5x1a
				, type: 'get'
				, success: function (_0x23c5x1f) {
					var _0x23c5x1c = _0x23c5x3(_0x23c5x1f)['find']
						('.post h1.post-title')['text']
						();
					var _0x23c5x7 = postnavNextText;
					var _0x23c5x1d = '';
					var _0x23c5x1e = _0x23c5x3(_0x23c5x1f)['find']
						('.post-body img:first')['attr']
						('src');
					if (_0x23c5x1e === undefined) {
						var _0x23c5x1e = noThumbnail
					};
					_0x23c5x1d += '<div class=\'nav-thumb\'><img alt=\'' + _0x23c5x1c + '\' src=\'' + _0x23c5x1e + '\'/></div><div class=\'nav-content\'><span>' + _0x23c5x7 + '</span><p>' + _0x23c5x1c + '</p></div>';
					_0x23c5x3('a.next-post')['html']
						(_0x23c5x1d)
				}
			})
	});
	_0x23c5x3(window)['scroll']
		(function () {
			if (_0x23c5x3(this)['scrollTop']() > 100) {
				_0x23c5x3('.back-top')['css']
					({
						bottom: '25px'
					})
			} else {
				_0x23c5x3('.back-top')['css']
					({
						bottom: '-100px'
					})
			}
		});
	_0x23c5x3('.back-top')['click'](function () {
		_0x23c5x3('html, body')['animate']
			({
				scrollTop: 0
			}, 800);
		return false
	});
	_0x23c5x3('#menu li')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5x7 = _0x23c5xc['find']
			('a')['attr']
			('href')
			, _0x23c5x20 = _0x23c5x7['split']('/')
			, _0x23c5x21 = _0x23c5x20[1];
		_0x23c5x2b(_0x23c5xc, 'mega', 4, _0x23c5x21)
	});
	_0x23c5x3('.ready-widget .HTML .widget-content')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5x7 = _0x23c5xc['text']
			()
			, _0x23c5x20 = _0x23c5x7['split']('/')
			, _0x23c5x22 = _0x23c5x20[0]
			, _0x23c5x21 = _0x23c5x20[1];
		_0x23c5x2b(_0x23c5xc, _0x23c5x7, _0x23c5x22, _0x23c5x21)
	});
	_0x23c5x3('#slider-sec .HTML .widget-content')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5x7 = _0x23c5xc['text']
			()
			, _0x23c5x20 = _0x23c5x7['split']('/')
			, _0x23c5x22 = _0x23c5x20[0]
			, _0x23c5x21 = _0x23c5x20[1];
		_0x23c5x2b(_0x23c5xc, _0x23c5x7, _0x23c5x22, _0x23c5x21)
	});
	_0x23c5x3('.featured-sec .HTML .widget-content')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5x7 = _0x23c5xc['text']
			()
			, _0x23c5x20 = _0x23c5x7['split']('/')
			, _0x23c5x22 = _0x23c5x20[0]
			, _0x23c5x21 = _0x23c5x20[1];
		_0x23c5x2b(_0x23c5xc, _0x23c5x7, _0x23c5x22, _0x23c5x21)
	});
	_0x23c5x3('#related-ready')['each'](function () {
		var _0x23c5xc = _0x23c5x3(this)
			, _0x23c5x21 = _0x23c5xc['text']
			();
		_0x23c5x2b(_0x23c5xc, 'related-posts', 3, _0x23c5x21)
	});
	_0x23c5x3('#HTML205 .widget-content')['each'](function () {
		var _0x23c5x23 = _0x23c5x3(this)['text']
			();
		_0x23c5x3f(_0x23c5x23)
	});

	function _0x23c5x24(_0x23c5x25) {
		var _0x23c5x26 = _0x23c5x25['substring'](0, 4)
			, _0x23c5x27 = _0x23c5x25['substring'](5, 7)
			, _0x23c5x28 = _0x23c5x25['substring'](8, 10)
			, _0x23c5x29 = monthFormat[parseInt(_0x23c5x27, 10)] + ' ' + _0x23c5x28 + ', ' + _0x23c5x26
			, _0x23c5x2a = _0x23c5x29;
		return _0x23c5x2a
	}

	function _0x23c5x2b(_0x23c5xc, _0x23c5x7, _0x23c5x22, _0x23c5x21) {
		var _0x23c5x2c = '';
		if (_0x23c5x7['match']('recent-posts') || _0x23c5x7['match']('recent-comments') || _0x23c5x7['match']('post-per-tag') || _0x23c5x7['match']('mega') || _0x23c5x7['match']('slider-recent') || _0x23c5x7['match']('feat-slider') || _0x23c5x7['match']('small-col-left') || _0x23c5x7['match']('feat-list') || _0x23c5x7['match']('feat1') || _0x23c5x7['match']('feat2') || _0x23c5x7['match']('feat-videos') || _0x23c5x7['match']('feat-grid') || _0x23c5x7['match']('related-posts')) {
			if (_0x23c5x7['match']('recent-posts') || _0x23c5x7['match']('slider-recent')) {
				_0x23c5x2c = '/feeds/posts/default?alt=json-in-script&max-results=' + _0x23c5x22
			} else {
				if (_0x23c5x7['match']('recent-comments')) {
					_0x23c5x2c = '/feeds/comments/default?alt=json-in-script&max-results=' + _0x23c5x22
				} else {
					_0x23c5x2c = '/feeds/posts/default/-/' + _0x23c5x21 + '?alt=json-in-script&max-results=' + _0x23c5x22
				}
			};
			_0x23c5x3['ajax']({
				url: _0x23c5x2c
				, type: 'get'
				, dataType: 'jsonp'
				, success: function (_0x23c5x2d) {
					if (_0x23c5x7['match']
						('recent-posts') || _0x23c5x7['match']
						('post-per-tag')) {
						var _0x23c5x2e = '<ul class="custom-widget">'
					};
					if (_0x23c5x7['match']
						('recent-comments')) {
						var _0x23c5x2e = '<ul class="cmm-widget">'
					};
					if (_0x23c5x7['match']
						('mega')) {
						var _0x23c5x2e = '<ul class="mega-widget">'
					};
					if (_0x23c5x7['match']
						('slider-recent') || _0x23c5x7['match']
						('feat-slider')) {
						var _0x23c5x2e = '<div id="slider" class="main-slider"><ul class="slides">'
					};
					if (_0x23c5x7['match']
						('small-col-left') || _0x23c5x7['match']
						('feat-list')) {
						var _0x23c5x2e = '<ul class="custom-widget small-column">'
					};
					if (_0x23c5x7['match']
						('feat1') || _0x23c5x7['match']
						('feat2')) {
						var _0x23c5x2e = '<ul class="big-column">'
					};
					if (_0x23c5x7['match']
						('feat-videos')) {
						var _0x23c5x2e = '<ul class="main-videos">'
					};
					if (_0x23c5x7['match']
						('feat-grid')) {
						var _0x23c5x2e = '<ul class="post-grid">'
					};
					if (_0x23c5x7['match']
						('related-posts')) {
						var _0x23c5x2e = '<ul class="related-posts">'
					};
					for (var _0x23c5x2f = '', _0x23c5xa = 0, _0x23c5x30 = 'alternate', _0x23c5x31 = _0x23c5x2d['feed']
                            [
                                'entry'
                                ]; _0x23c5xa < _0x23c5x31['length']; _0x23c5xa++) {
						for (var _0x23c5x9 = 0; _0x23c5x9 < _0x23c5x31[_0x23c5xa]
                            [
                                'link'
                                ]
                            [
                                'length'
                                ]; _0x23c5x9++) {
							if (_0x23c5x31[_0x23c5xa]
                                [
                                    'link'
                                    ]
                                [
                                    _0x23c5x9
                                    ]
                                [
                                    'rel'
                                    ] == _0x23c5x30) {
								_0x23c5x2f = _0x23c5x31[_0x23c5xa]
                                    [
                                        'link'
                                        ]
                                    [
                                        _0x23c5x9
                                        ]
                                    [
                                        'href'
                                        ];
								break
							}
						};
						for (var _0x23c5x9 = 0, _0x23c5x32 = 'replies', _0x23c5x33 = 'text/html'; _0x23c5x9 < _0x23c5x31[_0x23c5xa]
                            [
                                'link'
                                ]
                            [
                                'length'
                                ]; _0x23c5x9++) {
							if (_0x23c5x31[_0x23c5xa]
                                [
                                    'link'
                                    ]
                                [
                                    _0x23c5x9
                                    ]
                                [
                                    'rel'
                                    ] == _0x23c5x32 && _0x23c5x31[_0x23c5xa]
                                [
                                    'link'
                                    ]
                                [
                                    _0x23c5x9
                                    ]
                                [
                                    'type'
                                    ] == _0x23c5x33) {
								var _0x23c5x34 = _0x23c5x31[_0x23c5xa]
                                    [
                                        'link'
                                        ]
                                    [
                                        _0x23c5x9
                                        ]
                                    [
                                        'title'
                                        ]
                                    [
                                        'split'
                                        ]
									(' ')[0];
								break
							}
						};
						var _0x23c5x35 = _0x23c5x31[_0x23c5xa]
                            [
                                'published'
                                ]
                            [
                                '$t'
                                ]
							, _0x23c5x6 = _0x23c5x31[_0x23c5xa]
                            [
                                'content'
                                ]
                            [
                                '$t'
                                ]
							, _0x23c5x36 = _0x23c5x3('<div>')['html']
							(_0x23c5x6);
						if (_0x23c5x6['indexOf']
							('youtube.com/embed') > -1) {
							var _0x23c5x37 = _0x23c5x31[_0x23c5xa]
                                [
                                    'media$thumbnail'
                                    ]
                                [
                                    'url'
                                    ]
								, _0x23c5x38 = _0x23c5x37['replace']
								('/default.jpg', '/mqdefault.jpg')
								, _0x23c5x39 = _0x23c5x38
						} else {
							if (_0x23c5x6['indexOf']
								('<img') > -1) {
								var _0x23c5x3a = _0x23c5x36['find']
									('img:first')['attr']
									('src')
									, _0x23c5x39 = _0x23c5x3a
							} else {
								var _0x23c5x39 = noThumbnail
							}
						};
						var _0x23c5x4 = '';
						if (_0x23c5x7['match']
							('slider-recent') || _0x23c5x7['match']
							('feat-slider')) {
							if (_0x23c5xc['parent']
								()['addClass']
								('show-slider')) {
								_0x23c5x4 += '<li><a class="slider-img" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'title'
                                        ]
                                    [
                                        '$t'
                                        ] + '" src="' + _0x23c5x39 + '"/><span class="overlay"/></a><div class="slider-entry"><a class="post-category" href="/search/label/' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'category'
                                        ]
                                    [
                                        0
                                        ]
                                    [
                                        'term'
                                        ] + '?max-results=7">' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'category'
                                        ]
                                    [
                                        0
                                        ]
                                    [
                                        'term'
                                        ] + '</a><h1 class="post-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'title'
                                        ]
                                    [
                                        '$t'
                                        ] + '</a></h1><div class="slide-cap"><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></div></li>'
							}
						} else {
							if (_0x23c5x7['match']
								('mega')) {
								_0x23c5x4 += '<div class="mega-item"><div class="mega-content"><a class="mega-img" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'title'
                                        ]
                                    [
                                        '$t'
                                        ] + '" src="' + _0x23c5x39 + '"/></a><h3 class="mega-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                    [
                                        'title'
                                        ]
                                    [
                                        '$t'
                                        ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></div>'
							} else {
								if (_0x23c5x7['match']
									('small-col-left') || _0x23c5x7['match']
									('feat-list')) {
									if (_0x23c5x7['match']
										('small-col-left')) {
										_0x23c5xc['parent']
											()['addClass']
											('show-widget column col-left')
									} else {
										if (_0x23c5x7['match']
											('feat-list')) {
											_0x23c5xc['parent']
												()['addClass']
												('show-widget column col-right')
										}
									};
									_0x23c5x4 += '<li><a class="custom-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                        [
                                            'title'
                                            ]
                                        [
                                            '$t'
                                            ] + '" src="' + _0x23c5x39 + '"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                        [
                                            'title'
                                            ]
                                        [
                                            '$t'
                                            ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></li>'
								} else {
									if (_0x23c5x7['match']
										('feat1') || _0x23c5x7['match']
										('feat2')) {
										if (_0x23c5x7['match']
											('feat1')) {
											_0x23c5xc['parent']
												()['addClass']
												('show-widget column col-left')
										} else {
											if (_0x23c5x7['match']
												('feat2')) {
												_0x23c5xc['parent']
													()['addClass']
													('show-widget column col-right')
											}
										};
										if (_0x23c5xa == 0) {
											_0x23c5x4 += '<li class="first-big"><a class="col-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '" src="' + _0x23c5x39 + '"/></a><div class="post-panel"><a class="post-category" href="/search/label/' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'category'
                                                    ]
                                                [
                                                    0
                                                    ]
                                                [
                                                    'term'
                                                    ] + '?max-results=7">' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'category'
                                                    ]
                                                [
                                                    0
                                                    ]
                                                [
                                                    'term'
                                                    ] + '</a><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div><p class="col-snippet">' + _0x23c5x36['text']
												()['substr']
												(0, 115) + '...</p></div></li>'
										} else {
											_0x23c5x4 += '<li><a class="col-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '" src="' + _0x23c5x39 + '"/></a><div class="post-panel"><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></li>'
										}
									} else {
										if (_0x23c5x7['match']
											('feat-videos')) {
											if (_0x23c5xc['parent']
												()['addClass']
												('show-widget videos-widget')) {};
											_0x23c5x4 += '<li class="video-item"><div class="video-content"><a class="video-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '" src="' + _0x23c5x39 + '"/><span class="overlay"/></a><div class="vid-dit"><a class="post-category" href="/search/label/' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'category'
                                                    ]
                                                [
                                                    0
                                                    ]
                                                [
                                                    'term'
                                                    ] + '?max-results=7">' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'category'
                                                    ]
                                                [
                                                    0
                                                    ]
                                                [
                                                    'term'
                                                    ] + '</a><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                [
                                                    'title'
                                                    ]
                                                [
                                                    '$t'
                                                    ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></div></li>'
										} else {
											if (_0x23c5x7['match']
												('feat-grid')) {
												if (_0x23c5xc['parent']
													()['addClass']
													('show-widget grid-widget')) {};
												_0x23c5x4 += '<li class="grid-item"><div class="grid-content"><a class="grid-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                    [
                                                        'title'
                                                        ]
                                                    [
                                                        '$t'
                                                        ] + '" src="' + _0x23c5x39 + '"/><span class="featured-overlay"></span></a><div class="grid-info-con"><a class="post-category" href="/search/label/' + _0x23c5x31[_0x23c5xa]
                                                    [
                                                        'category'
                                                        ]
                                                    [
                                                        0
                                                        ]
                                                    [
                                                        'term'
                                                        ] + '?max-results=7">' + _0x23c5x31[_0x23c5xa]
                                                    [
                                                        'category'
                                                        ]
                                                    [
                                                        0
                                                        ]
                                                    [
                                                        'term'
                                                        ] + '</a><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                    [
                                                        'title'
                                                        ]
                                                    [
                                                        '$t'
                                                        ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></div></li>'
											} else {
												if (_0x23c5x7['match']
													('recent-posts') || _0x23c5x7['match']
													('post-per-tag')) {
													_0x23c5x4 += '<li><a class="custom-thumb" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                        [
                                                            'title'
                                                            ]
                                                        [
                                                            '$t'
                                                            ] + '" src="' + _0x23c5x39 + '"/><span class="featured-overlay"></span></a><div class="post-panel"><h3 class="rcp-title"><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                        [
                                                            'title'
                                                            ]
                                                        [
                                                            '$t'
                                                            ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></li>'
												} else {
													if (_0x23c5x7['match']
														('recent-comments')) {
														if ('content' in _0x23c5x31[_0x23c5xa]) {
															var _0x23c5x3b = _0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'content'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ]
														} else {
															if ('summary' in b_rc) {
																var _0x23c5x3b = _0x23c5x31[_0x23c5xa]
                                                                    [
                                                                        'summary'
                                                                        ]
                                                                    [
                                                                        '$t'
                                                                        ]
															} else {
																var _0x23c5x3b = ''
															}
														};
														var _0x23c5x3c = /<\S[^>]*>/g;
														_0x23c5x3b = _0x23c5x3b['replace']
															(_0x23c5x3c, ''), _0x23c5x3b['length'] > 90 && (_0x23c5x3b = '' + _0x23c5x3b['substring']
																(0, 70));
														var _0x23c5x3d = _0x23c5x31[_0x23c5xa]
                                                            [
                                                                'author'
                                                                ]
                                                            [
                                                                0
                                                                ]
                                                            [
                                                                'gd$image'
                                                                ]
                                                            [
                                                                'src'
                                                                ];
														if (_0x23c5x3d['match']
															('http://img1.blogblog.com/img/blank.gif')) {
															var _0x23c5x3e = 'http://4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png'
														} else {
															if (_0x23c5x3d['match']
																('http://img2.blogblog.com/img/b16-rounded.gif')) {
																var _0x23c5x3e = 'http://4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png'
															} else {
																var _0x23c5x3e = _0x23c5x3d
															}
														};
														_0x23c5x4 += '<li><a class="cmm-avatar" href="' + _0x23c5x2f + '"><img class="cmm-img" src="' + _0x23c5x3e + '" alt="' + (_0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'title'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ], _0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'author'
                                                                    ]
                                                                [
                                                                    0
                                                                    ]
                                                                [
                                                                    'name'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ]) + '"/></a><a href="' + _0x23c5x2f + '">' + (_0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'title'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ], _0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'author'
                                                                    ]
                                                                [
                                                                    0
                                                                    ]
                                                                [
                                                                    'name'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ]) + '</a><span class="cmm-text">' + _0x23c5x3b + '...</span></li>'
													} else {
														_0x23c5x7['match']
															('related-posts') && (_0x23c5x4 += '<li class="related-item"><div class="related-thumb"><a class="related-img" href="' + _0x23c5x2f + '"><img class="my-thumb" alt="' + _0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'title'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ] + '" src="' + _0x23c5x39 + '"/></a></div><div class="related-content"><h3><a href="' + _0x23c5x2f + '">' + _0x23c5x31[_0x23c5xa]
                                                                [
                                                                    'title'
                                                                    ]
                                                                [
                                                                    '$t'
                                                                    ] + '</a></h3><div class="item-meta"><span class="item-date">' + _0x23c5x24(_0x23c5x35) + '</span><span class="item-cmm">' + _0x23c5x34 + '</span></div></div></li>')
													}
												}
											}
										}
									}
								}
							}
						};
						_0x23c5x2e += _0x23c5x4
					};
					if (_0x23c5x7['match']
						('slider-recent') || _0x23c5x7['match']
						('feat-slider')) {
						_0x23c5x2e += '</ul></div>'
					} else {
						_0x23c5x2e += '</ul>'
					};
					if (_0x23c5x7['match']
						('mega')) {
						_0x23c5xc['addClass']
							('has-sub mega-menu')['append']
							(_0x23c5x2e);
						_0x23c5x3('#menu li.mega-menu')['each']
							(function () {
								var _0x23c5xb = _0x23c5x3(this)['find']
									('ul');
								_0x23c5x3(this)['hover']
									(function () {
										_0x23c5xb['stop']
											()['css']
											({
												overflow: 'hidden'
												, height: 'auto'
												, display: 'none'
											})['slideDown']
											(200, function () {
												_0x23c5x3(this)['css']
													({
														overflow: 'visible'
														, height: 'auto'
													})
											})
									}, function () {
										_0x23c5xb['stop']
											()['slideUp']
											(200, function () {
												_0x23c5x3(this)['css']
													({
														overflow: 'hidden'
														, display: 'none'
													})
											})
									})
							});
						_0x23c5x3('#menu li.mega-menu > a')['attr']
							('href', function (_0x23c5xc, _0x23c5x13) {
								return _0x23c5x13['replace']
									(_0x23c5x13, '/search/label/' + _0x23c5x21 + '?&max-results=' + labelResults)
							})
					} else {
						_0x23c5xc['html']
							(_0x23c5x2e)
					};
					if (_0x23c5x7['match']
						('small-col-left') || _0x23c5x7['match']
						('feat-list') || _0x23c5x7['match']
						('feat1') || _0x23c5x7['match']
						('feat2') || _0x23c5x7['match']
						('feat-videos') || _0x23c5x7['match']
						('feat-grid')) {
						_0x23c5xc['prev']
							('h2')['html']
							('<a href=\'/search/label/' + _0x23c5x21 + '?&max-results=' + labelResults + '\'>' + _0x23c5xc['prev']
								('h2')['text']
								() + '</a>'), _0x23c5xc['prev']
							('h2')['wrap']
							('<div class=\'title-head\'><div class=\'title-wrapper\'/></div>')
					};
					_0x23c5x3('.my-thumb')['attr']
						('src', function (_0x23c5xc, _0x23c5xd) {
							return _0x23c5xd['replace']
								('s72-c', 's1600')
						});
					_0x23c5x3('.main-slider')['flexslider']
						({
							controlNav: false
							, pauseOnAction: false
							, pauseOnHover: true
							, animation: 'fade'
							, useCSS: false
							, animationSpeed: 800
							, slideshowSpeed: 4500
							, prevText: '<i class="fa fa-caret-left"></i>'
							, nextText: '<i class="fa fa-caret-right"></i>'
						})
				}
			})
		}
	}

	function _0x23c5x3f(_0x23c5x23) {
		if (_0x23c5x23['match']
			('blogger') || _0x23c5x23['match']
			('disqus') || _0x23c5x23['match']
			('facebook') || _0x23c5x23['match']
			('blogger-disqus') || _0x23c5x23['match']
			('blogger-facebook') || _0x23c5x23['match']
			('disqus-facebook') || _0x23c5x23['match']
			('blogger-disqus-facebook')) {
			_0x23c5x3('#comments')['wrap']('<div class=\'comment-system\'/>');
			if (_0x23c5x23['match']('disqus') || _0x23c5x23['match']('blogger-disqus') || _0x23c5x23['match']('disqus-facebook') || _0x23c5x23['match']('blogger-disqus-facebook')) {
				var _0x23c5x40 = disqus_blogger_current_url;
				(function () {
					var _0x23c5x41 = document['createElement']
						('script');
					_0x23c5x41['type'] = 'text/javascript';
					_0x23c5x41['async'] = true;
					_0x23c5x41['src'] = '//' + disqus_shortname + '.disqus.com/embed.js';
					(document['getElementsByTagName']
						('head')[0] || document['getElementsByTagName']
						('body')[0])['appendChild'](_0x23c5x41)
				})()
			};
			var _0x23c5x42 = '';
			var _0x23c5x43 = '';
			var _0x23c5x44 = _0x23c5x3(location)['attr']('href');
			var _0x23c5x45 = '<div id=\'disqus_thread\'/>';
			var _0x23c5x46 = '<div class=\'fb-comments\' data-width=\'100%\' data-href=\'' + _0x23c5x44 + '\' data-numposts=\'5\'></div>';
			if (_0x23c5x23['match']('blogger-disqus-facebook')) {
				_0x23c5x43 += '<div class=\'select-tab\'><li class=\'tab active\' data-tab=\'#cmm1\'><span>' + cmmBloggerText + '</span></li><li class=\'tab\' data-tab=\'#cmm2\'><span>' + cmmDisqusText + '</span></li><li class=\'tab\' data-tab=\'#cmm3\'><span>' + cmmFaceText + '</span></li></div>';
				_0x23c5x3('.comment-system #comments')['show']()['wrap']
					('<div id=\'cmm1\' class=\'cmm-tab\'/>');
				_0x23c5x42 += '<div id=\'cmm2\' class=\'cmm-tab\'>' + _0x23c5x45 + '</div><div id=\'cmm3\' class=\'cmm-tab\'>' + _0x23c5x46 + '</div>'
			} else {
				if (_0x23c5x23['match']('blogger-disqus')) {
					_0x23c5x43 += '<div class=\'select-tab\'><li class=\'tab active\' data-tab=\'#cmm1\'><span>' + cmmBloggerText + '</span></li><li class=\'tab\' data-tab=\'#cmm2\'><span>' + cmmDisqusText + '</span></li></div>';
					_0x23c5x3('.comment-system #comments')['show']()['wrap']('<div id=\'cmm1\' class=\'cmm-tab\'/>');
					_0x23c5x42 += '<div id=\'cmm2\' class=\'cmm-tab\'>' + _0x23c5x45 + '</div>'
				} else {
					if (_0x23c5x23['match']('blogger-facebook')) {
						_0x23c5x43 += '<div class=\'select-tab\'><li class=\'tab active\' data-tab=\'#cmm1\'><span>' + cmmBloggerText + '</span></li><li class=\'tab\' data-tab=\'#cmm2\'><span>' + cmmFaceText + '</span></li></div>';
						_0x23c5x3('.comment-system #comments')['show']
							()['wrap']
							('<div id=\'cmm1\' class=\'cmm-tab\'/>');
						_0x23c5x42 += '<div id=\'cmm2\' class=\'cmm-tab\'>' + _0x23c5x46 + '</div>'
					} else {
						if (_0x23c5x23['match']
							('disqus-facebook')) {
							_0x23c5x43 += '<div class=\'select-tab\'><li class=\'tab active\' data-tab=\'#cmm1\'><span>' + cmmDisqusText + '</span></li><li class=\'tab\' data-tab=\'#cmm2\'><span>' + cmmFaceText + '</span></li></div>';
							_0x23c5x3('.comment-system #comments')['remove']
								();
							_0x23c5x42 += '<div id=\'cmm1\' class=\'cmm-tab\'>' + _0x23c5x45 + '</div><div id=\'cmm2\' class=\'cmm-tab\'>' + _0x23c5x46 + '</div>'
						} else {
							if (_0x23c5x23['match']
								('disqus')) {
								_0x23c5x3('.comment-system #comments')['remove']
									();
								_0x23c5x42 += _0x23c5x45
							} else {
								if (_0x23c5x23['match']
									('facebook')) {
									_0x23c5x3('.comment-system #comments')['remove']
										();
									_0x23c5x42 += _0x23c5x46
								} else {
									if (_0x23c5x23['match']
										('blogger')) {
										_0x23c5x3('#comments')['show']
											()
									}
								}
							}
						}
					}
				}
			};
			_0x23c5x3('.comment-system')['append'](_0x23c5x42);
			_0x23c5x3('.cmm-title')['append'](_0x23c5x43);
			_0x23c5x3('.comment-system')['each'](function () {
				var _0x23c5x47 = _0x23c5x3('.comment-system div.cmm-tab');
				_0x23c5x47['hide']
					();
				_0x23c5x3('.comment-system')['show']
					();
				_0x23c5x3('.cmm-title .select-tab li:first')['addClass']
					('active');
				_0x23c5x3('.comment-system div.cmm-tab:first')['show']
					();
				_0x23c5x3('.cmm-title .select-tab li.tab')['click']
					(function () {
						_0x23c5x3('.cmm-title .select-tab li')['removeClass']
							('active');
						_0x23c5x3(this)['addClass']
							('active');
						_0x23c5x47['hide']
							();
						var _0x23c5x48 = _0x23c5x3(this)['attr']
							('data-tab');
						_0x23c5x3(_0x23c5x48)['slideDown']
							();
						return false
					})
			})
		} else {
			_0x23c5x3('#comments')['show']()
		}
	}
});
