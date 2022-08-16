import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useStoryList } from "../hooks/useStoryList";
import { StoryListItem } from "../components/StoryListItem";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../index";

type Props = NativeStackScreenProps<StackParamList, "StoryList">;

export const HomeScreen = ({ navigation }: Props) => {
  const { storyList, isFetching } = useStoryList();

  const handleStoryClick = (storyId: string) => {
    navigation.navigate("StoryDetail", { storyId });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isFetching && <ActivityIndicator size="large" />}
      {!isFetching && (
        <FlatList
          data={storyList}
          renderItem={({ item }) => (
            <StoryListItem
              storyId={item}
              onClick={() => handleStoryClick(item)}
            />
          )}
          keyExtractor={(item) => item}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
