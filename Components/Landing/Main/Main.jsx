"use client";
import { useGetAllDataQuery } from "@/Apis/others/newApi";
import React from "react";

export default function Main() {
  const { data } = useGetAllDataQuery();
  console.log(data);
  return <div>Main</div>;
}
