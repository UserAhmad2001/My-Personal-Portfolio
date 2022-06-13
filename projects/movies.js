
document.addEventListener('DOMContentLoaded',(e)=>{
    var open_menu = false ;

    var menu = document.getElementById('menu');
    menu.addEventListener('click',(e)=>{
        var menu_panel = document.querySelector(".sec-nav");
        menu_panel.style.transition = "transform .3s linear";
        var target = e.currentTarget;

        if(!open_menu){
            menu_panel.style.transform = "scaleX(1) ";
            open_menu = true
            menu.classList.replace("fa-bars" , "fa-xmark")
        }
        else{
            menu_panel.style.transform = "scaleX(0) ";
            open_menu = false
            menu.classList.replace("fa-xmark" , "fa-bars" )
        }

    })

    var movies_container = document.querySelector('.movies-container')
    parseFetchResults(fetchMovies("home",null))





    
    
    var fetchMovies = ( place , search)=>{

        var results = []
        switch(place){

            // WHEN THE HOME BUTTON IS PRESSED OR AT THE START OF THE APP
            case 'home':
                fetch('https://movies-app1.p.rapidapi.com/api/movies', {method: 'GET',headers: {
                'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
            }})

                .then(response => response.json())
                .then((response) => {
                    if(response.messageStatus === "OK"){
                        results = response.results
                    }else{
                        console.log("Something went wrong!!");
                    }
                })
                .catch(err => console.error(err));
                break;
                
            // WHEN THE TRENDING BUTTON IS PRESSED
                case 'trending':
                    fetch('https://movies-app1.p.rapidapi.com/api/movies', {method: 'GET',headers: {
                        'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                        'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                            }})
                            
                    .then(response => response.json())
                    .then((response) => {
                        if(response.messageStatus === "OK"){
                            results = response.results
                        }else{
                            console.log("Something went wrong!!");
                        }
                    })
                    .catch(err => console.error(err));
                    break;
                    
                // WHEN THE POPULAR BUTTON IS PRESSED
                    case 'popular':
                        fetch('https://movies-app1.p.rapidapi.com/api/movies', {method: 'GET',headers: {
                        'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                        'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                            }})
                            
                        .then(response => response.json())
                        .then((response) => {
                            if(response.messageStatus === "OK"){
                                results = response.results
                            }else{
                                console.log("Something went wrong!!");
                            }
                        })
                        .catch(err => console.error(err));
                        break;

                        
                // WHEN A MOVIE IS SEARCHED
                        case 'search':
                        fetch('https://movies-app1.p.rapidapi.com/api/movies', {method: 'GET',headers: {
                        'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                        'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                            }})
                            
                        .then(response => response.json())
                        .then((response) => {
                            if(response.messageStatus === "OK"){
                                results = response.results
                            }else{
                                console.log("Something went wrong!!");
                            }
                        })
                        .catch(err => console.error(err));
                break;
            
        }
        return results ;
    }

    var parseFetchResults = (results)=>{
        var movie = document.createElement('div')
        movie.classList.add('movie')

        for(i=0; i<results.length; i--){
            var movie_img = results[i].

            movie.innerHTML = '<img class="movie-img" src="'+movie_img+
            '" alt="movie image"><p class="visible-movie-title">'+movie_title+
            '</p><div class="movie-text-container"><h1 class="movie-name">'+movie_title+
            '</h1><h5>'+movie_description+'</h5><div class="rating-trailer"><span id="rating">Rating: '
            +rating+'/10</span><button id="watch-trailer-btn">WATCH TRAILER</button></div></div>'
        }
    }

})