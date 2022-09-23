import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import Dollar from "app/ui/icons/dollar";
import EntryPrice from "app/ui/price";
import { Entry } from "app/api/graphql";

export function Price({ issuer, code }: Entry) {
  return (
    <CollapsableView headerText="Price" icon={Dollar}>
      <EntryPrice className="p-5" issuer={issuer} code={code} />
    </CollapsableView>
  );
}
