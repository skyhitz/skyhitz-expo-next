import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { Text } from "app/design-system";
import { Maybe } from "app/types";
import InfoCircle from "app/ui/icons/info-circle";

export function Description({ description }: { description: Maybe<string> }) {
  return (
    <CollapsableView icon={InfoCircle} headerText="Description">
      <Text className="p-3">{description}</Text>
    </CollapsableView>
  );
}
