import { Pressable, View } from "app/design-system";
import EditProfileModal from "app/features/dashboard/editProfileModal";
import { useState } from "react";

export function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-1">
      <Pressable className="flex-1" onPress={() => setModalVisible(true)}>
        <EditProfileModal visible={modalVisible} setVisible={setModalVisible} />
      </Pressable>
    </View>
  );
}
