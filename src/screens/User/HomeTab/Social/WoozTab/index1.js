// import React, {
//   useState,
//   useRef,
//   useContext,
//   useCallback,
//   useMemo,
// } from 'react';

// import {
//   View,
//   Animated,
//   ScrollView,
//   useWindowDimensions,
//   Image,
//   StyleSheet,
//   FlatList,
// } from 'react-native';

// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { Layout, Button, Text } from '@ui-kitten/components';

// import { LocaleContext } from 'src/contexts';

// import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

// import { IconCMovie } from 'src/components/CustomIcons';

// import WoozPostsArea from './WoozPostsArea';

// const InteractIcon = (props) => {
//   const {
//     Accessory,
//     textContent,
//     direction,
//     onPress,
//     status,
//     height,
//     width,
//     align,
//     style,
//   } = props;

//   return useMemo(
//     () => (
//       <View
//         style={[
//           style,
//           {
//             flexDirection: direction ?? 'column',
//             alignItems: align ?? 'center',
//           },
//         ]}
//       >
//         <Button
//           appearance="ghost"
//           status={status ?? 'control'}
//           size="tiny"
//           style={{
//             paddingVertical: 0,
//             paddingHorizontal: 0,
//           }}
//           accessoryLeft={(evaProps) => (
//             <Accessory
//               {...evaProps}
//               style={[
//                 evaProps.style,
//                 { height: height ?? 32, width: width ?? 32 },
//               ]}
//             />
//           )}
//           onPress={onPress}
//         />
//         {textContent ? (
//           <Text
//             status={status ?? 'control'}
//             category="c2"
//             style={{ textAlign: 'center', marginRight: 5 }}
//           >
//             {textContent}
//           </Text>
//         ) : null}
//       </View>
//     ),
//     [textContent, onPress, height, width, status, style, direction],
//   );
// };

// export default function Wooz({ navigation }) {
//   useModifiedAndroidBackAction(navigation, 'SocialRoute');

//   const routeMovies = () => navigation.navigate('Movies');

//   return (
//     <Layout level="6" style={{ flex: 1 }}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: '#04070C',
//         }}
//       >
//         <View
//           style={{
//             paddingHorizontal: 15,
//             paddingVertical: 25,
//             zIndex: 19,
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             flexDirection: 'row',
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//             width: '100%',
//             // backgroundColor: 'rgba(0, 0, 0, 0.05)',
//           }}
//         >
//           <InteractIcon
//             Accessory={IconCMovie}
//             status="control"
//             height={28}
//             width={28}
//             onPress={routeMovies}
//           />
//         </View>
//         <WoozPostsArea navigation={navigation} />
//       </View>
//     </Layout>
//   );
// }
