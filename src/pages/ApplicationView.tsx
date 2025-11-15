// ApplicationView.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { db } from '@/lib/db';
import Loading from '@/components/Loading';
import {DataTable} from '@/components/DataTable'; // ensure default export matches
import { CollectionSidebar } from '@/components/CollectionSidebar';
import { DATABASE_URL } from '@/lib/env';

export function ApplicationView() {
  const { slug } = useParams<{ slug: string }>();
  const { loading, getApplication } = db();
  const [application, setApplication] = useState<any | null>(null);

  // Sidebar / Table state
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collectionDocs, setCollectionDocs] = useState<any[] | null>(null);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsError, setDocsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (slug) {
        const appData = await getApplication(slug);
        setApplication(appData);
      }
    };
    fetchApplication();
  }, [slug]);

  // Handler called by CollectionSidebar
  const handleCollectionSelect = useCallback(async (collectionSlug: string) => {
    setSelectedCollection(collectionSlug);
    setCollectionDocs(null);
    setDocsError(null);
  }, [slug]);

  return (
    <DashboardLayout>
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          <div className="flex gap-4">
            <CollectionSidebar
              collections={application?.collections ?? []}
              onCollectionSelect={handleCollectionSelect}
            />

            <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">Application Details</h1>
            <p className="mb-4">Application ID: {slug}</p>
              <DataTable />

              {docsError && <div className="mt-2 text-sm text-red-600">{docsError}</div>}

              {/* {application && (
                <div className="mt-4">
                  <pre className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                    {JSON.stringify(application, null, 2)}
                  </pre>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
