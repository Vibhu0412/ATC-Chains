import React from "react";
import { motion } from "framer-motion";
import {
  BannerImage,
  HeadSection,
  IndustryDetails,
  Layout,
} from "../../../components";

const index = () => {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <HeadSection
        title={"Industry-details | ATC Chains India"}
        description={"description"}
        keyWords={"Keywords"}
      />
      <Layout>
        <BannerImage
          image={"/assets/icons/svg/findSolutionBg.svg"}
          text=""
          description=""
        />
        <IndustryDetails />
      </Layout>
    </motion.div>
  );
};

export default index;
