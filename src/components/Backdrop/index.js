import React, { useState } from 'react';
import { View } from 'react-native';
import { Backdrop } from "react-native-backdrop";


const BackdropComponent = (props) => {
    const [visible, setVisible] = useState(false);

    const handleOpen = () => {
        setVisible(true);
      };
    
      const handleClose = () => {
        setVisible(false);
      };
    return(
        <>
            <Backdrop
                visible={visible}
                handleOpen={handleOpen}
                handleClose={handleClose}
                onClose={() => {}}
                swipeConfig={{
                velocityThreshold: 0.3,
                directionalOffsetThreshold: 80,
                }}
                animationConfig={{
                speed: 14,
                bounciness: 4,
                }}
                overlayColor="rgba(0,0,0,0.32)"
                backdropStyle={{
                backgroundColor: '#fff',
                }}>
                <View>
                {/* <Text>Backdrop Content</Text> */}
                </View>
            </Backdrop>
        </>
    )
}

export default BackdropComponent