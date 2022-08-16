import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useStoryContent } from "../hooks/useStoryList";

interface Props {
  storyId: string;
  onClick: () => void;
}

export const StoryListItem = ({ storyId, onClick }: Props) => {
  const { storyContent } = useStoryContent(storyId);

  return (
    <TouchableOpacity style={styles.listItem} onPress={onClick}>
      <Image
        source={{
          uri:
            storyContent?.primary_image?.base_image_url ||
            "https://via.placeholder.com/300/09f/fff.png",
        }}
        style={styles.image}
        accessible
        accessibilityLabel={storyContent?.primary_image?.alt_text}
      />
      <Text style={styles.title}>{storyContent?.headline}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 100,
    backgroundColor: "red",
  },
  title: {
    flex: 1,
    fontSize: 14,
    padding: 12,
  },
  listItem: {
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
  },
});
