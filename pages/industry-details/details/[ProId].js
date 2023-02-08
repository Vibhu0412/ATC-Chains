import { motion } from "framer-motion";
import React from "react";
import {
  BannerImage,
  HeadSection,
  IndustryDetails,
  Layout,
} from "../../../components";
import IndustryProductView from "../../../components/industries/elements/IndustryProductView";

const index = () => {
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <HeadSection
        title={"Industry-details - ATC Chains India"}
        description={"description"}
        keyWords={"Keywords"}
      />
      <Layout>
        <IndustryProductView />
      </Layout>
    </motion.div>
  );
};

export default index;
