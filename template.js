// // prettier-ignore
// import React, {
//     useCallback, useMemo, useState, useContext,
//   } from 'react';

// import {
//   View,
//   useWindowDimensions,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// import { v4 as uuidv4 } from 'uuid';

// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { List, Text } from '@ui-kitten/components';

// import { LocaleContext } from 'src/contexts';

// import {
//   ChallengeVideoCard,
//   ExploreVideoCard,
// } from '../../components/SocialCard/index';

// import { UserProfilePostCard } from '../../components/SocialCard/index';

// import { LinearGradient } from 'expo-linear-gradient';

// // import { ExploreVideoCard } from 'src/components/SocialCard';

// import StoryCard from 'src/components/SocialCard/StoryCard';

// import VideoFullscreen from 'src/components/VideoFullscreen';

// import { IconPlusCircle } from 'src/components/CustomIcons';

// import Explore from '../../screens/User/HomeTab/Social/ChallengeTab//ExploreTab/Explore';

// export const TrendingPosts = ({ info }) => {
//   const t = useContext(LocaleContext);
//   return useMemo(
//     () => (
//       <View style={{ marginBottom: 20, paddingVertical: 5 }}>
//         <View style={{ paddingHorizontal: 10 }}>
//           <Text category="h6" style={{ marginBottom: 5 }}>
//             {t('trendingChallenges')}
//           </Text>
//         </View>
//         <List
//           style={{ backgroundColor: 'transparent' }}
//           alwaysBounceHorizontal
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           data={info}
//           keyExtractor={(_, i) => i.toString()}
//           renderItem={(renderData) => (
//             <VideoCard data={renderData.item} extraWidth={0.5} />
//           )}
//           getItemLayout={(data, index) => ({
//             length: 200,
//             offset: 200 * index,
//             index,
//           })}
//         />
//       </View>
//     ),
//     [t, info],
//   );
// };

// export const StoryPosts = ({ info }) => {
//   const t = useContext(LocaleContext);

//   // console.log('info from StoryPosts -> ' + info);

//   const RenderCategoryHeader = () => (
//     <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
//       <TouchableOpacity activeOpacity={0.75} style={{ position: 'relative' }}>
//         <Image
//           source={require('assets/images/user/user2.png')}
//           defaultSource={require('assets/images/user/user2.png')}
//           style={{
//             height: 80,
//             width: 80,
//             borderRadius: 40,
//           }}
//           resizeMode="cover"
//         />
//         <View
//           style={{
//             borderRadius: 15,
//             position: 'absolute',
//             backgroundColor: 'white',
//             right: 0,
//             bottom: 0,
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <IconPlusCircle height={28} width={28} fill="#043F7C" />
//         </View>
//       </TouchableOpacity>
//       <Text category="s2" style={{ marginTop: 10 }}>
//         {t('yourStory')}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={{ paddingVertical: 5 }}>
//       <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
//         <Text category="h6">{t('recentStories')}</Text>
//       </View>
//       <List
//         style={{ backgroundColor: 'transparent' }}
//         contentContainerStyle={{ alignItems: 'flex-start' }}
//         alwaysBounceHorizontal
//         horizontal
//         ListHeaderComponent={RenderCategoryHeader}
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         data={info}
//         keyExtractor={(_, i) => i.toString()}
//         renderItem={(renderData) => (
//           <StoryCard data={renderData.item} extraWidth={0.5} />
//         )}
//         getItemLayout={(data, index) => ({
//           length: 175,
//           offset: 175 * index,
//           index,
//         })}
//       />
//     </View>
//   );
// };

// // prettier-ignore
// export const UsersPosts = ({ exploreData }) => {
//     const {data} = exploreData;
//     return data ? data.map((item) =>
//     (
//       <View
//       // style={{ display: 'flex', flexDirection: 'row' }}
//         key={uuidv4()}
//       >
//         <View style={{ paddingHorizontal: 10 }}>
//           <Text category="h6" status="danger" style={{ marginBottom: 5 }}>
//             {item.groupName}
//           </Text>
//           <Text category="c1" style={{ marginBottom: 5 }}>
//           {`${item.subs.reduce((i, j) => i + j.totalEntries, 0)} Clip(s)`}
//           </Text>
//         </View>

