
import { PlusCircle } from 'lucide-react';

const collections = [
  { id: '1', name: 'users' },
  { id: '2', name: 'products' },
  { id: '3', name: 'orders' },
];

export function CollectionSidebar() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">
        Collections
      </h2>
      <div className="space-y-1">
        {collections.map((collection) => (
          <a
            key={collection.id}
            href="#"
            className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-muted hover:text-primary"
          >
            {collection.name}
          </a>
        ))}
        <button className="mt-2 flex w-full items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90">
          <PlusCircle className="h-5 w-5" />
          New Collection
        </button>
      </div>
    </div>
  );
}
