import SkeletonProductList from "../_components/skeleton-product-list";
import { Skeleton } from "../_components/ui/skeleton";

const HomeLoading = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-8">
        <div className="h-12 border-b-2 flex items-center px-5">
          <Skeleton className="h-6 w-[120px]" />
        </div>
        <div className="mx-5 space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <SkeletonProductList />
          <Skeleton className="h-40 w-full" />
          <SkeletonProductList />
        </div>
      </main>
      <footer className="mt-auto">
        <Skeleton className="h-12 w-full" />
      </footer>
    </div>
  );
};

export default HomeLoading;
