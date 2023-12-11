import { TextField, Button } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const Loading = () => {
    
  return (
    <div className="max-w-xl">
        <Skeleton height={50}/>
        <Skeleton height={500}/> 
    </div>
  );
};

export default Loading;
