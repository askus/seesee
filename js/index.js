function get_demo_data(){
	var data_sources = [ "HumanRightsWatch.json", "Parent.LGBT.json","TaiwanHotline.json", "The-New-Civil-Rights-Movement.json","weallsupporttapcprdraft.json"];

    var data = []; 
    data_sources.forEach( function( ds ){
            var link = "data/" + ds; 
            $.getJSON( link , function( ret_data ){
                    ret_data.data.forEach( function ( ret_datum ){
                            data.push( ret_datum);
                        }
                    );
                    console.log( data );
           		} 
            );
            console.log( data );

        }
    );
    console.log( "DATA: ");
    console.log( data );
    return data;
}

function update_hot_news( post ){
    console.log( post);
	var text = "<h2>"+ post.name +"</h2>"+
                "<div>"+
                    "<div style='float:left'>" + "<img src=\"" + post.picture + "\">" +"</div>"+
                    "<div style='float:left'>" +  
                        "<p>" +  post.message+"</p>"+ 
                    "</div>" +
                "</div>"; 
    $("div.jumbotron div.container").html( text );
} 

function update_posts( posts ){

    // sep by three 
    sep_posts_by_three = [];
    var slot = [];
    for( var i =0 ;i < posts.length ; i++){        
        slot.push( posts[i] );
        if( (i +1) %3 == 0 ){
            sep_posts_by_three.push( slot );
            slot=[];
        }
    }
    if( posts.length % 3 != 0 ){
        sep_posts_by_three.push( slot );
    }

    var text = "";
    // update per row 
    for( var row_i = 0;row_i < sep_posts_by_three.length; row_i++ ){
        text += '<div class="post-row row">';
        for( var col_j = 0 ; col_j < sep_posts_by_three[ row_i].length; col_j++ ){
            var item = sep_posts_by_three[row_i][col_j] ;
            text += '<div class="col-md-4">';
            text += '<div class="post-video"><iframe width="280" height="200" src="//www.youtube.com/embed/'+item.youtube_code+'" frameborder="0" allowfullscreen></iframe></div>';
            text += '<div class="post-tool"><a class="btn btn-primary btn-xs" target="_blank" href="'+item.source+'">更多</a> <a class="btn btn-warning btn-xs share-btn" href="https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent("http://youtu.be/"+ item.youtube_code )+'" target="_blank">分享</a></div>';
            text += '<div class="post-title" >' + item.name +'</div>'; 
            text += '<div class="post-source-name">轉貼來源--' + item.from.name+'</div>';
            text += '<div class="post-captain"><p>' + item.message + '</p></div>';
            text += '</div>';
        }
        text += '</div>';
    }
    $("#posts").html( text );

}

function open_share_dialog(shared_link ){
    window.open( 
            shared_link,
            'sharer', 
            'width=626,height=436'
    );
}
