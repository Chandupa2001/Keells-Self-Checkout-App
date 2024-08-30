import React from "react";
import { Tabs } from "expo-router";
import { MyTabBar } from "@/components/TabBar";

const TabLayout = () => {
    return (
        <Tabs screenOptions={{headerShown: false}} tabBar={props => <MyTabBar {...props} />}>
            <Tabs.Screen name="home" options={{title: "Home"}} />
            <Tabs.Screen name="cart" options={{title: "Cart"}} />
            <Tabs.Screen name="scan" options={{title: "Scan"}} />
            <Tabs.Screen name="notification" options={{title: "Notifications"}} />
            <Tabs.Screen name="profile" options={{title: "Profile"}} />
        </Tabs>
    );
}

export default TabLayout;