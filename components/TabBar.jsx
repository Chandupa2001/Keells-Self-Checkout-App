import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Foundation, Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export function MyTabBar({ state, descriptors, navigation }) {

  const icon = {
    home: (isFocused, props) => isFocused  ? <MaterialCommunityIcons name='home' size={28} color={Colors.Primary} style={styles.iconSty} {...props} /> : <MaterialCommunityIcons name='home-outline' size={28} color={Colors.Primary} {...props} />,
    cart: (isFocused, props) => isFocused  ? <Ionicons name='cart' size={28} color={Colors.Primary} style={styles.iconSty} {...props} /> : <Ionicons name='cart-outline' size={28} color={Colors.Primary} {...props} />,
    scan : (isFocused, props) => <MaterialCommunityIcons name='barcode-scan' size={28} style={ [isFocused ? {backgroundColor: Colors.Primary, color: 'white', padding: 5, borderRadius: 10} : null ]}  {...props} />,
    notification: (isFocused, props) => isFocused  ? <Ionicons name='notifications' size={28} color={Colors.Primary} style={styles.iconSty} {...props} /> : <Ionicons name='notifications-outline' size={28} color={Colors.Primary} {...props} />,
    profile : (isFocused, props) => isFocused  ? <Ionicons name='person' size={28} color={Colors.Primary} style={styles.iconSty} {...props} /> : <Ionicons name='person-outline' size={28} color={Colors.Primary} {...props} />,
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === 'function'
              ? options.tabBarLabel({
                  focused: state.index === index,
                  color: state.index === index ? '#673ab7' : '#222',
                  position: 'below-icon',
                  children: route.name,
                })
              : options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            {icon[route.name](isFocused, { color: isFocused ? "#63BB43" : "#63BB43" })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.1,
    paddingHorizontal: 10
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  iconSty: {
    backgroundColor: '#61BC4733',
    padding: 5,
    borderRadius: 10
  }
})
