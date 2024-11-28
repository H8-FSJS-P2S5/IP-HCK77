"use client";

import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export function ErrorAlert({message}) {
  return (
    <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">Error:</span> {message}
    </Alert>
  );
}
