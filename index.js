var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
// });

var client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
});

client.stream('user', {track: 'Freigabe,freigegeben'}, function(stream) {
  stream.on('data', function(tweet) {
    if(tweet.user) {
      console.log('spottet tweet:');
      console.log(tweet.text);
      if(tweet.user.id == 163576129 || tweet.user.id == 3064346229) {
        // @regio_nrw: 163576129
        // the last one is for testing it's all supposed tested by
        if(tweet.text.match(/freigabe|freigegeben/gi)) { // just to be sure..
          if(tweet.text.match(/#ice|#ic|#ec/gi)) {
            retweetTweet(tweet.id_str);
          }
        }
      }
    }
  });

  stream.on('error', function(error) {
    throw error;
  });
});

retweetTweet = function retweetTweet(tweetId) {
  console.log('retweeting tweet');
  client.post('statuses/retweet/' + tweetId, function(error, tweet, response){
    if (!error) {
      console.log('retweeted');
    }
  });
};


// client.stream('statuses/filter', {track: '@martinschurig'}, function(stream) {
//   stream.on('data', function(tweet) {
//     console.log('spottet tweet:');
//     console.log(tweet.text);
//     retweetTweet(tweet.id_str);
//   });

//   stream.on('error', function(error) {
//     throw error;
//   });
// });
