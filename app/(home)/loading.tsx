import SkeletonProductList from "@/app/_components/skeleton-product-list";
import { Skeleton } from "@/app/_components/ui/skeleton";
import Footer from "@/app/_components/footer";

const HomeLoading = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 space-y-8">
        <header className="border-b-2 px-5 py-2 flex items-center justify-between">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-8" />
        </header>

        <div className="mx-5 flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-20" />
        </div>

        <div className="flex gap-4 px-5">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>

        <div className="mx-5">
          <Skeleton className="h-32 w-full rounded-lg sm:h-36 md:h-40" />
        </div>

        <div className="px-5">
          <SkeletonProductList />
        </div>

        <Skeleton className="h-32 w-full rounded-lg sm:h-36 md:h-40" />

        <div className="px-5">
          <SkeletonProductList />
        </div>
      </main>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLoading;
