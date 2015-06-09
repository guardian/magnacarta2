define([
    'jquery',
    'reqwest',
    'json!data/sampleData.json',
    'text!templates/appTemplate.html',
    'text!templates/Clause_14a.html'
], function(
    $,
    reqwest,
    sampleData,
    templateHTML,
    clause14
) {
   'use strict';

    function init(el) {

        // DOM template example
        el.innerHTML = templateHTML;

        //start fiddling

                var baseurl = "http://interactive.guim.co.uk/2015/jun/magnacarta/";

                var origHeight = 4256;
                var origWidth = 3260;
                var mstopleft = 0;
                var passages = [{"passage":0,"mcpname":"Preface","positionx":200,"positiony":273,"ofy":0.06414473684,"totalwidth":3260,"totalheight":4256,"rowNumber":1},{"passage":1,"mcpname":"Clause_01","positionx":1002,"positiony":473,"ofy":0.111137218,"totalwidth":"","totalheight":"","rowNumber":2},{"passage":2,"mcpname":"Clause_02","positionx":2582,"positiony":574,"ofy":0.1348684211,"totalwidth":"","totalheight":"","rowNumber":3},{"passage":3,"mcpname":"Clause_03","positionx":1716,"positiony":664,"ofy":0.1560150376,"totalwidth":"","totalheight":"","rowNumber":4},{"passage":4,"mcpname":"Clause_04","positionx":196,"positiony":712,"ofy":0.1672932331,"totalwidth":"","totalheight":"","rowNumber":5},{"passage":5,"mcpname":"Clause_05","positionx":0,"positiony":762,"ofy":0.1790413534,"totalwidth":"","totalheight":"","rowNumber":6},{"passage":6,"mcpname":"Clause_06","positionx":"","positiony":812,"ofy":0.1907894737,"totalwidth":"","totalheight":"","rowNumber":7},{"passage":7,"mcpname":"Clause_07","positionx":"","positiony":862,"ofy":0.202537594,"totalwidth":"","totalheight":"","rowNumber":8},{"passage":8,"mcpname":"Clause_08","positionx":"","positiony":912,"ofy":0.2142857143,"totalwidth":"","totalheight":"","rowNumber":9},{"passage":9,"mcpname":"Clause_09","positionx":"","positiony":962,"ofy":0.2260338346,"totalwidth":"","totalheight":"","rowNumber":10},{"passage":10,"mcpname":"Clause_10","positionx":"","positiony":1012,"ofy":0.2377819549,"totalwidth":"","totalheight":"","rowNumber":11},{"passage":11,"mcpname":"Clause_11","positionx":"","positiony":1062,"ofy":0.2495300752,"totalwidth":"","totalheight":"","rowNumber":12},{"passage":12,"mcpname":"Clause_12","positionx":"","positiony":1112,"ofy":0.2612781955,"totalwidth":"","totalheight":"","rowNumber":13},{"passage":13,"mcpname":"Clause_13","positionx":"","positiony":1162,"ofy":0.2730263158,"totalwidth":"","totalheight":"","rowNumber":14},{"passage":14,"mcpname":"Clause_14","positionx":"","positiony":1212,"ofy":0.2847744361,"totalwidth":"","totalheight":"","rowNumber":15},{"passage":15,"mcpname":"Clause_15","positionx":"","positiony":1262,"ofy":0.2965225564,"totalwidth":"","totalheight":"","rowNumber":16},{"passage":16,"mcpname":"Clause_16","positionx":"","positiony":1312,"ofy":0.3082706767,"totalwidth":"","totalheight":"","rowNumber":17},{"passage":17,"mcpname":"Clause_17","positionx":"","positiony":1362,"ofy":0.320018797,"totalwidth":"","totalheight":"","rowNumber":18},{"passage":18,"mcpname":"Clause_18","positionx":"","positiony":1412,"ofy":0.3317669173,"totalwidth":"","totalheight":"","rowNumber":19},{"passage":19,"mcpname":"Clause_19","positionx":"","positiony":1462,"ofy":0.3435150376,"totalwidth":"","totalheight":"","rowNumber":20},{"passage":20,"mcpname":"Clause_20","positionx":"","positiony":1512,"ofy":0.3552631579,"totalwidth":"","totalheight":"","rowNumber":21},{"passage":21,"mcpname":"Clause_21","positionx":"","positiony":1562,"ofy":0.3670112782,"totalwidth":"","totalheight":"","rowNumber":22},{"passage":22,"mcpname":"Clause_22","positionx":"","positiony":1612,"ofy":0.3787593985,"totalwidth":"","totalheight":"","rowNumber":23},{"passage":23,"mcpname":"Clause_23","positionx":"","positiony":1662,"ofy":0.3905075188,"totalwidth":"","totalheight":"","rowNumber":24},{"passage":24,"mcpname":"Clause_24","positionx":"","positiony":1712,"ofy":0.4022556391,"totalwidth":"","totalheight":"","rowNumber":25},{"passage":25,"mcpname":"Clause_25","positionx":"","positiony":1762,"ofy":0.4140037594,"totalwidth":"","totalheight":"","rowNumber":26},{"passage":26,"mcpname":"Clause_26","positionx":"","positiony":1812,"ofy":0.4257518797,"totalwidth":"","totalheight":"","rowNumber":27},{"passage":27,"mcpname":"Clause_27","positionx":"","positiony":1862,"ofy":0.4375,"totalwidth":"","totalheight":"","rowNumber":28},{"passage":28,"mcpname":"Clause_28","positionx":"","positiony":1912,"ofy":0.4492481203,"totalwidth":"","totalheight":"","rowNumber":29},{"passage":29,"mcpname":"Clause_29","positionx":"","positiony":1962,"ofy":0.4609962406,"totalwidth":"","totalheight":"","rowNumber":30},{"passage":30,"mcpname":"Clause_30","positionx":"","positiony":2012,"ofy":0.4727443609,"totalwidth":"","totalheight":"","rowNumber":31},{"passage":31,"mcpname":"Clause_31","positionx":"","positiony":2062,"ofy":0.4844924812,"totalwidth":"","totalheight":"","rowNumber":32},{"passage":32,"mcpname":"Clause_32","positionx":"","positiony":2112,"ofy":0.4962406015,"totalwidth":"","totalheight":"","rowNumber":33},{"passage":33,"mcpname":"Clause_33","positionx":"","positiony":2162,"ofy":0.5079887218,"totalwidth":"","totalheight":"","rowNumber":34},{"passage":34,"mcpname":"Clause_34","positionx":"","positiony":2212,"ofy":0.5197368421,"totalwidth":"","totalheight":"","rowNumber":35},{"passage":35,"mcpname":"Clause_35","positionx":"","positiony":2262,"ofy":0.5314849624,"totalwidth":"","totalheight":"","rowNumber":36},{"passage":36,"mcpname":"Clause_36","positionx":"","positiony":2312,"ofy":0.5432330827,"totalwidth":"","totalheight":"","rowNumber":37},{"passage":37,"mcpname":"Clause_37","positionx":"","positiony":2362,"ofy":0.554981203,"totalwidth":"","totalheight":"","rowNumber":38},{"passage":38,"mcpname":"Clause_38","positionx":"","positiony":2412,"ofy":0.5667293233,"totalwidth":"","totalheight":"","rowNumber":39},{"passage":39,"mcpname":"Clause_39","positionx":"","positiony":2462,"ofy":0.5784774436,"totalwidth":"","totalheight":"","rowNumber":40},{"passage":40,"mcpname":"Clause_40","positionx":"","positiony":2512,"ofy":0.5902255639,"totalwidth":"","totalheight":"","rowNumber":41},{"passage":41,"mcpname":"Clause_41","positionx":"","positiony":2562,"ofy":0.6019736842,"totalwidth":"","totalheight":"","rowNumber":42},{"passage":42,"mcpname":"Clause_42","positionx":"","positiony":2612,"ofy":0.6137218045,"totalwidth":"","totalheight":"","rowNumber":43},{"passage":43,"mcpname":"Clause_43","positionx":"","positiony":2662,"ofy":0.6254699248,"totalwidth":"","totalheight":"","rowNumber":44},{"passage":44,"mcpname":"Clause_44","positionx":"","positiony":2712,"ofy":0.6372180451,"totalwidth":"","totalheight":"","rowNumber":45},{"passage":45,"mcpname":"Clause_45","positionx":"","positiony":2762,"ofy":0.6489661654,"totalwidth":"","totalheight":"","rowNumber":46},{"passage":46,"mcpname":"Clause_46","positionx":"","positiony":2812,"ofy":0.6607142857,"totalwidth":"","totalheight":"","rowNumber":47},{"passage":47,"mcpname":"Clause_47","positionx":"","positiony":2862,"ofy":0.672462406,"totalwidth":"","totalheight":"","rowNumber":48},{"passage":48,"mcpname":"Clause_48","positionx":"","positiony":2912,"ofy":0.6842105263,"totalwidth":"","totalheight":"","rowNumber":49},{"passage":49,"mcpname":"Clause_49","positionx":"","positiony":2962,"ofy":0.6959586466,"totalwidth":"","totalheight":"","rowNumber":50},{"passage":50,"mcpname":"Clause_50","positionx":"","positiony":3012,"ofy":0.7077067669,"totalwidth":"","totalheight":"","rowNumber":51},{"passage":51,"mcpname":"Clause_51","positionx":"","positiony":3062,"ofy":0.7194548872,"totalwidth":"","totalheight":"","rowNumber":52},{"passage":52,"mcpname":"Clause_52","positionx":"","positiony":3112,"ofy":0.7312030075,"totalwidth":"","totalheight":"","rowNumber":53},{"passage":53,"mcpname":"Clause_53","positionx":"","positiony":3162,"ofy":0.7429511278,"totalwidth":"","totalheight":"","rowNumber":54},{"passage":54,"mcpname":"Clause_54","positionx":"","positiony":3212,"ofy":0.7546992481,"totalwidth":"","totalheight":"","rowNumber":55},{"passage":55,"mcpname":"Clause_55","positionx":"","positiony":3262,"ofy":0.7664473684,"totalwidth":"","totalheight":"","rowNumber":56},{"passage":56,"mcpname":"Clause_56","positionx":"","positiony":3312,"ofy":0.7781954887,"totalwidth":"","totalheight":"","rowNumber":57},{"passage":57,"mcpname":"Clause_57","positionx":"","positiony":3362,"ofy":0.789943609,"totalwidth":"","totalheight":"","rowNumber":58},{"passage":58,"mcpname":"Clause_58","positionx":"","positiony":3412,"ofy":0.8016917293,"totalwidth":"","totalheight":"","rowNumber":59},{"passage":59,"mcpname":"Clause_59","positionx":"","positiony":3462,"ofy":0.8134398496,"totalwidth":"","totalheight":"","rowNumber":60},{"passage":60,"mcpname":"Clause_60","positionx":"","positiony":3512,"ofy":0.8251879699,"totalwidth":"","totalheight":"","rowNumber":61}];
                var langselection = "latin";
                var correctchunk = " .latin_text > p ";


                function changelanguage () {
                    switch (langselection){
                        case "latin": 
                            correctchunk = " .latin_text > p";
                            break;
                        case "english":
                            correctchunk = " .english_text p:nth-child(2)";
                            break;
                        case "commentary":
                            correctchunk = " .clause_commentary_text";
                            break;
                };}


                var clauseEl = $('<div></div>').html(clause14);
                var chunk = clauseEl.find(correctchunk);
                $('#rawtext').append(chunk);

                $('#manuscript').click(function(e) {
                    console.dir(e);
                    var rawposX = $(this).offset().left,
                        rawposY = $(this).offset().top;
                    var posX = e.pageX - rawposX,
                        posY = e.pageY - rawposY;
                    var rect = this.getBoundingClientRect();
                    var msperc = posY / rect.height;
                    /*console.log(posY);
                    console.log(rect.height);
                    console.log(msperc);
                    */
                    var closest = null;
                    var closest_dist = null;

                    function getnearest () {
                    jQuery.each(passages, function(passage, object) {
                            //console.log(passage, msperc, object.ofy)
                        var dist = Math.abs(msperc - object.ofy);
                        //console.log(dist);
                        if (closest === null || dist < closest_dist) {
                                closest = passage;
                                closest_dist = dist;
                                } else {
                                //console.log(passages[closest]);
                                    return passages[closest];   
                        }
                      })
                             
                    }
                    getnearest();
                    console.log(passages[closest].mcpname);
                    var thingtoload = baseurl + 'data2/'+passages[closest].mcpname+'a'+ correctchunk;

                    $('#lightboxtext').load(thingtoload);
                    $('#lightbox').css({
                        display: 'block',
                        top: (e.offsetY + 40)});
                    console.dir(lightbox);

                    $('#manuscriptoverlay').css({
                        display: 'block'
                    });
                });

                function loadtext () {
                    

                }
 
                /*$('#manuscript').click(function(e) {
                    console.log('click');
                    $('#lightbox').load('data/Clause_01 .latin_text');
                    $('#lightbox').css({
                        display: 'block',
                    });
                    $('#manuscriptoverlay').css({
                        display: 'block'
                    });
                    var rect = this.getBoundingClientRect();
                    var perc = (e.pageY - rect.y) / rect.height;
                    console.log(perc + '%');
                });
                */

                $('#manuscriptoverlay').click(function() {
                    $('#manuscriptoverlay').css({
                        display: 'none'
                    });
                    $('#lightbox').css({
                        display: 'none'
                    });
                });


                $('#lightbox').click(function() {
                    $('#manuscriptoverlay').css({
                        display: 'none'
                    });
                    $('#lightbox').css({
                        display: 'none'
                    });
                });

                $('.chooser').click(function() {
                    e.preventDefault;
                    langselection = this.id;
                    $('.selected').removeClass('selected');
                    $(this).addClass('selected');
                    changelanguage();


                });


    }

    return {
        init: init
    };
});
