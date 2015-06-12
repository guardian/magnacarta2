define([
    'jquery',
    'reqwest',
    'jquery.waypoints.min.js',
    'json!data/sampleData.json',
    'text!templates/appTemplate.html',
    'sticky.js',
    'jquery.ba-throttle-debounce.min.js'
], function(
    $,
    reqwest,
    waypoints,
    sampleData,
    templateHTML,
    sticky,
    debounce
) {
   'use strict';

    function init(el) {

        var passages =[];
        var baseurl = "http://interactive.guim.co.uk/2015/jun/magnacarta/";
        var langselection = "english";
        var closest = 0;
        var thingtoload = "";
        var diff =10000;
        var smallestdiff = 3000;
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

                 function getViewportOffset($e) {
                    var $window = $(window),
                    scrollTop = $window.scrollTop(),
                    offset = $e.offset();
                     return {
                    scrollTop: scrollTop,
                    top: offset.top - scrollTop
                  };
                }

                    $(window).scroll($.throttle(700, checkscroll));
                    //$(window).scroll(checkscroll);

                    function checkscroll() 
                     {
                      var viewportOffset = getViewportOffset($("#manuscript"));
                      $("#log").text("scrollTop: " + viewportOffset.scrollTop + ", top: " + viewportOffset.top + "nearest passage" + passages[closest].clause);
                        var currentquarter = 1;
                        var manuscriptscrollpercent = Math.abs(viewportOffset.top) / $('#manuscript').height();
                        var manuscriptscroll = (viewportOffset.top > 0) ? 0 : manuscriptscrollpercent;
                        if (manuscriptscroll > .1 && manuscriptscroll < .25) {currentquarter=2}
                            else if (manuscriptscroll >.25 && manuscriptscroll <.5) {currentquarter = 3}
                            else if (manuscriptscroll >.5) {currentquarter = 4}
                            else {currentquarter = 1};
                        getnearest(manuscriptscroll);
//                        console.log("dist: " + dist + "closest_dist: " + closest_dist);
                        console.log(passages[closest].clause);
                        changelanguage();
                        loadtext();
                        };

                function loadtext (){
                    
                    $('#lightboxtext').text(thingtoload);
                    $('#lightboxtitle').text(passages[closest].clause);
                    $('#lightbox').css({
                        display: 'block',
                        });
                    $('#manuscriptoverlay').css({
                        display: 'block'
                     });
                    //$('#commentary').text(passages[closest].commentary);                  
                };

                function getnearest (anchor) {
                        console.log("passed value for anchor" + anchor);
                    var sortedObjects = passages.sort(function(a,b) { 
                        return Math.abs(anchor - a.ofy) - Math.abs(anchor - b.ofy); 
                    })
                    console.log(sortedObjects[0].clause);
                    // jQuery.each(passages, function(passage, object) {
                    //     var diff = Math.abs(anchor - object.ofy);
                    //     //console.log(object.clause + " anchor - " + anchor + " ofy: " + object.ofy + " = " + smallestdiff);
                    //     //console.log("closest: " + closest);
                    //     if (diff < smallestdiff) {
                    //         console.log("diff: " + diff + "smallestdiff: " + smallestdiff);
                    //             closest = passage;
                    //             smallestdiff = diff;
                    //             } else {
                    //                 diff = 3000;
                    //                 return passages[closest];   
                    //             }
                    //   })                             
                };


                function changelanguage () {
                    switch (langselection){
                        case "latin": 
                            thingtoload = passages[closest].latin;
                            break;
                        case "english":
                            thingtoload = passages[closest].english;
                            break;
                        case "commentary":
                            thingtoload = passages[closest].commentary;
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
                    if (this.id = 'next') {
                        passages[closest++];
                    } else {
                        passages[closest--];
                    }
                    changelanguage();
                    loadtext();
                });


    }

    return {
        init: init
    };
});
