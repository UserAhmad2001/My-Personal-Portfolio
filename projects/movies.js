
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


    const fetchMoviesHome = ()=>{
                fetch('https://movies-app1.p.rapidapi.com/api/movies', {method: 'GET',headers: {
                'X-RapidAPI-Key': '9cbb95a928msh2821046b9963db6p18054djsn98224f99e3f9',
                'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com' ,
                'params':'{query:"scooby doo"}'}})
                .then(response => response.json())
                .then(response => parseFetchResults(response.results) )
                .catch(err => console.error(err));
            }

    var parseFetchResults = (results)=>{
        var movies_container = document.querySelector('.movies-container')

        console.log(results);
        
        results.forEach((result)=>{
            var movie_img = result.image
            var movie_title = result.title
            var movie_description = result.description
            var rating = result.rating

            movies_container.innerHTML += '<div class="movie"><img class="movie-img" src="'+ movie_img +
            '" alt="movie image"><p class="visible-movie-title">'+ movie_title +
            '</p><div class="movie-text-container"><h1 class="movie-name">'+ movie_title +
            '</h1><h5>'+ movie_description +'</h5><span id="rating">Rating: '+ rating +'</span></div></div>'
        })


    }






    
    




    })



