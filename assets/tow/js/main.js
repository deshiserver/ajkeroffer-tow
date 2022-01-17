
'use strict';
function goBack() {
  window.history.back();
}

/* PRELOADER */

'use strict';
$(window).on('load', function() {
 $('#preloader').fadeOut('slow');
});

/* NICE-SELECT */

'use strict';
$(document).ready(function() {
  $('.nc-select').niceSelect();
});

/* FROMS */

'use strict';
  function onRecaptchaSuccess(){
    $('#submit-form').submit();
  }

/* SUBMIT NO EMPTY FIELD */

'use strict';
$(document).ready(function($){

  $("#searchForm").submit(function() {
    $(this).find(":input").filter(function(){ return !this.value; }).attr("disabled", "disabled");
    return true;
  });

  $( "#searchForm" ).find( ":input" ).prop( "disabled", false );

});

'use strict';
$(document).ready(function(){
  $('.submit-form').on('click', function(){

  $("#searchForm").submit();

  });
});

/* PAGINATION */

'use strict';
$(document).ready(function(){
  $('.change-page').on('click', function(){

    var paramName = 'p';
    var paramValue = $(this).data('page');

    var url = window.location.href;
    var hash = location.hash;
    url = url.replace(hash, '');
    if (url.indexOf(paramName + "=") >= 0)
    {
      var prefix = url.substring(0, url.indexOf(paramName + "=")); 
      var suffix = url.substring(url.indexOf(paramName + "="));
      suffix = suffix.substring(suffix.indexOf("=") + 1);
      suffix = (suffix.indexOf("&") >= 0) ? suffix.substring(suffix.indexOf("&")) : "";
      url = prefix + paramName + "=" + paramValue + suffix;
    }
    else
    {
      if (url.indexOf("?") < 0)
        url += "?" + paramName + "=" + paramValue;
      else
        url += "&" + paramName + "=" + paramValue;
    }

    window.location.href = url + hash;

  });
  
});

/* FILTERS */

'use strict';
function removeParam(parameter){
  var url=document.location.href;
  var urlparts= url.split('?');

 if (urlparts.length>=2)
 {
  var urlBase=urlparts.shift(); 
  var queryString=urlparts.join("?"); 

  var prefix = encodeURIComponent(parameter)+'=';
  var pars = queryString.split(/[&;]/g);
  for (var i= pars.length; i-->0;)               
      if (pars[i].lastIndexOf(prefix, 0)!==-1)   
          pars.splice(i, 1);
  url = urlBase+'?'+pars.join('&');
  window.history.pushState('',document.title,url);
}
return url;
}

'use strict';
function insertParam(key, value) {
  key = escape(key); value = escape(value);

  var kvp = document.location.search.substr(1).split('&');
  if (kvp == '') {
    document.location.search = '?' + key + '=' + value;
  }else{
    var i = kvp.length; var x; while (i--) {
      x = kvp[i].split('=');
      if (x[0] == key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
      }
    }

    if (i < 0) { kvp[kvp.length] = [key, value].join('='); }
    document.location.search = kvp.join('&');
  }
}