//         {/* <Explore data={item}/> */}
//       </View>
//     )): null
//   }
// // export const ExplorePosts = ({ exploreData }) => {
// //   const { data } = exploreData;
// //   return data
// //     ? data.map((item) => {
// //         // console.log('item is -> ', item);
// //         return (
// //           <View style={{ paddingHorizontal: 10 }}>
// //             <Text category="h6" status="danger" style={{ marginBottom: 15 }}>
// //               {item.groupName}
// //             </Text>
// //             <Text category="c1" style={{ marginBottom: 5 }}>
// //               {`${item.subs.reduce((i, j) => i + j.totalEntries, 0)} Clip(s)`}
// //             </Text>
// //             {item.subs.map((sub) => (
// //               <View>
// //                 <View
// //                   style={{
// //                     backgroundColor: '#233e8b',
// //                     width: '50%',
// //                     borderRadius: 30,
// //                   }}
// //                 >
// //                   {sub.entries.length > 0 ? (
// //                     <Text
// //                       style={{
// //                         color: 'white',
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {`${sub.categoryName} ${sub.entries.length} Clip(s) `}
// //                     </Text>
// //                   ) : null}
// //                 </View>
// //                 <View
// //                   style={{
// //                     display: 'flex',
// //                     flexDirection: 'row',
// //                   }}
// //                 >
// //                   {sub.entries.length > 0 && (
// //                     <TouchableOpacity
// //                       activeOpacity={0.75}
// //                       style={{
// //                         height: 180,
// //                         width: 130,
// //                         paddingHorizontal: 3,
// //                         position: 'relative',
// //                         alignItems: 'center',
// //                         justifyContent: 'flex-start',
// //                       }}
// //                       // onPress={routeChallengeWooz}
// //                     >
// //                       <Image
// //                         source={{ uri: data.medialThumbnail }}
// //                         defaultSource={require('assets/images/banner/placeholder-image.png')}
// //                         style={{
// //                           height: 175,
// //                           width: '100%',
// //                           borderRadius: 5,
// //                         }}
// //                         resizeMode="cover"
// //                       />
// //                       {/* {data._id ? (
// //                       <LinearGradient
// //                         colors={['#043F7C', '#FF5757']}
// //                         style={{
// //                           height: 36,
// //                           width: 36,
// //                           borderRadius: 18,
// //                           alignItems: 'center',
// //                           justifyContent: 'center',
// //                           position: 'absolute',
// //                           left: 10,
// //                           top: 5,
// //                         }}
// //                       >
// //                         <Image
// //                           source={{ uri: data.medialThumbnail }}
// //                           defaultSource={require('assets/images/banner/placeholder-image.png')}
// //                           style={{
// //                             height: 32,
// //                             width: 32,
// //                             borderRadius: 16,
// //                             borderColor: 'white',
// //                           }}
// //                           resizeMode="cover"
// //                         />
// //                       </LinearGradient>
// //                     ) : null} */}
// //                       {/* {data.categoryId ? (
// //                       <View
// //                         style={{
// //                           backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //                           position: 'absolute',
// //                           bottom: 5,
// //                           borderBottomLeftRadius: 5,
// //                           borderBottomRightRadius: 5,
// //                           padding: 5,
// //                           width: '100%',
// //                         }}
// //                       >
// //                         <Text
// //                           category="c2"
// //                           style={{ color: 'white', marginBottom: 5 }}
// //                           numberOfLines={1}
// //                         >
// //                           {data.category_group}
// //                         </Text>
// //                         <View>
// //                           <Text category="c1" status="control">
// //                             {data.totalViews}
// //                           </Text>
// //                         </View>
// //                       </View>
// //                     ) : null} */}
// //                     </TouchableOpacity>
// //                   )}
// //                 </View>
// //               </View>
// //             ))}
// //           </View>
// //         );
// //       })
// //     : null;
// // };

