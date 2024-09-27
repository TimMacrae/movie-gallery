import { HeroSection } from "@/components/hero-section.component";
import { MovieMostDiscussed } from "@/components/movies/movie-most-discussed";
import { MovieTop10 } from "@/components/movies/movie-top-10.component";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MovieTop10 />
      <MovieMostDiscussed />
    </>
  );
}