'use strict';
$(document).ready(function(){
  $("#filterInput_1").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#filterData_1 li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

'use strict';
$(document).ready(function(){
  $("#filterInput_2").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#filterData_2 a").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

'use strict';

'use strict';
$('.btnSubmitForm').on('click', function () {
  $('#searchForm').submit();
});

'use strict';
$('.searchForm').on("submit", function(){});

'use strict';
$('.filterTag').on('click', function () {
  
  var value = $(this).data('value');
  removeParam(value);
  window.location.reload();

});

'use strict';
$(document).ready(function(){
  $(window).on("load",function(){

    $.each($(".sortBy li[class*='uk-active']").find("a"), function () {
      $('#filterBtn').text($(this).text()); 
    });
});
  
});

'use strict';
$('.sortBy li a').on('click', function () {
  var key = 'sortby';
  var value = $(this).data('value');
  insertParam(key, value);
});

'use strict';
$('.filterSubCategory li a').on('click', function () {
  var key = 'sortby';
  var value = $(this).data('value');
  insertParam(key, value);
});

'use strict';
$('.filterStore a').on('click', function () {
  var key = 'store';
  var value = $(this).data('value');
  insertParam(key, value);
});

'use strict';
$('.filterCategory li a span').on('click', function () {
  removeParam("subcategory");
  var key = 'category';
  var current = $(this).data('current');
  var value = $(this).data('value');

  if(current == value){
    removeParam("category");
    window.location.reload();
    }else{
      insertParam(key, value);
    }
});

'use strict';
$('.filterSubCategory li a').on('click', function () {
  var key = 'subcategory';
  var value = $(this).data('value');
  insertParam(key, value);
});

'use strict';
$('.filterLocation li label').on('click', function () {
  var key = 'location';
  var current = $(this).data('current');
  var value = $(this).data('value');

  if(current == value){
  removeParam("location");
  window.location.reload();
  }else{
    insertParam(key, value);
  }

});

'use strict';
$('.filterRating li label').on('click', function () {
  var key = 'rating';
  var value = $(this).data('value');
  insertParam(key, value);
});

'use strict';
$('.resetFilters').on('click', function () {
window.location.href = window.location.href.split('?')[0]
});

'use strict';
$('.otherFilters li label').on('click', function () {
  var key = 'filter';
  var value = $(this).data('value');
  insertParam(key, value);
});

/* LIKES */
'use strict';
$(document).ready(function(){
  $('.like').on('click', function(){
    var itemId = $(this).data('item');
    $.ajax({
      url: SITEURL+"/controllers/like.php?action=like",
      type: 'post',
      data: {
        'item': itemId
      },
      success: function(response){

        $('.likes').addClass('uk-hidden');
        $('.thanks').removeClass('uk-hidden');
        
        /*if(response == 'deleted'){
          $('.like').removeClass('uk-text-success');
        }else{
          $('.deslike').removeClass('uk-text-danger');
          $('.deslike').addClass('uk-text-secondary');
          $('.like').addClass('uk-text-success uk-animation-fade');
        }*/

      },
    });
  });

  $('.deslike').on('click', function(){
    var itemId = $(this).data('item');
    $.ajax({
      url: SITEURL+"/controllers/like.php?action=deslike",
      type: 'post',
      data: {
        'item': itemId
      },
      success: function(response){

        $('.likes').addClass('uk-hidden');
        $('.thanks').removeClass('uk-hidden');
        
        /*if(response == 'deleted'){
          $('.deslike').removeClass('uk-text-danger');
        }else{
          $('.like').removeClass('uk-text-success');
          $('.like').addClass('uk-text-secondary');
          $('.deslike').addClass('uk-text-danger uk-animation-fade');
        }*/

      }
    });
  });
});

/* FILE VALIDATION & PREVIEW */

'use strict';

$("#image-upload").on('change', function(){

  var file = this.files[0];
  var fileType = file.type;
  var match = ['image/jpeg', 'image/png', 'image/jpg'];
  if(!((fileType == match[0]) || (fileType == match[1]) || (fileType == match[2]) || (fileType == match[3]) || (fileType == match[4]) || (fileType == match[5]))){
    alert('Sorry, only JPG, JPEG, & PNG files are allowed to upload.');
    $("#image-upload").val('');
    return false;
  }
});

$(document).ready(function() {
  $.uploadPreview({
    input_field: "#image-upload",
    preview_box: "#image-preview",
    label_field: "#image-label"
  });
});


/* NEWSLETTER */

'use strict';
$('.new-subscriber form').on("submit", function(event){ 

  event.preventDefault();  

  var $this = $('#submit-subscriber');
  var loadingText = '<span class="anim-rotate" uk-icon="refresh"></span>';
  if ($('#submit-subscriber').html() !== loadingText) {
    $this.html(loadingText);
  }

  $.ajax({
    type: 'POST',
    url: SITEURL+"/controllers/add-subscriber.php",
    data: {
      subscriber_email:$("#subscriber_email").val(),
    },
    success: function(data) {

      setTimeout(function(){
        $('#showresults').html(data);
        $this.html($this.val());
      }, 1000);

    }
  });
});

'use strict';
$('.newsletter form').on("submit", function(event){ 

  event.preventDefault();  

  var $this = $('#submit-newsletter');
  var loadingText = '<span class="anim-rotate" uk-icon="refresh"></span>';
  if ($('#submit-newsletter').html() !== loadingText) {
    $this.html(loadingText);
  }

  $.ajax({
    type: 'POST',
    url: SITEURL+"/controllers/add-subscriber.php",
    data: {
      subscriber_email:$("#newsletter_email").val(),
    },
    success: function(data) {

      setTimeout(function(){
        $('#getresults').html(data);
        $this.html($this.val());
      }, 1000);

    }
  });
});


/* DISABLE NICE SELECT MOBILE DEVICES */

'use strict';
$(document).ready(function() {
  checkSize();
  $(window).resize(checkSize);
});

function checkSize(){
  if (window.matchMedia("(min-width: 768px)").matches) {
    $("select").removeClass('uk-select');
    $("select").niceSelect();
    $("select").addClass('nc-select');
  } else {
    $("select").niceSelect("destroy");
    $("select").removeClass('nc-select');
    $("select").addClass('uk-select');
  }
}

/* UPDATE PROFILE */

'use strict';
$('.update-profile form').on("submit", function(event){ 

  event.preventDefault();  

  var $this = $('#submit-send');
  var loadingText = '<span class="anim-rotate" uk-icon="refresh"></span>';
  if ($('#submit-send').html() !== loadingText) {
    $this.html(loadingText);
  }

  $.ajax({
    type: 'POST',
    url: SITEURL+"/controllers/update-profile.php",
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData:false,
    success: function(data) {

      setTimeout(function(){
        $('#showresults').html(data);
        $this.html($this.val());
      }, 1000);

    }
  });
});

'use strict';
$(document).ready(function(){
  $('#favorites_table').on('click', '.deleteItem', function(){
    var itemId = $(this).data('item');
    var userId = $(this).data('user');
    var table = $('#favorites_table').DataTable();
    $.ajax({
      url: SITEURL+"/controllers/like.php?action=remove",
      type: 'post',
      data: {
        'item': itemId,
        'user': userId
      },
      success: function(response){
                //UIkit.notification('This Favorite Has Been Removed', 'success');
                table.ajax.reload();
              }
            });
  });
});

/* SUBMIT RATING */

$(document).ready(function () {
  $("#rating-form").niceSelect("destroy");
});


$(document).ready(function () {

  var rating = $('#rating-form').data('current');

  $('#rating-form').barrating({
    theme: 'css-stars',
    initialRating: rating,
    showSelectedRating: false,
  });
});

'use strict';

$('#formRating select').on('change', function(){
  $(this).closest('form').submit();
});

$(document).ready(function(){
 $('#formRating').on("submit", function(event){  

  event.preventDefault();

  var $this = $('#btn-review');
  var loadingText = '<span class="anim-rotate" uk-icon="refresh"></span>';
  if ($('#btn-review').html() !== loadingText) {
    $this.html(loadingText);
  }

  $.ajax({  
    url: SITEURL+"/controllers/add-review.php",
    method:"POST",  
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData:false,
    success: function(data) {

      setTimeout(function(){
        $('#showReviewresults').html(data);
        $this.html($this.val());
      }, 1000);

    } 
   });

  });  
 });

/* GET REVIEWS */

  $(document).ready(function () {
    $(document).on('click', '#loadBtn', function () {
      var limit = Number($('#limit').val());
      var id = Number($('#itemId').val());
      var page = Number($('#page').val())+1;
      var count = Number($('#itemsCount').val());

      $('#page').val(page);

      var $this = $('#loadBtn');
      var loadingText = '<span class="anim-rotate" uk-icon="refresh"></span>';
      if ($('#loadBtn').html() !== loadingText) {
        $this.html(loadingText);
      }
      
      $.ajax({
        type: 'POST',
        url: SITEURL+"/controllers/reviews.php",
        data: {
          'page': page,
          'id': id
        },
        success: function (data) {
          var rowCount = page + limit;
          $('#content').append(data);
          if (rowCount+1 >= count) {
            $('#loadBtn').css("display", "none");
          } else {
            $this.html($this.val());
          }
        }
      });
    });
  });

  /* MODALS */

  'use strict';
  $(document).ready(function(){
    $('.c-open').on('click', function(){
  
      var key = 'c';
      var varCode = $(this).data('id');
      var varRedirect = $(this).data('redirect');
  
      window.open(varRedirect);
      insertParam(key, varCode);

      /*
      window.open(SITEURL+"?code="+varCode);
      window.location = varRedirect;*/
  
    });
  });

  'use strict';
  $(document).ready(function(){
    $('.c-close').on('click', function(){
  
      var key = 'c';
      removeParam(key);
  
    });
  });

  /* MODALS */

  var clipboard = new ClipboardJS('.copy');

  clipboard.on('success', function (e) {
  
  var copyText = $('.copy').data('copy');
  var copiedText = $('.copy').data('copied');

  $('.copy').text(copiedText);

  setTimeout(function(){
    $('.copy').text(copyText);
  }, 2500);

  e.clearSelection();
});