
 setInterval(function() {

         $(function() {
             $.ajax({
                 url: 'php/select.php',
                 data: "",
                 dataType: 'json',
                 //data format      
                 success: function(data) {
                    console.log("test");
                     $('#twstream').empty();
                     $.each(data, function(entryIndex, entry) {

                        //pad all tweet texts to 150 chars to prevent moving or flickering
                        var max = (150 - entry['tweet_text'].length);
                            for (var i = 0; i < max; i++) {
                                entry['tweet_text'] += " ";

                            }
                          
                         //remote any quote at beginning or end to avoid breaking html
                         var tweets =   entry['tweet_text'].replace(/\"/g, "") ;
                         


                         var html = '<div class="m-twitter-stream-item large-6 medium-12 small-12 column">';
                         html += '<img class="twitter-pic" src=' + entry['profile_image_url'] + ' />';
                         html += '<p class="tweet-text">' +  tweets + '</p>';
                         html += '<a href="#" class="twitter-name">' + entry['name'] + '</a>';
                         html += ' <i class="icon-share">';
                         $('#twstream').append(html);
                     });
                 }
             });
         });
 }, 5000);

 