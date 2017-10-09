$(document).ready(function() {

/* -----------------------
 Thumbnail slider and
 9Cmedia API use
________________________*/

  var mediaAPI = "https://capi.9c9media.com/destinations/ctv_web/platforms/desktop/collections/88/contents?$include=%5bEpisode,Media.Id,Season,ItemsType,Items.ID,Images,Type,ShortDesc,Media.Name,Season,Episode,Genres%5d&$inlinecount=true&$page=1&$top=7&type=episode";
  $.getJSON( mediaAPI, {
    format: "json"
  })

    .done(function( data ) {

      $.each( data.Items, function( i, element ) {

        var picture = "<img src='" + element.Images[0].Url + "'>";
        var title = element.Name;
        var season = element.Season.Number;
        var beforeSeason;
        if (season < 10 ) {
          beforeSeason = "S0";
        } else {
          beforeSeason = "S";
        }
        var episode = element.Episode;
        var beforeEpisode;
        if (episode < 10 ) {
          beforeEpisode = "E0";
        } else {
          beforeEpisode = "E";
        }

        $(".slider ul").append("<li class='slide'>" + picture + "<span class='title'>" + title + "</br>" + beforeSeason + season + " " + beforeEpisode + episode + "</span></li>" );

      });
    });


/* -----------------------
Aritcles and CTV API use
________________________*/

  var ctvAPI = "https://www.ctv.ca/api/curatedfilter/byfilter/3c4d81e6-45f1-4b90-8728-2c93583d6b36/1/8";
  $.getJSON( ctvAPI, {
    format: "json"
  })
    .done(function( data ) {
      $.each( data.Items, function( i, element ) {
        var picture = "<img src='" + element.ThumbnailUrl + "'>";
        var title = element.Description;
        var date = element.PublishFromDate;

        var msec = Date.parse(date);
        var d = new Date(msec);
        var date = d.customFormat( "#MMMM# #DD#, #YYYY#")

        var url = element.Url;
        $(".articles ul").append("<li class='col-md-4 col-sm-6 col-xs-12'><a target='_blank' href='" + url + "'</a>" + picture + "<span class='articleText'>" + "<span class='title'>" + title + "</span>" + "</br>" + "<span class='txtDate'>" + date + "</span>" + "</br>" + " "  + "</span></li>" );
      });
    });


/* -----------------------
 Date format function
________________________*/

Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  var dateObject = this;
  YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
  MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=dateObject.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

  h=(hhh=dateObject.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = hhh<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=dateObject.getMinutes())<10?('0'+m):m;
  ss=(s=dateObject.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
}


/* ------------
 Slider
________________*/

/* Responsiveness using class in CSS media query for the breakpoints */
    function checkSize(){
        // @media screen and (min-width: 200px) and (max-width: 599px)
        if ($(".jsResponsiveClass").css("float") == "left" ){
            slideSlider = 100.5;
        }
        // @media screen and (min-width: 600px) and (max-width: 1000px)
        else if ($(".jsResponsiveClass").css("float") == "none" )  {
            slideSlider = 50.5;
        // @media screen and (min-width: 1001px)
        } else {
            slideSlider = 25.5;
        }
    }
        // run test on initial page load
        checkSize();

    var totalSlides = 7;
    var move = 0;
    var multiplyer = totalSlides - (100/(slideSlider - 0.5));
    /* allows the slider to slide one image at a time */
    var slideSliderMax = slideSlider * multiplyer;

    $("#next-arrow-on").click(function () {
      if (move >= 0 && move < (slideSliderMax - slideSlider)) {
        move += slideSlider;
        $( "#previous-arrow-off").css("z-index", 99);
      } else {
        move += slideSlider;
        $("#next-arrow-off").css("z-index", 101);
      }
      $(".slider ul").css("margin-left", -move + "%");
    });

    $("#previous-arrow-on").click(function () {
      if (move > slideSlider && move <= (slideSliderMax)) {
        move -= slideSlider;
        $("#next-arrow-off").css("z-index", 99);
      } else {
        move -= slideSlider;
        $( "#previous-arrow-off").css("z-index", 101);
      }
      $(".slider ul").css("margin-left", -move + "%");
    });
});
