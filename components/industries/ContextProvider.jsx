import { useQuery } from "@tanstack/react-query";
import { Accordion, Button, Tabs } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { getIndustryList } from "../../fetchers/universalFetch";

const ContextProvider = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const [industriesList, setIndustriesList] = useState();
  const tabsRef = useRef(null);
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["industrylist"],
    queryFn: getIndustryList,
    refetchOnWindowFocus: false,
  });
  console.log("data", data?.data?.Industry);
  let industriesList = data?.data?.Industry;

  console.log("industriesList", industriesList);
  return (
    <Accordion>
      {industriesList?.map((industry) => (
        <Accordion.Panel>
          <Accordion.Title className="w-72">
            {industry?.industry_category_name}
          </Accordion.Title>
          <Accordion.Content className="">
            <Tabs.Group
              className="flex"
              aria-label="Default tabs"
              style="default"
              ref={tabsRef}
              onActiveTabChange={(tab) => setActiveTab(tab)}
            >
              {industry?.industry_subcategory_name?.map((subIndu) => (
                <Tabs.Item
                  id={`#${subIndu?.name && subIndu?.name.split(" ").join("_")}`}
                  active
                  title={subIndu?.name}
                >
                  {subIndu?.description}
                </Tabs.Item>
              ))}
            </Tabs.Group>
          </Accordion.Content>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
};

export default ContextProvider;
