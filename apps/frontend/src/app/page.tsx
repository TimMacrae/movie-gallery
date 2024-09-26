import { MovieMostDiscussed } from "@/components/movies/movie-most-discussed";
import { MovieTop10 } from "@/components/movies/movie-top-10.component";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative h-[60vh]">
        <Image
          src="/assets/dune-part-two-2.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 transform scale-x-[-1]"
        />
        <div className="absolute inset-0 "></div>
        <div className="absolute left-8 top-1/3 transform -translate-y-1/2 z-20">
          <h1 className=" text-white text-5xl ">MOVIE GALLERY</h1>
          <p className="text-white mt-4">
            Discover movie ratings, add your own films. <br />
            Curate your list of favorites.
            <br />
            Dive into the world of cinema!
          </p>
        </div>
      </div>
      <MovieTop10 />
      <MovieMostDiscussed />
    </>
  );
}
