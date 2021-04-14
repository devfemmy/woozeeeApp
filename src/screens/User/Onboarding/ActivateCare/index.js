import React, { useContext } from 'react';

import { View, ScrollView, useWindowDimensions } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text, List, Card,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconCheckmark } from 'src/components/CustomIcons';

const MORE_PLANS = [
  {
    id: 1,
    title: 'Family Plan',
    price: '60,000',
    benefits: [
      'Free medical care covering medical bills up to ₦ 1,000,000 annually',
      'Free Road Recovery',
      'Free Legal Assistance Call-out up to 10 times annually',
      'Free Travel Insurance (For Road & Air)',
      'Free Movie Premiere',
    ],
    colorCode: '#009456',
    status: 'success',
    route: 'ActivateCareFamilyPlan',
  },
  {
    id: 1,
    title: 'Elite Plan',
    price: '120,000',
    benefits: [
      'Free medical care covering medical bills up to ₦ 3,000,000 annually',
      'Free Road recovery up to 20 times annually',
      'Free Legal assistance Call-out up to 20 times annually',
      'Free Travel Insurance (For Road & Air)',
      'Free Movie Premiere',
      'Free access to VIP at selected locations',
    ],
    colorCode: '#F9D65B',
    status: 'warning',
    route: 'ActivateCareElitePlan',
  },
];

export default function ActivateWallet({ navigation }) {
  const { width, height } = useWindowDimensions();

  const t = useContext(LocaleContext);

  // prettier-ignore
  const routeTo = (route) => navigation.navigate(route);

  const renderCardFooter = (status, route, color) => (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 25,
      }}
    >
      <Button
        status={status}
        onPress={() => routeTo(route)}
        style={{ backgroundColor: color }}
      >
        <Text status="control" category="h6">
          Upgrade Now
        </Text>
      </Button>
    </View>
  );

  const renderPlans = ({ item }) => (
    <View style={{ width: width / 1.25 }}>
      <View
        style={{
          paddingHorizontal: 10,
          height: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: item.colorCode,
            justifyContent: 'center',
            width: 40,
            height: 250,
            position: 'relative',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <Text
            status="control"
            category="h5"
            style={{
              transform: [{ rotate: '-90deg' }],
              position: 'absolute',
              width: 150,
              left: -55,
            }}
          >
            {`₦ ${item.price} /Year`}
          </Text>
        </View>
        <Card
          style={{ height: '100%', flex: 1 }}
          // prettier-ignore
          footer={() => renderCardFooter(item.status, item.route, item.colorCode)}
        >
          <View>
            <Text
              category="h5"
              status={item.status}
              style={{
                marginBottom: 10,
                textAlign: 'center',
                color: item.colorCode,
              }}
            >
              {item.title}
            </Text>
            <Text category="h6">Benefits</Text>
            {item.benefits.map((benefit, i) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
                key={i.toString()}
              >
                <Button
                  appearance="ghost"
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  accessoryLeft={IconCheckmark}
                />
                <Text category="p2" style={{ flex: 1 }}>
                  {benefit}
                </Text>
              </View>
            ))}
            {/* <View style={{ marginTop: 10 }}>
              <Button status={item.status} onPress={() => routeTo(item.route)}>
                <Text status="control" category="h6">
                  Upgrade Now
                </Text>
              </Button>
            </View> */}
          </View>
        </Card>
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`woozeee ${t('care')}`}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
          <Text status="primary" category="s2" style={{ marginBottom: 15 }}>
            Active Plan
          </Text>
          <Card>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
              >
                <Text category="c2">Your current plan</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text category="h5" status="danger">
                    ₦ 12,000
                  </Text>
                  <Text category="s2" status="danger">
                    {' /Year'}
                  </Text>
                </View>
              </View>
              <Text category="h5" status="danger" style={{ marginBottom: 10 }}>
                Solo
              </Text>
              <Text category="h6">Benefits</Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  appearance="ghost"
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  accessoryLeft={IconCheckmark}
                />
                <Text category="p2" style={{ flex: 1 }}>
                  Free medical care covering medical bills up to ₦200,000
                  annually
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  appearance="ghost"
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  accessoryLeft={IconCheckmark}
                />
                <Text category="p2" style={{ flex: 1 }}>
                  Free Road Recovery
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  appearance="ghost"
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  accessoryLeft={IconCheckmark}
                />
                <Text category="p2" style={{ flex: 1 }}>
                  Free Legal Assistance Call-out up to 4 times annually
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  appearance="ghost"
                  style={{
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    minHeight: 0,
                    minWidth: 0,
                  }}
                  accessoryLeft={IconCheckmark}
                />
                <Text category="p2" style={{ flex: 1 }}>
                  Free Travel Insurance (For Road & Air)
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  status="danger"
                  onPress={() => routeTo('ActivateCareSoloPlan')}
                >
                  <Text status="control" category="h6">
                    Activate Now
                  </Text>
                </Button>
              </View>
            </View>
          </Card>
        </View>
        <View
          style={{ paddingHorizontal: 15, marginTop: 25, marginBottom: 15 }}
        >
          <Text status="primary" category="s2">
            More Plans
          </Text>
        </View>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingBottom: 20,
            alignItems: 'stretch',
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          data={MORE_PLANS}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderPlans}
        />
      </ScrollView>
    </Layout>
  );
}
