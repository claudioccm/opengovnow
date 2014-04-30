 setInterval(function() {
         $(function() {
             $.ajax({
                 url: 'php/select.php',
                 data: "",
                 dataType: 'json',
                 //data format      
                 success: function(data) {
                     $('#twitterstream').empty();
                     $.each(data, function(entryIndex, entry) {
                         var html = '<div class="m-twitter-stream-item large-6 medium-12 small-12 column">';
                         html += '<img class="twitter-pic" src=' + entry['profile_image_url'] + ' />';
                         html += '<p class="tweet-text">' + entry['tweet_text'] + '</p>';
                         html += '<a href="#" class="twitter-name">' + entry['name'] + '</a>';
                         html += ' <i class="icon-share">';
                         $('#twitterstream').append(html);
                     });
                 }
             });
         });
 }, 5000);

 