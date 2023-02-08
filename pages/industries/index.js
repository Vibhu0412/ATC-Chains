import React from "react";
import {
  BannerImage,
  HeadSection,
  IndustriesPage,
  Layout,
  TitleSection,
} from "../../components";

const index = () => {
  return (
    <div>
      <HeadSection
        title={"Industries - ATC Chains India"}
        description={"description"}
        keyWords={"Keywords"}
      />
      <Layout>
        <BannerImage />
        <div className="py-14">
          <TitleSection name="industries" />
        </div>
        <IndustriesPage />
      </Layout>
    </div>
  );
};

export default index;
