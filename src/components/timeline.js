import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdArticle } from "react-icons/md";
import { BiRocket } from "react-icons/bi";
import { GiMagnifyingGlass } from "react-icons/gi";
import { SiWikipedia } from "react-icons/si";
import { Button, Link, Text, Tooltip } from "@chakra-ui/core";
import { Link as BrowserLink } from "react-router-dom";

import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginated } from "../utils/use-space-x";
import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import { formatDateTime } from "../utils/format-date";

const PAGE_SIZE = 100;

export default function Timeline() {
  const { data, error, isValidating, size, setSize } = useSpaceXPaginated(
    "/history?order=desc",
    {
      limit: PAGE_SIZE,
    }
  );
  if (error) return <Error />;
  if (!data) return <Error />;

  return (
    <div style={{ backgroundColor: "#dedede" }}>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Timeline" }]}
      />
      <VerticalTimeline>
        {data.length &&
          data.flat().map((item, index) => (
            <VerticalTimelineElement
              key={item.id}
              contentArrowStyle={{ borderRight: "7px solid #222" }}
              date={formatDateTime(item.event_date_utc)}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<BiRocket />}
              contentStyle={{
                border: "2px solid #222",
                backgroundColor: "#efefef",
              }}
            >
              <Text color="black.700" fontSize={["md", null, "lg"]} my="8">
                {item.title}
              </Text>
              <div style={{ marginTop: "5px" }}>
                {item.flight_number && (
                  <Tooltip label="View more details about this launch">
                    <Link
                      as={BrowserLink}
                      to={`/launches/${item.flight_number}`}
                    >
                      <Button size="sm" mx="3px" background="white">
                        <GiMagnifyingGlass />
                      </Button>
                    </Link>
                  </Tooltip>
                )}
                {item.links.article && (
                  <Tooltip label="Read linked article">
                    <Link href={item.links.article} isExternal>
                      <Button size="sm" mx="3px" background="white">
                        <MdArticle />
                      </Button>
                    </Link>
                  </Tooltip>
                )}
                {item.links.wikipedia && (
                  <Tooltip label="Read Wikipedia entry">
                    <Link href={item.links.wikipedia} isExternal>
                      <Button size="sm" mx="3px" background="white">
                        <SiWikipedia />
                      </Button>
                    </Link>
                  </Tooltip>
                )}
              </div>
              <Text color="black.700" fontSize="md" my="8">
                {item.details}
              </Text>
            </VerticalTimelineElement>
          ))}

        <LoadMoreButton
          loadMore={() => setSize(size + 1)}
          data={data}
          pageSize={PAGE_SIZE}
          isLoadingMore={isValidating}
        />
      </VerticalTimeline>
    </div>
  );
}
