import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import RNDraftJS from "react-native-draftjs-render";
import { StackParamList } from "..";
import { useStoryContent } from "../hooks/useStoryList";

type Props = NativeStackScreenProps<StackParamList, "StoryDetail">;

export const StoryDetailScreen = ({
  route: {
    params: { storyId },
  },
  navigation,
}: Props) => {
  const { storyContent, isFetching, error } = useStoryContent(storyId);
  const [contents, setContents] = useState({});

  useEffect(() => {
    if (storyContent !== null && !isFetching && !error) {
      setContents(storyContent.blocks);
      navigation.setOptions({ title: storyContent.headline });
    }
  }, [storyContent, isFetching]);

  const authors: string[] = (storyContent?.authors || []).map(
    ({ display_name }) => display_name
  );
  const authorsText = authors.join(", ");
  const publishDate = new Date(storyContent?.publish_date || 0);
  const topics: string[] = (storyContent?.topics || []).map(({ name }) => name);
  const topicsText = topics.join(", ");

  const blocks = RNDraftJS({
    contentState: contents,
  });

  if (isFetching) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
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
        <Text
          style={styles.publishDate}
        >{`${publishDate.toDateString()} - ${topicsText}`}</Text>
        <Text style={styles.author}>{`${authorsText}`}</Text>
        {blocks}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://axios.com")}
          >
            <Text style={styles.buttonText}>{"Visit Axios.com"}</Text>
          </TouchableOpacity>
          <TouchableOpacity testID="go-back" onPress={navigation.goBack}>
            <Text style={styles.buttonText}>{"Back"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 300,
  },
  publishDate: {
    marginTop: 12,
    fontWeight: "bold",
  },
  author: {
    marginTop: 12,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
