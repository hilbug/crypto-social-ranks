var subRedditNames = [
  "bitcoin,BTC",
  "ethereum,ETH",
  "binance,BNB",
  "Tether,USDT",
  "dot,DOT",
]; // add reddit name here
var collectedData = []; // unsorted data is stored inside this array

// Once the document is load we fetch all subreddit names
$(document).ready(function () {
  console.log("Document Loaded.");

  // Collects data for all reddits in the array.
  // Since fetch is we
  for (let i = 0; i < subRedditNames.length; i++) {
    // Split the index to get the
    var coinInfo = subRedditNames[i].split(",");

    // The reddit name is stored before the ',' so input index '0'
    Get_RedditSubCount(coinInfo[0], coinInfo[1]);
  }
});

// when given a subredded ex: 'https://www.reddit.com/r/Bitcoin/' we can search for that
// subreddits information.
function Get_RedditSubCount(subRedditName, symbol) {
  fetch(`https://www.reddit.com/r/${subRedditName}/about.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Calls another function to reduce mess inside fetch
      return CollectData(symbol, subRedditName, data.data.subscribers);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// This function pushes information into an array 'collectedData' and then creates a card
// for the crypto.
// TODO: Sort 'collectedData' after all the fetch functions have completed.
// fetch is async so you need to make sure all fetches have completed
function CollectData(symbol, name, subRedditSubscribers) {
  // Store data for use later.
  
  var item = 
    { coinSymbol: symbol, redditName: name, redditSubs: subRedditSubscribers };
 
 collectedData.push(item);
 collectedData.sort((a, b) => (a.redditSubs < b.redditSubs) ? 1 : -1)
  
 
  console.log(collectedData);
  //end of sorting function
  
  CreateCoinCard(symbol, name, subRedditSubscribers);
 
}

function CreateCoinCard(symbol, name, subscribers) {
  // Now that we've stored the data, add the info to the chart
  var coinCardHTML = "";
  coinCardHTML += `<div class="row">
  <div class="col-1">1</div>
  <input class="col-1 star" type="checkbox" />
  <div class="col">${symbol}: r/${name}</div>
  <div cass="col">${subscribers}</div>
    </div>`;

  $(".container").append(coinCardHTML);

}



