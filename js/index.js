const vm =new Vue({
    el:'#app',
    data:{
        contentTopName:'熱門電影',
        currentMethod:'',
        searchFlag:{
            currentName:'',
            searchName:'',
        },
        previewList:[],
        fetchBody:{
            imgUrl:'https://image.tmdb.org/t/p/w400/',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGVhZjk1NmVhNDU5MDhhZThmYTg1MTFiMDI0NGYyMSIsInN1YiI6IjY1NzE2NTk0YjA0NjA1MDEzYTM3NWQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T270smknuHJROMDDrX881owKFSw1lTQvTSX18Afjfsc'
        },
        MovieList:[],
        pageId:1,
        totalPages:0,
        isLoaded:false,
        pageType:1,
    },
    mounted(){
        this.getPopularMovie(1);
        this.toggleBar();
        window.addEventListener('keydown',(e)=>{
            if(e.key=='Enter' && this.searchFlag.searchName!='') this.searchMovie(1,'auto');
        })
    }
    ,
    methods:{
        searchMovie(index,flag){
            this.scrollToTop();
            this.toggleBar(flag);
            this.pageType=1;
            this.isLoaded=false;
            this.currentMethod=this.searchMovie;
            this.contentTopName='搜尋結果';
            this.searchFlag.currentName=this.searchFlag.searchName;
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: this.fetchBody.Authorization
                }
            };
            fetch('https://api.themoviedb.org/3/search/movie?query='+this.searchFlag.searchName+'&include_adult=false&language=zh-tw&page='+index, options)
            .then(resp => resp.json())
            .then(resp =>{
                this.MovieList=resp;
                this.pageId=resp['page'];
                this.totalPages=resp['total_pages'];
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        getPopularMovie(index,flag){
            this.scrollToTop(0);
            this.toggleBar(flag);
            this.pageType=1;
            this.searchFlag.searchName='';
            this.isLoaded=false;
            this.currentMethod=this.getPopularMovie;
            this.contentTopName='熱門電影';
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: this.fetchBody.Authorization
                }
              };
              
            fetch('https://api.themoviedb.org/3/movie/popular?language=zh-tw&page='+index, options)
            .then(response => response.json())
            .then(resp => {
                this.MovieList=resp;
                this.pageId=resp['page'];
                this.totalPages=resp['total_pages'];
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        getNowPlaying(index,flag){
            this.scrollToTop();
            this.toggleBar(flag);
            this.pageType=1;
            this.searchFlag.searchName='';
            this.isLoaded=false;
            this.currentMethod=this.getNowPlaying;
            this.contentTopName='現正熱映中';
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: this.fetchBody.Authorization
                }
              };
              
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=zh-tw&page='+index, options)
            .then(response => response.json())
            .then(resp => {
                this.MovieList=resp;
                this.pageId=resp['page'];
                this.totalPages=resp['total_pages'];
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        getUpcoming(index,flag){
            this.scrollToTop();
            this.toggleBar(flag);
            this.pageType=1;
            this.searchFlag.searchName='';
            this.isLoaded=false;
            this.currentMethod=this.getUpcoming;
            this.contentTopName='即將推出';
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: this.fetchBody.Authorization
                }
              };
            fetch('https://api.themoviedb.org/3/movie/upcoming?language=zh-tw&page='+index, options)
            .then(response => response.json())
            .then(resp => {
                this.MovieList=resp;
                this.pageId=resp['page'];
                this.totalPages=resp['total_pages'];
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        getTopMovie(index,flag){
            this.scrollToTop();
            this.toggleBar(flag);
            this.pageType=1;
            this.searchFlag.searchName='';
            this.isLoaded=false;
            this.currentMethod=this.getTopMovie;
            this.contentTopName='最高評分';
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: this.fetchBody.Authorization
                }
              };
            fetch('https://api.themoviedb.org/3/movie/top_rated?language=zh-tw&page='+index, options)
            .then(response => response.json())
            .then(resp => {
                this.MovieList=resp;
                this.pageId=resp['page'];
                this.totalPages=resp['total_pages'];
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        changePageIndex(flag){
            if(flag=='before' && this.pageId!=1){
                this.pageId--;
                this.currentMethod(this.pageId,'auto');
            } 
            else if(flag=='next' && this.pageId<this.totalPages){
                this.pageId++;
                this.currentMethod(this.pageId,'auto');
            }
        },
        getPreview(){
            this.scrollToTop();
            this.toggleBar();
            this.pageType=2;
            this.searchFlag.searchName='';
            this.isLoaded=false;
            this.currentMethod=this.getPreview;
            this.contentTopName='最新預告';
            const options = {
                method: 'GET',
                redirect:'follow'
            };
            fetch('https://script.google.com/macros/s/AKfycbxx4__DOyEnXGXwQlX7_ODgZVHmsyaMEVGi7GugXVdwp6p-19eGyEIJ7a7kxJJOH74/exec', options)
            .then(response => response.json())
            .then(resp => {
                this.previewList=resp;
                this.isLoaded=true;
            })
            .catch(err => console.error(err));
        },
        scrollToTop(num){
            window.scrollTo({
                top: num==undefined?320:num,
                behavior: "smooth"
            })
            this.toggleBar('close');
        },
        toggleBar(flag){
            var dom =document.getElementById('navBar');
            if(flag==undefined) dom.classList.toggle('showBar');
        }
    }
})
