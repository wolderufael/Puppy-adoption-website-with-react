import { useQuery } from "@tanstack/react-query";
import fetchBreedlist from "./fetchBreedlist";



export default function useBreedlist(animal) {
  const results=useQuery(["details",animal],fetchBreedlist)
  return [results?.data?.breeds ??[], results.status];
}