// export const ChallengePosts = ({ chaData }) => {
//   return chaData && chaData.data ? (
//     chaData.data.map((item) => {
//       return item.subs.map((sub) => {
//         return sub.challenges.length ? (
//           <View
//             style={{
//               flex: 1,
//               marginBottom: 10,
//               paddingVertical: 5,
//               maxHeight: 235,
//             }}
//             key={uuidv4()}
//           >
//             <View style={{ paddingHorizontal: 10 }}>
//               <Text category="h6" status="danger" style={{ marginBottom: 15 }}>
//                 {sub.categoryName}
//               </Text>
//               <Text category="c1" style={{ marginBottom: 5 }}>
//                 {`${sub.totalEntries} Video(s)`}
//               </Text>
//             </View>
//             <View>
//               <List
//                 style={{ backgroundColor: 'transparent' }}
//                 alwaysBounceHorizontal
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 showsVerticalScrollIndicator={false}
//                 data={sub.challenges}
//                 keyExtractor={(_, i) => i.toString()}
//                 renderItem={(renderData) => (
//                   <ChallengeVideoCard data={renderData} extraWidth={0.5} />
//                 )}
//                 getItemLayout={(data, index) => ({
//                   length: 200,
//                   offset: 200 * index,
//                   index,
//                 })}
//               />
//             </View>
//           </View>
//         ) : null;
//       });
//     })
//   ) : (
//     <></>
//   );
// };

// // prettier-ignore
// export const ProfilePosts = ({allEntries}) => {
//     // console.log("from profile post -> ", allEntries)
//     const {firstTenEntries} = allEntries
//     return(
//       <List
//       style={{
//         backgroundColor: 'transparent',
//       }}
//       contentContainerStyle={{
//         paddingBottom: 25,
//         paddingTop: 5,
//       }}
//       // alwaysBounceVertical
//       showsHorizontalScrollIndicator={true}
//       showsVerticalScrollIndicator={false}
//       numColumns={3}
//       data={firstTenEntries}
//       keyExtractor={(_, i) => i.toString()}
//       renderItem={(renderData) => (
//         <UserProfilePostCard data={renderData} extraWidth={0} numColumns={3} />
//       )}
//       getItemLayout={(data, index) => ({
//         length: 200,
//         offset: 200 * index,
//         index,
//       })}
//     />
//     )
//     }

// export const WoozPosts = ({ info }) => {
//   const { bottom, top } = useSafeAreaInsets();

//   const { height } = useWindowDimensions();

//   const [activeIndex, setActiveIndex] = useState(0);

//   const CONTENT_SPACE = bottom + top;

//   const ITEM_HEIGHT = height - CONTENT_SPACE;

//   const VIEWABILITY_CONFIG = useMemo(
//     () => ({
//       minimumViewTime: 200,
//       viewAreaCoveragePercentThreshold: 60,
//     }),
//     [],
//   );

//   // show currently viewing video
//   const handleViewItemsChanged = useCallback((data) => {
//     setActiveIndex(data.changed[0].index);
//   }, []);

//   const renderPost = useCallback(
//     (renderData) => (
//       <VideoFullscreen
//         data={renderData}
//         extraWidth={0.5}
//         activeIndex={activeIndex}
//         viewHeight={ITEM_HEIGHT}
//       />
//     ),
//     [ITEM_HEIGHT, activeIndex],
//   );

//   return (
//     <List
//       style={{
//         backgroundColor: 'transparent',
//         height: ITEM_HEIGHT,
//       }}
//       alwaysBounceVertical
//       showsHorizontalScrollIndicator={false}
//       showsVerticalScrollIndicator={false}
//       data={info}
//       keyExtractor={(_, i) => i.toString()}
//       renderItem={renderPost}
//       extraData={activeIndex}
//       snapToAlignment="start"
//       decelerationRate="fast"
//       snapToInterval={ITEM_HEIGHT}
//       getItemLayout={(data, index) => ({
//         length: ITEM_HEIGHT,
//         offset: ITEM_HEIGHT * index,
//         index,
//       })}
//       onViewableItemsChanged={handleViewItemsChanged}
//       viewabilityConfig={VIEWABILITY_CONFIG}
//     />
//   );
// };

// // export const SocialPosts = ({ info }) => {
// //   const { height } = useWindowDimensions();

// //   const [activeIndex, setActiveIndex] = useState(0);

// //   const ITEM_HEIGHT = height / 2;

// //   const VIEWABILITY_CONFIG = useMemo(
// //     () => ({
// //       minimumViewTime: 100,
// //       viewAreaCoveragePercentThreshold: 50,
// //     }),
// //     [],
// //   );

// //   // show currently viewing video
// //   const handleViewItemsChanged = useCallback((data) => {
// //     setActiveIndex(data.changed[0].index);
// //   }, []);

