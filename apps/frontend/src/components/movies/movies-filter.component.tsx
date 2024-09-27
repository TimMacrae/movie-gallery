import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, MoviesQueryFilter } from "../../types/movie.type";

const sortingOptions = [
  { value: "release_date", label: "Release Year" },
  { value: "averageRating", label: "Average Rating" },
  { value: "ratings", label: "Number of Ratings" },
  { value: "commentsTotal", label: "Number of Comments" },
];

interface MoviesFilterProps {
  setMovieFilters: (filter: MoviesQueryFilter | null) => void;
  setPageNumber: (pageNumber: number) => void;
}

export const MoviesFilter: React.FC<MoviesFilterProps> = ({
  setMovieFilters,
  setPageNumber,
}) => {
  const [filter, setFilter] = useState({
    search: "",
    releaseYear: "",
    genre: "",
    sortBy: "",
    sortOrder: "asc",
  });

  const updateFilter = (name: string, value: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setPageNumber(1);
    setMovieFilters(filter);
  };

  const handleReset = () => {
    setFilter({
      search: "",
      releaseYear: "",
      genre: "",
      sortBy: "",
      sortOrder: "asc",
    });
    setMovieFilters(null);
    setPageNumber(1);
  };

  return (
    <div className="p-4 mt-8 mb-0">
      <div className="flex w-full  items-center space-x-2">
        {/* Title filter */}
        <Input
          type="search"
          name="search"
          placeholder="Search title"
          value={filter.search}
          onChange={(e) => updateFilter(e.target.name, e.target.value)}
        />

        {/* Release year filter */}
        <Input
          className="w-[240px]"
          name="releaseYear"
          type="number"
          placeholder="Release year"
          value={filter.releaseYear}
          onChange={(e) => updateFilter(e.target.name, e.target.value)}
        />

        {/* Genre filter */}
        <Select
          value={filter.genre}
          onValueChange={(value) => updateFilter("genre", value)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SortBy filter */}
        <Select
          value={filter.sortBy}
          onValueChange={(value) => updateFilter("sortBy", value)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {sortingOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Order filter */}
        <Select
          value={filter.sortOrder}
          onValueChange={(value) => updateFilter("sortOrder", value)}
        >
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset and Search buttons */}
        <Button variant="outline" onClick={() => handleReset()}>
          Reset
        </Button>
        <Button onClick={() => handleSearch()}>Search</Button>
      </div>
    </div>
  );
};
