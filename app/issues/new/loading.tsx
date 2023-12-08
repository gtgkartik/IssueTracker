import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
    
  return (
    <div className="max-w-xl">
        <Skeleton/>
        <Skeleton count={10} /> 
    </div>
  );
};

export default Loading;
