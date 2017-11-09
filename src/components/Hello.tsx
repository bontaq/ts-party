import * as React from "react";
import Button from "./Button";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) => (
    <div>
        <h1>Hello from Ian {props.compiler} and {props.framework}</h1>
        <Button>Search</Button>
    </div>
);
