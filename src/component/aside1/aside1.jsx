import {  useState } from "react"
import Button from "../Box"
import MovieList from "./MovieList"

const Aside=({movies})=>{
  const [isOpen, setIsOpen]=useState(true)
  const onMinimizeMaximize=()=>{
    setIsOpen(open=> !open)
  }

  return(
    <>
    <div className="box">
      <Button isOpen={isOpen} ontoggle={onMinimizeMaximize}/>
          
      <MovieList isOpen={isOpen} movies= {movies}/>
        </div>

    </>
  )
}
export default Aside