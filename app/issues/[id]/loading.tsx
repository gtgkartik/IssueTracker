import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const loading = async() => {
  return (
    <div>
      <Heading as="h2">
        <Skeleton width={400}/>
      </Heading>
      <Flex gap="3" my="2">
      <Skeleton width={200}/>
      <Skeleton width={40}/>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={5}/>
      </Card>
    </div>
  );
};

export default loading;
