import React from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {black, gray, white} from 'styles';
import {ss, vs} from 'utils/scailing';

///state = {
//     "stale": false,
//     "type": "tab",
//     "key": "tab-ETKMy3dxN_ljltL6qv1om",
//     "index": 0,
//     "routeNames": [
//         "BoardStack",
//         "Topic",
//         "Posting",
//         "MyPage"
//     ],
//     "history": [
//         {
//             "type": "route",
//             "key": "BoardStack-rajAjeOroD7zdxCbsYWSN"
//         }
//     ],
//     "routes": [
//         {
//             "name": "BoardStack",
//             "key": "BoardStack-rajAjeOroD7zdxCbsYWSN"
//         },
//         {
//             "name": "Topic",
//             "key": "Topic-UAyeH7fDCxKtOkk0t40RX"
//         },
//         {
//             "name": "Posting",
//             "key": "Posting-CMoff3Wb_JrtCxpeKvAJh"
//         },
//         {
//             "name": "MyPage",
//             "key": "MyPage-nV1l1nWuICEAG7mznmDEB"
//         }
//     ]
// }

// descriptors={
//     "BoardStack-rajAjeOroD7zdxCbsYWSN": {
//         "route": {
//             "name": "BoardStack",
//             "key": "BoardStack-rajAjeOroD7zdxCbsYWSN"
//         },
//         "navigation": {},
//         "options": {
//             "headerShown": false,
//             "tabBarLabel": "홈"
//         }
//     },
//     "Topic-UAyeH7fDCxKtOkk0t40RX": {
//         "route": {
//             "name": "Topic",
//             "key": "Topic-UAyeH7fDCxKtOkk0t40RX"
//         },
//         "navigation": {},
//         "options": {
//             "headerShown": false,
//             "tabBarLabel": "주제별게시판"
//         }
//     },
//     "Posting-CMoff3Wb_JrtCxpeKvAJh": {
//         "route": {
//             "name": "Posting",
//             "key": "Posting-CMoff3Wb_JrtCxpeKvAJh"
//         },
//         "navigation": {},
//         "options": {
//             "headerShown": false,
//             "tabBarLabel": "글작성"
//         }
//     },
//     "MyPage-nV1l1nWuICEAG7mznmDEB": {
//         "route": {
//             "name": "MyPage",
//             "key": "MyPage-nV1l1nWuICEAG7mznmDEB"
//         },
//         "navigation": {},
//         "options": {
//             "headerShown": false,
//             "tabBarLabel": "마이페이지"
//         }
//     }
// }

function BottomTabBar({state, descriptors, navigation}) {
  const RenderingIcons = index => {
    switch (index) {
      case 0:
        return <Feather name="home" color={black.origin} size={ss(25)} />;
      case 1:
        return (
          <MaterialCommunityIcons
            name="clipboard-list-outline"
            color={black.origin}
            size={ss(25)}
          />
        );
      case 2:
        return (
          <MaterialCommunityIcons
            name="pencil-outline"
            color={black.origin}
            size={ss(25)}
          />
        );
      case 3:
        return <Octicons name="person" color={black.origin} size={ss(25)} />;
    }
  };

  const elementRatio = 1 / state.routeNames.length;

  const elementFlex = Math.floor(elementRatio / 100) / 100;
  console.log(elementFlex);

  return (
    <View style={{flexDirection: 'row', height: vs(25)}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
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
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return <View style={{flex: elementFlex}}>{RenderingIcons(index)}</View>;
      })}
    </View>
  );
}

export default BottomTabBar;
