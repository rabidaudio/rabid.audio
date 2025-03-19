---
title:      2014 in Film
subtitle:   100 Movies in 365 Days
date:       2015-2-2 2:14:49 -0500
layout:     blogspot_post
categories:
- film
---

<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>

February marks one year of [recording everything I watch in a spreadsheet](https://www.facebook.com/rabidsnakemonkey/posts/10152176782109330). The full data, including date, format, and who I watched it with (if applicable), is available [on Google Docs](https://docs.google.com/spreadsheets/d/1CLgneANQp1ucZZBqDfCDZHjxMgJfXl6JnwWbLjBCxbo/edit?usp=sharing), but here are some statistics and highlights, because why not.

In total there were 100 films, as well as 9 seasons of television shows (which I'm removing from this analysis). This leaves an even 100 films, which is convenient for percentages.

In the future, I'm going to add a column for year, add separate language and country columns, and also separate out 'watched with' and television versus film. I might even whip up a little Rails app to enter faster. Then other people can record their watches too. If you'd be interested in this, let me know. In the meantime, [here's the list for 2015](https://docs.google.com/spreadsheets/d/1ibICLXrjEgaeJ9eqTT9_fsSevKGm949FUklkmBn4xmo/edit?usp=sharing).

<div id="graph_timeline_calendar" class="graph"></div>

### Format

<div id="graph_pie_source" class="graph"></div>

### Watched with someone?

<div id="graph_pie_social" class="graph"></div>

### Seen it before?

<div id="graph_pie_rewatch" class="graph"></div>

### Country

<div id="graph_pie_location" class="graph"></div>

<div id="graph_table_loved" class="graph"></div>
<div id="graph_table_hated" class="graph"></div>
<div id="graph_table_people" class="graph"></div>

<style></style>

<script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
<script type="text/javascript" src="http://www.google.com/jsapi"></script>
<script>
(function(){
google.load('visualization', '1.0', {'packages':['corechart', 'calendar', 'table']});
google.setOnLoadCallback(function(){
  build();
});
// window.onresize = build; //buildTimeline; //refresh on resize

function build(){

  buildTimeline();

  buildPieChart("Sources", 'graph_pie_source', 'source');
  buildPieChart("Social", 'graph_pie_social', 'social');
  buildPieChart("Rewatch", 'graph_pie_rewatch', 'rewatch');
  buildPieChart("Location", 'graph_pie_location', 'country', _.chain(data).countBy('country').pairs().map(function(e){
    if(e[0]=="null") e[0] = "American";
    return e;
  }).value());

  buildTable('graph_table_loved', ['Loved'], _.chain(data).where({opinion: "Positive"}).map(function(e){return ["<a href='"+e.link+"'>"+e.name+"</a>"]}).value());
  buildTable('graph_table_hated', ['Hated'], _.chain(data).where({opinion: "Negative"}).map(function(e){return ["<a href='"+e.link+"'>"+e.name+"</a>"]}).value());
  buildTable('graph_table_people', ["People", "Count"], _.chain(data).pluck('people').flatten().countBy().pairs().sortBy(function(e){return e[1];}).reject(function(e){return e[1]<3;}).reverse().value());

  // console.log(counts_date)

  // var all_dates = [];
  // var start = new Date("2/1/2014");
  // for( var i = 0; i<365; i++ ){
  //   var day = new Date(start.valueOf() + 24*60*60*1000*i);
  //   all_dates.push([day, counts_date[day.toString()] || 0]);
  // }
  // console.log(all_dates)
  // dataTable = new google.visualization.DataTable();
  // dataTable.addColumn({ type: 'date', id: 'Date' });
  // dataTable.addColumn({ type: 'number', id: 'id' });
  // dataTable.addRows(all_dates);
  // var timeline = new google.visualization.LineChart(document.getElementById('graph_timeline_linear'));
  // timeline.draw(dataTable, {
  //   title: "Timeline",
  //   height: 350,
  // }); 
}

function buildTimeline(){
  var counts_date = _.countBy(data, 'date');

  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'date', id: 'Date' });
  dataTable.addColumn({ type: 'number', id: 'id' });
  dataTable.addRows(_.chain(counts_date)
                        .pairs()
                        .map(function(e)
                          {e[0] = new Date(e[0]);
                          return e;
                        })
                        .value()
                    );
  var calendar = new google.visualization.Calendar(document.getElementById('graph_timeline_calendar'));
  calendar.draw(dataTable, {
    title: "Calendar",
    // width: '50%',
    height: 350,
    calendar: {
      cellSize: Math.floor($('main').width()/64),
      cellColor: {
        stroke: '#76a7fa',
        strokeOpacity: 0.5,
        strokeWidth: 1,
      }
    }
  });
}

function buildPieChart(title, id, item, d){
  var pie = new google.visualization.PieChart(document.getElementById(id));
  var dataset = new google.visualization.DataTable();
  dataset.addColumn({type: 'string', id: 'name'});
  dataset.addColumn({type: 'number', id: 'count'});
  dataset.addRows(d||_.chain(data).countBy(item).pairs().value());
  pie.draw(dataset, {
    // title: title||""
  });
}

function buildTable(id, columns, d){
  d.unshift(columns);
  var dataset = google.visualization.arrayToDataTable(d, false);
  new google.visualization.Table(document.getElementById(id)).draw(dataset, {allowHtml: true});
}

var data = [
{name: "Gods And Monsters", date: new Date("2/1/2014"), source: "Nexflix", people: ["Ian McKellen"], comments: "New Queer Cinema. About James Whale", country: null, social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Gods%20And%20Monsters"},
{name: "Rubberneck", date: new Date("2/1/2014"), source: "Nexflix", people: ["Alex Karpovsky"], comments: "", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Rubberneck"},
{name: "Tiny Furniture", date: new Date("2/1/2014"), source: "Nexflix", people: ["Lena Dunham", "Alex Karpovsky"], comments: "", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Tiny%20Furniture"},
{name: "Star Wars Christmas Special", date: new Date("2/2/2014"), source: "Other Online", people: [], comments: "MST3K version. Watched with Allison", country: null, social: true, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Star%20Wars%20Christmas%20Special"},
{name: "Synecdoche, New York", date: new Date("2/3/2014"), source: "Other Online", people: ["Phillip Seymour Hoffman"], comments: "", country: null, social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Synecdoche%2C%20New%20York"},
{name: "Closely Watched Trains", date: new Date("2/4/2014"), source: "Library", people: [], comments: "Meera recommended. Czech", country: "Czech", social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Closely%20Watched%20Trains"},
{name: "The Lives of Others", date: new Date("2/4/2014"), source: "Library", people: [], comments: "Sarah and Kathryn recommended. German", country: "German", social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Lives%20of%20Others"},
{name: "Martha Marcy May Marlene", date: new Date("2/6/2014"), source: "Library", people: ["Elizabeth Olsen", "Julia Garner"], comments: "psych thriller about cults", country: null, social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Martha%20Marcy%20May%20Marlene"},
{name: "Melancholia", date: new Date("2/11/2014"), source: "Library", people: ["Lars Von Trier", "Charlotte Gainsbourg"], comments: "scifi drama. Sort of watched with Kathryn. Danish", country: "Danish", social: true, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Melancholia"},
{name: "Girl With a Pearl Earring", date: new Date("2/12/2014"), source: "Library", people: ["Scarlett Johansson", "Colin Firth", "Cillian Murphy"], comments: "About the Vermeer painting (fictional). British", country: "British", social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Girl%20With%20a%20Pearl%20Earring"},
{name: "Eraserhead", date: new Date("2/13/2014"), source: "Other Online", people: ["David Lynch"], comments: "", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Eraserhead"},
{name: "Good bye, Lenin!", date: new Date("2/13/2014"), source: "Library", people: [], comments: "Sarah and Kathryn recommended. German", country: "German", social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Good%20bye%2C%20Lenin%21"},
{name: "Safety Not Guaranteed", date: new Date("2/14/2014"), source: "Library", people: ["Aubrey Plaza"], comments: "Almost sort of watched with Kathryn", country: null, social: true, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Safety%20Not%20Guaranteed"},
{name: "Gravity", date: new Date("2/15/2014"), source: "Theater", people: ["Sandra Bullock", "George Clooney"], comments: "Kathryn recommended", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Gravity"},
{name: "The Man Who Knew Too Much", date: new Date("2/15/2014"), source: "Other Online", people: ["Alfred Hitchcock", "Jimmy Stuart", "Doris Day"], comments: "Watched with Brendan and Meera", country: null, social: true, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Man%20Who%20Knew%20Too%20Much"},
{name: "Psycho", date: new Date("2/15/2014"), source: "Other Online", people: ["Alfred Hitchcock"], comments: "Watched with Brendan and Meera", country: null, social: true, rewatch: true,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Psycho"},
{name: "Milk", date: new Date("2/17/2014"), source: "Library", people: ["Gus Van Sant", "Sean Penn", "James Franco"], comments: "New Queer Cinema. Based on true story", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Milk"},
{name: "Robin Hood: Men in Tights", date: new Date("3/2/2014"), source: "Nexflix", people: ["Mel Brooks"], comments: "", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Robin%20Hood:%20Men%20in%20Tights"},
{name: "Frances Ha", date: new Date("3/6/2014"), source: "Nexflix", people: ["Greta Gerwig", "Adam Driver"], comments: "", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Frances%20Ha"},
{name: "Blue Velvet", date: new Date("3/7/2014"), source: "Library", people: ["David Lynch", "Kyle MacLachlan"], comments: "", country: null, social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Blue%20Velvet"},
{name: "Notes on a Scandal", date: new Date("3/9/2014"), source: "Library", people: ["Judi Dench", "Cate Blanchett", "Juno Temple", "Bill Nighy"], comments: "British", country: null, social: false, rewatch: false,opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Notes%20on%20a%20Scandal"},
{name: "500 Days of Summer", date: new Date("3/10/2014"), source: "Library", people: ["Joseph Gordon-Levitt", "Zooey Deschanel"], comments: "So much groan", country: null, social: false, rewatch: false,opinion: "Negative", link: "http://www.imdb.com/find?s=all&q=500%20Days%20of%20Summer"},
{name: "Cutie and the Boxer", date: new Date("3/13/2014"), source: "Nexflix", people: [], comments: "Documentary", country: null, social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Cutie%20and%20the%20Boxer"},
{name: "Blue is the Warmest Color", date: new Date("3/14/2014"), source: "Nexflix", people: [], comments: "New Queer Cinema. 3 grueling hours of drama interspersed with lesbian porn. French", country: "French", social: false, rewatch: false,opinion: "", link: "http://www.imdb.com/find?s=all&q=Blue%20is%20the%20Warmest%20Color"},
{name: "Fear and Loathing in Las Vegas", date: new Date("4/20/2014"), source: "Library", people: ["Johnny Depp", "Benicio del Toro"], comments: "", country: null, social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Fear%20and%20Loathing%20in%20Las%20Vegas"},
{name: "Frankenstein", date: new Date("4/21/2014"), source: "Library", people: ["James Whale"], comments: "Allison recommended", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Frankenstein"},
{name: "Bride of Frankenstein", date: new Date("4/21/2014"), source: "Library", people: ["James Whale"], comments: "Allison recommended", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Bride%20of%20Frankenstein"},
{name: "Broken Flowers", date: new Date("5/18/2014"), source: "Nexflix", people: ["Bill Murray"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Broken%20Flowers"},
{name: "Don Jon", date: new Date("5/20/2014"), source: "Nexflix", people: ["Joseph Gordon-Levitt", "Scarlett Johansson", "Julianne Moore"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Don%20Jon"},
{name: "Taxi Driver", date: new Date("5/20/2014"), source: "Nexflix", people: ["Robert De Niro", "Jodie Foster"], comments: "", country: null, social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Taxi%20Driver"},
{name: "The Raid 2", date: new Date("5/24/2014"), source: "Theater", people: [], comments: "Matt recommended. Watched with Kathryn. Indonesian", country: "Indonesian", social: true, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=The%20Raid%202"},
{name: "Exit Through the Gift Shop", date: new Date("5/26/2014"), source: "Nexflix", people: ["Banksy", "Shepard Fairey"], comments: "Street art documentary. British", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Exit%20Through%20the%20Gift%20Shop"},
{name: "Adore", date: new Date("6/15/2014"), source: "Nexflix", people: ["Robin Wright"], comments: "Porn for moms. Couldn't finish it", country: null, social: false, rewatch: false, opinion: "Negative", link: "http://www.imdb.com/find?s=all&q=Adore"},
{name: "Fargo", date: new Date("6/27/2014"), source: "Nexflix", people: ["Coen brothers", "William H. Macy", "Steve Buscemi"], comments: "Eric recommended", country: null, social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Fargo"},
{name: "Noah", date: new Date("7/19/2014"), source: "Other Online", people: ["Darren Aronofsky", "Russel Crowe", "Jennifer Conelly", "Emma Watson", "Anthony Hopkins"], comments: "Such disappoint", country: null, social: false, rewatch: false, opinion: "Negative", link: "http://www.imdb.com/find?s=all&q=Noah"},
{name: "Silence of the Lambs", date: new Date("7/19/2014"), source: "Nexflix", people: ["Anthony Hopkins", "Jodie Foster"], comments: "", country: null, social: false, rewatch: true, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Silence%20of%20the%20Lambs"},
{name: "The Pervert's Guide to Ideology", date: new Date("7/19/2014"), source: "Nexflix", people: [], comments: "Documentary lecture. British", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Pervert%27s%20Guide%20to%20Ideology"},
{name: "Snow on Tha Bluff", date: new Date("7/20/2014"), source: "Nexflix", people: [], comments: "Atlanta film about gang life", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Snow%20on%20Tha%20Bluff"},
{name: "Duo luo tian shi (Fallen Angels)", date: new Date("7/21/2014"), source: "Nexflix", people: [], comments: "Remarkable cinematography (otherwise utter nonsense). Hong Kong", country: "Hong Kong", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Duo%20luo%20tian%20shi%20%28Fallen%20Angels%29"},
{name: "Sunshine", date: new Date("7/21/2014"), source: "Other Online", people: ["Cillian Murphy"], comments: "Space!", country: null, social: false, rewatch: true, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Sunshine"},
{name: "Efter Brylluppet (After the Wedding)", date: new Date("7/23/2014"), source: "Nexflix", people: ["Susanne Bier", "Mads Mikkelsen"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Efter%20Brylluppet%20%28After%20the%20Wedding%29"},
{name: "Kynodontas (Dogtooth)", date: new Date("7/25/2014"), source: "Nexflix", people: [], comments: "Fucked up. Greek", country: "Greek", social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Kynodontas%20%28Dogtooth%29"},
{name: "Only God Forgives", date: new Date("7/25/2014"), source: "Nexflix", people: ["Nicolas Winding Refn", "Ryan Gosling"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Only%20God%20Forgives"},
{name: "The Believer", date: new Date("7/30/2014"), source: "Nexflix", people: ["Ryan Gosling"], comments: "Neo-Nazi Jew wtf?", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Believer"},
{name: "En Kærlighedshistorie (Kira's Reason: A Love Story)", date: new Date("7/31/2014"), source: "Nexflix", people: ["Ole Christian Madsen", "Lars Mikkelsen"], comments: "Dogme 95. Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=En%20Kærlighedshistorie%20%28Kira%27s%20Reason:%20A%20Love%20Story%29"},
{name: "Me and You and Everyone We Know", date: new Date("8/2/2014"), source: "Nexflix", people: [], comments: "Watched with Patrick", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Me%20and%20You%20and%20Everyone%20We%20Know"},
{name: "Nymphomaniac: Volume I", date: new Date("8/15/2014"), source: "Nexflix", people: ["Lars Von Trier", "Charlotte Gainsbourg", "Stellan Skarsgård", "Christian Slater", "Uma Thurman"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Nymphomaniac:%20Volume%20I"},
{name: "Nymphomaniac: Volume II", date: new Date("8/15/2014"), source: "Nexflix", people: ["Lars Von Trier", "Charlotte Gainsbourg", "Stellan Skarsgård", "Christian Slater", "Willem Dafoe"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Nymphomaniac:%20Volume%20II"},
{name: "All Good Things", date: new Date("9/13/2014"), source: "Nexflix", people: ["Ryan Gosling", "Kirsten Dunst"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=All%20Good%20Things"},
{name: "The United States of Leland", date: new Date("9/13/2014"), source: "Nexflix", people: ["Ryan Gosling", "Don Cheadle", "Jena Malone", "Kevin Spacey", "Michelle Williams", "Kerry Washington"], comments: "meh", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20United%20States%20of%20Leland"},
{name: "Annie Hall", date: new Date("9/14/2014"), source: "Nexflix", people: ["Woody Allen", "Diane Keaton"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Annie%20Hall"},
{name: "Dirty Pretty Things", date: new Date("9/14/2014"), source: "Nexflix", people: ["Audrey Tautou", "Chiwetel Ejiofor"], comments: "British", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Dirty%20Pretty%20Things"},
{name: "Pusher", date: new Date("9/14/2014"), source: "Other Online", people: ["Nicolas Winding Refn", "Mads Mikkelsen"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Pusher"},
{name: "Prozac Nation", date: new Date("9/14/2014"), source: "Nexflix", people: ["Christina Ricci", "Johnathan Rhys-Myers", "Jason Biggs", "Michelle Williams"], comments: "So uggh. I can't believe I sat through the whole thing", country: null, social: false, rewatch: false, opinion: "Negative", link: "http://www.imdb.com/find?s=all&q=Prozac%20Nation"},
{name: "Almost Famous", date: new Date("9/27/2014"), source: "Library", people: ["Kate Hudson", "Frances McDormand", "Phillip Seymour Hoffman", "Zooey Deschanel"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Almost%20Famous"},
{name: "Inside Llewyn Davis", date: new Date("9/28/2014"), source: "Other Online", people: ["Coen brothers", "Oscar Isacc", "Carey Mulligan", "John Goodman", "Adam Driver", "Alex Karpovsky"], comments: "Sort of watched with Kathryn", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Inside%20Llewyn%20Davis"},
{name: "Elephant", date: new Date("9/29/2014"), source: "Library", people: ["Gus Van Sant"], comments: "School shooting", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Elephant"},
{name: "Performance", date: new Date("10/21/2014"), source: "Library", people: ["Mick Jagger", "James Fox"], comments: "British", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Performance"},
{name: "Doubt", date: new Date("10/22/2014"), source: "Library", people: ["Meryl Streep", "Phillip Seymour Hoffman", "Amy Adams"], comments: "", country: null, social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Doubt"},
{name: "The Hours", date: new Date("10/22/2014"), source: "Nexflix", people: ["Meryl Streep", "Julianne Moore", "Nicole Kidman"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Hours"},
{name: "Flammen & Citronen (Flame and Citron)", date: new Date("10/23/2014"), source: "Nexflix", people: ["Ole Christian Madsen", "Mads Mikkelsen", "Stine Stengade", "Thure Lindhardt"], comments: "WWII resistance fighters loosely based on true events. Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Flammen%20%26%20Citronen%20%28Flame%20and%20Citron%29"},
{name: "Rosemary's Baby", date: new Date("10/24/2014"), source: "Nexflix", people: ["Roman Polanski", "Mia Farrow", "Ruth Gordon"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Rosemary%27s%20Baby"},
{name: "J'ai tué ma mère (I Killed My Mother)", date: new Date("10/25/2014"), source: "Nexflix", people: [], comments: "New Queer Cinema. Canadian", country: "Canadian", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=J%27ai%20tué%20ma%20mère%20%28I%20Killed%20My%20Mother%29"},
{name: "12 Angry Men", date: new Date("10/26/2014"), source: "Nexflix", people: ["Henry Fonda"], comments: "", country: null, social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=12%20Angry%20Men"},
{name: "Låt den Rätte Komma In (Let The Right One In)", date: new Date("10/31/2014"), source: "Nexflix", people: [], comments: "Swedish", country: "Swedish", social: false, rewatch: true, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Låt%20den%20Rätte%20Komma%20In%20%28Let%20The%20Right%20One%20In%29"},
{name: "Seven", date: new Date("11/15/2014"), source: "Nexflix", people: ["Morgan Freeman", "Brad Pitt"], comments: "", country: null, social: false, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=Seven"},
{name: "The Blair Witch Project", date: new Date("11/15/2014"), source: "Nexflix", people: [], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Blair%20Witch%20Project"},
{name: "Carrie", date: new Date("11/16/2014"), source: "Nexflix", people: ["Sissy Spacek", "Piper Laurie", "John Travolta"], comments: "1976 version", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Carrie"},
{name: "The Human Centipede", date: new Date("11/16/2014"), source: "Nexflix", people: [], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Human%20Centipede"},
{name: "In Bruges", date: new Date("11/16/2014"), source: "Nexflix", people: ["Colin Farrell", "Brendan Gleeson", "Ralph Fiennes"], comments: "British", country: "British", social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=In%20Bruges"},
{name: "Devil", date: new Date("11/17/2014"), source: "Nexflix", people: [], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Devil"},
{name: "Django Unchained", date: new Date("11/17/2014"), source: "Nexflix", people: ["Quentin Tarantino", "Jamie Fox", "Kerry Washington", "Leonardo DiCaprio", "Samuel L. Jackson"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Django%20Unchained"},
{name: "En kongelig affære (A Royal Affair)", date: new Date("11/27/2014"), source: "Nexflix", people: ["Nikolaj Arcel", "Mads Mikkelsen", "Alicia Vikander", "David Dencik"], comments: "Danish", country: "Danish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=En%20kongelig%20affære%20%28A%20Royal%20Affair%29"},
{name: "Filth", date: new Date("11/27/2014"), source: "Nexflix", people: ["James McAvoy", "Jamie Bell", "Eddie Marsan", "Jim Broadbent", "Shirley Henderson"], comments: "Based on Irvine Welsh novel. Scottish", country: "Scottish", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Filth"},
{name: "Blue Ruin", date: new Date("11/28/2014"), source: "Nexflix", people: [], comments: "Kickstarter-funded film", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Blue%20Ruin"},
{name: "Birdman", date: new Date("11/28/2014"), source: "Theater", people: ["Alejandro González Iñárritu", "Michael Keaton", "Zach Galifianakis", "Edward Norton", "Andrea Riseborough", "Amy Ryan", "Emma Stone", "Naomi Watts"], comments: "Watched with Eric", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Birdman"},
{name: "Gomorrah", date: new Date("11/29/2014"), source: "Nexflix", people: [], comments: "Italian", country: "Italian", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Gomorrah"},
{name: "The Manchurian Candidate", date: new Date("12/13/2014"), source: "Nexflix", people: ["Denzel Washington", "Meryl Streep", "Liev Schreiber", "Jon Voight", "Jeffrey Wright", "Al Franken"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Manchurian%20Candidate"},
{name: "Bronson", date: new Date("12/13/2014"), source: "Nexflix", people: ["Nicolas Winding Refn", "Tom Hardy"], comments: "British", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Bronson"},
{name: "Star Wars IV: A New Hope", date: new Date("12/13/2014"), source: "Other", people: ["George Lucas", "Mark Hamill", "Harrison Ford", "Carrie Fisher", "Anthony Daniels", "James Earl Jones", "Alec Guinness", "Peter Cushing"], comments: "Watched with Family", country: null, social: true, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=Star%20Wars%20IV:%20A%20New%20Hope"},
{name: "Star Wars V: The Empire Strikes Back", date: new Date("12/13/2014"), source: "Other", people: ["George Lucas", "Mark Hamill", "Harrison Ford", "Carrie Fisher", "Anthony Daniels", "James Earl Jones", "Billy Dee Williams", "Frank Oz"], comments: "Watched with Family", country: null, social: true, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=Star%20Wars%20V:%20The%20Empire%20Strikes%20Back"},
{name: "American Horror Story Season 1", date: new Date("12/23/2014"), source: "Nexflix", people: [], comments: "It started with such promise", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=American%20Horror%20Story%20Season%201"},
{name: "Team America: World Police", date: new Date("12/24/2014"), source: "Nexflix", people: [], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Team%20America:%20World%20Police"},
{name: "Star Wars VI: Return of the Jedi", date: new Date("12/25/2014"), source: "Other", people: ["George Lucas", "Mark Hamill", "Harrison Ford", "Carrie Fisher", "Anthony Daniels", "James Earl Jones", "Billy Dee Williams", "Frank Oz"], comments: "Watched with Family", country: null, social: true, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=Star%20Wars%20VI:%20Return%20of%20the%20Jedi"},
{name: "Casablanca", date: new Date("12/26/2014"), source: "Other", people: ["Humphrey Bogart", "Ingrid Bergman"], comments: "Watched with Family", country: null, social: true, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=Casablanca"},
{name: "Enter The Void", date: new Date("12/26/2014"), source: "Nexflix", people: [], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Enter%20The%20Void"},
{name: "The Wolf of Wall Street", date: new Date("12/30/2014"), source: "Nexflix", people: ["Martin Scorsese", "Leonardo DiCaprio", "Jonah Hill", "Rob Reiner", "Matthew McConaughey"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Wolf%20of%20Wall%20Street"},
{name: "The Double", date: new Date("1/1/2015"), source: "Nexflix", people: ["Richard Ayoade", "Jesse Eisenberg", "Mia Wasikowska", "Wallace Shawn", "James Fox", "Craig Roberts", "Yasmin Paige", "Noah Taylor", "J Mascis"], comments: "British", country: "British", social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=The%20Double"},
{name: "Foxcatcher", date: new Date("1/4/2015"), source: "Theater", people: ["Steve Carell", "Channing Tatum", "Mark Ruffalo"], comments: "Watched with Kathryn", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Foxcatcher"},
{name: "Frogs", date: new Date("1/17/2015"), source: "Nexflix", people: [], comments: "Watched with Kathryn", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Frogs"},
{name: "The Dark Crystal", date: new Date("1/17/2015"), source: "Nexflix", people: ["Jim Henson", "Frank Oz"], comments: "Watched with Kathryn", country: null, social: true, rewatch: true, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Dark%20Crystal"},
{name: "Godzilla vs. Mothra", date: new Date("1/17/2015"), source: "Nexflix", people: [], comments: "Watched with Kathryn. Japanese", country: "Japanese", social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Godzilla%20vs%2E%20Mothra"},
{name: "Vi är bäst! (We Are the Best!)", date: new Date("1/19/2015"), source: "Nexflix", people: ["David Dencik"], comments: "Kathryn recommended. Swedish-Danish", country: "Swedish/Danish", social: false, rewatch: false, opinion: "Positive", link: "http://www.imdb.com/find?s=all&q=Vi%20är%20bäst%21%20%28We%20Are%20the%20Best%21%29"},
{name: "Disconnect", date: new Date("1/20/2015"), source: "Library", people: ["Jason Bateman", "Alexander Skarsgard", "Michael Nyqvist", "Max Thieriot"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Disconnect"},
{name: "The Ides of March", date: new Date("1/21/2015"), source: "Library", people: ["George Clooney", "Ryan Gosling", "Philip Seymour Hoffman", "Paul Giamatti", "Evan Rachel Wood", "Marisa Tomei", "Jeffrey Wright"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=The%20Ides%20of%20March"},
{name: "Snatch", date: new Date("1/22/2015"), source: "Nexflix", people: ["Guy Ritchie", "Jason Statham", "Brad Pitt", "Benicio Del Toro"], comments: "Pseudo-sequal to Lock, Stock.", country: "British", social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Snatch"},
{name: "Killing Them Softly", date: new Date("1/22/2015"), source: "Nexflix", people: ["Brad Pitt"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Killing%20Them%20Softly"},
{name: "Anaconda", date: new Date("1/29/2015"), source: "Other", people: ["Jennifer Lopez", "Ice Cube", "Jon Voight", "Eric Stoltz", "Owen Wilson"], comments: "On Spanish-language cable channel. Watched with Dad", country: null, social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Anaconda"},
{name: "Tinker, Tailor, Soldier, Spy", date: new Date("1/30/2015"), source: "Nexflix", people: ["Gary Oldman", "Colin Firth", "Tom Hardy", "John Hurt", "Benedict Cumberbatch", "David Dencik"], comments: "", country: null, social: false, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Tinker%2C%20Tailor%2C%20Soldier%2C%20Spy"},
{name: "Two Days, One Night", date: new Date("1/31/2015"), source: "Theater", people: ["Marion Cotillard"], comments: "Watched with Kathryn. Belgian", country: "Belgian", social: true, rewatch: false, opinion: "", link: "http://www.imdb.com/find?s=all&q=Two%20Days%2C%20One%20Night"},
];
})();
</script>