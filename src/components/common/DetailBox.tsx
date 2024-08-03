import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

const rightArrow = require("@/assets/icons/RightArrow.png");

interface DetailBoxProps {
  icon: ImageSourcePropType;
  title: string;
  description?: string;
  page: string;
}

const DetailBox: React.FC<DetailBoxProps> = ({
  icon,
  title,
  description,
  page,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  const handlePress = () => {
    navigation.navigate(page, { title });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.boxWrapper}
      onPress={handlePress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconWrapper}>
          <Image source={icon} style={styles.icon} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
      <Image source={rightArrow} style={styles.arrowIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxWrapper: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 12,
    marginHorizontal: "4%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    backgroundColor: "#FFF3E9",
    borderRadius: 12,
    marginVertical: 6,
    marginLeft: 6,
    marginRight: 14,
  },
  icon: {
    width: 18,
    height: 18,
  },
  textWrapper: {
    gap: 8,
    marginVertical: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#573353",
  },
  description: {
    color: "rgba(87, 51, 83, 0.5)",
    fontSize: 14,
  },
  arrowIcon: {
    width: 18,
    height: 18,
    marginRight: 16,
  },
});

export default DetailBox;
