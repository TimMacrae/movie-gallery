"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Plus, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser.query";
import {
  GalleryMovieDialogSchema,
  GalleryMovieDialogValues,
} from "./zod/gallery-movie-dialog-schema.zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, Movie } from "@/types/movie.type";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import axios from "axios";
import { APIROUTES } from "@/api/api-routes.config";
import { useAddGalleryMovieMutation } from "./query/use-add-gallery-movie.mutation";
import { useUpdateGalleryMovieMutation } from "./query/use-update-gallery-movie.mutation";
import { useToast } from "@/hooks/use-toast";

interface GalleryMoviesDialogProps {
  type: "edit" | "add";
  movie?: Movie;
}

export const GalleryMoviesDialog: React.FC<GalleryMoviesDialogProps> = ({
  type,
  movie,
}) => {
  const isTypeAdd = type === "add";
  const isTypeEdit = type === "edit";

  const { data: user } = useUser();
  const { mutate: addMovie } = useAddGalleryMovieMutation();
  const { mutate: updateMovie } = useUpdateGalleryMovieMutation();

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<GalleryMovieDialogValues>({
    resolver: zodResolver(GalleryMovieDialogSchema),
    defaultValues: { title: "", duration: "", plot: "" },
  });

  // If editing a movie, fill the form with the movie data
  useEffect(() => {
    if (!isTypeAdd && movie) {
      form.reset({
        title: movie?.title,
        genre: movie?.genre,
        duration: String(movie?.duration),
        plot: movie?.plot,
        release_date: new Date(movie?.release_date) || new Date(),
        poster: movie?.poster,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie, isTypeEdit]);

  const onSubmit = (data: GalleryMovieDialogValues) => {
    if (isTypeEdit && movie) {
      updateMovie({ ...movie, ...data });
      setIsOpen(false);
      return;
    }
    addMovie(data);
    form.reset();
    setIsOpen(false);
  };

  const handleOpneChange = (pre: boolean) => {
    setIsOpen(pre);
    form.reset();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          `${APIROUTES.API.ENDPOINT}${APIROUTES.API.UPLOAD_POSTER}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              withCredentials: true,
            },
          }
        );
        return response.data.poster;
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error uploading file",
          description: "Something went wrong with the image upload.",
        });
      }
    }
  };

  const hasError = Object.keys(form.formState.errors).length > 0;

  // If the user is not the owner of the movie, do not show the dialog
  if (!user) return null;
  if (user._id !== movie?.user_id) return null;

  return (
    <div className="absolute top-4 right-16">
      <Dialog
        open={isOpen}
        onOpenChange={(pre) => {
          handleOpneChange(pre);
        }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="px-2 py-1">
            {isTypeAdd && <Plus className="h-4 w-4" />}
            {isTypeEdit && <Edit className="h-4 w-4" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Add a movie</DialogTitle>
            <DialogDescription>
              {isTypeAdd && "Create a movie and add it to the gallery"}
              {isTypeEdit && "Edit the movie and save it to the gallery"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              {/* title fiel */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* release_date field */}
              <FormField
                control={form.control}
                name="release_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Release Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus={false}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                {/* Genre field */}
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* duration field */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* image upload field */}
              <FormField
                control={form.control}
                name="poster"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Upload Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const uploadURL = await handleFileUpload(e);
                          if (uploadURL) {
                            field.onChange(uploadURL);
                          }
                        }}
                        className="file-input"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* plot field */}
              <FormField
                control={form.control}
                name="plot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="sm:justify-start">
                <Button type="submit" disabled={hasError}>
                  {isTypeAdd && "Add movie to gallery"}
                  {isTypeEdit && "Update movie"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
