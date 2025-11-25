import { Plus } from "lucide-react";
import { Loading } from "@/components/Loading";
import { db } from "@/lib/db"
import { useEffect, useState } from "react";
import { CollectionCard } from "@/components/CollectionCard";
import { useParams } from "react-router-dom";

export default function Collections() {
    const {slug} = useParams()
    // if(loading) return <Loading/>
  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Collections</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your backend applications and services</p>
          </div>
          {/* <FormWrapper title={<Title>
            <Plus className="h-4 w-4" />
            New Application</Title>}>
            <ApplicationForm/>
            </FormWrapper> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
         <CollectionCard name={"Testing Collection"} status={"active"} requests={"17"} lastDeployed={"19-10-2025 8:29"} slug={slug} CollectionSlug={"testingCollection"}/>
        </div>
      </div>
    </>
  );
}
