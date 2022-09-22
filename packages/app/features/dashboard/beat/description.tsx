import { CollapsableView } from "app/features/dashboard/beat/collapsableView";
import { Text } from "app/design-system";

export function Description() {
  return (
    <CollapsableView initCollapsed={false} headerText="Description">
      <Text className="p-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tristique
        vitae tortor mattis lobortis. Pellentesque mattis ex sodales sapien
        dapibus mattis. Vivamus at ipsum aliquet, fermentum quam quis, pulvinar
        nunc. Nullam sagittis vestibulum imperdiet. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Quisque eleifend ac elit sed finibus.
        Quisque consequat dictum pulvinar. Fusce facilisis vitae arcu ac rutrum.
        Maecenas augue orci, rhoncus eget lorem ac, finibus condimentum nisi.
        Praesent cursus, ipsum nec varius consequat, eros arcu ultricies velit,
        eleifend ullamcorper leo nulla at erat. Vestibulum at arcu egestas,
        accumsan lectus eu, bibendum lacus.
      </Text>
    </CollapsableView>
  );
}
