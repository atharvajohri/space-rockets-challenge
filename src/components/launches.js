import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  isFavorite,
} from "../store/favoritesSlice";

import { Badge, Box, Image, SimpleGrid, Text, Flex } from "@chakra-ui/core";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";

import { useSpaceXPaginated } from "../utils/use-space-x";
import { formatDate } from "../utils/format-date";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";

import LikeButton from "./like-button";

const PAGE_SIZE = 12;
const RESOURCE_KEY = "flight_number";

export default function Launches() {
  const { data, error, isValidating, setSize, size } = useSpaceXPaginated(
    "/launches/past",
    {
      limit: PAGE_SIZE,
      order: "desc",
      sort: "launch_date_utc",
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data &&
          data
            .flat()
            .map((launch) => (
              <LaunchItem key={launch[RESOURCE_KEY]} launch={launch} />
            ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize(size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

//Launch Item comes now in a new Mini flavor 
//the mini version is rendered in the sidebar
export function LaunchItem({ launch, mini = false }) {
  const dispatch = useDispatch();
  const isFavorited = useSelector((state) =>
    isFavorite(state, { idKey: RESOURCE_KEY, id: launch[RESOURCE_KEY] })
  );
  return (
    <Box
      as={Link}
      to={`/launches/${launch[RESOURCE_KEY].toString()}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
    >
      {!mini && (
        <Image
          src={
            launch.links.flickr_images[0]?.replace("_o.jpg", "_z.jpg") ??
            launch.links.mission_patch_small
          }
          alt={`${launch.mission_name} launch`}
          height={["200px", null, "300px"]}
          width="100%"
          objectFit="cover"
          objectPosition="bottom"
        />
      )}

      {!mini && (
        <Image
          position="absolute"
          top="5"
          right="5"
          src={launch.links.mission_patch_small}
          height="75px"
          objectFit="contain"
          objectPosition="bottom"
        />
      )}

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {launch.launch_success ? (
            <Badge px="2" variant="solid" variantColor="green">
              Successful
            </Badge>
          ) : (
            <Badge px="2" variant="solid" variantColor="red">
              Failed
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {launch.rocket.rocket_name} &bull; {launch.launch_site.site_name}
          </Box>
          <LikeButton
            isFavorited={isFavorited}
            addFavorite={() => dispatch(addFavorite(launch))}
            removeFavorite={() =>
              dispatch(removeFavorite({ item: launch, idKey: RESOURCE_KEY }))
            }
          />
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {launch.mission_name}
        </Box>
        {!mini && (
          <Flex>
            <Text fontSize="sm">{formatDate(launch.launch_date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.launch_date_local)}
            </Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
