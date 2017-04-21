var countries;

$.ajax( {
  'async': false,
  'type': "GET",
  'global': false,
  'url': "csv/countries.csv",
  success: function( data ) {
    countries = data.split( "\n" );
  }
} );

var chart = d3.select( '#c-demand-graph' ).selectAll().data( countries ).enter();

chart.append( "div" )
  .attr( "class", "demand-graph-row" )
  .attr( "name", function( data ) {
    return data + "-demand";
  } );

var j;
j = 0;
k = 0;

var leftData;

$.ajax( {
  'async': false,
  'type': "GET",
  'global': false,
  'url': "csv/leftdata.csv",
  success: function( data ) {
    leftData = data.replace( /(?:\r\n|\r|\n)/g, ',' );
    leftData = leftData.split( ',' );
  }
} );


var rightData;

$.ajax( {
  'async': false,
  'type': "GET",
  'global': false,
  'url': "csv/rightdata.csv",

  success: function( data ) {
    rightData = data.split( "\n" );

  }
} );



d3.select( "#c-demand-graph" ).selectAll( '.demand-graph-row' ).each( function( d, i ) {

  linename = d3.select( this ).attr( "name" );


  d3.select( this )
    .append( "span" )
    .attr( "class", "graph-row-country" )
    .text( linename.replace( "-demand", "" ) );


  d3.select( "[name = '" + linename + "']" ).each( function( d, i ) {
    d3.select( this )
      .append( "div" )
      .attr( "class", "graph-row-neg" )
      .attr( "name", linename + "neg" );
  } );


  d3.select( "[name = '" + linename + "neg" + "']" ).each( function( d, i )

    {
      d3.select( this )
        .append( "div" )
        .attr( "class", "graph-value-bar graph-row-neg-1" )
        .attr( "id", linename + "-graph-row-neg-1" )
        .text( function( d ) {
          return leftData[ j ];
        } )
        .style( "width", function( d ) {
          return leftData[ j ] * 3 + "px";

        } )
        .append( "span" )
        .attr( "class", "value-legend" )
        .text( "No" );
    } );



  d3.select( "[name = '" + linename + "neg" + "']" ).each( function( d, i ) {
    d3.select( this )
      .append( "div" )
      .attr( "class", "graph-value-bar graph-row-neg-2" )
      .attr( "id", linename + "-graph-row-neg-2" )
      .text( function( d ) {
        return leftData[ j + 1 ];
      } )
      .style( "width", function( d ) {
        return leftData[ j + 1 ] * 3 + "px";
      } )
      .append( "span" )
      .attr( "class", "value-legend" )
      .text( "I don't know" );
  } );


  d3.select( "[name = '" + linename + "']" ).each( function( d, i ) {
    d3.select( this )
      .append( "div" )
      .attr( "class", "graph-row-pos" )
      .attr( "name", linename + "pos" );
  } );







  d3.select( "[name = '" + linename + "pos" + "']" ).each( function( d, i ) {
    d3.select( this )
      .append( "div" )
      .attr( "class", "graph-value-bar graph-row-pos-1" )
      .attr( "id", linename + "-graph-row-pos-1" )
      .text( function( d ) {
        return rightData[ k ];
      } )
      .style( "width", function( d ) {
        return rightData[ k ] * 3 + "px";
      } )
      .append( "span" )
      .attr( "class", "value-legend" )
      .text( "Yes" );
  } );

  j = j + 2;
  k = k + 1;

} );


var barline = d3.selectAll( ".demand-graph-row" )

barline.on( "click", click );

function click( d ) {

  var w1 = d3.select( "[id = '" + d + "-demand-graph-row-neg-1" + "']" ).style( "width" );
  var w2 = d3.select( "[id = '" + d + "-demand-graph-row-neg-2" + "']" ).style( "width" );
  var w4 = d3.select( "[id = '" + d + "-demand-graph-row-pos-1" + "']" ).style( "width" );


  d3.select( "[name = '" + d + "-demand']" ).remove();
  var bartop = d3.select( '#graph-compare-2' )

  bartop.append( "div" )
    .attr( "class", "demand-graph-row" )
    .attr( "name", d + "-demand" )
    .append( "span" )
    .attr( "class", "graph-row-country" )
    .text( d );

  d3.select( "[name = '" + d + "-demand']" )
    .append( "div" )
    .attr( "class", "graph-row-neg" )
    .attr( "name", d + "-demandneg" );

  tempname = d + "-demandneg";

  d3.select( "[name = '" + tempname + "']" )
    .append( "div" )
    .attr( "class", "graph-row-neg-1" )
    .text( w1.replace( "px", "" ) / 3 + "%" )
    .style( "width", w1 )
    .append( "span" )
    .attr( "class", "value-legend" )
    .text( "No" );

  d3.select( "[name = '" + tempname + "']" )
    .append( "div" )
    .attr( "class", "graph-row-neg-2" )
    .text( w2.replace( "px", "" ) / 3 + "%" )
    .style( "width", w2 )
    .append( "span" )
    .attr( "class", "value-legend" )
    .text( "I don't know" );


  d3.select( "[name = '" + d + "-demand']" )
    .append( "div" )
    .attr( "class", "graph-row-pos" )
    .attr( "name", d + "-demandpos" );

  tempname = d + "-demandpos";


  d3.select( "[name = '" + tempname + "']" )
    .append( "div" )
    .attr( "class", "graph-row-pos-1" )
    .text( w4.replace( "px", "" ) / 3 + "%" )
    .style( "width", w4 )
    .append( "span" )
    .attr( "class", "value-legend" )
    .text( "Yes" );
}

// Checks if the #graph-compare area is empty to properly show/hide the legends.
if ( $( '#graph-compare' ).is( ':empty' ) ) {
  $( '#graph-compare' ).next().addClass( 'show-legend' );
};