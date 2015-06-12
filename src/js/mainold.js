define([
    'jquery',
    'reqwest',
    'jquery.waypoints.min.js',
    'json!data/sampleData.json',
    'text!templates/appTemplate.html',
    'sticky.js'
], function(
    $,
    reqwest,
    waypoints,
    sampleData,
    templateHTML,
    sticky
) {
   'use strict';

    function init(el) {

        var passages =[];
        var baseurl = "http://interactive.guim.co.uk/2015/jun/magnacarta/";
        var langselection = "latin";
        var closest = 0;
        var thingtoload = "";
        var closest_dist = null;
        var msperc = 0;
        var clickevent = 0;

        



        // DOM template example
        el.innerHTML = templateHTML;

        // Load remote JSON data

        function logResponse(resp) {
        //console.log(resp);
        passages = resp.sheets.Sheet2;
        }

        function handleRequestError(err, msg) {
        console.error('Failed: ', err, msg);
        }

        function afterRequest(resp) {
        //console.log('Finished', resp);
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

                var waypoint = new Waypoint({
                element: $('#lightbox'),
                handler: function sticktobottom (direction) {
                $('#lightbox').addClass('basement');
                alert('100%')
                },
                offset:'100%'
                });
                

                function loadtext (){
                    var imageheight = $('#manuscript').height();
                    //console.log(imageheight);

                    $('#lightboxtext').text(thingtoload);
                    $('#lightboxtitle').text(passages[closest].clause);
                    var itemY = (imageheight * passages[closest].ofy);
                    console.log(itemY);
                    $('#lightbox').css({
                        display: 'block',
                        //top: (itemY + 40)
                        });

                    $('#manuscriptoverlay').css({
                        display: 'block'
                     });

                    if (passages[closest].commentary.length > 0) {
                        $('#commentary').text(passages[closest].commentary);
                    }
                };

                function getnearest () {
                    jQuery.each(passages, function(passage, object) {
                        var dist = Math.abs(msperc - object.ofy);
                        if (closest === null || dist < closest_dist) {
                                closest = passage;
                                closest_dist = dist;
                                } else {
                                //console.log(passages[closest]);
                                    return passages[closest];   
                                }
                      })                             
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


                /*var clauseEl = $('<div></div>').html(clause14);
                var chunk = clauseEl.find(correctchunk);
                $('#rawtext').append(chunk);
                */

                $('#manuscript').click(function(e) {
                    clickevent = e;
                    var rawposX = $(this).offset().left,
                        rawposY = $(this).offset().top;
                    var posX = e.pageX - rawposX,
                        posY = e.pageY - rawposY;
                    var rect = this.getBoundingClientRect();
                    msperc = posY / rect.height;
                    /*console.log(posY);
                    console.log(rect.height);
                    console.log(msperc);
                    */
                    getnearest();
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
                    //posY = 0;
                    //rawposY = 0;
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
