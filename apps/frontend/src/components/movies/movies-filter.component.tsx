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
import { genres } from "./types/movie.type";
import { Card } from "@/components/ui/card";

const sortingOptions = [
  { value: "releaseYear", label: "Release Year" },
  { value: "averageRating", label: "Average Rating" },
  { value: "numberOfRatings", label: "Number of Ratings" },
  { value: "numberOfComments", label: "Number of Comments" },
];

export const MoviesFilter: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSearch = () => {
    // Handle the search logic here
    console.log("Search Title:", searchTitle);
    console.log("Release Year:", releaseYear);
    console.log("Selected Genre:", selectedGenre);
    console.log("Sort Criteria:", sortCriteria);
    console.log("Sort Order:", sortOrder);
  };

  const handleReset = () => {
    setSearchTitle("");
    setReleaseYear("");
    setSelectedGenre("");
    setSortCriteria("");
    setSortOrder("asc");
  };

  return (
    <Card className="p-4 m-4 mb-0">
      <div className="flex w-full  items-center space-x-2">
        <Input
          type="search"
          placeholder="Search title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Input
          className="w-[240px]"
          type="number"
          placeholder="Release year"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />

        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
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

        <Select value={sortCriteria} onValueChange={setSortCriteria}>
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

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </Card>
  );
};
