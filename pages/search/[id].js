import React from "react";
import { HeadSection, Layout } from "../../components";
import { SearchDetails } from "../../components/Ui";

const index = () => {
  return (
    <div>
      <HeadSection
        title={"Search || ATC Chains India"}
        description={"description"}
        keyWords={"Keywords"}
      />
      <Layout>
        <SearchDetails />
      </Layout>
    </div>
  );
};

export default index;
