

document.addEventListener('DOMContentLoaded',(e)=>{
    
    //Variables and Elements
    var open_menu = false ;
    var menu = document.getElementById('menu');
    var movies_container = document.querySelector('.movies-container')
    var nav_trending , nav_popular = false
    var nav_home = true
    var year = new Date().getFullYear()
    var loading_el = document.querySelector('.loading-message')

    
    // functions

        const fetchMovies = (limit,sort,type,query,year,genres)=>{
            var page = (movies_container.children.length/24) + 1
            loading_el.style.display = "initial"
        
            const options = {
                method: 'GET',
                url: 'https://movies-app1.p.rapidapi.com/api/movies',
                params: {
                page: page,
                limit: limit,
                sort: sort,
                type: type,
                query: query,
                year: year,
                genres: genres
                },
                headers: {
                'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                }
            };
            
            axios.request(options).then(function (response) {
                    if(response.messageStatus = "OK" && response.data.results.length != 0){
                        loading_el.style.display = "none"
                        parseFetchResults(response.data.results)
                    }else{
                        fetchMovies('','title','','','','')
                    }
                    console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                    fetchMovies('','title','','','','')
                });
            }
        const fetchGenres = ()=>{
            var genres_container = document.querySelector('.genres')
            const options = {
                method: 'GET',
                url: 'https://movies-app1.p.rapidapi.com/api/genres',
                headers: {
                'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
                }
            };
            
            axios.request(options).then(function (response) {
                var results = response.data.results
                if(response.messageStatus = "OK" && results.length != 0){
                    for(var i=0; i<results.length; i++){
                    genres_container.innerHTML += '<li class="dropdown-item">'+ results[i].name +'</li>';
                    }
                }
                }).catch(function (error) {
                    console.log(error);
                    fetchGenres()
                });
            }
        
        var parseFetchResults = (results)=>{
                
            results.forEach((result)=>{
                var movie_img = result.image
                var movie_title = result.title
                var movie_description = result.description
                var rating = result.rating
                
                movies_container.innerHTML += '<div class="movie"><img class="movie-img" src="'+ movie_img +
                '" alt="movie image"><p class="rating">'+ rating +
                '</p><p class="visible-movie-title">'+ movie_title +
                '</p><div class="movie-text-container"><h1 class="movie-name">'+ movie_title +
                '</h1><h5>'+ movie_description +'</h5></div></div>'
            })
        
        
        }
        var scrollEventListener = (e)=>{
            var scrollable = Math.round(document.documentElement.scrollHeight - window.innerHeight )
            var scrollY = Math.ceil(window.scrollY)
            // console.log(scrollable,scrollY);
    
            if(scrollable === scrollY){
                if(nav_home){
                    fetchMovies('','title','movies','','','');
                }else if(nav_popular){
                    fetchMovies('','rating','','','','');
                }else if(nav_trending){
                    year -= 1
                    fetchMovies('','rating','','',year,'');
                }
            }
            
        }
        
   


    // event liteners
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
    
    document.addEventListener('scroll',scrollEventListener)    

    document.querySelector('.nav-home')
    .addEventListener('click',(e)=>{
        if(! nav_home){
            for(var i=0; i<movies_container.children.length; i++){
                movies_container.innerHTML = ""
            }
        }
        fetchMovies('','title','movies','','','');
        nav_home=true; nav_popular,nav_trending=false;
        year = new Date().getFullYear()
    })
    document.querySelector('.nav-trending')
    .addEventListener('click',(e)=>{
        if(! nav_trending){
            for(var i=0; i<movies_container.children.length; i++){
                movies_container.innerHTML = ""
            }
        }
        fetchMovies('','rating','','',year,'');
        nav_trending=true; nav_popular,nav_home=false;
    })
    document.querySelector('.nav-popular')
    .addEventListener('click',(e)=>{
        if(! nav_popular){
            for(var i=0; i<movies_container.children.length; i++){
                movies_container.innerHTML = ""
            }
        }
        fetchMovies('','rating','','','','');
        nav_popular=true; nav_home,nav_trending=false;
        year = new Date().getFullYear()
    })
    document.querySelector('.search')
    .addEventListener('keypress',(e)=>{
        document.addEventListener('scroll',(e)=>{})
        if(e.key === "Enter"){
            for(var i=0; i<movies_container.children.length; i++){
                movies_container.innerHTML = ""
            }
            fetchMovies('','title','',document.querySelector('.search').value,'','')
            year = new Date().getFullYear()
        }
    })
    
    
    








    // STARTUP FUNCTIONS
    fetchMovies('','title','movies','','','');
    fetchGenres()
    // console.log(document.documentElement.scrollHeight , window.innerHeight);
    // console.log("2"+window.scrollY);
    // console.log("3"+window.scrollHeight);
    // console.log("4"+document.documentElement.clientHeight);

    
    




    })



