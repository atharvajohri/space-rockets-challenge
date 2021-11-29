import React from "react";
import { Button } from "@chakra-ui/core";
import { StarIcon } from "@chakra-ui/icons";

export default function LikeButton({
  item,
  addFavorite,
  removeFavorite,
  isFavorited = false,
}) {
  return (
    <Button
      position="relative"
      left="5"
      fontSize="xs"
      size="xs"
      variant={isFavorited ? "dark" : "outline"}
      opacity={isFavorited ? 1 : 0.5}
      _hover={{
        opacity: 1,
      }}
      background={isFavorited ? "#333" : "#fafafa"}
      color={isFavorited ? "#fafafa" : "#333"}
      d="flex"
      alignItems="center"
      onClick={(e) => {
        isFavorited ? removeFavorite(item) : addFavorite(item);
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {isFavorited ? "Liked" : "Like"}&nbsp;
      <StarIcon w={12} h={12} color="gray" />
    </Button>
  );
}
