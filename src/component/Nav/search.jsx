

const NavSearch=({query,setquery})=>{

  return(
    <>
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
    </>
  )
}
export default NavSearch 