import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { colors } from "app/theme";
import { Text } from "app/components";

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
  },
  backButton: {
    paddingLeft: 15,
  },
  title: {
    color: colors.palette.white,
    marginVertical: 10,
    marginLeft: 15,
  },
});

const Header: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation<CompositeNavigationProp<any, any>>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <Pressable style={styles.header} onPress={() => navigation.goBack()}>
        <View style={styles.backButton}>
          <Entypo name="chevron-left" size={32} color={colors.palette.white} />
        </View>
        <Text text={title} preset="header" style={styles.title} />
      </Pressable>
    </View>
  );
};

export default Header;