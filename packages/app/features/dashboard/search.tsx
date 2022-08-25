import { SafeAreaView } from "app/design-system/safe-area-view";
import SearchView from "app/features/dashboard/search-view";

export function SearchScreen() {
  return (
    <SafeAreaView className="flex-1 flex h-full w-full bg-blue-dark">
      <SearchView />
    </SafeAreaView>
  );
}
