$(document).ready(function() { 


var names;

$.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'url': "php/countries.php",
    'success': function (data) {
        names = data.split(',');
    }
});


var leftData;

$.ajax({
    'async': false,
    'type': "GET",
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
 
 
     
      // for (var i= 0; i< names.length; i++) {
      //   console.log(names[i] + " from: " + leftData[i] + " to: " + rightData[i]);  
      // }
 
      var labelArea = 160;
 
      var chart,
          width = 400,
          bar_height = 20,
          height = bar_height * (names.length);
 
      var rightOffset = width + labelArea;
 
      var chart = d3.select("#mychart")
        .append('svg')
        .attr('class', 'chart')
        .attr('width', labelArea + width + width)
        .attr('height', height);
      
      var xFrom = d3.scale.linear()
         .domain([0, d3.max(leftData)])
         .range([0, width]);
 
      var y = d3.scale.ordinal()
         .domain(names)
         .rangeBands([10, height]);
 
      var yPosByIndex = function(d, index){ return y(index); } 
 
      chart.selectAll("rect.left")
        .data(leftData)
        .enter().append("rect")
        .attr("x", function(pos) { return width - xFrom(pos); })
        .attr("y", yPosByIndex)
        .attr("class", "left")
        .attr("width", xFrom)
        .attr("height", y.rangeBand()); 
 
      chart.selectAll("text.leftscore")
        .data(leftData)
        .enter().append("text")
        .attr("x", function(d) { return width - xFrom(d); })
        .attr("y", function(d, z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", "20")
        .attr("dy", ".36em")
        .attr("text-anchor", "end")
        .attr('class', 'leftscore')

        .text(String);
 
      chart.selectAll("text.name")
        .data(names)
        .enter().append("text")
        .attr("id", String)
        .attr("x", (labelArea / 2) + width)
        .attr("y", function(d){ return y(d) + y.rangeBand()/2; } )
        .attr("dy", ".20em")
        .attr("text-anchor", "middle")
        .attr('class', 'name')
        .text(String);

    

      chart.selectAll("rect.left")
        .data(names)
        .attr("id", String);   

 
      var xTo = d3.scale.linear()
         .domain([0, d3.max(rightData)])
         .range([0, width]);
 
      chart.selectAll("rect.right")
        .data(rightData)
        .enter().append("rect")
        .attr("x", rightOffset)
        .attr("y", yPosByIndex)
        .attr("class", "right")
        .attr("width", xTo)
        .attr("height", y.rangeBand()); 
 
      chart.selectAll("text.score")
        .data(rightData)
        .enter().append("text")
        .attr("x", function(d) { return xTo(d) +  rightOffset; })
        .attr("y", function(d,z){ return y(z) + y.rangeBand()/2; } )
        .attr("dx", -5)
        .attr("dy", ".36em")
        .attr("text-anchor", "end")
        .attr('class', 'score')
        .text(String);

     

      chart.selectAll("rect.right")
        .data(names)
        .attr("id", String);   


      chart.selectAll("text")
        .data(names)
        .attr("id", String); 



 $('rect').click( function(){
    
      selectedcountry = $(this).attr('id')  ;
      current = parseFloat($(this).attr('y') ) ;
      console.log(current);

     d3.selectAll('#' + selectedcountry).transition()
           .duration(1000)
            .attr('y', 10);

     chart.selectAll('rect.left').each(function(d,i) {
       
       nodey = parseFloat(d3.select(this).attr("y")); 
       namey = d3.select(this).attr("id");
              if (nodey < current) { 
                    console.log (namey);


              d3.selectAll('#' + namey).transition()
                   .duration(1000)
                    .attr('y', nodey + bar_height  )
                 }
              
      

        });

 });

 
//mouse out should be reverse -  
$('rect').mouseover(function() {
    

    selectedcountry = $(this).attr('id')  ;
    current = parseInt($(this).attr('y') ) ;

    d3.selectAll('#explanation')
     .attr ('class', 'details-active')
     .attr ('y', current)
     .text (selectedcountry)

    chart.selectAll('rect.left').each(function(d,i) {
       
       nodey = parseInt(d3.select(this).attr("y")); 
       namey = d3.select(this).attr("id");
              if (nodey > current) { 
                    console.log (namey);
              d3.selectAll('#' + namey)
              .transition()
                   .duration(1000)
                    .attr('y', nodey + 50  )
                 }
              
      

        });
                  
});
 
 

 });
 
////////test syntax



//      .duration(1000)
//      .attr('y', 10);

      
//     var mi = (chart.selectAll('#name10').attr("y"));

//     // console.log(mi);
   

//     // chart.selectAll('#name10').each( function(d, i){
     
//     //     if (d3.select(this).attr("y") < 900) {
//     //        console.log ("tra");
//     //     }
//     // });

//   chart.on("click", function () { 
//    //myrec = d3.select('rect');
//     //  console.log(d3.select(this).select('rect').attr("id"));
//           //chart.select("[y > '" + mini + "']").transition().duration(1000).attr('y', 10);
// );
//           //       .filter(function(d) { return d.y > 40; }) 
//         .transition()
//  .duration(1000)
// .attr('y', 10);
// console.log(d3.select(this).attr("y"));
//  d3.select(this).transition()
// .duration(1000)
// .attr('y', 10 ); // d3.select(this).attr("y") - 10);
// $(this).siblings().hide();
// $("#chart").find("[y='" + current + "']").hide();
// chart.selectAll().on('mouseover', function(thisData) {
// paths.filter(function (d) { 
//   console.log(thisData);
//   return d.pathNumber === thisData.pathNumber; }).attr('fill', 'black');


  

 
    