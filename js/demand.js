var countries;

  $.ajax({
      'async': false,
      'type': "GET",
      'global': false,
      'url': "php/countries.php",
      'success': function (data) {
          countries = data.split(',');
      }
  });

 
  
  // d3.select("#c-perception-graph")
  //   .append("div")
  //   .attr("class", "")
  //   .attr("id", "graph-compare");


  var chart = d3.select('#c-perception-graph').selectAll('div').data(countries).enter();

  chart.append("div")
        .attr("class", "graph-row")
        .attr("name", function(d)
          {
              return d;
          });
 
 var j;
 j = 0;

  var leftData;

       $.ajax({
            'async': false,
            'type': "POST",
            'global': false,
            'url': "php/leftData.php",
            'success': function (data) {
                leftData = data.split(',');
          
            }
        });


  var rightData;

        $.ajax({
            'async': false,
            'type': "GET",
            'global': false,
            'url': "php/rightData.php",
            'success': function (data) {
                rightData = data.split(',');
            }
        });


  d3.selectAll('.graph-row').each(function(d, i)
  {
     
      linename = d3.select(this).attr("name");

      d3.select(this)
        .append("span")
        .attr("class", "graph-row-country")
        .attr("id", "graph-row-country")
        .text(linename);


      d3.select("[name = '" + linename + "']").each(function(d, i)
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-row-neg")
            .attr("name", linename + "neg")
            .attr("id", "graph-row-neg");
      });


      d3.select("[name = '" + linename + "neg" + "']").each(function(d, i)
     
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-value-bar graph-row-neg-1")
            .attr("id", linename + "-graph-row-neg-1")
            .text(function(d)
                {
                    return leftData[j];
                })
            .style("width", function(d)
                {
                    return leftData[j] * 3 + "px";
                })
            .append("span")
            .attr("class","value-legend")
            .text("Closed")
            ;
      });



      d3.select("[name = '" + linename + "neg" + "']").each(function(d, i)
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-value-bar graph-row-neg-2")
            .attr("id", linename + "-graph-row-neg-2")
            .text(function(d)
              {
                  return leftData[j + 1];
              })
            .style("width", function(d)
              {
              return leftData[j + 1] * 3 + "px";
              })
             .append("span")
            .attr("class","value-legend")
            .text("Closed")
            ;
      });


      d3.select("[name = '" + linename + "']").each(function(d, i)
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-row-pos")
            .attr("name", linename + "pos")
            .attr("id", "graph-row-pos");
      });


      d3.select("[name = '" + linename + "pos" + "']").each(function(d, i)
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-value-bar graph-row-pos-1")
            .attr("id", linename + "-graph-row-pos-1")
            .text(function(d)
                {
                    return rightData[j];
                })
            .style("width", function(d)
                {
                    return rightData[j] * 3 + "px";
                })
            .append("span")
            .attr("class","value-legend")
            .text("Closed")
            ;
      });



      d3.select("[name = '" + linename + "pos" + "']").each(function(d, i)
      {
          d3.select(this)
            .append("div")
            .attr("class", "graph-value-bar graph-row-pos-2")
            .attr("id", linename +  "-graph-row-pos-2")
            .text(function(d)
                {
                    return rightData[j+1];
                })
            .style("width", function(d)
                {
                    return rightData[j + 1] * 3 + "px";
                })
            .append("span")
            .attr("class","value-legend")
            .text("Closed")
            ;
      });

         j = j + 2;

  });


var barline = d3.selectAll(".graph-row")

barline.on("click", click);
function click(d) 
{

  var w1 = d3.select("[id = '" + d + "-graph-row-neg-1" + "']").style("width");
  var w2 = d3.select("[id = '" + d + "-graph-row-neg-2" + "']").style("width");
  var w3 = d3.select("[id = '" + d + "-graph-row-pos-1" + "']").style("width");
  var w4 = d3.select("[id = '" + d + "-graph-row-pos-2" + "']").style("width");

  d3.select("[name = '" + d +  "']").remove();
  var bartop = d3.select('#graph-compare')
  
  bartop.append("div")
        .attr("class", "graph-row")
         .style ("padding-top", "5px")
         .attr("name", d)
        .append("span")
        .attr("class", "graph-row-country")
        .text(d);

  d3.select("[name = '" + d +  "']")
        .append("div")
        .attr("class", "graph-row-neg")
         .attr("name", d + "-graph-row-neg");

  tempname = d + "-graph-row-neg" ; 

  d3.select("[name = '" + tempname +  "']")
        .append("div")
         .attr("class", "graph-row-neg-1")
         .text (w1.replace("px", "")/3 + "%")
         .style("width", w1);

  d3.select("[name = '" + tempname +  "']")    
          .append("div")
           .attr("class", "graph-row-neg-2")
           .text (w2.replace("px", "")/3 + "%")
            .style("width", w2);
           
           
  d3.select("[name = '" + d +  "']")
           .append("div")
            .attr("class", "graph-row-pos")
            .attr("name", d + "-graph-row-pos");

  tempname = d + "-graph-row-pos" ; 

      d3.select("[name = '" + tempname +  "']")
             .append("div")
              .attr("class", "graph-row-pos-1")
              .text(w3.replace("px", "")/3 + "%")
              .style("width", w3);

       d3.select("[name = '" + tempname +  "']")             
                .append("div")
                  .attr("class", "graph-row-pos-2")
                  .text(w4.replace("px", "")/3 + "%")
                   .style("width", w4);

 

}