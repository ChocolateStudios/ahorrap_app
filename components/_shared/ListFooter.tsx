import { ActivityIndicator, StyleSheet, View } from "react-native";

export const ListFooter = ({ loading }: any) => {
    if (!loading) return null;
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
        </View>
    );
};

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});