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

        var passages =[];
        var currentpassage;
        var baseurl = "http://interactive.guim.co.uk/2015/jun/magnacarta/";
        var langselection = "english";
        var closest = 0;
        var thingtoload = "";
        var msperc = 0;
        var clickevent = 0;
        // DOM template example
        el.innerHTML = templateHTML;

        // Load remote JSON data

        function logResponse(resp) {

        passages = resp.sheets.Sheet2;
        }

        function handleRequestError(err, msg) {
        console.error('Failed: ', err, msg);
        }

        function afterRequest(resp) {
      
        }
        var jsonkey = '1CmhjsI2XrssXhn2PwI8TTN056hmpw_nrG7A2cqKn7u4';
        var jsonurl = 'http://interactive.guim.co.uk/spreadsheetdata/'+jsonkey+'.json';

        reqwest({
            url: jsonurl,
            type: 'json',
            crossOrigin: true
        })
        .then(logResponse)
        .fail(handleRequestError)
        .always(afterRequest);
    

        //start fiddling
                //vars that need the content
                var textpos = $('#manuscript').offset().top + 150;
                var lightboxpos = textpos + 150;


                 function getViewportOffset($e) {
                    var $window = $(window),
                    scrollTop = $window.scrollTop(),
                    offset = $e.offset();
                     return {
                    scrollTop: scrollTop,
                    top: offset.top - scrollTop
                  };
                }

                $(window).resize(checkscroll);

                $(window).scroll($.throttle(200, checkscroll));
                    //$(window).scroll(checkscroll);

                function checkscroll() 
                     {
                      var viewportOffset = getViewportOffset($("#manuscript"));
                      $("#log").text("scrollTop: " + viewportOffset.scrollTop + ", top: " + viewportOffset.top + "textpos: " + textpos);
                        //var currentquarter = 1;
                       var manuscriptscrollpercent = Math.abs(viewportOffset.top) / $('#manuscript').height();
                        var manuscriptscroll = (viewportOffset.top > 0) ? 0 : manuscriptscrollpercent;
                        /*if (manuscriptscroll > .1 && manuscriptscroll < .25) {currentquarter=2}
                            else if (manuscriptscroll >.25 && manuscriptscroll <.5) {currentquarter = 3}
                            else if (manuscriptscroll >.5) {currentquarter = 4}
                            else {currentquarter = 1};*/
                        //now do stuff
                        getnearest(manuscriptscroll);
                        changelanguage();
                        loadtext();
                        };

                function loadtext (){
                    
                    //reset anchor location for lightbox
                    //console.log(textpos);
                    console.log($('#manuscript').height());
                    console.log($('#manuscript').offset().top);

                    textpos = (currentpassage.ofy * $('#manuscript').height()); 
                    lightboxpos = textpos + 150;

                    //add and style lightbox elements
                    $('#lightboxtext').css({
                        'background-color': 'white'
                    });
                    $('#lightboxtext' ).unbind( "click" );
                    $('#lightboxtext').text(thingtoload);
                    $('#lightboxtitle').text(currentpassage.clause);
                    $('#lightbox').css({
                        display: 'block',
                        top: lightboxpos +'px'
                        });
                    $('#lightboxtext').css({
                        'background-color': 'none'
                    });
                    $('#manuscriptoverlay').css({
                        display: 'block'
                     });
                    
                    //check for pointless next previous buttons
                    if (currentpassage.passage == 62) {
                        $('#next').css({display: 'none'});
                    } else if (currentpassage.passage == 0) {
                        $('#prev').css({display: 'none'});
                    } else {
                        $('#prev').css({display: 'block'});
                        $('#next').css({display: 'block'});
                    };

                    //check for commentary
                    if (currentpassage.commentary.length > 0) {
                        addCommentary();
                    };

                };

                function addCommentary() {
                    $('#lightboxtext').css({
                        'background-color': 'yellow'
                    });
                    $('#lightboxtext').click(function(e) {
                        e.stopPropagation();
                        $('#lightboxtext').text(currentpassage.commentary);
                    });
                      
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
                        case "commentary":
                            thingtoload = currentpassage.commentary;
                            break;
                };}




                $('#manuscript').click(function(e) {
                    clickevent = e;
                    var rawposX = $(this).offset().left,
                        rawposY = $(this).offset().top;
                    var posX = e.pageX - rawposX,
                        posY = e.pageY - rawposY;
                    var rect = this.getBoundingClientRect();
                    msperc = posY / rect.height;
                    getnearest(msperc);
                    changelanguage();
                    loadtext();
                });
 
                $('#manuscriptoverlay').click(function() {
                    $('#manuscriptoverlay').css({
                        display: 'none'
                    });
                    $('#lightbox').css({
                        display: 'none'
                    });
                    $('#lightboxtext').html("");
                    clickevent = 0;
                    closest = null;
                });


                $('#lightbox').click(function() {
                    $('#manuscriptoverlay').css({
                        display: 'none'
                    });
                    $('#lightbox').css({
                        display: 'none'
                    });
                });

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

    return {
        init: init
    };
});
