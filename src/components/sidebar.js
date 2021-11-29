import React from "react";
import { useSelector /* useDispatch */ } from "react-redux";
import {
  // addFavorite,
  // removeFavorite,
  // isFavorite,
  getFavorites,
} from "../store/favoritesSlice";

import {
  Text,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Stack,
} from "@chakra-ui/core";

import { LaunchItem } from "./launches";
import { LaunchPadItem } from "./launch-pads";

const LAUNCH_RESOURCE_KEY = "flight_number";
const LAUNCH_PAD_RESOURCE_KEY = "site_id";

const SidebarContent = () => {
  const favorites = useSelector(getFavorites);
  const favoriteLaunches = favorites.filter((f) =>
    f.hasOwnProperty(LAUNCH_RESOURCE_KEY)
  );

  const favoriteLaunchPads = favorites.filter((f) =>
    f.hasOwnProperty(LAUNCH_PAD_RESOURCE_KEY)
  );

  return (
    <Stack>
      <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
        Launch Pads
      </Text>
      {favoriteLaunchPads && favoriteLaunchPads.length > 0 ? (
        favoriteLaunchPads
          .flat()
          .map((launchPad) => (
            <LaunchPadItem
              key={launchPad[LAUNCH_PAD_RESOURCE_KEY]}
              launchPad={launchPad}
              mini
            />
          ))
      ) : (
        <Text color="gray.500" fontSize="xs">
          No favorite launch pads
        </Text>
      )}

      <Text color="gray.700" fontSize={["md", null, "lg"]} my="8">
        Launches
      </Text>
      {favoriteLaunches && favoriteLaunches.length > 0 ? (
        favoriteLaunches
          .flat()
          .map((launch) => (
            <LaunchItem
              key={launch[LAUNCH_RESOURCE_KEY]}
              launch={launch}
              mini
            />
          ))
      ) : (
        <Text color="gray.500" fontSize="xs">
          No favorite launches
        </Text>
      )}
    </Stack>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer placement="right" isOpen={isOpen} onClose={onClose} size="sm">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Favorites</DrawerHeader>
          <DrawerBody>
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default Sidebar;
