const vm =new Vue({
    el:'#app',
    data:{
        contentTopName:'熱門電影',
        currentMethod:'',
        searchFlag:{
            currentName:'',
            searchName:'',
        },
        fetchBody:{
            imgUrl:'https://image.tmdb.org/t/p/w400/',
            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGVhZjk1NmVhNDU5MDhhZThmYTg1MTFiMDI0NGYyMSIsInN1YiI6IjY1NzE2NTk0YjA0NjA1MDEzYTM3NWQzMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T270smknuHJROMDDrX881owKFSw1lTQvTSX18Afjfsc'
        },
        MovieList:[],
        pageId:1,
        totalPages:0,
        isLoaded:false,
    },
    methods:{
        init(){
            this.getPopularMovie(1);
            window.addEventListener('keydown',(e)=>{
                if(e.key=='Enter' && this.searchFlag.searchName!='') this.searchMovie(1);
            })
        },
        searchMovie(index){
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
        getPopularMovie(index){
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
        getNowPlaying(index){
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
        getUpcoming(index){
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
        getTopMovie(index){
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
                this.currentMethod(this.pageId);
            } 
            else if(flag=='next' && this.pageId<this.totalPages){
                this.pageId++;
                this.currentMethod(this.pageId);
            }
        }
    }
})
vm.init();