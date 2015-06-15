define([
    'jquery',
    'reqwest',
    'text!templates/appTemplate.html',
    'jquery.ba-throttle-debounce.min.js'
], function(
    $,
    reqwest,
    templateHTML,
    debounce
) {
   'use strict';

    function init(el) {
        var passages = [];
        // DOM template example
        el.innerHTML = templateHTML;

        function handleRequestError(err, msg) {
        console.error('Failed: ', err, msg);
        }
        
        var jsonkey = '1CmhjsI2XrssXhn2PwI8TTN056hmpw_nrG7A2cqKn7u4';
        var jsonurl = 'http://interactive.guim.co.uk/spreadsheetdata/'+jsonkey+'.json';

        reqwest({
            url: jsonurl,
            type: 'json',
            crossOrigin: true
        })
        .fail(handleRequestError)
        .always(afterRequest);
    
        function afterRequest(resp){
        //start fiddling
            passages = resp.sheets.Sheet2;
            console.log(passages);
            var currentpassage = passages[0];
            var langselection = "english";
            var closest = 0;
            var thingtoload = "";
            var msperc = 0;
            var clickevent = 0;
            var textpos = $('#manuscript').offset().top + 150;
            var lightboxpos = textpos + 150;
            var mobile = false;
            console.log($(window).width());

            if ($(window).width() < 400) {
                mobile = true;
                console.log(mobile)
            };

            function getViewportOffset($e) {
                    var $window = $(window),
                    scrollTop = $window.scrollTop(),
                    offset = $e.offset();
                     return {
                    scrollTop: scrollTop,
                    top: offset.top - scrollTop
                  };
                }

                if (mobile) {
                    //don't check for scroll
                    changelanguage();
                    loadtext();
                   
                } else {

                $(window).resize(checkscroll);

                $(window).scroll($.throttle(200, checkscroll));
                    //$(window).scroll(checkscroll);
                }

                function checkscroll() 
                     {
                      var viewportOffset = getViewportOffset($("#manuscript"));
                      $("#log").text("scrollTop: " + viewportOffset.scrollTop + ", top: " + viewportOffset.top + "textpos: " + textpos);
                        var manuscriptscrollpercent = Math.abs(viewportOffset.top) / $('#manuscript').height();
                        var manuscriptscroll = (viewportOffset.top > 0) ? 0 : manuscriptscrollpercent;
                       
                        //now do stuff
                        getnearest(manuscriptscroll);
                        changelanguage();
                        loadtext();
                        };

                function loadtext (){

                    $('#commentary, #commentary-toggle-on, #commentary-toggle-off').css('display','none');

                   
                    textpos = (currentpassage.ofy * $('#manuscript').height()); 
                    lightboxpos = textpos + 75;
                    

                    //add and style lightbox elements
                    $('#lightboxtext').css({
                        'background-color': 'white'
                    });
                    $('#lightboxtext' ).unbind( "click" );
                    $('#lightboxtext').text(thingtoload);
                    $('#lightboxtitle').text(currentpassage.clause);
                    
                    // desktop
                    $('#lightbox').css({
                        display: 'block',
                        top: lightboxpos +'px'
                        });

                    $('#lightboxtext').css('display','block')

                    if (currentpassage.passage > 57) {
                        $('#lightbox').removeClass('lastfew');
                        $('#lightbox').addClass('lastfew');
                    }else{
                        $('#lightbox').removeClass('lastfew');
                    }


                    $('#lightboxtext').css({
                        'background-color': 'none'
                    });
                    $('#manuscriptoverlay').css({
                        display: 'block'
                     });
                    
                    //check for pointless next previous buttons
                    if (currentpassage.passage == 57) {
                        $('#next').css({display: 'none'});
                    } else if (currentpassage.passage == 0) {
                        $('#prev').css({display: 'none'});
                    } else {
                        $('#prev').css({display: 'inline-block'});
                        $('#next').css({display: 'inline-block'});
                    };

                    //check for commentary
                    if (currentpassage.commentary.length > 0) {
                        addCommentary();
                    } else {
                        $('#commentary').css({
                            display: 'none',
                        });
                    };

                   
                };





                function addCommentary() {
                    $('#commentary').text(currentpassage.commentary);
                    $('#lightboxtext').css({
                        'background-color': '#fff200'
                    });
                    $('#commentary-toggle-on').css('display','block');

                    $('#lightboxtext, #commentary-toggle-on').click(function(e) {
                        e.stopPropagation();
                        $('#lightboxtext').css({
                            display: 'none',
                        }); 
                        $('#commentary').css({
                            display: 'block',
                        });
                        $('#commentary-toggle-on').css('display','none');
                        $('#commentary-toggle-off').css('display','block');

                    });

                    $('#commentary, #commentary-toggle-off').click(function(e) {
                        e.stopPropagation();
                       $('#lightboxtext').css({
                            display: 'block',
                        });

                        $('#commentary').css({
                            display: 'none',
                        });
                        $('#commentary-toggle-off').css('display','none');
                        $('#commentary-toggle-on').css('display','block');
                      
                      });


                    // $('#commentary-toggle').click(function(e) {
                    //     e.stopPropagation();
                    //     $('#lightboxtext').css({
                    //         display: 'none',
                    //     }); 
                    //     $('#commentary').css({
                    //         display: 'block',
                    //     });
                    //     $('#commentary-toggle-off').text('Hide commentary');

                    // });

                    // $('#commentary-toggle-off').click(function(e) {
                    //     e.stopPropagation();
                    //    $('#lightboxtext').css({
                    //         display: 'block',
                    //     });
                    //     $('#commentary').css({
                    //         display: 'none',
                    //     });
                    //     $('#commentary-toggle-on').text('Show commentary');
                      
                    //   });


                };




                function getnearest (anchor) {
                    var sortedObjects = passages.sort(function(a,b) { 
                        return Math.abs(anchor - a.ofy) - Math.abs(anchor - b.ofy); 
                    })
                    currentpassage = passages[0];
                    return currentpassage;
                };


                function changelanguage () {
                    switch (langselection){
                        case "latin": 
                            thingtoload = currentpassage.latin;
                            break;
                        case "english":
                            thingtoload = currentpassage.english;
                            break;
                };}

                $('.chooser').click(function(e) {
                    e.stopPropagation();
                    langselection = this.id;
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    changelanguage();
                    loadtext();
                });

                 $('.nav').click(function(e) {
                    e.stopPropagation();
                    console.log(this.id);
                    var realindex = currentpassage.passage;
                    var propersort = passages.sort(function(a,b) { 
                        return a.passage - b.passage; 
                    });
                    if (this.id == 'next') {
                        var newindex = realindex+1;
                    } else if (this.id == 'prev') {
                        var newindex = realindex-1;
                    };
                    //probably want to change this
                    console.log(newindex);
                    currentpassage = passages[newindex];
                    console.log(currentpassage.clause)
                    changelanguage();
                    loadtext();
                });

            }
    }

    return {
        init: init
    };
});
