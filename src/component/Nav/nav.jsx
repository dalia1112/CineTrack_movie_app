import NavLogo from "./logo";
import NavSearch from "./search";
import MovieLength from "./movielength";

const Nav=({movies,query,setQuery})=>{
  return(
    <div>
        <nav className="nav-bar">
          <NavLogo/>
          <NavSearch query={query} setquery={setQuery}/>
          <MovieLength movies={movies}/>
        
        
        
      </nav>
    </div>
  )
}
export default Nav