// //   return useMemo(
// //     () => (
// //       <List
// //         style={{
// //           flex: 1,
// //           backgroundColor: 'transparent',
// //           height: ITEM_HEIGHT,
// //         }}
// //         alwaysBounceVertical
// //         showsHorizontalScrollIndicator={false}
// //         showsVerticalScrollIndicator={false}
// //         data={info}
// //         renderItem={(renderData) => (
// //           <VideoView
// //             data={renderData}
// //             activeIndex={activeIndex}
// //             viewHeight={ITEM_HEIGHT}
// //           />
// //         )}
// //         extraData={activeIndex}
// //         snapToAlignment="start"
// //         decelerationRate="fast"
// //         snapToInterval={ITEM_HEIGHT}
// //         getItemLayout={(data, index) => ({
// //           length: ITEM_HEIGHT,
// //           offset: ITEM_HEIGHT * index,
// //           index,
// //         })}
// //         initialNumToRender={4}
// //         onViewableItemsChanged={handleViewItemsChanged}
// //         viewabilityConfig={VIEWABILITY_CONFIG}
// //       />
// //     ),
// //     [
// //       info,
// //       activeIndex,
// //       handleViewItemsChanged,
// //       VIEWABILITY_CONFIG,
// //       ITEM_HEIGHT,
// //     ],
// //   );
// // };

// // export const AllPosts = ({ info }) => {
// //   const { width, height } = useWindowDimensions();

// //   const IS_PORTRAIT = height > width;

// //   const ListHeader = () => (
// //     <View style={{ padding: 10 }}>
// //       <Text category="h5">Summer Videos</Text>
// //     </View>
// //   );

// //   return useMemo(
// //     () => (
// //       <List
// //         style={{
// //           backgroundColor: 'transparent',
// //         }}
// //         contentContainerStyle={{
// //           paddingTop: 5,
// //           paddingBottom: 15,
// //         }}
// //         alwaysBounceVertical
// //         showsHorizontalScrollIndicator={false}
// //         showsVerticalScrollIndicator={false}
// //         ListHeaderComponent={ListHeader}
// //         numColumns={IS_PORTRAIT ? 2 : 3}
// //         key={IS_PORTRAIT ? 2 : 3}
// //         data={info}
// //         renderItem={(renderData) => (
// //           <VideoCard data={renderData.item} extraWidth={0} />
// //         )}
// //         getItemLayout={(data, index) => ({
// //           length: 175,
// //           offset: 175 * index,
// //           index,
// //         })}
// //       />
// //     ),
// //     [info, IS_PORTRAIT],
// //   );
// // };

const myReport = [
  {
    done: {
      home: {
        1: 'View Entries',
        2: 'Like entries',
        3: 'Unlike entries',
        4: 'Comment on entries',
        5: 'See total views',
        6: 'See total votes (If challenge entry)',
        7: 'View User Stories',
        8: 'View Movies',
        9: 'View Notifications',
        10: 'View User Profiles',
        11: 'Entry Menu (Report)',
        12: 'Entry Menu (Copy link',
        14: 'Entry Menu (Follow)',
      },
      wooz: {
        1: 'View Entries',
        2: 'Like entries',
        3: 'Unlike entries',
        5: 'See total views',
        6: 'See total votes (If challenge entry)',
        7: 'View Movies',
        8: 'View User Profiles',
      },
      challenges: {
        1: 'View Entries',
        2: 'Like entries',
        3: 'Unlike entries',
        5: 'See total views',
        6: 'See total votes (If challenge entry)',
        7: 'View Movies',
        8: 'View User Profiles',
        9: 'Vote for entries',
        11: 'Unvote  entries',
      },
      explore: {
        1: 'View Entries',
        2: 'Like entries',
        3: 'Unlike entries',
        5: 'See total views',
        6: 'See total votes (If challenge entry)',
        7: 'View Movies',
        8: 'View User Profiles',
        9: 'Search for users',
      },
    },
    inProgress: {
      wooz: {
        4: 'Comment on entries',
      },
      challenges: {
        4: 'Comment on entries',
        12: 'View rankings',
        14: 'Enter a challenge',
        10: 'Vote for only one entry',
      },
      explore: {
        4: 'Comment on entries',
      },
    },
  },
];
